<template>
  <div>
    <div v-if="loading">
      <Spinner />
    </div>

    <v-container v-if="getUserFavorite && !loading">
      <v-row v-if="getUserFavorite.length > 0">
        <v-col
          cols="md-4 sm-6 xs-12"
          v-for="tour in getUserFavorite"
          :key="tour._id"
        >
          <v-card class="mx-auto mb-5 " max-width="374">
            <v-img height="250" :src="`/img/tours/${tour.imageCover}`"></v-img>

            <div class="d-flex justify-content-between align-items-center">
              <v-card-title>{{ tour.name }}</v-card-title>
              <div class="mr-5">
                <i
                  class="fas fa-thumbs-down"
                  @click="deleteFavorite(tour._id)"
                ></i>
              </div>
            </div>

            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-rating
                  :value="tour.ratingsAverage"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>

                <div class="grey--text ml-4">
                  {{ tour.ratingsAverage }} ({{ tour.ratingsQuantity }})
                </div>
              </v-row>

              <div>
                {{ tour.summary }}
              </div>

              <div class="d-flex justify-space-around align-center mt-5">
                <div>
                  <p>
                    <v-icon left>mdi-map-marker-check-outline</v-icon>
                    {{ tour.startLocation.description }}
                  </p>
                  <p>
                    <v-icon left>mdi-calendar-check-outline</v-icon>
                    {{ new Date(tour.startDates[0]).toDateString() }}
                  </p>
                </div>

                <div>
                  <p>
                    <v-icon left>mdi-map-search</v-icon>
                    {{ tour.location.length !== 0 ? tour.locations.length : 0 }}
                    Stops
                  </p>
                  <p>
                    <v-icon left>mdi-account-group</v-icon>
                    {{ tour.maxGroupSize }} People
                  </p>
                </div>
              </div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <div class="d-flex">
              <v-card-text>
                <v-chip-group
                  active-class="deep-purple accent-4 white--text"
                  column
                >
                  <v-chip>$ {{ tour.price }} per person</v-chip>
                </v-chip-group>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="#009432"
                  class="white--text"
                  rounded
                  link
                  :to="`/tour/${tour.slug}`"
                >
                  Details
                </v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="getUserFavorite.length === 0">
        <h3 class="mx-auto text--secondary mt-5">No Favorite Tours Yet</h3>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Spinner from '@tourUtils/Spinner';
export default {
  components: {
    Spinner
  },
  data() {
    return {
      loading: false
    };
  },
  computed: mapGetters(['getUserFavorite', 'favoriteErr', 'bookingLoading']),
  methods: {
    ...mapActions(['getFavorite', 'deleteUsersFavorite']),
    deleteFavorite(id) {
      this.deleteUsersFavorite(id).then(res => {
        if (res && res.data.success) {
          this.$noty.success('Favorite  Tour removed successfully');
          this.$router.push('/profile');
        } else {
          this.$noty.error(this.favoriteErr);
        }
      });
    }
  },

  created() {
    this.loading = true;
    this.getFavorite(this.setUser._id).then(res => {
      this.loading = false;
      if (res && res.data.success) {
        this.$noty.info('All Favorite Tours');
      } else {
        this.$noty.error(this.favoriteErr);
        this.$router.push('/');
      }
    });
  }
};
</script>

<style scoped>
.fas {
  cursor: pointer;
}
</style>
