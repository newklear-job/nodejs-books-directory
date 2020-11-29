import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Index from '@/views/Books/Index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    alias: '/books',
    name: 'BooksList',
    component: Index
  },
  {
    path: '/create',
    name: 'BookCreate',
    // route level code-splitting
    // this generates a separate chunk (create.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "create" */ '@/views/Books/Create.vue')
  },
  {
    path: '/:id',
    alias: '/books/:id',
    name: 'BookShow',
    component: () => import('@/views/Books/Create.vue')
  },
  {
    path: '/:id/edit',
    name: 'BookEdit',
    component: () => import('@/views/Books/Edit.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
