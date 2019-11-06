/*
 * @Author: johnwang
 * @since: 2019-11-02 00:29:39
 * @lastTime: 2019-11-06 08:42:46
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import Calendar from '../components/Calendar'
import Editor from '../components/Editor'
import Adminuser from '../components/Adminuser'
import Article from '../components/Article'
import Client from '../components/Client'

Vue.use(VueRouter)

const routes = [{
    path: '/home',
    name: 'home',
    component: Home,
    children:[
      {
        path:'/Calendar',
        name:'calendar',
        component:Calendar
      },{
        path:'/Editor',
        name:'editor',
        component:Editor
      },{
        path:'/Adminuser',
        name:'adminuser',
        component:Adminuser
      },{
        path:'/Article',
        name:'article',
        component:Article
      },{
        path:'/Client',
        name:'client',
        component:Client
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router