import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@views/Home.vue';
import Login from '@views/Login.vue';
import Register from '@views/Register.vue';
import ForgotPassword from '@views/ForgotPassword.vue';
import ResetPassword from '@views/ResetPassword.vue';
import ConfirmPassword from '@views/ConfirmPassword.vue';
import Tours from '@views/Tour.vue';
import Profile from '@views/Profile.vue';
import BookingsSuccess from '@views/BookingsSuccess.vue';
import Bookings from '@views/Bookings.vue';
import UserReviews from '@views/UserReviews.vue';
import store from '../store/index';

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
    path: '/tour/bookings/:tour/:user/:price',
    name: 'bookingsSuccess',
    component: BookingsSuccess,
    props: true
  },
  {
    path: '/tours/bookings',
    component: Bookings,
    name: 'bookings',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tours/myReviews',
    component: UserReviews,
    name: 'my-reviews',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/forgot/password',
    component: ForgotPassword,
    meta: { requiresGuest: true }
  },
  {
    path: '/reset/password/:token',
    component: ResetPassword,
    meta: { requiresGuest: true }
  },
  {
    path: '/email/confirm/:token',
    component: ConfirmPassword,
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next('/login');
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters.isLoggedIn) {
      next('/profile');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
