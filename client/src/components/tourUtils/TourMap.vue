<template>
  <div style="height: 400px; width: 100%">
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="withPopup[1]"
      :options="mapOptions"
      style="height: 100%"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <div v-for="(popup, i) in withPopup" :key="popup">
        <l-marker :lat-lng="popup">
          <l-popup> {{ tour.name }} Tour-{{ i + 1 }} </l-popup>
        </l-marker>
      </div>
    </l-map>
  </div>
</template>

<script>
import { latLng } from 'leaflet';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  props: ['tour'],
  data() {
    return {
      tourName: [],
      zoom: 6.5,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: [],
      currentZoom: 11.5,
      mapOptions: {
        zoomSnap: 0.5,
        dragging: false,
        keyboard: false
      },
      showMap: true
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    }
  },
  created() {
    this.tour.locations.forEach(tour => {
      this.withPopup.push(latLng(tour.coordinates[1], tour.coordinates[0]));
      this.tourName.push(tour.description);
    });
  }
};
</script>
