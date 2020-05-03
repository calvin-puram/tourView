import axios from 'axios';

const state = {
  session: {},
  sessionErr: null,
  paymentLoading: false,
  bookingLoading: false,
  bookings: [],
  myReviews: [],
  reviewsLoading: false,
  favoriteErr: null,
  getUserFavorite: [],
  createdFav: {}
};
const getters = {
  getSession: () => state.session,
  getSessionErr: () => state.sessionErr,
  paymentLoading: () => state.paymentLoading,
  bookingLoading: () => state.bookingLoading,
  getBookings: () => state.bookings,
  getMyReviews: () => state.myReviews,
  reviewsLoading: () => state.reviewsLoading,
  favoriteErr: () => state.favoriteErr,
  getUserFavorite: () => state.getUserFavorite,
  createdFav: () => state.createdFav
};
const actions = {
  async checkout({ commit }, id) {
    try {
      commit('payment_req');
      const res = await axios.get(`/api/v1/bookings/checkout-session/${id}`);
      if (res && res.data.success) {
        commit('payment_res');
        commit('session_response', res.data.data);
      }
      return res;
    } catch (err) {
      if (err && err.response) {
        commit('session_err', err.response.data.msg);
      }
    }
  },
  async bookingsCheckout({ commit }, details) {
    try {
      const res = await axios.post(
        `/api/v1/bookings/bookingsCheckout`,
        details
      );
      return res;
    } catch (err) {
      if (err && err.response) {
        commit('session_err', err.response.data.msg);
      }
    }
  },
  async getAllBookings({ commit }) {
    try {
      commit('bookings_req');
      const res = await axios.get(`/api/v1/bookings`);
      if (res && res.data.success) {
        commit('bookings_res');
        commit('allBookings', res.data.data);
      }
      return res;
    } catch (err) {
      if (err && err.response) {
        commit('session_err', err.response.data.msg);
      }
    }
  },
  async userReviews({ commit }) {
    try {
      commit('payment_req');
      const res = await axios.get(`/api/v1/reviews/myReviews`);
      if (res && res.data.success) {
        commit('payment_res');
        commit('myReviews_res', res.data.data);
      }
      return res;
    } catch (err) {
      if (err && err.response) {
        commit('payment_res');
        commit('session_err', err.response.data.msg);
      }
    }
  },
  // delete reviews
  async deleteReviews({ commit }, userId) {
    try {
      commit('deleteReview_req');
      const res = await axios.delete(`/api/v1/reviews/${userId}`);
      if (res && res.data.success) {
        commit('deleteReview_res');
      }
      return res;
    } catch (err) {
      if (err && err.response) {
        commit('session_err', err.response.data.msg);
      }
    }
  },
  // create favorite
  async createFavorite({ commit }, userId) {
    try {
      const res = await axios.post(`/api/v1/favorite/${userId}`);
      if (res && res.data.success) {
        commit('createdFav_tours', res.data.data);
      }
      return res;
    } catch (err) {
      if (err && err.response) {
        commit('favorite_err', err.response.data.msg);
      }
    }
  },
  // get user favorite
  async getFavorite({ commit }, userId) {
    try {
      commit('bookings_req');
      const res = await axios.get(`/api/v1/favorite/${userId}`);
      if (res && res.data.success) {
        commit('bookings_res');
        commit('favorite_tours', res.data.data);
      }
      return res;
    } catch (err) {
      if (err && err.response) {
        commit('favorite_err', err.response.data.msg);
      }
    }
  },
  // delete user favorite
  async deleteUsersFavorite({ commit }, userId) {
    try {
      const res = await axios.delete(`/api/v1/favorite/${userId}`);

      return res;
    } catch (err) {
      if (err && err.response) {
        commit('favorite_err', err.response.data.msg);
      }
    }
  }
};
const mutations = {
  payment_req(state) {
    state.paymentLoading = true;
    state.sessionErr = null;
  },
  bookings_req(state) {
    state.bookingLoading = true;
    state.sessionErr = null;
  },
  payment_res(state) {
    state.paymentLoading = false;
    state.sessionErr = null;
  },
  favorite_err(state, err) {
    state.favoriteErr = err;
  },
  deleteReview_req(state) {
    state.reviewsLoading = true;
    state.sessionErr = null;
  },
  deleteReview_res(state) {
    state.reviewsLoading = false;
    state.sessionErr = null;
  },
  bookings_res(state) {
    state.bookingLoading = false;
    state.sessionErr = null;
  },
  session_response(state, data) {
    state.session = data;
    state.sessionErr = null;
  },
  allBookings(state, tours) {
    state.bookings = tours;
    state.bookingsErr = null;
  },

  session_err(state, err) {
    state.sessionErr = err;
  },
  myReviews_res(state, reviews) {
    state.myReviews = reviews;
    state.sessionErr = null;
  },
  createdFav_tours(state, data) {
    state.createdFav = data;
    state.favoriteErr = null;
  },
  favorite_tours(state, data) {
    state.getUserFavorite = data;
    state.favoriteErr = null;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
