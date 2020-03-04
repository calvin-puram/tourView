<template>
  <v-app>
    <Nav />
    <v-content>
      <router-view />
      <Footer />
    </v-content>
  </v-app>
</template>

<script>
import Nav from './components/layouts/Nav';
import Footer from './components/layouts/Footer';

export default {
  name: 'App',
  components: {
    Nav,
    Footer
  }
};
</script>

<style>
a {
  text-decoration: none !important;
}
</style>
