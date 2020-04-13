<template>
    <div class="select-country">
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            country: [],
        }
    },

    computed: {
        ...mapGetters('covid', ['getCovidData']),
    },

    async mounted() {
        await this.$store.dispatch('covid/allCovid');
    },
}
</script>

<style lang="scss">
    .country-select {
    position: absolute;
    z-index: 99999;
    background: #396b967d;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    top: 50px;
    left: 5%;

        select {
            border: 0;
            padding: 10px;
        }
    }
</style>