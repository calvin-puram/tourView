import axios from 'axios';

const initState = {
  token: null,
  user: null,
  errors: null
};
const state = JSON.parse(localStorage.getItem('auth')) || initState;

const getters = {
  getErrors: () => state.errors,
  getUsers: () => state.user,
  isLoggedIn: () => !!state.token
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
      }
      return res;
    } catch (err) {
      commit('login_error', err.response.data.msg);
    }
  },
  //logout
  logoutUser({ commit }) {
    commit('logout');
  },
  //forgot password
  async forgotPassword({ commit }, dataa) {
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/users/forgotPassword',
        dataa
      );
      if (res && res.data.success) {
        commit('auth_response', res.data);
      }
      return res;
    } catch (err) {
      commit('login_error', err.response.data.msg);
    }
  },
  //reset password
  async resetPassword({ commit }, dataa) {
    try {
      const res = await axios.patch(
        'http://localhost:8000/api/v1/users/resetPassword',
        dataa
      );
      if (res && res.data.success) {
        commit('auth_response', res.data);
      }
      return res;
    } catch (err) {
      commit('login_error', err.response.data.msg);
    }
  },
  //confirm account
  async confirmAccount({ commit }, dataa) {
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/users/confirmAccount',
        dataa
      );
      if (res && res.data.success) {
        commit('auth_response', res.data);
      }
      return res;
    } catch (err) {
      commit('login_error', err.response.data.msg);
    }
  },

  //resend Email
  async resendEmail({ commit }) {
    try {
      const res = await axios.patch(
        'http://localhost:8000/api/v1/users/resendEmail'
      );

      return res;
    } catch (err) {
      commit('login_error', err.response.data.msg);
    }
  },
  //update user photo
  async updateUsers({ commit }, user) {
    try {
      const res = await axios.patch(
        'http://localhost:8000/api/v1/users/updatePhotos',
        user
      );
      if (res && res.data.success) {
        commit('auth_response', res.data);
      }
      return res;
    } catch (err) {
      commit('login_error', err.response.data.msg);
    }
  },
  // update profile password
  async updateProfilePassword({ commit }, dataa) {
    try {
      const res = await axios.patch(
        'http://localhost:8000/api/v1/users/updatePassword',
        dataa
      );
      if (res && res.data.success) {
        commit('auth_response', res.data);
      }
      return res;
    } catch (err) {
      commit('login_error', err.response.data.msg);
    }
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
