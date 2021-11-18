import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import http from '@/utils/request'
import { isURL } from '@/utils/validate'
import Layout from '@/layout'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const loadView = (view) => { // 路由懒加载
  return resolve => require([`@/views/${view}`], resolve)
}

//白名单路由
const whiteList = ['/home', '/auth-redirect']


// 全局路由
const globalRoutes = [
  { path: '/login', component: () => import('@/views/login/index'), name: 'login', hidden: true },
  { path: '/home', component: () => import('@/views/home/index'), name: 'home', hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/profile',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true }
      },
      { path: 'password',
        component: () => import('@/views/profile/password'),
        name: 'password',
        meta: { title: '修改密码', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/', component: Layout, redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '工作平台',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '工作平台', icon: 'dashboard' }
    }]
  }
]
router.addRoutes(globalRoutes)

router.beforeEach((to, from, next) => {
  NProgress.start()
  //document.title = getPageTitle(to.meta.title)
  const accessToken = getToken()
  //判断会话令牌
  if (accessToken) {
    if (to.path === '/home') {
      // 如果登录成功，则跳转到主页
      next({path: '/'})
      NProgress.done()
    } else {
      //是否初始化路由
      if(router.options.isInitRoute|| fnCurrentRouteType(to, globalRoutes) === 'global'){
        next()
      }else{
        store.dispatch('user/getInfo')
        http({
          url: '/admin/user/getUserFunc',
          method: 'get',
          params: { accessToken:accessToken }
        }).then((response) => {
          const res = response.data
          if (res && res.retCode === '0000') {
            const funcRoutes = fnAddDynamicMenuRoutes(res.data)
            for (let i = 0; i < funcRoutes.length; i++) {
              globalRoutes.push(funcRoutes[i])
            }
            router.options.routes=globalRoutes
            router.addRoutes(globalRoutes)
            router.options.isInitRoute = true
            next({ ...to, replace: true })
          } else {
            next()
          }
        })
      }
    }
  }else{
    if (whiteList.indexOf(to.path) !== -1) {
      //白名单路由，则直接跳转
      next()
    } else {
      //跳转到登录和注册页面
      next(`/home?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType(route, globalRoutes = []) {
  var temp = []
  for (var i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return 'global'
    } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
      temp = temp.concat(globalRoutes[i].children)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}
/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes(menuList = []) {
  const funcRoutes = []
  for (let i = 0; i < menuList.length; i++) {
    const funcRoute = fnAddDynamicMenuRoute(menuList[i])
    if (menuList[i].children && menuList[i].children.length >= 1) {
      funcRoute.path = '/' + menuList[i].funcCode
      //支持三级菜单
      if(menuList[i].funcType==='1'){
        funcRoute.component =  loadView(menuList[i].funcUrl)
      }else{
        funcRoute.component = Layout
      }
      funcRoute.children = fnAddDynamicMenuRoutes(menuList[i].children)
      funcRoutes.push(funcRoute)
    } else {
      funcRoutes.push(funcRoute)
    }
  }
  return funcRoutes
}
function fnAddDynamicMenuRoute(func) {
  const route = {
    path: func.funcCode,
    name: func.funcCode,
    component: loadView(func.funcUrl),
    meta: {
      menuId: func.id,
      title: func.funcName,
      icon: 'dashboard'
    }
  }
  return route
}

