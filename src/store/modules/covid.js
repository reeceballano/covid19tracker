import axios from 'axios'


// STATE
const state = {
    allData: [],
    geoData: [],
    currentGeoCountry: '',
}

// GETTERS
const getters = {
    getCovidData: state => {
        return state.allData;
    },

    getGeoData: state => {
        return state.geoData;
    },

    getCurrentGeoCountry: state => {
        return state.currentGeoCountry;
    }

}

// MUTATIONS
const mutations = {
    SET_COVID(state, allData) {
        state.allData = allData;
    },

    SET_GEODATA(state, geoData) {
        state.geoData = geoData;
    },

    SET_CURRENT_GEOCOUNTRY(state, currentGeoCountry) {
        state.currentGeoCountry = currentGeoCountry;
    }

}

// ACTIONS
const actions = {

    async allCovid({ commit }) {
        try {
            const response = await axios.get('https://corona.lmao.ninja/countries');
            const allTasks = response.data;
            commit('SET_COVID', allTasks);
        } catch (error) {  
            console.error(error);
        }
    },

    setGeoCountry({ commit }, payload) {
        commit('SET_CURRENT_GEOCOUNTRY', payload);
    },

    async allGeoData({ commit }) {
        // GEO DATA

        try {
            const response = await axios.get('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson');
            const geoData = response.data.features;

            commit('SET_GEODATA', geoData);
        } catch(error) {
            console.log(error);
        }

            // axios.get('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson')
            // .then( res => {
            //     // console.log(res);
            //     this.geo = res.data.features;
            // })
            // .catch(error => {
            //     console.log(error);
            // });

            // this.geo.forEach(item => {
            //     if(item.properties.SOV_A3 === currentMap) {
            //         console.log(item.SOV_A3);
            //         leaflet.geoJson(item).addTo(this.map);
            //     }
            // });
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
