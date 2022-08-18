import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/content/contenedor/Contenedor.vue'
import Home from '../views/content/dashboard/Dashboard.vue'
import AttributeVenta from '../components/AttributeVenta/AttributeVenta.vue'
import AttributeUser from '../components/AttributeUser/AttributeUser.vue'
import AttributeCourse from '../components/AttributeCourse/AttributeCourse.vue'

import Courses from '../views/content/courses/Courses.vue'
import Suscription from '../views/content/suscriptions/Suscriptions.vue'
import ProductorCourses from '../views/content/productorCourses/ProductorCourses.vue'

import Messages from '../views/content/message/Messages.vue'
import CursoUser from '../views/content/course/Course.vue'
// import PreferencesCateg from '../views/content/preferences/PreferenceCateg.vue'
import Login from '../views/auth/Login.vue'
import Perfil from '../views/content/perfil/Perfil.vue'
import buycursos from '../components/courses/buy-cursos.vue'

// import Suscription from '../components/suscription/suscription.vue'
import Certificado from '../components/Certificado/certificado.vue'
import detalleCertificado from '../components/Certificado/detalleCertificado.vue'
import pruebasCourse from '../components/course/descripcion/pruebas/pruebasCourse.vue'
import DinamicClass from '../components/course/descripcion/dinamics/view/DinamicClass.vue'
import logrosUser from '../components/LogrosUser/Logros.vue'
import preguntasFrecuentes from '../components/preguntasFrecuentes'
import leaderBoard from '../components/LeaderBoardUser/LeaderBoard.vue'
import optionPreference from '../views/content/optionpreferences/OptionPreferences.vue'
import Buy from '../views/content/buy/buy.vue'
import BuyCertificate from '../views/content/buy/buyCertificate.vue'
import Search from '../views/content/search/Search.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/', name: 'Dashboard', component: Dashboard,
    meta: { autenticado: true },
    children: [

      { path: '/home', component: Home, name: 'home' },
      { path: '/', component: Home, name: 'home' },
      { path: '/courses', component: Courses, name: 'courses' },
      { path: '/course-user', component: CursoUser, name: 'curso',  props: true},
      { path: '/test/:id', component: pruebasCourse, name: 'test' },
      { path: '/course-user/dinamic/:id', component: DinamicClass, name: 'dinamic' },
      { path: '/messages', component: Messages, name: 'messages' },
      { path: '/attribute-user/:id', name: 'attribute-user', component: AttributeUser },
      { path: '/attribute-course', name: 'attribute-course', component: AttributeCourse },
      { path: '/perfil', name: 'perfil', component: Perfil },
      { path: '/option-preferences', name: 'option-preferences', component: optionPreference },
      { path: '/buy-cursos/:ide', name: 'buy-cursos', component: buycursos, props: true },
      { path: '/suscription-user',component: Suscription , name: 'suscription-user' },
      { path: '/certificado-user', name: 'certificado-user', component: Certificado },
      { path: '/detalle-certificado', name: 'detalle-certificado', component: detalleCertificado },
      { path: '/logros', name: 'logros', component: logrosUser },
      { path: '/preguntas-frecuentes', name: 'preguntas-frecuentes', component: preguntasFrecuentes },
      { path: '/leaderBoard', name: 'leaderBoard', component: leaderBoard },
      { path: '/buy/:ide', name: 'buy', component: Buy },
      { path: '/buyCertificate', name: 'buyCertificate', component: BuyCertificate , props: true},
      { path: '/course/search/', name: 'search', component: Search },
      { path: '/my-courses/', name: 'myCourses', component: ProductorCourses },
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
  // let status = localStorage.getItem('status_user')
  if (autenticado && !token) {
    next('login');
  }
  //  if ((!autenticado && token) && status == 0 ) {
  //   next('/preferences');
  else if ((!autenticado && token)) {
    next('/home');

  }
  else {

    next()
  }
})
export default router
