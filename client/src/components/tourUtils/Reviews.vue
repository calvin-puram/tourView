<template>
  <div class="wrapper">
    <div class="d-flex over" v-if="getOneTour.reviews">
      <v-card
        color="#009432"
        dark
        v-for="review in getOneTour.reviews"
        :key="review._id"
        class="pos"
      >
        <v-card-text>{{ review.review }} </v-card-text>

        <v-card-actions>
          <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                :src="`/img/users/${review.user.photo}`"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ review.user.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card-actions>
      </v-card>
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
.wrapper {
  height: 60vh;
  display: flex;

  align-items: center;
}
.pos {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 500px;
}
.over {
  overflow-x: auto;
}

.v-card {
  margin: 2rem;
}
</style>
