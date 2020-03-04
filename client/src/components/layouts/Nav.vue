<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#009432" dark flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <router-link class="hidden-xs-only ml-5" to="/">
        <v-img src="/img/logo-green.png" width="140px"></v-img>
      </router-link>
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
          <router-link to="/profile">
            <v-avatar class="mr-5">
              <img :src="`img/img/users/${setUser.photo}`" alt="user" />
            </v-avatar>
          </router-link>
        </div>
        <div v-else class="d-flex justify-content-between align-items-center">
          <router-link to="/login">
            <v-btn class="white" light rounded>Login</v-btn>
          </router-link>
          <router-link to="/register" class="ml-5">
            <v-btn class="white" light rounded>Register</v-btn>
          </router-link>
        </div>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
export default {
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
  methods: {}
};
</script>
