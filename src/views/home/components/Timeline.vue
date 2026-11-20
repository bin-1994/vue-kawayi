<template>
    <div class="timeline-wrap">
        <header-title title="番剧" more-link="/movie/index#category=1&version=1&area=1&state=0&month=0&year=0&style=0&order=2&sort=0&page=1">
            <ul class="week-tabs">
                <li :class="['week-item', {'active': selectIndex == item.key}]" v-for="(item, index) in weekList" :key="index" @click="chickHandle(item.key)">{{ item.value }}</li>
            </ul>
        </header-title>
        <div class="timeline-card-wrap">
            <skeleton :length="10"></skeleton>
            <div class="timeline-data">
                <div :class="['timeline-grid', {first: first}]">
                    <video-card v-for="item in timeline[selectIndex]" :key="item.media_id" :item="item" :show-cover="showCover"></video-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderTitle from './HeaderTitle.vue'
import VideoCard from './VideoCard.vue'
import Skeleton from './Skeleton.vue'
export default {
    name: 'Timeline',
    data() {
        return {
            weekList: [
                {key: -1, value: '最近更新'},
                {key: 1, value: '周一'},
                {key: 2, value: '周二'},
                {key: 3, value: '周三'},
                {key: 4, value: '周四'},
                {key: 5, value: '周五'},
                {key: 6, value: '周六'},
                {key: 0, value: '周日'},
            ],
            selectIndex: -1,
            timeline: {},
            showCover: true,
            first: true
        }
    },
    created() {
        this.$set(this.timeline, this.selectIndex, this.cardData(this.TIMELINE))
    },
    computed: {
        TIMELINE () {
            return this.$store.state.home.timeline
        }
    },
    methods: {
        chickHandle(index) {
            this.first = (index == -1) ? true : false
            this.selectIndex = index
            this.showCover = (this.selectIndex == -1 ? true : false)
            this.$set(this.timeline, this.selectIndex, this.cardData(this.TIMELINE))
        },
        cardData(list) {
            let array = [],
            copy = [].concat(list)

            if (this.selectIndex == -1)
                return copy.splice(0, 12)

            copy.sort((a, b) => {
                return b.series_follow - a.series_follow
            })
            for (let i = 0; i < copy.length; i++) {
                copy[i].week === this.selectIndex && array.push(copy[i])
            }
            return array
        }
    },
    components: {
        HeaderTitle,
        VideoCard,
        Skeleton
    }
}
</script>

<style lang="scss">
    .timeline-wrap {
        position: relative;
        min-height: 400px;
        grid-column: span 6;
        .week-tabs {
            position: relative;
            background-color: #f6f7f8;
            border-radius: 14px;
            color: #61666d;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .week-item {
                padding: 6px 15px;
                border-radius: 14px;
                font-size: 14px;
                cursor: pointer;
                &.active {
                    background-color: #00aeec;
                    color: #fff;
                }
            }
        }
        .timeline-card-wrap {
            position: relative;
            overflow-x: hidden;
            overflow-y: auto;
            overflow: -moz-scrollbars-none;
            -ms-overflow-style: none;
            &::-webkit-scrollbar {
                width: 0;
            }
        }
        .timeline-data {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            box-sizing: border-box;
        }
        .timeline-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            grid-column: span 6;
            grid-gap: 20px 12px;
            // &>div:nth-of-type(1n + 13) {
            //     display: none!important;;
            // }
        }
    }
</style>
