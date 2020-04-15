import axios from 'axios'


// STATE
const state = {
    allData: [],
    geoData: [],
    currentGeoCountry: '',
    highestCasesCountry: [],
    highestRecoveriesCountry: [],
    highestDeathsCountry: [],
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
        return state.highestCasesCountry;
    },

    getHighestRecoveries: (state) => {
        return state.highestRecoveriesCountry;
    },

    getHighestDeaths: (state) => {
        return state.highestDeathsCountry;
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

    SET_HIGHEST_RECOVERIES_COUNTRY(state, highestRecoveriesCountry) {
        state.highestRecoveriesCountry = highestRecoveriesCountry;
    },

    SET_HIGHEST_DEATHS_COUNTRY(state, highestDeathsCountry) {
        state.highestDeathsCountry = highestDeathsCountry;
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
            const allData = response.data;
            commit('SET_COVID', allData);
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
    },

    async highestRecoveriesCountry({ commit, state }) {
        const country = await state.allData;

        const highest = country.reduce( (max, map) => (max.recovered > map.recovered) ? max : map);

        await commit('SET_HIGHEST_RECOVERIES_COUNTRY', highest);
    },

    async highestDeathsCountry({ commit, state }) {
        const country = await state.allData;

        const highest = country.reduce( (max, map) => (max.deaths > map.deaths) ? max : map);

        await commit('SET_HIGHEST_DEATHS_COUNTRY', highest);
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
