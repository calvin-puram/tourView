import axios from 'axios';

const state = {
  session: null,
  sessionErr: null,
  paymentLoading: false
};
const getters = {
  getSession: () => state.session,
  getSessionErr: () => state.sessionErr,
  paymentLoading: () => state.paymentLoading
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
  }
};
const mutations = {
  payment_req(state) {
    state.paymentLoading = true;
    state.sessionErr = null;
  },
  payment_res(state) {
    state.paymentLoading = false;
    state.sessionErr = null;
  },
  session_response(state, data) {
    state.session = data;
    state.sessionErr = null;
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
