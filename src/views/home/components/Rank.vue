<template>
    <div class="rank-wrap">
        <header-title title="排行榜" more-link="/ranking"></header-title>
        <ul class="rank-list-wrap">
            <li class="rank-item" v-for="(item, index) in RANKLIST" :key="index">
                <span :class="['rank-num', {'top': index < 3}]">{{ index + 1 }}</span>
                <a :href="`/bangumi/media/md${item.media_id}`" target="_blank" class="rank-link" :title="item.title">
                    <span class="rank-title">{{ item.title }}</span>
                    <span class="update">{{ epIndex(item) }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import HeaderTitle from './HeaderTitle.vue'
import { formatEp } from '../../../utils/format'
export default {
    name: 'Rank',
    computed: {
        RANKLIST() {
            return this.$store.state.home.rankList
        }
    },
    methods: {
        epIndex(item) {
            return 2 === item.is_finish ? `全${item.ep_total}话` : (-1 == item.ep_index ? `尚未更新` : `更新至${formatEp(item.ep_index)}`)
        }
    },
    components: {
        HeaderTitle
    }
}
</script>

<style lang="scss">
    .rank-wrap {
        position: relative;
    }
    .rank-list-wrap {
        display: grid;
        height: calc(100% - 46px);
        grid-template-rows: repeat(10, 1fr);
        background-color: #f6f7f8;
        border-radius: 6px;
        border: 1px solid #f1f2f3;
        box-sizing: border-box;
        .rank-item {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 8px;
            &:nth-of-type(2n + 1) {
                background-color: #fff;
            }
            &:hover {
                background-color: #eee;
                & .rank-title {
                    color: #00aeec;
                }
            }
            .rank-num {
                font-size: 15px;
                width: 18px;
                height: 18px;
                text-align: center;
                line-height: 18px;
                border-radius: 6px;
                font-weight: 600;
                // background-color: #fff;
                color: #999;
                &.top {
                    color: #00aeec;
                    // background-color: #00aeec;
                }
            }
            .rank-link {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: calc(100% - 22px);
            }
            .rank-title {
                font-size: 14px;
                font-weight: 500;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                min-width: 80px;
                max-width: 168px;
            }
            .update {
                font-size: 12px;
                color: #999;
                text-align: right;
                min-width: 80px;
            }
        }
    }
</style>