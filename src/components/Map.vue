<template>
    <div class="map-container">
        <div id="mapid">
        </div>
    </div>
</template>

<script>
// import axios from 'axios';
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
        ...mapGetters('covid', ['getCovidData', 'getGeoData', 'getCurrentGeoCountry']),
    },

    async created() {
        await this.$store.dispatch('covid/allCovid');
        await this.$store.dispatch('covid/allGeoData');
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
                        html: `${this.kFormatter(Number(map.cases))}`
                    })
                }).addTo(this.map)
                .bindPopup(`
                    <div class="popUpInfo">
                        <h2>${map.country}</h2>
                        <img src="${map.countryInfo.flag}" width="10px"/>
                        <ul>
                            <li>Total Cases: ${this.kFormatter(map.cases)}</li>
                            <li>Recovered: ${this.kFormatter(map.recovered)}</li>
                        </ul>
                    
                    </div
                `)
                // .on('mouseover', function () {
                //     this.openPopup();
                // })
                // .on('mouseout', function () {
                //     this.closePopup();
                // });

            });
  
        },

        kFormatter(num) {
            return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num);
        },

        async gotoLocation(long, lat, currentMap) {
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

            // GEO DATA

            // for(let i = 0; i < this.getGeoData.length; i++) {
            //     const currentCountryGeo = this.getGeoData[i].properties['SOV_A3'];


            // }

            this.getGeoData.filter(item => {
                if(currentMap === item.properties['SOV_A3']) {
                    console.log('okay');
                    leaflet.geoJson(item).addTo(this.map);

                    setTimeout( () => {
                        const myStyle = {
                            "color": "#ff7800",
                            "weight": 5,
                            "opacity": 0.65
                        };

                        leaflet.geoJSON(item, {
                            style: myStyle
                        }).addTo(this.map);
                    }, 5000);
                }
            });

            // console.log(JSON.stringify(x));

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

    .leaflet-popup-content {
        text-align: left;
        padding: 10px !important;

        h2 {
            margin-bottom: 0;
        }

        img {
            width: 50px;
        }

        ul {
            padding-left: 0;
            list-style-type: none;

            li {

            }
        }
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