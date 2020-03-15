import axios from 'axios';

const state = {
  session: null,
  sessionErr: null
};
const getters = {
  getSession: () => state.session,
  getSessionErr: () => state.sessionErr
};
const actions = {
  async checkout({ commit }, id) {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/bookings/checkout-session/${id}`
      );
      if (res && res.data.success) {
        commit('session_response', res.data.data);
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
