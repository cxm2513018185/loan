// import Vue from 'vue'
// import Router from 'vue-router'
// import Layout from '@/layout/index'   //布局

// Vue.use(Router)
// import permissionRouter from './modules/permission'

// export const constantRoutes = [   //常规配置
//   {
//     path: '/',
//     redirect: '/home'
//   },
//   {
//     path: '/login',
//     component: () => import('@/views/login/index')
//   },
//   {
//     path: '/home',
//     redirect: '/index',
//     component: Layout,
//     children: [
//       /* 首页 */
//       {
//         path: '/index',
//         component: () => import('@/views/home/index'),
//         meta: {
//           icon: 'el-icon-s-home',
//           title: '首页'
//         }
//       },
//     ]
//   },
// ]

// export const asyncRoutes = [   //异步路由
//   /* 贷款申请 */
//   {
//     path: '/loan-input',
//     redirect: '/loan-input/index',
//     component: Layout,
//     meta: {
//       roles: ['input']   //角色销售人员
//     },
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/loan-input/index'),
//         // name: '贷款申请',
//         meta: {
//           icon: 'el-icon-s-finance',
//           title: '贷款申请'
//         }
//       }
//     ]
//   },
//   /* 申请管理 */
//   {
//     path: '/input-manager',
//     redirect: '/input-manager/index',
//     component: Layout,
//     meta: {
//       roles: ['input']   //角色销售人员
//     },
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/input-manager/index'),
//         // name: '申请管理',
//         meta: {
//           icon: 'el-icon-s-management',
//           title: '申请管理'
//         }
//       }
//     ]
//   },
//   /* 贷款审批 */
//   {
//     path: '/loan-approve',
//     component: Layout,
//     redirect: '/loan-approve/first',
//     // name: '贷款审批',
//     meta: {
//       icon: 'el-icon-document-checked',
//       title: '贷款审批',
//       roles: ['approve']  //角色审核人员
//     },
//     children: [
//       /* 初审 */
//       {
//         path: 'first',
//         component: () => import('@/views/loan-approve/first'),
//         // name: '初审',
//         meta: {
//           icon: 'el-icon-view',
//           title: '初审'
//         }
//       },
//       /* 终审 */
//       {
//         path: 'end',
//         component: () => import('@/views/loan-approve/end'),
//         // name: '终审',
//         meta: {
//           icon: 'el-icon-circle-check',
//           title: '终审',
//         }
//       }
//     ]
//   },
//   /* 标的管理 */
//   {
//     path: '/contract',
//     component: Layout,
//     redirect: '/contract/index',
//     // meta: {
//     //   title: '标的管理'
//     // },
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/contract/index'),
//         // name: '标的管理',
//         meta: {
//           icon: 'el-icon-document',
//           title: '标的管理'
//         }
//       }
//     ]
//   },
//   permissionRouter,
//   { path: '*', redirect: '/login' }
// ]

// export default new Router({
//   routes: constantRoutes
// })
import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index'   //布局

Vue.use(Router)
import permissionRouter from './modules/permission'

export const constantRoutes = [   //常规配置
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/home/index'),
        name: '首页',
        meta: {
          icon: 'el-icon-s-home',
          title: '首页'
        }
      }
    ]
  },
]

export const asyncRoutes = [   //异步路由
  {
    path: '/loan-input',   //loan-input  贷款申请 
    component: Layout,
    redirect: '/loan-input/index',
    meta: {
      roles: ['input']   //角色销售人员
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/loan-input/index'),
        name: '贷款申请',
        meta: {
          icon: 'el-icon-s-finance',
          title: '贷款申请'
        }
      }
    ]
  },
  {
    path: '/input-manager',  //input-manager申请管理
    redirect: '/input-manager/index',
    component: Layout,
    meta: {
      roles: ['input']   //角色销售人员
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/input-manager/index'),
        name: '申请管理',
        meta: {
          icon: 'el-icon-s-management',
          title: '申请管理'
        }
      }
    ]
  },

  {
    path: '/loan-approve',  //loan-approve 贷款审批
    component: Layout,
    redirect: '/loan-approve/first',
    name: '贷款审批',
    meta: {
      icon: 'el-icon-document-checked',
      title: '贷款审批',
      roles: ['approve']  //角色审核人员
    },
    children: [
      {
        path: 'first',  //first 初审
        component: () => import('@/views/loan-approve/first'),
        name: '初审',
        meta: {
          icon: 'el-icon-view',
          title: '初审'
        }
      },
      {
        path: 'end',  //end  终审
        component: () => import('@/views/loan-approve/end'),
        name: '终审',
        meta: {
          icon: 'el-icon-circle-check',
          title: '终审',
        }
      }
    ]
  },

  {
    path: '/contract',  //contract 标的管理
    component: Layout,
    redirect: '/contract/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/contract/index'),
        name: '标的管理',
        meta: {
          icon: 'el-icon-document',
          title: '标的管理'
        }
      }
    ]
  },
  permissionRouter,
  { path: '*', redirect: '/login' }
]

export default new Router({
  routes: constantRoutes
})