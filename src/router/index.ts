// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'AppForm',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/AppForm.vue'),
      },
      {
        path: '/recipes',
        name: 'ResultRecipe',
        component: () => import('@/views/AppFormResults.vue')
      },
      {
        path: '/recipe/:id',
        name: 'CardRecipe',
        component: () => import('@/components/CardRecipe.vue')
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
