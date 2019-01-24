import Vue from 'vue'
import Router from 'vue-router'
import api from '@/http/api'
import store from '@/store'
import {getIFramePath, getIFrameUrl} from '@/utils/iframe'
import Intro from '@/views/Intro'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: () => import('@/views/Home'),
      children:[
        {
          path:'',
          name:'系统介绍',
          component:Intro,
          meta:{
            icon:'fa fa-home fa-lg'
          }
        }
      ]
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('@/views/Login')
    // }
  ]
})

router.beforeEach((to, from, next) => {
  //登录界面登录成功之后,会把用户信息存在会中
  //存在时间会话生命周期,页面关禁即失效
  let userName = sessionStorage.getItem('user')
  // console.log(userName)
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
      addDynamicMenuAndRoutes(userName, to, from)
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
  api.menu.findNavTree({userName: userName}).then((res) => {
    //todo 动态添加路由
    let dynamicRoutes = addDynamicRoutes(res.data)
    // console.log('dynamicRoutes', dynamicRoutes)
    router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
    router.addRoutes(router.options.routes)
    // console.log('菜单', res.data)
    //保存加载状态
    store.commit("menuRouteLoaded", true)
    //保存菜单树
    store.commit('setNavTree', res.data)
  }).then(res => {
    //获取用户权限信息
    //todo 这里上传角色名
    // api.use.findPermissions({name:userName}).then(res=>{
    //保存用户权限标识集合
    //store.commit('setPerms',res.data)
    // })
  })


}


/**
 * 处理IFrame嵌套页面
 */
function handleIFrameUrl(path) {

}

/**
 * 添加动态(菜单)路由
 * @param menuList 菜单列表
 * @param routes 递归创建的动态(菜单)路由
 */
function addDynamicRoutes(menuList = [], routes = []) {
  // console.log('addDynamicRoutes');
  //顶级菜单导航是目录,没有路由
  var temp = [];
  //console.log('menuList',menuList)
  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children) //递归存在子元素的菜单
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) { //匹配非空白字符,url存在
      menuList[i].url = menuList[i].url.replace('/^\//', '') // 去掉第一个/ 因为是嵌套路由
      //创建路由配置
      var route = {
        path: menuList[i].url,
        component: null,
        name: menuList[i].name,
        meta: {
          icon: menuList[i].icon
        }
      }

      let path = getIFramePath(menuList[i].url)
      if (path) {
        //todo 如果是嵌套页面,通过iframe展示
        route['path'] = path
      } else {
        try {
          //根据菜单URL动态加载vue组件,这里要求组件须按照url路径存储
          //如url='sys/user',则组件路径应是"@/views/sys/user.vue",否则组件加载不到
          let array = menuList[i].url.split('/')
          let url = ''
          for (let j = 0; j < array.length; j++) {//url首字母转大小写
            url += array[j].substring(0, 1).toUpperCase() + array[j].substring(1) + '/'
          }
          url = url.substring(1, url.length - 1)
          // console.log('views/url',url)
          route['component'] = () => import(`@/views/${url}`)
        } catch (e) {
          console.log(e);
        }
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  } else {
    console.log('动态路由加载...');
    console.log(routes)
    console.log('动态路由加载完成');
  }
  // console.log('routes',routes)
  return routes
}


export default router
