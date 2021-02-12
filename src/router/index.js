import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import FeedArticleList from '../views/FeedArticleList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/feed/:feed',
    name: 'FeedArticleList',
    component: FeedArticleList,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
]

const router = new VueRouter({
  routes
})

export default router
