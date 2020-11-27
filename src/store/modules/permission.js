import {
  asyncRoutes,
  constantRoutes
} from '@/router'
import {
  QueryUserRole
} from '@/api/user'

import Layout from '@/layout/index'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 数组转换成对象
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, parentId, level) {
  const res = []
  routes.forEach((route, index) => {
    const pageObj = {};
    if (parentId == route.parentId) {
      pageObj.name = route.moduleName;
      pageObj.path = route.path ? route.path : "/";
      pageObj.hidden = false;

      pageObj.meta = {
        "title": route.moduleName,
        "icon": route.icon ? route.icon : "#"
      };
      if (level == 1) {
        pageObj.component = "Layout";
        pageObj.redirect = "noRedirect";

      } else {
        pageObj.component = route.url;
      }
      pageObj.children = filterAsyncRoutes(routes, route.id, level + 1);
      if (pageObj.children.length > 0) {
        pageObj.alwaysShow = true;
      }
      res.push(pageObj)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({
    commit
  }, roles) {
    return new Promise(resolve => {
      // 向后端请求路由数据
      QueryUserRole().then(res => {
        //从数组转换下格式
        let mapObj = filterAsyncRoutes(res.data, -1, 1);
        const accessedRoutes = filterAsyncRouter(mapObj)
        accessedRoutes.push({
          path: '/equipment_list',
          component: Layout,
          hidden: true,
          children: [{
            path: '/equipment_list/set_up',
            name: '设备设置',
            meta: {
              "title": '设备设置',
              "icon": "#"
            },
            component: () => import('@/views/equipment_list/set_up')
          }, {
            path: '/equipment_list/monitor',
            name: '设备监控',
            meta: {
              "title": '设备监控',
              "icon": "#"
            },
            component: () => import('@/views/equipment_list/monitor')
          }, {
            path: '/equipment_add/index',
            name: '添加设备',
            meta: {
              "title": '添加设备',
              "icon": "#"
            },
            component: () => import('@/views/equipment_add/index')
          }, {
            path: '/batch_add/index',
            name: '批量添加设备',
            meta: {
              "title": '批量添加设备',
              "icon": "#"
            },
            component: () => import('@/views/batch_add/index')
          },
          {
            path: '/equipment_list/edit',
            name: '编辑设备',
            meta: {
              "title": '编辑设备',
              "icon": "#"
            },
            component: () => import('@/views/equipment_list/edit')
          },
          {
            path: '/equipment_list/parameter_msg',
            name: '参数详情',
            meta: {
              "title": '参数详情',
              "icon": "#"
            },
            component: () => import('@/views/equipment_list/parameter_msg')
          }
          
          ]
        })
        accessedRoutes.push({
          path: '/add_type',
          component: Layout,
          hidden: true,
          children: [
          {
            path: '/add_type/modify_type',
            name: '编辑分类',
            meta: {
              "title": '编辑分类',
              "icon": "#"
            },
            component: () => import('@/views/add_type/modify_type')
          }, {
            path: '/add_type/parameter',
            name: '查看参数',
            meta: {
              "title": '查看参数',
              "icon": "#"
            },
            component: () => import('@/views/add_type/parameter')
          }, {
            path: '/notice',
            name: '消息',
            meta: {
              "title": '消息',
              "icon": "#"
            },
            component: () => import('@/views/notice/index')
          }
          ]
        })
        accessedRoutes.push({
          path: '*',
          redirect: '/404',
          hidden: true
        })
        // accessedRoutes = accessedRoutes.concat(constantRoutes);
        commit('SET_ROUTES', accessedRoutes)

        resolve(accessedRoutes)
      })
    })
  }
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

export const loadView = (view) => { // 路由懒加载
  return (resolve) => require([`@/views/${view}`], resolve)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
