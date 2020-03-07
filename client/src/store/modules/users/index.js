import axios from 'axios';

const state = {
  profile: {},
  profileError: null
};
const getters = {
  getProfile: () => state.profile,
  getProfileErrors: () => state.profileError
};
const actions = {
  // get profile
  async myProfile({ commit }) {
    try {
      const res = await axios.get(
        'http://localhost:8000/api/v1/users/myprofile'
      );
      if (res && res.data.success) {
        commit('users_response', res.data.data);
      }
      return res;
    } catch (err) {
      commit('users_err', err.response.data.msg);
    }
  },
  // update profile details
  async profileDetails({ commit }, user) {
    try {
      const res = await axios.patch(
        'http://localhost:8000/api/v1/users/updateMe',
        user
      );
      if (res && res.data.success) {
        // commit('users_response', res.data.data);
      }
      return res;
    } catch (err) {
      commit('users_err', err.response.data.msg);
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
        console.log(res.data.data);
        // commit('users_response', res.data.data);
      }
      return res;
    } catch (err) {
      console.log(err.response.data.msg);
      commit('users_err', err.response.data.msg);
    }
  }
};
const mutations = {
  users_response(state, data) {
    state.profile = data;
    state.profileError = null;
  },

  users_err(state, err) {
    state.profileError = err;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
