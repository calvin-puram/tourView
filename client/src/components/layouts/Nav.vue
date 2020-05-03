<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <p
        class="text-center mobile-confirmaccount "
        v-if="auth && !confirmEmailSent"
      >
        Please confirm your account or
        <span class="ml-3 resendMail" @click="confirmMailMoblie">
          {{ loading ? 'Sending Mail...' : 'Resend Mail' }}
        </span>
      </p>

      <v-list dense class="text-center mt-12 ml-12">
        <v-list-item link class="mb-5">
          <i class="fas fa-home mr-3 text-success"></i>
          <router-link to="/"
            ><span class="text-secondary">Home</span></router-link
          >
        </v-list-item>
        <v-list-item link v-if="auth">
          <i class="fas fa-user mr-3 text-success"></i>
          <router-link to="/profile"
            ><span class="text-secondary">Profile</span></router-link
          >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#009432" dark flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <router-link class="hidden-xs-only ml-5" to="/">
        <v-img src="/img/logo-green.png" width="140px"></v-img>
      </router-link>
      <h6 class="text-center confirmAccount" v-if="auth && !confirmEmailSent">
        Please confirm your account
        <span class="ml-2 resendMail" @click="confirmMail">
          {{ loading ? 'Sending Mail...' : 'Resend Mail?' }}
        </span>
      </h6>
      <v-spacer></v-spacer>
      <!-- MENU -->
      <div class="text-center mr-5 ">
        <v-menu open-on-hover buttom offset-y v-if="auth">
          <template v-slot:activator="{ on }">
            <v-btn
              color="white"
              class=" green--text font-weight-bold "
              v-on="on"
            >
              Explore
              <v-icon right>mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-list class="mt-1 text-center">
            <v-list-item link to="/profile">
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <!-- PROFILE -->
      <template>
        <div v-if="auth">
          <router-link to="/profile" v-if="setUser.photo === 'default.jpg'">
            <v-avatar class="mr-5">
              <img src="/img/users/default.jpg" alt="user" />
            </v-avatar>
          </router-link>
          <router-link to="/profile" v-else>
            <v-avatar class="mr-5">
              <img :src="setUser.photo" alt="user" />
            </v-avatar>
          </router-link>
        </div>
        <div v-else class="d-flex justify-content-between align-items-center">
          <router-link to="/login">
            <v-btn class="white" light>Login</v-btn>
          </router-link>
          <router-link to="/register" class="ml-5">
            <v-btn class="white" light>Register</v-btn>
          </router-link>
        </div>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import formMixin from '@mixins/formMixin.js';
export default {
  computed: mapGetters(['getErrors']),
  mixins: [formMixin],
  props: {
    source: String
  },
  data: () => ({
    drawer: false,
    showMenu: false,
    items: [
      { title: 'Profile', route: '/profile' },
      { title: 'Register', route: '/register' }
    ]
  }),
  methods: {
    ...mapActions(['resendEmail']),
    confirmMail() {
      this.toggleLoading();
      this.resendEmail().then(res => {
        if (res && res.data.success) {
          this.toggleLoading();
          this.$noty.success('Email sent successfully!');
        } else {
          this.toggleLoading();
          this.$noty.error(this.getErrors);
        }
      });
    },

    confirmMailMoblie() {
      this.toggleLoading();
      this.resendEmail().then(res => {
        if (res && res.data.success) {
          this.toggleLoading();
          this.$noty.success('Email sent successfully!');
        } else {
          this.toggleLoading();
          this.$noty.error(this.getErrors);
        }
      });
    }
  }
};
</script>

<style scoped>
.confirmAccount {
  margin-left: 15rem;
  margin-top: 1rem;
}
.resendMail {
  cursor: pointer;
  border-bottom: 1px solid rgb(179, 177, 177);
  letter-spacing: 1.3px;
}
.resendMail:hover {
  color: #444242;
  border: none;
}

.mobile-confirmaccount {
  display: none;
}

@media screen and (max-width: 768px) {
  .confirmAccount {
    display: none;
  }
  .mobile-confirmaccount {
    display: block;
    margin-top: 1rem;
    font-size: 14px;
    color: #009432;
  }
}

@media screen and (max-width: 1024px) {
  .confirmAccount {
    margin-left: 3rem;
    margin-top: 1rem;
  }
}
</style>
