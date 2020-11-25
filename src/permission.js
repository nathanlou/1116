import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie

import getPageTitle from '@/utils/get-page-title'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  if (getToken()) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({
        path: '/'
      })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('user/GetInfo').then(res => {
          const roles = res.roles
          store.dispatch('permission/generateRoutes', {
            roles
          }).then(accessRoutes => {
            // 根据roles权限生成可访问的路由表
            router.addRoutes(accessRoutes) // 动态添加可访问路由表
            next({...to,replace:true}) // hack方法 确保addRoutes已完成
          })
        }).catch((err) => {
          store.dispatch('user/logout').then(() => {
            Message.error(err || '登录失效请重新登录')
            next({
              path: '/'
            })
          })
        })
      } else {
        next()
        // if (hasPermission(store.getters.roles, to.meta.roles)) {

        // } else {
        //   next({ path: '/401', replace: true, query: { noGoBack: true }})
        // }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
