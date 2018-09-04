import Vue from 'vue'
import cookie from '@/cookie'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/pages/home'
import admin from '@/pages/admin/admin'
import adminLogin from '@/pages/admin/adminLogin'
import books from '@/pages/admin/books'
import booksDetail from '@/pages/admin/booksDetail'
import bookType from '@/pages/admin/bookType'
import bookTypeDetail from '@/pages/admin/bookTypeDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path:'/admin',
      name:'admin',
      component:admin,
      beforeEnter(to,from,next){  // 跳转管理员后台之前，判断cookie中是否存在 已登录信息
        var adminUserName = cookie.getCookie('adminUserName');
        if(adminUserName){
          next();
        }
        else{
          next({ path:'/adminLogin' });
        }
      },
      children:[
        {
          path:'books',
          name:'books',
          component:books
        },
        {
          path:'booksDetail',
          name:'booksDetail',
          component:booksDetail
        },
        {
          path: 'bookType',
          name: 'bookType',
          component: bookType
        },
        {
          path: 'bookTypeDetail',
          name: 'bookTypeDetail',
          component: bookTypeDetail
        }
      ]
    },
    {
      path:'/adminLogin',
      name:'adminLogin',
      component:adminLogin
    }
  ]
})
