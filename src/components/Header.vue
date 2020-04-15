<template>
    <div class="header" v-if="!getIsLoading">
        <div class="container">
            <div class="columns">
                <div class="column is-4 highest-cases">
                    <h6 class="title is-6">Highest Cases:</h6>
                    <img width="30px" :src="countryFlag.cases">

                    <h3><strong>Country:</strong> {{ getHighestCase.country }}</h3>  
                    <h3><strong>Total Cases:</strong> <span id="cases"></span></h3>  
                    
                </div>

                <div class="column is-4 highest-recoveries">
                    <h6 class="title is-6">Highest Recoveries:</h6>
                    <img width="30px" :src="countryFlag.recoveries">

                    <h3><strong>Country:</strong> {{ getHighestRecoveries.country }}</h3>  
                    <h3><strong>Total Cases:</strong> <span id="recoveries"></span></h3>
                </div>
                <div class="column is-4 highest-deaths">
                    <h6 class="title is-6">Highest Deaths:</h6>
                    <img width="30px" :src="countryFlag.deaths">

                    <h3><strong>Country:</strong> {{ getHighestDeaths.country }}</h3>  
                    <h3><strong>Total Cases:</strong> <span id="deaths"></span></h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { CountUp } from 'countup.js';

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
        ...mapGetters('covid', ['getCovidData', 'getHighestCase', 'getHighestRecoveries', 'getHighestDeaths', 'getIsLoading']),

    },

    async mounted() {
        await this.$store.dispatch('covid/allCovid');
        await this.$store.dispatch('covid/highestCasesCountry');
        await this.$store.dispatch('covid/highestRecoveriesCountry');
        await this.$store.dispatch('covid/highestDeathsCountry');
        this.getCasesFlag();
        this.getRecoveriesFlag();
        this.getDeathsFlag();
        this.countCases('cases', this.getHighestCase.cases);
        this.countCases('recoveries', this.getHighestRecoveries.recovered);
        this.countCases('deaths', this.getHighestDeaths.deaths);
    },

    methods: {
        getCasesFlag() {
            const data = this.getHighestCase;
            
            this.countryFlag.cases = data.countryInfo.flag;
        },

        getRecoveriesFlag() {
            const data = this.getHighestRecoveries;
            
            this.countryFlag.recoveries = data.countryInfo.flag;
        },

        getDeathsFlag() {
            const data = this.getHighestDeaths;
            
            this.countryFlag.deaths = data.countryInfo.flag;
        },

        countCases(id, cases) {
            const countUp = new CountUp(id, cases);
            countUp.start();
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