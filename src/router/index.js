import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login')
    }
  ]
})

router.beforeEach((to, from, next) => {
  //登录界面登录成功之后,会把用户信息存在会中
  //存在时间会话生命周期,页面关禁即失效
  let userName = sessionStorage.getItem('user')
  console.log(userName)
  if (to.path === '/login') {
    if (userName) {
      next({path: '/'})
    } else {
      next()
    }
  } else {
    if (!userName) {
      next({'path': '/login'})
    } else {
      // 加载动态菜单和路由
     // addDynamicMenuAndRoutes(userName, to, from)
      next()
    }
  }


})

/**
 * 加载动态菜单和路由
 */
function addDynamicMenuAndRoutes(userName, to, from) {
  //todo 处理IFrame嵌套页面

  if (store.state.app.menuRouteLoaded) {
    console.log('动态菜单和路由已经存在')
    return
  }

  //todo 先开发菜单树


}


/**
 * 处理IFrame嵌套页面
 */
function handleIFrameUrl(path) {

}

export default router
