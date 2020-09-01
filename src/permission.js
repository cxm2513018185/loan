import router from './router/index'
import store from './store'
import { Message } from 'element-ui'

//路由拦截  
// beforeEach函数有三个参数：
// to:router即将进入的路由对象
// from:当前导航即将离开的路由
// next:Function,回调
router.beforeEach(async (to, from, next) => {
    //如果是登录页
    if (to.path == '/login') {
        next() //不处理任何拦截
    } else {
        // 判断用户是否有角色，如果有角色就去获取角色
        const hasRoles = store && store.getters.roles && store.getters.roles.length > 0;
        if (hasRoles) { //判断store是否有角色信息
            next()  //如果有角色，就跳出拦截
        } else {
            try {  //捕获异常
                const { roles } = await store.dispatch('GetInfo');//异步代码同步化 {id:1,name:123,msg:1234}
                let roleNames = roles.map(r => r.name); //得到角色名称
                //通过角色去过滤模块
                // console.log(roleNames)
                const accessRoutes = await store.dispatch('GenerateRoutes', roleNames)  //角色过滤
                router.addRoutes(accessRoutes)  //动态路由
                next({ ...to })
            } catch (error) {
                //token失效
                Message.error('token失效')
                next({ path: '/login' })
            }
        }
    }
})
