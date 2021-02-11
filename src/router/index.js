import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:feed',
    name: 'Home',
    component: Home,
  },
]

const router = new VueRouter({
  routes
})

export default router
