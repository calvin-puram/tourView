import axios from 'axios';

const state = {
  session: null,
  sessionErr: null,
  paymentLoading: false,
  bookingLoading: false,
  bookings: []
};
const getters = {
  getSession: () => state.session,
  getSessionErr: () => state.sessionErr,
  paymentLoading: () => state.paymentLoading,
  bookingLoading: () => state.bookingLoading,
  getBookings: () => state.bookings
};
const actions = {
  async checkout({ commit }, id) {
    try {
      commit('payment_req');
      const res = await axios.get(
        `http://localhost:8000/api/v1/bookings/checkout-session/${id}`
      );
      if (res && res.data.success) {
        commit('payment_res');
        commit('session_response', res.data.data);
      }
      return res;
    } catch (err) {
      if (err && err.response.data) {
        commit('payment_res');
        commit('session_err', err.response.data.msg);
      }
    }
  },
  async bookingsCheckout({ commit }, details) {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/bookings/bookingsCheckout`,
        details
      );
      return res;
    } catch (err) {
      if (err && err.response.data) {
        commit('session_err', err.response.data.msg);
      }
    }
  },
  async getAllBookings({ commit }) {
    try {
      commit('bookings_req');
      const res = await axios.get(`http://localhost:8000/api/v1/bookings`);
      if (res && res.data.success) {
        commit('bookings_res');
        commit('allBookings', res.data.data);
      }
      return res;
    } catch (err) {
      if (err && err.response.data) {
        commit('session_err', err.response.data.msg);
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
