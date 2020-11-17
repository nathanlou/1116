import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * 注意: 子菜单只在路由子菜单时长度> = 1的时候出现
 * 参考网址: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，项目将不会显示在侧栏中(默认为false)
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果不设置alwaysShow, 当项目有多个子路由时，它将成为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置noRedirect，则不会在面包屑中重定向
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    控制页面角色(可以设置多个角色)'admin','editor'
    title: 'title'               名称显示在侧边栏和面包屑(推荐集)
    icon: 'svg-name'             图标显示在侧栏中
    breadcrumb: false            如果设置为false，则该项将隐藏在breadcrumb中(默认为true)
    activeMenu: '/example/list'  如果设置路径，侧栏将突出显示您设置的路径
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 *	没有权限要求的基本页
 * 所有角色都可以访问
 * 不需要动态判断权限的路由
 */
export const constantRoutes = [
	{
		path: '/redirect',
		component: Layout,
		hidden: true,
		children: [{
			path: '/redirect/:path(.*)',
			component: () => import('@/views/redirect/index')
		}]
	},
	{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		path: '/auth-redirect',
		component: () => import('@/views/login/auth-redirect'),
		hidden: true
	},
	{
		path: '/404',
		component: () => import('@/views/error-page/404'),
		hidden: true
	},
	{
		path: '/401',
		component: () => import('@/views/error-page/401'),
		hidden: true
	},
	{
		path: '/',
		component: Layout,
		redirect: '/dashboard',
		children: [{
			path: 'dashboard',
			component: () => import('@/views/dashboard/index'),
			name: 'Dashboard',
			meta: {
				title: 'dashboard',
				icon: 'dashboard',
				affix: true
			}
		}]
	},
	{
		path: '/profile',
		component: Layout,
		redirect: '/profile/index',
		hidden: true,
		children: [{
			path: 'index',
			component: () => import('@/views/profile/index'),
			name: 'Profile',
			meta: {
				title: 'profile',
				icon: 'user',
				noCache: true
			}
		}]
	},
	{
		path: '/equipment_add',
		component: Layout,
		redirect: '/equipment_add/index',
		hidden: true,
		children: [{
			path: 'index',
			component: () => import('@/views/equipment_add/index'),
			name: '添加设备',
			meta: {
				title: '添加设备',
				icon: 'user',
				noCache: true
			}
		}]
	},
	{
		path: '/batch_add',
		component: Layout,
		redirect: '/batch_add/index',
		hidden: true,
		children: [{
			path: 'index',
			component: () => import('@/views/batch_add/index'),
			name: '批量添加',
			meta: {
				title: '批量添加',
				icon: 'user',
				noCache: true
			}
		}]
	},
	 {
	   path: '/addAccountInfo',
	   component: Layout,
	   redirect: '/enterprisemanage/addAccountInfo',
	   hidden: true,
	   children: [{
	    path: 'index',
	    component: () => import('@/views/enterprisemanage/addAccountInfo'),
	    name: '添加企业用户',
	    meta: {
	     title: '添加企业用户',
	     icon: 'user',
	     noCache: true
	    }
	   }]
	  },
	  {
	    path: '/notice',
	    component: Layout,
	    redirect: '/notice/index',
	    hidden: true,
	    children: [{
	     path: 'index',
	     component: () => import('@/views/notice/index'),
	     name: '通知信息',
	     meta: {
	      title: '通知信息',
	      icon: 'user',
	      noCache: true
	     }
	    }]
	   },
	   {
	     path: '/QR_code',
	     component: Layout,
	     redirect: '/QR_code/index',
	     hidden: true,
	     children: [{
	      path: 'index',
	      component: () => import('@/views/QR_code/index'),
	      name: '二维码信息',
	      meta: {
	       title: '二维码信息',
	       icon: 'user',
	       noCache: true
	      }
	     }]
	    },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
	{
		path: '/permission',
		component: Layout,
		redirect: '/permission/page',
		hidden: true,
		alwaysShow: true, // will always show the root menu
		name: 'Permission',
		meta: {
			title: 'permission',
			icon: 'lock',
			roles: ['admin', 'editor'] // you can set roles in root nav
		},
		children: [{
				path: 'page',
				component: () => import('@/views/permission/page'),
				name: 'PagePermission',
				meta: {
					title: 'pagePermission',
					roles: ['admin'] // or you can only set roles in sub nav
				}
			},
			{
				path: 'directive',
				component: () => import('@/views/permission/directive'),
				name: 'DirectivePermission',
				meta: {
					title: 'directivePermission'
					// if do not set roles, means: this page does not require permission
				}
			},
			{
				path: 'role',
				component: () => import('@/views/permission/role'),
				name: 'RolePermission',
				meta: {
					title: 'rolePermission',
					roles: ['admin']
				}
			}
		]
	},

	{
		path: '/icon',
		component: Layout,
		hidden: true,
		children: [{
			path: 'index',
			component: () => import('@/views/icons/index'),
			name: 'Icons',
			meta: {
				title: 'icons',
				icon: 'icon',
				noCache: true
			}
		}]
	},
	{
		path: '/example',
		component: Layout,
		redirect: '/example/list',
		name: 'Example',
		hidden: true,
		meta: {
			title: 'example',
			icon: 'el-icon-s-help'
		},
		children: [{
				path: 'create',
				component: () => import('@/views/example/create'),
				name: 'CreateArticle',
				meta: {
					title: 'createArticle',
					icon: 'edit'
				}
			},
			{
				path: 'edit/:id(\\d+)',
				component: () => import('@/views/example/edit'),
				name: 'EditArticle',
				meta: {
					title: 'editArticle',
					noCache: true,
					activeMenu: '/example/list'
				},
				hidden: true
			},
			{
				path: 'list',
				component: () => import('@/views/example/list'),
				name: 'ArticleList',
				meta: {
					title: 'articleList',
					icon: 'list'
				}
			}
		]
	},

	{
		path: '/nested',
		component: Layout,
		name: '领先',
		hidden: true,
		meta: {
			title: '山东领先',
			icon: 'el-icon-s-help',
			roles: ['admin']
		},
		children: [{
				path: 'menu1-1',
				component: () => import('@/views/dashboard/index'),
				name: '用户1',
				meta: {
					title: '用户1',
					icon: 'theme'
				}
			},
			{
				path: 'menu1-2',
				component: () => import('@/views/dashboard/index'),
				name: '用户2',
				meta: {
					title: '用户1-2',
					icon: 'theme'
				},
				children: [{
						path: 'menu1-2-1',
						component: () => import('@/views/dashboard/index'),
						name: '用户1-2-1',
						meta: {
							title: '用户1-2-1',
							icon: 'theme'
						}
					},
					{
						path: 'menu1-2-2',
						component: () => import('@/views/dashboard/index'),
						name: '用户1-2-2',
						meta: {
							title: '用户1-2-2',
							icon: 'theme'
						}
					}
				]
			}
		]
	},
	{
		path: '/equipment',
		component: Layout,
		name: '设备管理',
		meta: {
			title: '设备管理',
			icon: 'list'
		},
		children: [{
				path: 'equipment_list',
				component: () => import('@/views/equipment_list/index'),
				name: '设备列表',
				meta: {
					title: '设备列表',
					icon: 'list'
				}
			},
			{
				path: 'transfer',
				component: () => import('@/views/transfer/index'),
				name: '迁移记录',
				meta: {
					title: '迁移记录',
					icon: 'clipboard'
				}
			},
			{
				path: 'operation',
				component: () => import('@/views/operation/index'),
				name: '操作日志',
				meta: {
					title: '操作日志',
					icon: 'clipboard'
				}
			},
			{
				path: 'warning',
				component: () => import('@/views/warning/index'),
				name: '报警记录',
				meta: {
					title: '报警记录',
					icon: 'clipboard'
				}
			},
			{
				path: 'monitor',
				component: () => import('@/views/equipment_list/monitor'),
				name: '设备监控',
				meta: {
					title: '设备监控',
					icon: 'clipboard'
				},
				hidden: true
			},
			{
				path: 'set_up',
				component: () => import('@/views/equipment_list/set_up'),
				name: '设备设置',
				meta: {
					title: '设备设置',
					icon: 'clipboard'
				},
				hidden: true
			},
			{
				path: 'edit',
				component: () => import('@/views/equipment_list/edit'),
				name: '编辑设备',
				meta: {
					title: '编辑设备',
					icon: 'clipboard'
				},
				hidden: true
			},
			{
				path: 'parameter_msg',
				component: () => import('@/views/equipment_list/parameter_msg'),
				name: '参数设置',
				meta: {
					title: '参数设置',
					icon: 'clipboard'
				},
				hidden: true
			}
		]
	},
	{
	  path: '/statistics',
	  component: Layout,
	  name: '统计查询',
	  meta: {
	    title: '统计查询',
	    icon: 'list'
	  },
	  children: [
		  {
	    path: 'statistics',
	    component: () => import('@/views/statistics/index'),
	    name: '设备分布',
	    meta: {
	      title: '设备分布',
	      icon: 'international'
	    }
	  },
	  {
	    path: 'data_statistics',
	    component: () => import('@/views/statistics/data_statistics'),
	    name: '数据统计',
	    meta: {
	      title: '数据统计',
	      icon: 'chart'
	    }
	  }
	  ]
	},
	{
		path: '/enterprisemanage',
		component: Layout,
		name: '企业管理',
		meta: {
			title: '企业管理',
			icon: 'tree-table',
		},
		children: [{
				path: 'enterprisemanage',
				component: () => import('@/views/enterprisemanage/enterprise_card'),
				name: '企业管理',
				meta: {
					title: '企业管理',
					icon: 'component'
				},
			},
			{
				path: 'enterpriseuser',
				component: () => import('@/views/enterprisemanage/enterpriseuser'),
				name: '企业用户',
				meta: {
					title: '企业用户',
					icon: 'peoples'
				}
			},
			{
				path: 'equipmentupdatemange',
				component: () => import('@/views/enterprisemanage/equipmentupdatemange'),
				name: '设备升级管理',
				meta: {
					title: '设备升级管理',
					icon: 'el-icon-loading'
				}
			},
			{
				path: 'informationmembermange',
				component: () => import('@/views/enterprisemanage/informationmembermange'),
				name: '信息员管理',
				meta: {
					title: '信息员管理',
					icon: 'people'
				}
			},
			{
				path: 'LogoSetting',
				component: () => import('@/views/enterprisemanage/LogoSetting'),
				name: 'Logo设置',
				meta: {
					title: 'Logo设置',
					icon: 'guide'
				}
			},
			{
				path: 'sendMessage',
				component: () => import('@/views/enterprisemanage/sendMessage'),
				name: '发送通告',
				meta: {
					title: '发送通告',
					icon: 'edit'
				}
			},
			{
				path: 'router',
				component: () => import('@/views/enterprisemanage/router'),
				name: '平台角色',
				meta: {
					title: '平台角色',
					icon: 'tree'
				}
			},

		],

	},
	
	{
		path: '/system',
		component: Layout,
		name: '系统管理',
		meta: {
			title: '系统管理',
			icon: 'list',
			roles: ['admin']

		},
		children: [{
				path: 'system_user',
				component: () => import('@/views/system_user/index'),
				name: '用户管理',
				meta: {
					title: '用户管理',
					icon: 'user'
				}
			},
			{
				path: 'system_configure',
				component: () => import('@/views/system_configure/index'),
				name: '系统配置',
				meta: {
					title: '系统配置',
					icon: 'user'
				}
			},
			{
				path: 'system_log',
				component: () => import('@/views/system_log/index'),
				name: '系统日志',
				meta: {
					title: '系统日志',
					icon: 'user'
				}
			},
			{
				path: 'add_type',
				component: () => import('@/views/add_type/index'),
				name: '添加设备种类',
				meta: {
					title: '添加设备种类',
					icon: 'user'
				}
			}
		]
	},
	{
		path: '/service',
		component: Layout,
		name: '服务管理',
		meta: {
			title: '服务管理',
			icon: 'list'
		},
		children: [{
				path: 'sim_list',
				component: () => import('@/views/sim_list/index'),
				name: 'SIM管理',
				meta: {
					title: 'SIM管理',
					icon: 'list'
				}
			},
			{
				path: 'sim_msg',
				component: () => import('@/views/sim_msg/index'),
				name: 'SIM详情',
				meta: {
					title: 'SIM详情',
					icon: 'theme'
				},
				hidden: true
			}
		]
	},
	// 404 page must be placed at the end !!!
	{
		path: '*',
		redirect: '/404',
		hidden: true
	}
]

const createRouter = () => new Router({
	// mode: 'history', // require service support
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}

export default router
