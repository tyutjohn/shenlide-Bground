/*
 * @Author: johnwang
 * @since: 2019-11-02 00:29:39
 * @lastTime: 2019-11-09 09:46:28
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import Editor from '../components/Editor'
import Adminuser from '../components/Adminuser'
import Article from '../components/Article'
import Client from '../components/Client'
import Error404 from '../views/Error404'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [{
    path: '/home',
    name: 'home',
    component: Home,
    meta:{
      auth:true
    },
    children:[
      {
        path:'/Editor',
        name:'editor',
        component:Editor,
        meta:{
          auth:true
        }
      },{
        path:'/Adminuser',
        name:'adminuser',
        component:Adminuser,
        meta:{
          auth:true
        }
      },{
        path:'/Article',
        name:'article',
        component:Article,
        meta:{
          auth:true
        }
      },{
        path:'/Client',
        name:'client',
        component:Client,
        meta:{
          auth:true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path:'/Error404',
    name:'Error404',
    component:Error404
  },{
    path:"*", //置于最底部
    redirect:'/Error404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/**
 * 页面刷新，判断之前是否登陆
 */
if(window.sessionStorage.getItem('isLogin')){
  store.dispatch('setAdmin',window.sessionStorage.getItem('userName'))
}

/**
 * 路由拦截器
 */
router.beforeEach((to,from,next)=>{
  if(to.meta.auth){
    if(window.sessionStorage.getItem('userToken')){
      if(window.sessionStorage.getItem('userName')==store.getters.getUsername){
        next();
      }else{
        next({
          path:'/login'
        })
      }
    }else{
      next({
        path:'/login'
      })
    }
  }else{
    next()
  }
})

export default router