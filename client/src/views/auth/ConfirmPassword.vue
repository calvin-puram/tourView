<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mx-auto">
        <h1 class="text-success text-center mt-5">Confirming Account...</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: mapGetters(['getErrors']),

  methods: {
    ...mapActions(['confirmAccount'])
  },
  mounted() {
    this.confirmAccount({ token: this.$route.params.token }).then(res => {
      if (res && res.data.success) {
        this.setAuth(res.data);
        this.$noty.success('Account Confirm successfully!');
      } else {
        this.$noty.error(this.getErrors);
        this.$router.push('/');
      }
    });
  }
};
</script>

<style scoped>
.container {
  height: 80vh;
}
</style>
