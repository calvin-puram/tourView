<template>
  <div>
    <v-container v-if="getBookings">
      <v-row v-if="getBookings.length > 0">
        <v-col
          cols="md-4 sm-6 xs-12"
          v-for="tour in getBookings"
          :key="tour._id"
        >
          <v-card class="mx-auto mb-5 " max-width="374">
            <v-img
              height="250"
              :src="`http://localhost:8000/img/tours/${tour.imageCover}`"
            ></v-img>

            <v-card-title>{{ tour.name }}</v-card-title>

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
    </v-container>
    <v-container v-if="getBookings.length === 0">
      <h3 class="text-center mt-5">User Has No Booking Yet</h3>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import NProgress from 'nprogress';
import store from '../store/index';

export default {
  computed: mapGetters(['getBookings', 'getSessionErr', 'bookingLoading']),
  methods: {
    ...mapActions(['getAllBookings'])
  },
  beforeRouteEnter(to, from, next) {
    NProgress.start();
    store.dispatch('getAllBookings').then(res => {
      if (res && res.data.success) {
        NProgress.done();
      } else {
        NProgress.done();
      }
    });
    next();
  }
};
</script>
