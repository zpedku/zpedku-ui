<template>
  <div id="main-container" class="main-container"
       :class="$store.state.app.collapse?'position-collapse-left':'position-left'">
    <!--tab page-->
    <div class="tab-container">
      <el-tabs class="tab" :class="$store.state.app.collapse?'position-collapse-left':'position-left'"
               v-model="mainTabsActiveName" :closable="true" type="card">
        <el-dropdown class="tabs-tools" :show-timeout="0" trigger="hover">
          <div style="font-size:20px;width:50px;"><i class="el-icon-arrow-down"></i></div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="tabsCloseCurrentHandle">关闭当前标签</el-dropdown-item>
            <el-dropdown-item @click.native="tabsCloseOtherHandle">关闭其它标签</el-dropdown-item>
            <el-dropdown-item @click.native="tabsCloseAllHandle">关闭全部标签</el-dropdown-item>
            <el-dropdown-item @click.native="tabsRefreshCurrentHandle">刷新当前标签</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-tab-pane v-for="item in mainTabs"
                     :key="item.name" :label="item.title" :name="item.name">
          <span slot="label"><i :class="item.icon"></i> {{item.title}} </span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 主内容区域 -->
    <div class="main-content">
      <keep-alive>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  // import {mapState} from 'vuex'

  export default {
    name: "MainContent",
    data() {
      return {}
    },
    computed: {
      // ...mapState({
      //
      // })
      mainTabs: {
        get() {
          return this.$store.state.tab.mainTabs
        },
        set(val) {
          this.$store.commit('updateMainTabs', val)
        }
      },
      mainTabsActiveName: {
        get() {
          return this.$store.state.tab.mainTabsActiveName
        },
        set(val) {
          this.$store.commit('updateMainTabsActiveName', val)
        }
      }
    },
    methods: {
      //tab, choose tab
      selectedTabHandle(tab) {
        tab = this.mainTabs.filter(item => item.name === tab.name)
        if (tab.lengt >= 1) {
          this.$router.push({name: tab[0].name})
        }
      },
      tabsCloseCurrentHandle(){},
      tabsCloseOtherHandle(){},
      tabsCloseAllHandle(){},
      tabsRefreshCurrentHandle(){}
    }
  }
</script>

<style scoped>
  .position-collapse-left {
    left: 65px;
  }

  .position-left {
    left: 200px;
  }

</style>
