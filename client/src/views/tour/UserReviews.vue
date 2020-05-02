<template>
  <div>
    <div class="container" v-if="getMyReviews">
      <div class="row">
        <div
          class="col-md-4 col-sm-6 col-xs-12"
          v-for="reviews in getMyReviews"
          :key="reviews._id"
        >
          <v-card class="mx-auto" color="#009432" dark width="500px">
            <v-card-title>
              Tour
              <span class="title font-weight-light ml-4">{{
                reviews.tour.name
              }}</span>
            </v-card-title>

            <v-card-text>
              {{ reviews.review.slice(0, 80) }}
            </v-card-text>

            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                  <v-img
                    class="elevation-6"
                    :src="`/img/users/${reviews.user.photo}`"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ reviews.user.name }}</v-list-item-title>
                </v-list-item-content>

                <v-row align="center" justify="end">
                  <div class="my-2">
                    <v-btn
                      small
                      color="error"
                      @click="deleteUserReview(reviews._id)"
                    >
                      <i
                        class="fas fa-spin fa-spinner"
                        v-if="reviewsLoading"
                      ></i>
                      {{ reviewsLoading ? '' : 'Delete Review' }}
                    </v-btn>
                  </div>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </div>
    <div class="container" v-if="getMyReviews.length === 0">
      <h3 class="text-center mt-5">User Has no Reviews</h3>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import store from '@store/index';
import NProgress from 'nprogress';

export default {
  computed: mapGetters([
    'getMyReviews',
    'getSessionErr',
    'paymentLoading',
    'reviewsLoading'
  ]),

  methods: {
    ...mapActions(['userReviews', 'deleteReviews']),
    deleteUserReview(id) {
      this.deleteReviews(id).then(res => {
        if (res && res.data.success) {
          this.$noty.success('review deleted successfully');
          this.$router.push('/profile');
        } else {
          this.$noty.error(this.getSessionErr);
        }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    NProgress.start();
    store.dispatch('userReviews').then(res => {
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
