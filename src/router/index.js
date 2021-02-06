import Vue from 'vue'
import VueRouter from 'vue-router'
import Report from '../views/Report.vue'
import Input from '../views/Input.vue'
import Calendar from '../views/Calendar.vue'
import IncomeEdit from '../views/IncomeEdit.vue'
import ExpenseEdit from '../views/ExpenseEdit.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import List from '../views/List.vue'
import store from '../store/index'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/report',
    name: 'Report',
    component: Report,
    props: true,
     meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/input',
    name: 'Input',
    component: Input,
     meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar,
     meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/edit/income/:id',
    name: 'IncomeEdit',
    component: IncomeEdit,
    props: true,
     meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/edit/expense/:id',
    name: 'ExpenseEdit',
    component: ExpenseEdit,
    props: true,
     meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/list',
    name: 'List',
    component: List,
     meta: {
      requiresAuth: true,
    },
  },
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth) && !store.state.auth
  ) {
    next({
      path: "/report",
      query: {
        redirect: to.fullPath,
      }
    })
  } else {
    next()
  }
})

export default router

