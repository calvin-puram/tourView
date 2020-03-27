<template>
  <div>
    <!-- HERO SECTION -->
    <!-- <div v-if="loading">
      <Spinner />
    </div> -->
    <div v-if="Object.values(getOneTour).length > 0">
      <div class="image">
        <v-img
          :src="`/img/tours/${getOneTour.imageCover}`"
          gradient="rgba(0,0,0, 0.5), rgba(0,0,0, 0.5)"
        >
          <v-row
            class="white--text fill-height"
            align="center"
            justify="center"
          >
            <h1 class="heading hidden-xs-only ">{{ getOneTour.name }} Tour</h1>
          </v-row>
        </v-img>
      </div>
      <!-- NEXT -->
      <v-container class="p-0">
        <div class="section-a row ">
          <div class="col-md-4 col-sm-12">
            <div>
              <h2 class="text-center my-3 green--text headline">Quick Facts</h2>
              <div class="d-flex justify-space-between mb-2">
                <span class="font-weight-medium">NEXT DATE</span>
                <span>
                  {{ new Date(getOneTour.startDates[0]).toDateString() }}</span
                >
              </div>

              <div class="d-flex justify-space-between mb-2">
                <span class="font-weight-medium">DIFFICULTY</span>
                <span> {{ getOneTour.difficulty.toUpperCase() }}</span>
              </div>

              <div class="d-flex justify-space-between mb-2">
                <span class="font-weight-medium">PARTICIPANTS</span>
                <span> {{ getOneTour.maxGroupSize }} People</span>
              </div>

              <div class="d-flex justify-space-between ">
                <span class="font-weight-medium">RATINGS</span>
                <span>
                  {{ getOneTour.ratingsAverage }}/{{
                    getOneTour.ratingsQuantity
                  }}</span
                >
              </div>
            </div>
            <v-divider></v-divider>
            <!-- TOUR GUIDES -->
            <div class="guides">
              <h2 class="text-center mb-2 green--text headline">
                YOUR TOUR GUIDES
              </h2>
              <div
                class="d-flex justify-space-between align-items-center mb-2"
                v-for="guide in getOneTour.guides"
                :key="guide._id"
              >
                <span>
                  <v-avatar class="mr-3">
                    <img :src="`/img/users/${guide.photo}`" alt="John" />
                  </v-avatar>
                  <span class="font-weight-medium">{{
                    guide.role === 'guide' ? 'Admin-Guide' : 'Lead-Guide'
                  }}</span>
                </span>
                <span>{{ guide.name }}</span>
              </div>
            </div>
          </div>

          <!-- NEXT -->
          <div class="col-md-8 col-sm-12">
            <div
              class="d-flex flex-column align-center justify-center ml-10 tour-description"
            >
              <h2 class="green--text my-2 headline">
                ABOUT {{ getOneTour.name.toUpperCase() }} TOUR
              </h2>
              <div
                v-for="para in getOneTour.description.split('\n')"
                :key="para"
              >
                <p>{{ para }}</p>
              </div>
            </div>
          </div>
        </div>
      </v-container>
      <!-- TOUR DISPLAY -->
      <ImageDisplay />

      <!-- REVIEWS -->

      <Reviews />

      <!-- CTA -->
      <CTA />
    </div>
  </div>
</template>

<script>
import CTA from '@tourUtils/CTA';
import ImageDisplay from '@tourUtils/TourDisplay';
import { mapGetters, mapActions } from 'vuex';
// import Spinner from '@tourUtils/Spinner';
import Reviews from '@tourUtils/Reviews';
import NProgress from 'nprogress';
import store from '../store/index';

export default {
  components: {
    CTA,
    ImageDisplay,
    Reviews
  },
  beforeRouteEnter(to, from, next) {
    NProgress.start();
    store.dispatch('singleTours', to.params.slug).then(res => {
      if (res && res.data.success) {
        NProgress.done();
      }
    });
    next();
  },
  computed: mapGetters(['getOneTour']),
  methods: {
    ...mapActions(['singleTours'])
  }
};
</script>

<style scoped>
.v-image {
  height: 70vh;
  width: 100vw;
}
.heading {
  font-size: 3rem;
  font-family: 'IBM Plex Serif', Arial;
}

.guides {
  margin-top: 1rem;
}

.tour-description {
  height: 100%;
}

@media screen and (max-width: 500px) {
  .headline {
    font-size: 1.3rem !important;
  }
  p {
    font-size: 15px;
    text-align: center;
  }

  span {
    font-size: 16px;
  }
}
</style>
