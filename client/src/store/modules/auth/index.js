import axios from 'axios';

const initState = {
  token: null,
  user: null,
  errors: null
};
const state = JSON.parse(localStorage.getItem('auth')) || initState;

const getters = {
  getErrors: () => state.errors,
  getUsers: () => state.user
};

const actions = {
  //register
  async register({ commit }, dataa) {
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/users/signup',
        dataa
      );
      if (res && res.data.success) {
        commit('auth_response', res.data);
      }
      return res;
    } catch (err) {
      commit('auth_error', err.response.data.msg);
    }
  },

  //login
  async login({ commit }, dataa) {
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/users/login',
        dataa
      );
      if (res && res.data.success) {
        commit('auth_response', res.data);
        console.log(res.data);
      }
      return res;
    } catch (err) {
      console.log(err.response.data.msg);
      commit('login_error', err.response.data.msg);
    }
  },
  //logout
  logoutUser({ commit }) {
    commit('logout');
  }
};

const mutations = {
  auth_response(state, data) {
    state.token = data.token;
    state.user = data.user;
    state.errors = null;
  },

  auth_error(state, err) {
    state.errors = err;
  },

  login_error(state, err) {
    state.errors = err;
  },
  logout(state) {
    state.token = null;
    state.user = null;
    state.errors = null;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
