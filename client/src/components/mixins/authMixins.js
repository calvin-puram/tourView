import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getUsers', 'getProfile']),
    auth() {
      return !!this.getUsers;
    },
    setUser() {
      return this.getUsers;
    },

    confirmEmailSent() {
      return !!this.getUsers.emailConfirmAt;
    }
  },
  methods: {
    ...mapActions(['logoutUser', 'myProfile']),
    setAuth(payload) {
      localStorage.setItem('auth', JSON.stringify(payload));
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${payload.token}`;
      this.$router.push('/');
    },
    logout() {
      localStorage.removeItem('auth');
      delete axios.defaults.headers.common['Authorization'];
      this.logoutUser();
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    }
  }
};
