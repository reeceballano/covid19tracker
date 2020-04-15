<template>
  <div class="home">
    <div class="country-select">
      <div class="field">
        <div class="control">
          <div class="select is-primary">
            <select v-model="country" @change="gotoLocation($event)" >
              <option value="select" :selected="true"> -- SELECT COUNTRY -- </option>
              <option v-for="(country,i) in getCovidData" 
              :key="i"
              :value="country">
                {{ country.country }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <app-map
      ref="map"
    >

    </app-map>
  </div>
</template>

<script>
import Map from '@/components/Map';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    'app-map': Map,
  },

  data() {
    return {
      markerPlace: [
        [14.5995, 120.9842, 2],
        [14.48369, 120.89878, 5],
        [14.6255, 121.1245, 4],
      ],

      country: [],

    }
  },
  
  computed: {
    ...mapGetters('covid', ['getCovidData']),
  },

  async created() {
    },

  async mounted() {
    await this.$store.dispatch('covid/allCovid');
  },

  methods: {
    gotoLocation() {
      const lat = this.country.countryInfo.lat;
      const long = this.country.countryInfo.long;
      const currentMap = this.country.countryInfo.iso3;

      this.$store.dispatch('covid/setGeoCountry', currentMap);

      this.$refs.map.gotoLocation(long, lat, currentMap);
    },

  }
}
</script>

<style lang="scss" scoped>
  .country-select {
    position: absolute;
    z-index: 99999;
    background: #396b967d;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    top: 0%;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;

    select {
      border: 0;
      padding: 10px;
    }
  }
</style>
