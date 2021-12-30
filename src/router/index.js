import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/auth/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import AttributeVenta from '../components/auth/AttributeVenta.vue'
import AttributeUser from '../components/auth/AttributeUser.vue'
import AttributeCourse from '../components/auth/AttributeCourse.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/signin',
    name: 'Sign In',
    component: Login
  },
  {
    path: '/attribute',
    name: 'attribute',
    component: AttributeVenta
  },
  {
    path: '/attribute-user/:id',
    name: 'attribute-user',
    component: AttributeUser
  },
  {
    path: '/attribute-course',
    name: 'attribute-course',
    component: AttributeCourse
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
