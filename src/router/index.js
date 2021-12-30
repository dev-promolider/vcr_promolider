import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import AttributeVenta from '../components/auth/AttributeVenta.vue'
import AttributeUser from '../components/auth/AttributeUser.vue'
import AttributeCourse from '../components/auth/AttributeCourse.vue'
import Cursos from '../views/content/course/Cursos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
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
  },
  {
    path: '/cursos',
    name: 'Cursos',
    component: Cursos
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
