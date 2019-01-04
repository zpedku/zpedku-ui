<template>
  <div class="header" :style="{'background':themeColor}">
    <!--导航收缩-->
    <span class="hamburg">
      <el-menu class="ele-menu-demo" :background-color="themeColor" text-color="#fff"
      :active-text-color="themeColor" mode="horizontal">
        <el-menu-item index="1"><hamburger></hamburger></el-menu-item>
      </el-menu>
    </span>
    <!--导航菜单-->
    <span class="navbar">
      导航菜单
    </span>

    <!--工具栏-->
    <span class="toolbar">
      工具栏
    </span>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import hamburger from "@/components/Hamburger"
  export default {
    name: "headerbar",
    components:{
      hamburger
    },
    computed: {
      ...mapState({
        themeColor: state => state.app.themeColor
      })
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    position: fixed;
    top: 0;
    right: 0;
    left: 200px;
    height: 60px;
    line-height: 60px;
    border-left: 1px solid rgba(180, 190, 190, 0.8);
    /*border-color: rgba(180, 190, 190, 0.8);*/
    /*border-left-width: 1px;*/
    /*border-left-style: solid;*/
  }

  .hamburg, .navbar {
    float: left;
  }

  .toolbar {
    float: right;
  }
</style>
