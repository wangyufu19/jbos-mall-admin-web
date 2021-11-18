import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  isInitRoute: false, // 是否初始化路由
  routes: []
})


export function resetRouter() {
  const newRouter = router
  router.matcher = newRouter.matcher // reset router
}

export default router
