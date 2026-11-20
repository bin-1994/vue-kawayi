<template>
    <div class="follow-wrap">
        <header-title title="我的追番" more-link="/member/bangumi"></header-title>
        <div class="follow-grid">
            <follow-card v-for="(item, index) in list" :key="index" :item="item"></follow-card>
        </div>
    </div>
</template>

<script>
import HeaderTitle from './HeaderTitle.vue'
import FollowCard from './FollowCard.vue'
export default {
    name: 'Follow',
    props: {
        list: {
            default: [],
            type: Array
        }
    },
    components: {
        HeaderTitle,
        FollowCard
    }
}
</script>

<style lang="scss">
    .follow-wrap {
        grid-column: span 7;
        .follow-grid {
            display: grid;
            grid-column: span 7;
            grid-template-columns: repeat(7, 1fr);
            grid-gap: 20px 12px;
        }
    }
</style>