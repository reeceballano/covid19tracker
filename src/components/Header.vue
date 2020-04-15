<template>
    <div class="header" v-if="!getIsLoading">
        <div class="container">
            <div class="columns">
                <div class="column is-4 highest-cases">
                    <h6 class="title is-6">Highest Cases:</h6>
                    <img width="30px" :src="countryFlag.cases">

                    <h3><strong>Country:</strong> {{ getHighestCase.country }}</h3>  
                    <h3><strong>Total Cases:</strong> {{ getHighestCase.cases }}</h3>   
                </div>

                <div class="column is-4 highest-recoveries">
                    <h6 class="title is-6">Highest Recoveries:</h6>
                    <img width="30px" :src="countryFlag.cases">

                    <h3><strong>Country:</strong> {{ getHighestCase.country }}</h3>  
                    <h3><strong>Total Cases:</strong> {{ getHighestCase.cases }}</h3>
                </div>
                <div class="column is-4 highest-deaths">
                    <h6 class="title is-6">Highest Deaths:</h6>
                    <img width="30px" :src="countryFlag.cases">

                    <h3><strong>Country:</strong> {{ getHighestCase.country }}</h3>  
                    <h3><strong>Total Cases:</strong> {{ getHighestCase.cases }}</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            countryFlag: {
                cases: '',
                deaths: '',
                recoveries: '',
            }
        }
    },

    computed: {
        ...mapGetters('covid', ['getCovidData', 'getHighestCase', 'getIsLoading']),

    },

    async mounted() {
        await this.$store.dispatch('covid/allCovid');
        await this.$store.dispatch('covid/highestCasesCountry');
        this.getCasesFlag();
    },

    methods: {
        getCasesFlag() {
            const data = this.getHighestCase;
            
            this.countryFlag.cases = data.countryInfo.flag;
        }
    }
}
</script>

<style lang="scss">
    @media screen and(max-width: 500px) {
        .header {
            padding: 30px 0px;
        }

        .columns {
            display: flex;

            .column {
                width: 33%;
                padding: 6px 20px;

                h3,
                .title {
                    font-size: 10px;
                }
            }
        }
    }

    .header {
        background: #000000b6;
        padding: 50px 0px;
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 9999;
    }

    .column {
        margin-right: 1px;

    }

    .highest-cases {
        background: #ff9800;
        color: #fff;

        .title {
            margin-bottom: 10px;
            font-size: 12px;
            font-weight: 700;
        }

        h3 {
            font-size: 12px;
        }
    }

    .highest-recoveries {
        background: #8bc34a;
        color: #fff;

        .title {
            margin-bottom: 10px;
            font-size: 12px;
            font-weight: 700;
        }

        h3 {
            font-size: 12px;
        }
    }

    .highest-deaths {
        background: #f44336;
        color: #fff;

        .title {
            margin-bottom: 10px;
            font-size: 12px;
            font-weight: 700;
        }

        h3 {
            font-size: 12px;
        }
    }
</style>