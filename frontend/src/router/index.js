import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requireAuth: false
    }

  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/newparty',
    name: 'NewParty',
    component: () => import(/* webpackChunkName: "newparty" */ '../views/NewParty.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/editparty/:id',
    name: 'EditParty',
    component: () => import(/* webpackChunkName: "editparty" */ '../views/EditParty.vue'),
    meta: {
      requireAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  if(to.matched.some(record => record.meta.requireAuth)){

    /*
      caso ele estiver em uma rota que precisa de autenticação 
      (    
        meta: {
          requireAuth: true
        }
      )
      ele é redirecionado para o login 
    
    */ 

    if(store.getters.authenticated === false){

      next({

        path: '/login', // redirecionamento par a página login
        params: {nextUrl: to.fullPath} // parametros do vue

      })

    } else {

      next()

    }

  } else {

    next()

  }

})

export default router
