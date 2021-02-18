import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Policy from '../views/Policy.vue';
import Terms from '../views/Terms.vue';
import ConfirmEmail from '../views/ConfirmEmail/Confirm.vue';
import SuccessConfirmEmail from '../views/ConfirmEmail/Success.vue';
import RedefinePassword from '../views/RedefinePassword/RedefinePassword.vue';
import SuccessRedefinePassword from '../views/RedefinePassword/Success.vue';
import FeedArticleList from '../views/FeedArticleList.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/feed/:feed',
    name: 'FeedArticleList',
    component: FeedArticleList,
  },
  {
    path: '/confirmEmail/confirm',
    name: 'ConfirmEmail',
    component: ConfirmEmail,
  },
  {
    path: '/confirmEmail/success',
    name: 'SuccessConfirmEmail',
    component: SuccessConfirmEmail,
  },
  {
    path: '/redefinePassword/redefine',
    name: 'RedefinePassword',
    component: RedefinePassword,
  },
  {
    path: '/redefinePassword/success',
    name: 'SuccessRedefinePassword',
    component: SuccessRedefinePassword,
  },
  {
    path: '/policy',
    name: 'PrivacyPolicy',
    component: Policy,
  },
  {
    path: '/terms',
    name: 'TermsOfUse',
    component: Terms,
  },
]

const router = new VueRouter({
  routes
})

export default router
