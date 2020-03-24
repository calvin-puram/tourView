<template>
  <div>
    <div><Header /></div>

    <Card />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Header from '@layouts/Header';
import Card from '@tourUtils/Card';
import NProgress from 'nprogress';
import store from '../store/index';

export default {
  computed: mapGetters(['getLoading']),
  components: {
    Card,
    Header
  },
  name: 'Home',
  beforeRouteEnter(to, from, next) {
    NProgress.start();
    store.dispatch('tours').then(res => {
      if (res && res.data.success) {
        NProgress.done();
      }
    });

    next();
  },
  methods: {
    ...mapActions(['tours'])
  }
};
</script>
