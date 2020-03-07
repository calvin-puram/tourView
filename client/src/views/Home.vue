<template>
  <div>
    <div v-if="getLoading">
      <Spinner />
    </div>
    <div>
      <div v-if="!getLoading"><Header /></div>

      <Card />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Header from '@layouts/Header';
import Card from '@tourUtils/Card';
import Spinner from '@tourUtils/Spinner';

export default {
  computed: mapGetters(['getLoading']),
  components: {
    Card,
    Spinner,
    Header
  },
  name: 'Home',
  methods: {
    ...mapActions(['tours', 'myProfile'])
  },
  created() {
    this.tours();
    this.myProfile();
  }
};
</script>
