import Vue from 'vue'
import VueRouter from 'vue-router'
//import Login from '../views/auth/Login.vue'
import Dashboard from '../views/content/dashboard/Dashboard.vue'
import Cursos from '../views/content/course/Cursos.vue'
//import Content from '../views/Contenedor.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
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
