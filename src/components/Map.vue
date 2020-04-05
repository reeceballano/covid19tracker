<template>
    <div class="map-container">
        <div id="mapid">
        </div>
    </div>
</template>

<script>
import leaflet from 'leaflet';
import { mapGetters } from 'vuex';

export default {
    props: {
        markerPlace: Array,
    },

    data() {
        return {
            map: null,
            titleLayer: null,
            marker: null,
        }
    },

    computed: {
        ...mapGetters('covid', ['getCovidData']),
    },

    async created() {
        await this.$store.dispatch('covid/allCovid');
        await this.mapMarker();
    },

    async mounted() {
        await this.initMap();
    },

    methods:  {

        initMap() {
            this.map = leaflet.map('mapid').setView([14.5995, 120.9842], 3);

            this.titleLayer = leaflet.tileLayer('https://api.maptiler.com/maps/darkmatter/{z}/{x}/{y}@2x.png?key=cDwvXVcaliv2dwKvMf8B', {
                maxZoom: 5,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
            }).addTo(this.map);

        },

        async mapMarker() {
            await this.getCovidData.forEach(map => {
                this.marker = new leaflet.marker([map.countryInfo.lat, map.countryInfo.long], {
                    icon: leaflet.divIcon({
                        className: `my-custom-icon ${map.countryInfo.iso3}`,
                        html: `${map.cases}`
                    })
                }).addTo(this.map);   
            }); 
        },

        gotoLocation(long, lat, currentMap) {
            console.log('from child');
            // this.$emit('gotoLocation');
            // this.map.flyTo([long, lat], 4);
            
            this.map.setView([lat, long], 21, {
                pan: {
                    animate: true,
                    duration: 1.5
                },
                zoom: {
                    animate: true
                }
            });

            let current = document.querySelectorAll(`.${currentMap}`);

            current[0].classList.add("activeLocation");

            setTimeout( () => {
                current[0].classList.remove("activeLocation");
            }, 10000);

        }
    }
}
</script>

<style lang="scss">
    #mapid { 
        height: 100vh;
        width: 100%; 

    }

    .my-custom-icon {
        width: 40px !important;
        height: 40px !important;
        margin-left: -12px;
        margin-top: -12px;
        border-radius: 50%;
        border: 2px solid rgb(190, 33, 33);
        text-align: center;
        color: #fff;
        background-color: rgba(190, 33, 33, 0.5);
        font-size: 10px;
        display: flex !important;
        align-items: center;
        justify-content: center;
        


    }

    .activeLocation {
        margin:100px;
        display: block;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: greenyellow;
        border-color:greenyellow;
        color: #000;
        cursor: pointer;
        box-shadow: 0 0 0 rgba(204,169,44, 0.4);
        animation: pulse 2s infinite;
    }

@-webkit-keyframes pulse {
	0% {
		-webkit-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.8);
	}
	70% {
		-webkit-box-shadow: 0 0 0 50px rgba(204, 169, 44, 0.4);
	}
	100% {
		-webkit-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
	}
}
@keyframes pulse {
	0% {
		-moz-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.8);
		box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.4);
	}
	70% {
		-moz-box-shadow: 0 0 0 50px rgba(204, 169, 44, 0.4);
		box-shadow: 0 0 0 20px rgba(204, 169, 44, 0);
	}
	100% {
		-moz-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
		box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
	}
}


</style>