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
            path: '/docs',
            name: 'docsList',
            component: () => import('../views/docsList.vue')
        },
        {
            path: '/docs/:docType',
            name: 'docs',
            component: () => import('../views/docs.vue'),
            props: route => ({type: route.params.type})
        },
        {
            path: '/myProject',
            name: 'projectList',
            component: () => import('../views/projectList.vue')
        },
        {
            path: '/myProject/:projectType',
            name: 'myProject',
            component: () => import('../views/myProject.vue'),
            props: route => ({type: route.params.projectType})
        },
        {
            path: '/mySoftware',
            name: 'mySoftware',
            component: () => import('../views/mySoftware.vue')
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
