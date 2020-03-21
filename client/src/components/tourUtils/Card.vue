<template>
  <v-container>
    <v-row>
      <v-col cols="md-4 sm-6 xs-12" v-for="tour in getTours" :key="tour._id">
        <v-card class="mx-auto mb-5 " max-width="374">
          <v-img
            height="250"
            :src="`http://localhost:8000/img/tours/${tour.imageCover}`"
          ></v-img>
          <div class="d-flex justify-content-between align-items-center">
            <v-card-title>{{ tour.name }}</v-card-title>
            <div class="mr-5" v-if="auth" @click="handleLikes(tour._id)">
              <i
                v-if="likes.includes(tour._id)"
                class="
                  fas fa-thumbs-up text-success
                "
              ></i>
              <i
                v-if="!likes.includes(tour._id)"
                class="
                  fas fa-thumbs-up 
                "
              ></i>

              <span class="ml-3">12</span>
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
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: mapGetters([
    'getTourErrors',
    'getTours',
    'favoriteErr',
    'getUserFavorite',
    'createdFav'
  ]),

  data() {
    return {
      likes: []
    };
  },
  methods: {
    ...mapActions(['tours', 'createFavorite', 'getFavorite']),
    handleLikes(tourId) {
      this.createFavorite(tourId).then(res => {
        if (res && res.data.success) {
          this.likes.push(this.createdFav.tour);
          console.log(this.likes);
          this.$noty.success('tour added to favorite');
        } else {
          this.$noty.error(this.favoriteErr);
        }
      });
    }
  },
  created() {
    this.tours();
    this.getFavorite(this.setUser._id).then(res => {
      if (res && res.data.success) {
        this.getUserFavorite.map(tour => {
          this.likes.push(tour.tour._id);
        });
      }
    });
  }
};
</script>

<style scoped>
.fa-thumbs-up {
  cursor: pointer;
}
</style>
