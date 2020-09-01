/* 权限管理 */
import Layout from '@/layout/index'
const permissionRouter = {
    path: '/permission',
    component: Layout,
    meta: {
        icon: 'el-icon-setting',
        title: '权限管理'
    },
    children: [
        /* 创建管理员 */
        {
            path: 'create',
            component: () => import('@/views/permission/create'),
            meta: {
                icon: 'el-icon-circle-plus',
                title: '创建管理员'
            }
        },
        /* 列表展示 */
        {
            path: 'list',
            component: () => import('@/views/permission/list'),
            meta: {
                icon: 'el-icon-user',
                title: '列表展示'
            }
        }
    ]
}
export default permissionRouter