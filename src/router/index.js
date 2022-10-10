import { createRouter, createWebHashHistory } from 'vue-router'
import routes from "./routes";

const router = createRouter({
    // history 模式,hash模式:createWebHashHistory()
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      document.title = to.meta.title
    }
    next()

// 登录校验
    // const token = store.getters.userInfo
    // if(to.matched.some(record => record.meta.requireAuth)){
    //     next()//如果路由中有meta的requireAuth，且为true，就不进行登录验证，否则进行登录验证
    // }else{
    //     if(token){
    //         next()
    //     }else{
    //         if(to.path==="/login"){
    //             next()
    //         }else{
    //             next({path:'/login'})
    //         }
    //     }
    // }
    // return
})
export default router
