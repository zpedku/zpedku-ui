<template>
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" style="float: left;padding-top:10px;padding-left: 15px;">
      <el-form :inline="true" :model="filters" :size='size'>
        <el-form-item>
          <el-input placeholder="用户名" v-model="filters.name"></el-input>
        </el-form-item>
        <el-form-item>
          <!---->
          <kt-button icon="fa fa-search" label="查询"  type="primary"perms="sys:role:view" @click="findPage(null)"></kt-button>
        </el-form-item>
        <el-form-item>
          <kt-button icon="fa fa-plus" label="增加" perms="sys:user:add" type="primary" @click="handleAdd"></kt-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="toolbar" style="float: right;padding-top:10px;padding-right: 15px;">
      <el-form :inline="true" :size="size">
          <el-form-item>
              <el-button-group>
                  <el-tooltip content="刷新" placement="top">
                      <el-button icon="fa fa-refresh" @click="findPage(null)"></el-button>
                  </el-tooltip>
                  <el-tooltip content="列显示" placement="top">
                       <el-button icon="fa fa-filter" @click="displayFilterColumnsDialog"></el-button>
                  </el-tooltip>
                  <el-tooltip content="导出" placement="top">
                    <el-button icon="fa fa-file-excel-o"></el-button>
                  </el-tooltip>
              </el-button-group>
          </el-form-item>
      </el-form>
      <!--表格显示列界面-->
      <!--<table-column-filter-dialog ref="tableColumnFilterDialog" :columns="columns"-->
                                  <!--@handleFilterColumns="handleFilterColumns">-->
      <!--</table-column-filter-dialog>-->
    </div>
    <!--表格内容栏-->
    <kt-table permsEdit="sys:user:edit" permsDelete="sys:user:delete"
              :data="pageResult"
              :columns="filterColumns"
              @findPage="findPage"
              @handleEdit="handleEdit"
              @handleDelete="handleDelete">
    </kt-table>

    <!--新增编辑界面-->
    <el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
        <el-form :model="dataForm"
                 label-width="80px"
                 :rules="dataFormRules"
                 :size="size"
                 label-position="right"
                 ref="dataForm"
        >
          <el-form-item label="ID" prop="id" v-if="false">
            <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="name">
            <el-input v-model="dataForm.name" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
              <el-input v-model="dataForm.password" type="password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="机构" prop="deptName">
            <popup-tree-input
              :data="deptData"
              :props="deptTreeProps"
              :prop="dataForm.deptName"
              :nodeKey="''+dataForm.deptId"
              :currentChangeHandle="deptTreeCurrentChangeHandle"
            ></popup-tree-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="dataForm.emaill" auto-complete="false"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="dataForm.mobile" auto-complete="false"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="userRoles" v-if="!operation">
            <el-select v-model="dataForm.userRoles" multiple placeholder="请选择"></el-select>
          </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :size="size" @click.native="dialogVisible=false">取消</el-button>
        <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">保存</el-button>
      </div>
    </el-dialog>


    <!--<router-view></router-view>-->
  </div>
</template>

<script>
import KtTable from  "@/views/Core/KtTable"
import KtButton from "@/views/Core/KtButton"
import PopupTreeInput from "@/components/PopupTreeInput"

//默认增加参数
const DEFAULT_DATAFORM = {
  id: 0,
  name: '',
  password: '',
  deptId: 1,
  deptName: '',
  emaill: 'zpedku@qq.com',
  mobile: '15920483330',
  status: 1,
  userRoles: []
}

export default {
  name: 'User',
  components:{
    KtButton,
    KtTable,
    PopupTreeInput
  },
  data() {
    return {
      size: 'small',
      filters: {
        name: ''
      }, //过滤参数项
      columns: [], //表格列表项
      filterColumns: [],
      pageRequest: { pageNum: 1, pageSize: 10 },
      pageResult: {},
      operation: false, //true:新增, false:编辑
      dialogVisible: false, //新增编辑界面是否显示
      editLoading: false,
      dataFormRules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      },
      //新增编辑界面数据
      dataForm: Object.assign({}, DEFAULT_DATAFORM),
      deptData: [],
      deptTreeProps: {
        lable: 'name',
        children: 'children'
      },
      roles: []
    }
  },
  methods: {
    //获取分页数据
    findPage(data) {
      if (data != null) {
        this.pageRequest = data.pageRequest
      }
      this.pageRequest.columnFilters = {
        name: { name: 'name', value: this.filters.name }
      }
      //todo 补充查询接口
    },
    //加载用户角色信息
    findUserRoles() {
      //todo 补充查询用户角色接口
    },
    //批量删除
    handleDelete(data) {
      //todo 补充批量查询数据
    },
    //增加
    handleAdd() {
      this.dialogVisible = true
      this.operation = true
      this.dataForm = Object.assign({}, DEFAULT_DATAFORM)
    },

    //修改
    handleEdit(params) {
      this.dialogVisible = true
      this.operation = false
      this.dataForm = Object.assign({}, params.row)
      let userRoles = []
      for (let i = 0, len = params.row.roles.length; i < len; i++) {
        userRoles.push(params.row.userRoles[i].roleId)
      }
      this.dataForm.userRoles = userRoles
    },

    //提交
    submitForm() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗?', '提示', {}).then(() => {
            this.editLoading = true
          })
        }
      })
    },

    //获取部门列表
    findDeptTree() {},

    //菜单树选中

    deptTreeCurrentChangeHandle(data, node) {},
    //时间格式化
    dateFormat(row, column, cellValue, index) {},

    //处理表格列过滤显示
    displayFilterColumnsDialog() {},

    //处理表格列过滤显示
    handleFilterColumns(data) {},
    //处理表格列过滤显示
    initColumns() {
      this.columns = [
        { prod: 'id', lable: 'ID', minWidth: 50 },
        { prod: 'name', lable: '用户名', minWidth: 120 },
        { prod: 'deptName', lable: '机构', minWidth: 120 },
        { prod: 'roleNames', lable: '角色', minWidth: 120 },
        { prod: 'email', lable: '邮箱', minWidth: 120 },
        { prod: 'mobile', lable: '手机', minWidth: 120 },
        { prod: 'status', lable: '状态', minWidth: 120 }
      ]
      this.filterColumns = JSON.parse(JSON.stringify(this.columns))
    }
  },
  mounted() {}
}
</script>

<style scoped>
</style>
