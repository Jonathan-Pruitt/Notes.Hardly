import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateView from '../views/CreateView.vue'
import RegView from '../views/auth/RegView.vue'
import LoginView from '../views/auth/LoginView.vue'
import { authStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegView,
      meta : {
        guest: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta : {
        guest: true
      }
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView,
      meta : {
        auth: true
      }
    },
  ],
})

router.beforeEach(async (to, from) => {

  await authStore.getUser()

  if (authStore.user && to.meta.guest) {
    return {name: 'home'}
  }

  if (!authStore.user && to.meta.auth) {
    return {name: 'home'}
  }

})

export default router
