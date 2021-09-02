import Vue from 'vue'
import VueRouter from 'vue-router'
import NewwavePage from '../views/NewwavePage.vue'
import AddupPage from '../views/AddupPage.vue'
import Home from '../views/Home.vue'
import PiePage from "../views/PiePage.vue";
import ProvinceMapPage from "../views/ProvinceMapPage.vue";
import ChinaMapPage from "../views/ChinaMapPage.vue";
import Login from "../views/Login.vue"
import NewsPage from "../views/NewsPage"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',

  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/newwavepage',
    name: 'NewwavePage',
    component: NewwavePage
  },
  {
    path: '/adduppage',
    name: 'AddupPage',
    component: AddupPage
  },
  {
    path: '/chinamappage',
    name: 'ChinaMapPage',
    component: ChinaMapPage
  },
  {
    path: '/provincemappage',
    name: 'ProvinceMapPage',
    component: ProvinceMapPage
  },
  {
    path: "/piepage",
    name: 'PiePage',
    component: PiePage
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/newspage",
    name: "NewsPage",
    component: NewsPage
  }
]
const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
