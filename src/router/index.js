import Vue from 'vue'
import VueRouter from 'vue-router'

const Dashboard = () => import('../views/content/contenedor/Contenedor.vue')
const Home = () => import('../views/content/dashboard/Dashboard.vue')
const AttributeVenta = () => import('../components/AttributeVenta/AttributeVenta.vue')
const AttributeUser = () => import('../components/AttributeUser/AttributeUser.vue')
const AttributeCourse = () => import('../components/AttributeCourse/AttributeCourse.vue')

const Courses = () => import('../views/content/courses/Courses.vue')
const Suscription = () => import('../views/content/suscriptions/Suscriptions.vue')
const ProductorCourses = () => import('../views/content/productorCourses/ProductorCourses.vue')
const Messages = () => import('../views/content/message/Messages.vue')
const CursoUser = () => import('../views/content/course/Course.vue')
const Login = () => import('../views/auth/Login.vue')
const Perfil = () => import('../views/content/perfil/Perfil.vue')
const buycursos = () => import('../components/courses/buy-cursos.vue')
const Certificado = () => import('../components/Certificado/certificado.vue')
const detalleCertificado = () => import('../components/Certificado/detalleCertificado.vue')
const pruebasCourse = () => import('../components/course/descripcion/pruebas/pruebasCourse.vue')
const DinamicClass = () => import('../components/course/descripcion/dinamics/view/DinamicClass.vue')
const logrosUser = () => import('../components/LogrosUser/Logros.vue')
const examenes = () => import('../components/examenes/examenes.vue')

const preguntasFrecuentes = () => import('../components/preguntasFrecuentes')
const leaderBoard = () => import('../components/LeaderBoardUser/LeaderBoard.vue')
const optionPreference = () => import('../views/content/optionpreferences/OptionPreferences.vue')
const Buy = () => import('../views/content/buy/buy.vue')
const BuyCertificate = () => import('../views/content/buy/buyCertificate.vue')
const Search = () => import('../views/content/search/Search.vue')
const PasswordRecovery = () => import('../views/content/passwordRecovery/index.vue')

// import PreferencesCateg from '../views/content/preferences/PreferenceCateg.vue'
// import Suscription from '../components/suscription/suscription.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/', name: 'Dashboard', component: Dashboard,
    meta: { autenticado: true },
    children: [

      { path: '/home', component: Home, name: 'home' },
      { path: '/', component: Home, name: 'home' },
      { path: '/courses', component: Courses, name: 'courses' },
      { path: '/course-user', component: CursoUser, name: 'curso', props: true },
      { path: '/test/:id', component: pruebasCourse, name: 'test' },
      { path: '/course-user/dinamic/:id', component: DinamicClass, name: 'dinamic' },
      { path: '/messages', component: Messages, name: 'messages' },
      { path: '/attribute-user/:id', name: 'attribute-user', component: AttributeUser },
      { path: '/attribute-course', name: 'attribute-course', component: AttributeCourse },
      { path: '/perfil', name: 'perfil', component: Perfil },
      { path: '/option-preferences', name: 'option-preferences', component: optionPreference },
      { path: '/buy-cursos/:ide', name: 'buy-cursos', component: buycursos, props: true },
      { path: '/suscription-user', component: Suscription, name: 'suscription-user' },
      { path: '/certificado-user', name: 'certificado-user', component: Certificado },
      { path: '/detalle-certificado', name: 'detalle-certificado', component: detalleCertificado },
      { path: '/logros', name: 'logros', component: logrosUser },
      { path: '/preguntas-frecuentes', name: 'preguntas-frecuentes', component: preguntasFrecuentes },
      { path: '/leaderBoard', name: 'leaderBoard', component: leaderBoard },
      { path: '/buy/:ide', name: 'buy', component: Buy },
      { path: '/buyCertificate/:courseId', name: 'buyCertificate', component: BuyCertificate, props: true },
      { path: '/course/search/', name: 'search', component: Search },
      { path: '/my-courses/', name: 'myCourses', component: ProductorCourses },
      { path: '/examenes/', name: 'examenes', component: examenes },
    ]
  },


  { path: '/login', name: 'Login', component: Login },
  { path: '/attribute', name: 'attribute', component: AttributeVenta },
  { path: '/contrasena', name: 'passwordrecovery', component: PasswordRecovery },
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
