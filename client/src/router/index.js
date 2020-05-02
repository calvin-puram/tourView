import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@views/Home.vue';
import Login from '@views/auth/Login.vue';
import Register from '@views/auth/Register.vue';
import ForgotPassword from '@views/auth/ForgotPassword.vue';
import ResetPassword from '@views/auth/ResetPassword.vue';
import ConfirmPassword from '@views/auth/ConfirmPassword.vue';
import Tours from '@views/tour/Tour.vue';
import Profile from '@views/auth/Profile.vue';
import BookingsSuccess from '@views/tour/BookingsSuccess.vue';
import Bookings from '@views/tour/Bookings.vue';
import UserReviews from '@views/tour/UserReviews.vue';
import Favorite from '@views/tour/Favorite.vue';
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
    path: '/tours/favorite',
    component: Favorite,
    name: 'favorite',
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
