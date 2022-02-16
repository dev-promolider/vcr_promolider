import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/content/contenedor/Contenedor.vue'
import Home from '../views/content/dashboard/Dashboard.vue'
import AttributeVenta from '../components/AttributeVenta/AttributeVenta.vue'
import AttributeUser from '../components/AttributeUser/AttributeUser.vue'
import AttributeCourse from '../components/AttributeCourse/AttributeCourse.vue'
import Cursos from '../views/content/courses/Courses.vue'
import Messages from '../views/content/message/Messages.vue'
import CursoUser from '../views/content/course/Course.vue'
// import PreferencesCateg from '../views/content/preferences/PreferenceCateg.vue'
import Login from '../views/auth/Login.vue'
import Perfil from'../views/content/perfil/Perfil.vue'
import buycursos from '../components/courses/buy-cursos.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/', name: 'Dashboard', component: Dashboard,
     meta: { autenticado: true },
    children: [
      
      { path: '/home', component: Home, name: 'home' },
      { path: '/', component: Home, name: 'home' },
      { path: '/courses', component: Cursos, name: 'cursos' },
      { path: '/course-user', component: CursoUser, name: 'curso' },
      { path: '/messages', component: Messages, name: 'Messages' },
      { path: '/attribute-user/:id', name: 'attribute-user', component: AttributeUser },
      { path: '/attribute-course', name: 'attribute-course', component: AttributeCourse },
      { path: '/perfil', name: 'perfil', component: Perfil },
      { path: '/buy-cursos/:ide', name: 'buy-cursos', component: buycursos },
      
      
    ]
  },
  { path: '/login', name: 'Login', component: Login },
  { path: '/attribute', name: 'attribute', component: AttributeVenta },
  // { path: '/preferences', name: 'Preferences', component: PreferencesCateg, meta: { autenticado: true } },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('access_token');
  let autenticado = to.matched.some(record => record.meta.autenticado);
  let status = localStorage.getItem('status_user')
  if (autenticado && !token) {
    next('login');
  }
   if ((!autenticado && token) && status == 0 ) {
    next('preferences');
  } else if ((!autenticado && token) && status == 1) {
    next('home');
  } else {
    next()
  }
})
export default router
