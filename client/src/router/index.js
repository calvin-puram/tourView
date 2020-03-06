import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@views/Home.vue';
import Login from '@views/Login.vue';
import Register from '@views/Register.vue';
import ForgotPassword from '@views/ForgotPassword.vue';
import ResetPassword from '@views/ResetPassword.vue';
import ConfirmPassword from '@views/ConfirmPassword.vue';
import Tours from '@views/Tour.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/tour/:slug',
    component: Tours
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/forgot/password',
    component: ForgotPassword
  },
  {
    path: '/reset/password/:token',
    component: ResetPassword
  },
  {
    path: '/email/confirm/:token',
    component: ConfirmPassword
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
