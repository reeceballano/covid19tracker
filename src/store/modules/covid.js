import axios from 'axios'


// STATE
const state = {
    allData: [],
}

// GETTERS
const getters = {
    getCovidData: state => {
        return state.allData;
    },

}

// MUTATIONS
const mutations = {
    SET_COVID(state, allData) {
        state.allData = allData;
    },

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

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
