import axios from 'axios'


// STATE
const state = {
    allData: [],
    geoData: [],
    currentGeoCountry: '',
    highestCasesCountry: [],
    isLoading: false,
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
    },

    getHighestCase: (state) => {
        // return 'test'
        return state.highestCasesCountry;
    },

    getIsLoading: state => {
        return state.isLoading;
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
    },

    SET_HIGHEST_CASES_COUNTRY(state, highestCasesCountry) {
        state.highestCasesCountry = highestCasesCountry;
    },

    SET_ISLOADING(state, isLoading) {
        state.isLoading = isLoading;
    }

}

// ACTIONS
const actions = {

    async allCovid({ commit }) {
        commit('SET_ISLOADING', true);

        try {
            const response = await axios.get('https://corona.lmao.ninja/countries');
            const allTasks = response.data;
            commit('SET_COVID', allTasks);
            commit('SET_ISLOADING', false);

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

    },

    async highestCasesCountry({ commit, state }) {
        const country = await state.allData;

        const highest = country.reduce( (max, map) => (max.cases > map.cases) ? max : map);

        await commit('SET_HIGHEST_CASES_COUNTRY', highest);
    }



}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
