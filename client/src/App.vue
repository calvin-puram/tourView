<template>
  <v-app>
    <Nav />
    <v-content>
      <router-view />
      <Footer />
      <ScrollTop />
    </v-content>
  </v-app>
</template>

<script>
import Nav from '@layouts/Nav';
import Footer from '@layouts/Footer';
import ScrollTop from '@layouts/ScrollTop';

export default {
  name: 'App',
  components: {
    Nav,
    Footer,
    ScrollTop
  }
};
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
}
a {
  text-decoration: none !important;
}
</style>
