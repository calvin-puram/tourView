<template>
  <v-carousel cycle height="500" hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
      :src="colors[i]"
      height="100%"
      eager
      gradient="rgba(0,0,0, 0.5), rgba(0,0,0, 0.5)"
    >
      <v-row class="white--text fill-height" align="center" justify="center">
        <h1 class="showcase-heading">
          {{ head[i] }}
        </h1>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        '/img/showcase/tour-1-1.jpg',
        '/img/showcase/tour-4-1.jpg',
        '/img/showcase/tour-4-3.jpg',
        '/img/showcase/tour-6-2.jpg',
        '/img/showcase/tour-7-2.jpg'
      ],
      slides: [
        'Amazing Tours For Unique VIPs',
        'Second',
        'Third',
        'Fourth',
        'Fifth'
      ],
      head: [
        'Amazing Tours For Unique VIPs',
        'Premium Tours For The Elites',
        'Discounted Tours All Year Round',
        'Explore The World With Natours',
        'Search, Plan, and Book'
      ]
    };
  }
};
</script>

<style scoped>
.showcase-heading {
  letter-spacing: 5px;
  font-size: 3rem;
  font-weight: normal;
  font-family: 'IBM Plex Serif', Arial;
}

@media screen and (max-width: 768px) {
  h1.showcase-heading {
    display: none;
  }
}
</style>
