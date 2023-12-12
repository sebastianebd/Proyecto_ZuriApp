import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: {requiresGuest: true}
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue'),
      meta: {requiresGuest: true}
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/auth/UserView.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/crear',
      name: 'crear',
      component: () => import('../views/auth/CrearView.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/reemplazos',
      name: 'reemplazos',
      component: () => import('../views/auth/ReemplazosView.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/revertir',
      name: 'revertir',
      component: () => import('../views/auth/RevertirView.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/crear_usuario',
      name: 'crear_usuario',
      component: () => import('../views/auth/CrearUsuario.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/modificar_usuario',
      name: 'modificar_usuario',
      component: () => import('../views/auth/ModificarUsuario.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/eliminar_usuario',
      name: 'eliminar_usuario',
      component: () => import('../views/auth/EliminarUsuario.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/ver_usuarios',
      name: 'ver_usuarios',
      component: () => import('../views/auth/VerUsuarios.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/ver_historial',
      name: 'ver_historial',
      component: () => import('../views/auth/VerHistorial.vue'),
      meta: {requiresAuth: true}
    }
  ]
})

router.beforeResolve(async (to, from, next) => {
  const authStore = useAuthStore()

  if (to.name !== 'login' && !authStore.isAuthenticated) {
    // Si la ruta a la que se intenta acceder no es la de inicio de sesión y el usuario no está autenticado
    return next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    // Si está autenticado o la ruta es la de inicio de sesión, permite el acceso
    return next()
  }
})

export default router
