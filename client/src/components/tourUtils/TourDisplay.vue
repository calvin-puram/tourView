<template>
  <div>
    <div class="row">
      <div
        class="col-md-4 col-sm-12"
        v-for="img in getOneTour.images"
        :key="img"
      >
        <img :src="`http://localhost:8000/img/tours/${img}`" alt="showcase" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters(['getOneTour'])
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>
