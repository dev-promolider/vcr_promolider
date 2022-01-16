import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/content/dashboard/Dashboard.vue'
import AttributeVenta from '../components/AttributeVenta/AttributeVenta.vue'
import AttributeUser from '../components/AttributeUser/AttributeUser.vue'
import AttributeCourse from '../components/AttributeCourse/AttributeCourse.vue'
import Cursos from '../views/content/course/Cursos.vue'
import Messages from '../views/content/message/Messages.vue'
import PreferencesCateg from '../views/content/preferences/PreferenceCateg.vue'
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
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Messages
  },
  {
    path: '/preferences',
    name: 'Preferences',
    component: PreferencesCateg
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
