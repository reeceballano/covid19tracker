<template>
    <div class="header">
        <div class="container">
            <div class="columns">
                <div class="column">{{ getHighestCase }}</div>
                <div class="column">2</div>
                <div class="column">3</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('covid', ['getHighestCase']),
    }
}
</script>

<style lang="scss">
    .header {
        background: #00000059;
        padding: 50px 0px;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 9999;
    }
</style>