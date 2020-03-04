import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getUsers']),
    auth() {
      return !!this.getUsers;
    },
    setUser() {
      return this.getUsers;
    }
  },
  methods: {
    ...mapActions(['logoutUser']),
    setAuth(payload) {
      localStorage.setItem('auth', JSON.stringify(payload));
      axios.defaults.headers.common['Authorization'] = payload;
      this.$router.push('/');
    },
    logout() {
      localStorage.removeItem('auth');
      delete axios.defaults.headers.common['Authorization'];
      this.logoutUser();
    }
  }
};
