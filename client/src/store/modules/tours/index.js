import axios from 'axios';

const state = {
  tours: [],
  tourError: null,
  tourLoading: false,
  singleTour: []
};
const getters = {
  getTours: () => state.tours,
  getOneTour: () => state.singleTour,
  getTourErrors: () => state.tourError,
  getLoading: () => state.tourLoading
};
const actions = {
  async tours({ commit }) {
    try {
      commit('tourLoading_req');
      const res = await axios.get('http://localhost:8000/api/v1/tours');
      if (res && res.data.success) {
        commit('tourLoading_res');
        commit('tours_response', res.data.data);
      }
      return res;
    } catch (err) {
      if (err && err.response) {
        commit('tourLoading_res');
        commit('tours_err', err.response.data.msg);
      }
    }
  },
  //single tour
  async singleTours({ commit }, slug) {
    try {
      commit('tourLoading_req');
      const res = await axios.get(`http://localhost:8000/api/v1/tours/${slug}`);
      if (res && res.data.success) {
        commit('tourLoading_res');
        commit('tourSingle_response', res.data.data);
      }
      return res;
    } catch (err) {
      if (err && err.response) {
        commit('tourLoading_res');
        commit('tours_err', err.response.data.msg);
      }
    }
  }
};
const mutations = {
  tourLoading_req(state) {
    state.tourLoading = true;
    state.tourError = null;
  },
  tourLoading_res(state) {
    state.tourLoading = false;
    state.tourError = null;
  },
  tours_response(state, data) {
    state.tours = data;
    state.tourError = null;
  },
  tourSingle_response(state, data) {
    state.singleTour = data;
    state.tourError = null;
  },
  tours_err(state, err) {
    state.tourError = err;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
