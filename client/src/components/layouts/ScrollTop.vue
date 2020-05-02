<template>
  <v-btn
    class="scrollTop"
    v-scroll="onScroll"
    v-show="fab"
    fab
    dark
    fixed
    bottom
    right
    color="green"
    @click="toTop"
  >
    <i class="fas fa-chevron-up"></i>
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      fab: false
    };
  },
  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    }
  }
};
</script>

<style scoped>
.scrollTop {
  z-index: 1999;
}
</style>
