import { createRouter, createWebHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// This will update routes at runtime without reloading the page
if (import.meta.hot) {
  handleHotUpdate(router)
}

router.beforeEach((to) => {
  if (to.path === '/') {
    return '/auth/login'
  }
  if (to.path.startsWith('/auth') && localStorage.getItem('token')) {
    return '/admin/booking'
  }
  if (to.path.startsWith('/admin') && !localStorage.getItem('token')) {
    return '/auth/login'
  }
})

export default router
