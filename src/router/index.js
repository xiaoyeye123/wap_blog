import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout
    },
    {
      path: '/type',
      name: 'Type',
      component: () => import('@/components/Type')
    },
    {
      path: '/articles',
      name: 'Articles',
      component: () => import('@/components/Articles')
    },
    {
      path: '/article',
      name: 'Article',
      component: () => import('@/components/Article')
    },
    {
      path: '/my',
      name: 'My',
      component: () => import('@/components/My')
    }
  ]
})
