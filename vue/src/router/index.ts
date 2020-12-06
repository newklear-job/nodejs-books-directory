import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Index from '@/views/Books/Index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/books'
  },
  {
    path: '/books',
    name: 'BooksList',
    meta: { title: 'books' },
    component: Index
  },
  {
    path: '/books/create',
    name: 'BookCreate',
    meta: { title: 'Create book' },
    // route level code-splitting
    // this generates a separate chunk (create.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "create" */ '@/views/Books/Create.vue')
  },
  {
    path: '/books/:id',
    alias: '/books/:id',
    name: 'BookShow',
    meta: { title: 'Show book' },
    component: () => import('@/views/Books/Show.vue')
  },
  {
    path: '/books/:id/edit',
    name: 'BookEdit',
    meta: { title: 'Edit book' },
    component: () => import('@/views/Books/Edit.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
