import {
  createRouter,
  createWebHistory
} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/indexView.vue')
    },
    {
      path: '/docs/:docType',
      name: 'docs',
      component: () => import('../views/docs.vue'),
      props: route => ({ type: route.params.type })
    },
    {
      path: '/myProject',
      name: 'myProject',
      component: () => import('../views/myProject.vue'),
      props: true,
    },
  ]
})

export default router
