<template>
    <div class="coming-soon-wrap">
        <header-title title="即将开播" more-link="/movie/index#category=1&version=1&area=1&state=0&month=0&year=0&style=0&order=1&sort=0&page=1"></header-title>
        <div class="grid-bangumi">
            <bangumi-card v-for="(item, index) in COMINGSOON" :key="index" :item="item"></bangumi-card>
        </div>
    </div>
</template>

<script>
import HeaderTitle from './HeaderTitle.vue'
import BangumiCard from './BangumiCard.vue'
export default {
    computed: {
        COMINGSOON() {
            return this.$store.state.home.onlineList
        },
    },
    components: {
        HeaderTitle,
        BangumiCard,
    }
}
</script>

<style lang="scss">
    .coming-soon-wrap {
        position: relative;
        grid-column: span 7;
        overflow: hidden;
        .grid-bangumi {
            width: 100%;
            display: grid;
            grid-column: span 8;
            grid-template-columns: repeat(8, 1fr);
            grid-gap: 20px 12px;
            &>div:nth-of-type(1n + 9) {
                display: none!important;
            }
        }
    }
</style>