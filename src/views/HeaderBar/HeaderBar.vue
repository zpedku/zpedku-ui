<template>
  <div class="header" :style="{'background':themeColor}">
    <!--导航收缩-->
    <span class="hamburg">
      <el-menu class="ele-menu-demo" :background-color="themeColor" text-color="#fff"
               :active-text-color="themeColor" mode="horizontal">
        <el-menu-item index="1" @click="onCollapse"><hamburger :isActive="collapse"></hamburger></el-menu-item>
      </el-menu>
    </span>
    <!--导航菜单-->
    <span class="navbar">
      <el-menu class="el-menu-demo" :default-active="activeIndex" :background-color="themeColor" text-color="#fff"
               active-text-color="#ffd04b"
               mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" @click="$router.push('/')"><i class="fa fa-home fa-lg"></i></el-menu-item>
        <el-menu-item index="2" @click="openWindow('https://www.baidu.com')">百度链接</el-menu-item>
        <el-menu-item index="3" @click="openWindow('https://www.baidu.com')">文档</el-menu-item>
        <el-menu-item index="4" @click="openWindow('https://www.baidu.com')">博客</el-menu-item>
        <el-submenu index="5">
          <template slot="title">我的工作台</template>
          <el-menu-item index="5-1">选项1</el-menu-item>
          <el-menu-item index="5-2">选项2</el-menu-item>
          <el-menu-item index="5-3">选项3</el-menu-item>
        </el-submenu>
      </el-menu>

    </span>

    <!--工具栏-->
    <span class="toolbar">
      <el-menu class="el-menu-demo" :background-color="themeColor" :text-color="themeColor"
               :active-text-color="themeColor" mode="horizontal">
          <el-menu-item index="1">
            <theme-picker class="theme-picker" :default="themeColor" @onThemeChange="onThemeChange"></theme-picker>
          </el-menu-item>
          <el-menu-item index="2" v-popover:popover-lang>
          <!-- 语言切换 -->
          <li style="color:#fff;" class="fa fa-language fa-lg"></li>
            <!--v-model="langVisible"-->
          <el-popover ref="popover-lang" placement="bottom-start" trigger="click" v-model="langVisible">
            <div class="lang-item" @click="changeLanguage('zh_cn')">简体中文</div>
            <div class="lang-item" @click="changeLanguage('en_us')">English</div>
          </el-popover>
        </el-menu-item>
                <el-menu-item index="3" v-popover:popover-message>
          <!-- 我的私信 -->
          <el-badge :value="5" :max="99" class="badge" type="success">
            <li style="color:#fff;" class="fa fa-envelope-o fa-lg"></li>
          </el-badge>
          <el-popover ref="popover-message" placement="bottom-end" trigger="click">
            <!--<message-panel></message-panel>-->
          </el-popover>
        </el-menu-item>
        <el-menu-item index="4" v-popover:popover-notice>
          <!-- 系统通知 -->
          <el-badge :value="4" :max="99" class="badge" type="success">
            <li style="color:#fff;" class="fa fa-bell-o fa-lg"></li>
          </el-badge>
          <el-popover ref="popover-notice" placement="bottom-end" trigger="click">
            <!--<notice-panel></notice-panel>-->
          </el-popover>
        </el-menu-item>
        <el-menu-item index="5" v-popover:popover-personal>
          <!-- 用户信息 -->
          <span class="user-info"><img :src="user.avatar"/>{{user.name}}</span>
          <el-popover ref="popover-personal" placement="bottom-end" trigger="click" :visible-arrow="false">
            <!--<personal-panel :user="user"></personal-panel>-->
          </el-popover>
        </el-menu-item>

      </el-menu>
    </span>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Hamburger from "@/components/Hamburger"
  import ThemePicker from "@/components/ThemePicker"

  export default {
    name: "headerbar",
    components: {
      Hamburger,
      ThemePicker
    },
    data() {
      return {
        user: {
          name: "zpedku",
          avatar: "http://files.57gif.com/webgif/0/8/0a/5ac2038219c213d5e61bdeb8a13f5.gif",
          role: "超级管理员",
          registeInfo: "注册时间：2018-12-20 "
        },
        activeIndex: '1',
        langVisible: false
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      openWindow(url) {
        window.open(url)
      },
      onCollapse() {
        //折叠导航栏
        this.$store.commit("onCollapse")
      },
      changeLanguage(lang) {

      },
      onThemeChange(theme) {
        this.$store.commit('setThemeColor', theme)
      }
    },
    computed: {
      ...mapState({
        themeColor: state => state.app.themeColor,
        collapse: state => state.app.collapse
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
  }

  .hamburg, .navbar {
    float: left;
  }

  .toolbar {
    float: right;
  }

  .lang-item {
    font-size: 16px;
    padding-left: 8px;
    padding-top: 8px;
    padding-bottom: 8px;
    cursor: pointer;
  }

  .lang-item:hover {
    font-size: 18px;
    background: #b0d6ce4d;
  }

  .user-info {
    font-size: 20px;
    color: #fff;
    cursor: pointer;
    img {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      margin: 10px 0px 10px 10px;
      float: right;
    }
  }

  .badge {
    line-height: 18px;
  }

  .position-left {
    left: 200px;
  }

  .position-collapse-left {
    left: 65px;
  }
</style>
