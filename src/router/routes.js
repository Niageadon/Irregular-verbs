
const routes = [
    { path: '/Authentication', component: () => import('pages/system/authentication.vue') },
    { path: '/', component: () => import('pages/learningPage.vue') }

]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        component: () => import('pages/system/Error404.vue')
    })
}

export default routes
