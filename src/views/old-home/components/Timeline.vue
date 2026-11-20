<template>
    <div class="time-line">
        <header class="storey-title">
            <div class="l-con">
                <svg class="svg-icon" viewBox="0 0 1024 1024"><path d="M588.8 359.68l-12.032-7.424 150.272-206.592a30.976 30.976 0 0 0-51.2-36.352l-153.6 210.176L281.6 170.24a30.976 30.976 0 1 0-33.024 52.736L486.4 369.92l-22.784 31.488a30.976 30.976 0 1 0 51.2 36.352l25.6-35.072 16.128 9.728A30.976 30.976 0 1 0 588.8 359.68z" fill="#FB813A"></path><path d="M763.648 850.688m-53.248 0a53.248 53.248 0 1 0 106.496 0 53.248 53.248 0 1 0-106.496 0Z" fill="#FB813A"></path><path d="M261.12 797.44a53.248 53.248 0 1 0 53.504 53.248 53.248 53.248 0 0 0-53.504-53.248z" fill="#FB813A"></path><path d="M141.312 314.368m92.928 0l556.288 0q92.928 0 92.928 92.928l0 360.704q0 92.928-92.928 92.928l-556.288 0q-92.928 0-92.928-92.928l0-360.704q0-92.928 92.928-92.928Z" fill="#FDDE80"></path><path d="M520.448 575.232m-128.256 0a128.256 128.256 0 1 0 256.512 0 128.256 128.256 0 1 0-256.512 0Z" fill="#FFFFFF"></path><path d="M476.928 546.56c0-26.88 19.2-37.632 42.24-25.6l49.664 28.672a25.6 25.6 0 0 1 0 48.64l-49.664 28.672c-23.04 13.568-42.24 2.56-42.24-24.32z" fill="#FB813A"></path></svg>
                <div class="time-line-title">番剧</div>
                <div class="tab-switch">
                    <div :class="['tab-switch-item', {on: selectedTab == item.value}]" v-for="(item, index) in weekList" :key="index" @click="selectTab(item.value)">{{ item.name }}</div>
                </div>
            </div>
            <a href="/movie/index#category=0&version=0&area=0&state=1&month=0&year=0&style=0&order=2&sort=0&page=1" target="_blank" class="more-link">查看更多<i class="iconfont icon-arrow-right"></i></a>
        </header>
        <div class="zone-list-box custom-scrollbar">
            <timeline-item v-for="(item, index) in timeline[selectedTab]" :key="index" :item="item"></timeline-item>
            <div class="empty-data" v-if="!timeline[selectedTab] && 0 == timeline[selectedTab].length">
                <p>今天没有动画更新</p>
            </div>
        </div>
    </div>
</template>

<script>
import TimelineItem from './TimelineItem'
export default {
    name: 'Timeline',
    data() {
        return {
            weekList: [
                {name: '最新', selectName: '最新', value: -1}, 
                {name: '周一', selectName: '月曜日', value: 1}, 
                {name: '周二', selectName: '火曜日', value: 2}, 
                {name: '周三', selectName: '水曜日', value: 3}, 
                {name: '周四', selectName: '木曜日', value: 4}, 
                {name: '周五', selectName: '金曜日', value: 5}, 
                {name: '周六', selectName: '土曜日', value: 6}, 
                {name: '周日', selectName: '日曜日', value: 0}, 
            ],
            selectedTab: -1,
            timeline: {}
        }
    },
    created() {
        this.$set(this.timeline, this.selectedTab, this.cardData(this.TIMELINE))
    },
    computed: {
        TIMELINE () {
            return this.$store.state.home.timeline
        }
    },
    methods: {
        selectTab(value) {
            this.selectedTab = value
            this.$set(this.timeline, this.selectedTab, this.cardData(this.TIMELINE))
        },
        cardData(list) {
            let array = [],
            copy = [].concat(list)

            if (this.selectedTab == -1)
                return copy.splice(0, 20)

            copy.sort((a, b) => {
                return b.series_follow - a.series_follow
            })
            for (let i = 0; i < copy.length; i++) {
                copy[i].week === this.selectedTab && array.push(copy[i])
            }
            return array
        }
    },
    components: {
        TimelineItem
    }
}
</script>

<style lang="scss">
    .time-line {
        .storey-title {
            display: flex;
            align-content: center;
            justify-content: space-between;
            margin-bottom: 16px;
            height: 36px;
            .l-con {
                display: inline-flex;
                .svg-icon {
                    margin-right: 6px;
                    overflow: hidden;
                    width: 36px;
                    height: 36px;
                    vertical-align: middle;
                    fill: currentColor;
                }
            }
            .time-line-title {
                margin: 0 20px 0 6px;
                vertical-align: bottom;
                font-size: 20px;
                line-height: 36px;
            }
            .more-link {
                height: 30px;
                border: 1px solid #00a1d6;
                border-radius: 2px;
                background: #fff;
                text-align: center;
                padding: 0  14px;
                font-size: 14px;
                color: #00a1d6;
                display: flex;
                align-items: center;
                transition: all .2s;
                line-height: 16px;
                box-sizing: border-box;
                &:hover {
                    color: #fff;
                    background: #00a1d6;
                }
            }
        }
        .tab-switch {
            display: flex;
            margin-left: 4px;
            .tab-switch-item {
                font-size: 14px;
                line-height: 30px;
                height: 30px;
                margin-right: 24px;
                cursor: pointer;
                &.on {
                    border-bottom: 1px solid #00a1d6;
                    color: #00a1d6;
                }
            }
        }
            .empty-data {
                height: 180px;
                background-image: url(../../../assets/images/bgm-nodata.png);
                background-repeat: no-repeat;
                background-position: center -10px;
                p {
                    text-align: center;
                    padding-top: 40px;
                    color: #99a2aa;
                }
            }
    }
</style>