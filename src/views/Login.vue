<template>
  <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <!--style="padding-left: 22px;"-->
    <span class="tool-bar">
      <theme-picker style="float:right;" class="theme-picker" :default="themeColor" @onThemeChange="onThemeChange"></theme-picker>
    </span>
    <h2 class="title">系统登录</h2>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>

    <el-form-item style="margin-bottom: 10px">
      <el-col :span="12">
        <el-form-item prop="captcha">
          <el-input type="test" v-model="loginForm.captcha" auto-complete="off" placeholder="验证码, 单击图片刷新"
                    style="width: 100%;">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="1">&nbsp;</el-col>
      <el-col :span="11">
        <el-form-item>
          <img style="width: 100%;" class="pointer" :src="loginForm.src" @click="refreshCaptcha">
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item style="margin-bottom: 10px">
      <!--:offset="11" style="height: 20px;"-->
      <el-col :span="11" style="text-align: left">
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      </el-col>
    </el-form-item>
    <el-form-item style="width: 100%;">
      <el-button type="primary" style="width: 48%;" @click.native.prevent="reset">重置</el-button>
      <el-button type="primary" style="width: 48%;" @click.native.prevent="login" :loading="loading">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {mapState} from "vuex"
  import Cookie from 'js-cookie'
  import ThemePicker from '@/components/ThemePicker'

  export default {
    name: "Login",
    components:{
      ThemePicker
    },
    data() {
      return {
        loading: false,
        loginForm: {
          account: 'admin',
          password: 'admin',
          captcha: '',
          src: ''
        },
        fieldRules: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
        , checked: true
      }
    },
    computed:{
      ...mapState({
        themeColor: state=>state.app.themeColor
      })
    },
    methods: {
      login() {
        let _this = this;
        this.loading = true;

        let userInfo = {account: this.loginForm.account, password: this.loginForm.password};
        this.$api.login.login(userInfo).then(res => {
          if (res.msg != null) {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          } else {
            console.log(res.data)
            Cookie.set("token", res.data.token)
            sessionStorage.setItem("user", userInfo.account);
            this.$store.commit("menuRouteLoaded", false)
            this.$router.push('/')  // 登录成功，跳转到主页
          }
          this.loading = false
        }).catch(err => {
          console.log(err.data)
          this.loading = false
        })


        // setTimeout(function () {
        //   _this.loading = false;
        // }, 2000)

      },
      refreshCaptcha() {
        this.loginForm.src = this.global.baseURI + "/captcha.jpg?t=" + new Date().getTime();
      },
      onThemeChange:function(themeColor){
        this.$store.commit('setThemeColor', themeColor)
      },
      reset() {
        this.$refs.loginForm.resetFields();
      }
    }


  }
</script>

<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px;
    }
  }
</style>
