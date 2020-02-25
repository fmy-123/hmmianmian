import Vue from "vue"
import VueRouter from "vue-router"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 

import login from "../views/login/index.vue"
import indes from "../views/index/indes.vue"
import user from '../views/index/user/index.vue'
import business from '../views/index/business/business.vue'
import chart from '../views/index/chart/chart.vue'
import question from '../views/index/question/question.vue'
import subject from '../views/index/subject/subject.vue'
//注册
Vue.use(VueRouter)
const router = new VueRouter({
    routes:[
        {
            path:'/login',
            component:login,
            
        },
        {
            path:'/indes',
            component:indes,
            children:[
                {path:'user',component:user},
                { path:'business',component:business},
                {path:'chart',component:chart},
                {path:'question',component:question},
                {path:'subject',component:subject},
    ]
        },
       
       

    ]
})

router.beforeEach((to, from, next) => {
    NProgress.start();
    if(to.path=='/indes'){
        next('/indes/chart')
    }else{
        next()
    }
   
   
  })
  router.afterEach(()=>{
    NProgress.done();
  })
export default router