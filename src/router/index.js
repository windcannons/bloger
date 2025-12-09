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
    //{
    //  path: '/',
    //  name: 'job',
    //  component: () => import('../views/job.vue'),
    //  props: true,
    //},
    {
      path: '/resume',
      name: 'resume',
      component: () => import('../views/Resume.vue'),
      props: true,
    },
  ]
})

export default router
