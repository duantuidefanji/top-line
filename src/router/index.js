import Vue from 'vue'
import Router from 'vue-router'
import Tabbar from '@/views/tabbar'
import Home from '@/views/home'
import Video from '@/views/home/video'
import Search from '@/views/home/search'
import User from '@/views/home/user'
Vue.use(Router)

export default new Router({
  routes: [
    {
      // name: 'tabbar',
      path: '/',
      component: Tabbar,
      children: [
        { name: 'home',
          path: '',
          component: Home },
        { name: 'Search',
          path: '/search',
          component: Search },
        { name: 'video',
          path: '/video',
          component: Video },
        { name: 'user',
          path: '/user',
          component: User }
      ]
    },
    { name: 'login',
      path: '/login',
      component: () => import('../views/login.vue') },
    // 用户信息编辑
    { name: 'user-edit',
      path: '/user-edit',
      component: () => import('../views/home/userInfoEdit/') },
    // 粉丝列表
    { name: 'fanslist',
      path: '/fans',
      component: () => import('../views/home/fansList') },
    // 文章详情
    { name: 'detail',
      path: '/detail/:id',
      props: true, // 传递动态路由参数
      component: () => import('../views/detail') },
    // 搜索结果详情
    { name: 'SearchResult',
      path: '/search-result/:q',
      props: true, // 传递动态路由参数
      component: () => import('../views/home/searchResult') }
  ]
})
