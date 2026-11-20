<template>
    <div class="ep-wrp">
        <div class="ep-nav" v-if="0 !== MEDIA_INFO.episodes.length">
            <slider-list :auto-index="currentIndex" :length="navList.length" slideType="click" >
                <ul class="ep-nav-list">
                    <li :class="['ep-nav-item', {on: currentIndex == index}]" v-for="(item, index) in navList" :key="index" @click="changeCurrentIndex(index)">{{ item }}</li>
                </ul>
            </slider-list>
            <ul class="mode-select clearfix">
                <li :class="[item.className, {selected: item.key == modeSelected}]" :title="item.name" v-for="(item, index) in modes" :key="index" @click="modeChange(item.key)"></li>
            </ul>
        </div>
        <div class="ep-list">
            <ul v-if="MEDIA_INFO.episodes.length > 0">
                <ep-item v-for="(item, index) in currentEpList" :key="item.ep_id" :ep-item="item" :mode="modeSelected" :index="index"></ep-item>
            </ul>
            <div class="ep-list-empty" v-else>
                <div class="ep-list-empty-img"></div>
                <p v-if="1 === MEDIA_INFO.publish.is_finish">{{ emptyTip }}</p>
                <p v-else>暂无可播的剧集哦，先去看看别的吧！</p>
            </div>
        </div>
    </div>
</template>

<script>
import { formatEp, formatDate } from '../../../../../utils/format'
import { mapGetters } from 'vuex'
import SliderList from '../../../../../components/common/SliderList'
import EpItem from './EpItem'
export default {
    name: 'Episode',
    data() {
        return {
            modes: [{
                key: 1,
                name: '详细模式',
                className: 'detail-mode'
            }, {
                key: 2,
                name: '精简模式',
                className: 'simple-mode'
            }],
            modeSelected: 1,
            timer: null,
            navLengthCal: null,
            navLength: 0,
            navList: [],
            epList: [],
            currentIndex: 0,
            currentEpList: [],
            firstLoad: true,
            isLess: '',
        }
    },
    beforeMount() {
        if (this.MEDIA_INFO.episodes && this.MEDIA_INFO.episodes.length > 0) {
            this.tempNavLength()
            this.epLess()
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 1400 && 12 !== this.navLength) {
                    if (null === this.timer) {
                        this.timer = setTimeout(() => {
                            this.tempNavLength()
                            this.epLess()
                            clearTimeout(this.timer)
                            this.timer = null
                        }, 1000)
                    }
                } else if (window.innerWidth < 1400 && 10 !== this.navLength) {
                    if (null === this.timer) {
                        this.timer = setTimeout(() => {
                            this.tempNavLength()
                            this.epLess()
                            clearTimeout(this.timer)
                            this.timer = null
                        }, 1000)
                    }
                }
            }, false)
        }
    },
    watch: {
        currentIndex() {
            this.createEpGroup()
        },
        modeSelected() {
            this.currentIndex = 0
            this.tempNavLength()
        }
    },
    computed: {
        ...mapGetters('bangumi', ['MEDIA_INFO', 'USER_STATE']),
        emptyTip() {
            if (!this.MEDIA_INFO.publish.pub_string && !this.MEDIA_INFO.publish.pub_time) {
                return '未知开播时间，敬请期待！'
            }
            return (this.MEDIA_INFO.publish.pub_string ? this.MEDIA_INFO.publish.pub_string : formatDate(this.MEDIA_INFO.publish.pub_time)) + '开播，敬请期待！'
        }
    },
    methods: {
        modeChange(key) {
            this.modeSelected = key
        },
        tempNavLength() {
            if (1 === this.modeSelected) {
                this.navLengthCal = window.innerWidth >= 1400 ? 8 : 6
            } else {
                this.navLengthCal = window.innerWidth >= 1400 ? 48 : 36
            }
            this.navLength = Math.ceil(this.MEDIA_INFO.episodes.length / this.navLength)
            this.createEpGroup()
            this.createNavList()
        },
        createEpGroup() {
            let tempArr = [],
                ep = [],
                index = 0,
                last_id = this.USER_STATE.progress && this.USER_STATE.progress.ep_id
            for (let i = 0; i < this.MEDIA_INFO.episodes.length; i++) {
                tempArr.push(this.MEDIA_INFO.episodes[i])
                this.MEDIA_INFO.episodes[i].ep_id == last_id && this.firstLoad && (this.firstLoad = false, this.currentIndex = ep.length)
                ++index !== this.navLengthCal && i !== this.MEDIA_INFO.episodes.length -1 || (index = 0, ep.push(tempArr), tempArr = [])
                this.epList = ep
                this.currentEpList = this.epList[this.currentIndex]
            }
        },
        createNavList() {
            let arr = []
            for (let item in this.epList) {
                let i = this.epList[item].length
                if (1 === i) {
                    arr.push(formatEp(this.epList[item][0].ep_index, this.MEDIA_INFO.type))
                } else {
                    arr.push(`${formatEp(this.epList[item][0].ep_index, this.MEDIA_INFO.type)}-${formatEp(this.epList[item][i-1].ep_index, this.MEDIA_INFO.type)}`)
                }
            }
            this.navList = arr
        },
        epLess() {

        },
        changeCurrentIndex(index) {
            this.currentIndex = index
        }
    },
    components: {
        SliderList,
        EpItem
    }
}
</script>

<style lang="scss">
    .ep-list-empty {
        height: 201px;
        p {
            text-align: center;
            font-size: 12px;
            color: #6d757a;
        }
        .ep-list-empty-img {
            height: 185px;
            background: url(../../../../../assets/images/nodata03.png) 50% no-repeat;
        }
    }
    .ep-wrp {
        position: relative;
        .ep-nav {
            padding-right: 129px;
            height: 25px;
            .ep-nav-list {
                height: 25px;
                white-space: nowrap;
                transition: transform .3s ease;
                .ep-nav-item {
                    position: relative;
                    display: inline-block;
                    vertical-align: top;
                    margin: 2px 30px 0 0;
                    line-height: 20px;
                    height: 20px;
                    border-bottom: 1px solid rgba(0,0,0,0);
                    font-size: 12px;
                    cursor: pointer;
                    &.on {
                        color: #00a1d6;
                        border-bottom-color: #00a1d6;
                        &::after {
                            content: '';
                            position: absolute;
                            left: 50%;
                            bottom: 0;
                            transform: translateX(-3px);
                            border-bottom: 3px solid #00a1d6;
                            border-top: 0;
                            border-left: 3px solid rgba(0,0,0,0);
                            border-right: 3px solid rgba(0,0,0,0);
                            box-sizing: border-box;
                        }
                    }
                }
            }
            .slider-contro {
                position: absolute;
                right: -66px;
                top: 3px;
                height: 18px;
                span {
                    display: inline-block;
                    vertical-align: top;
                    width: 26px;
                    height: 18px;
                    border-radius: 2px;
                    margin-right: 4px;
                    background-repeat: no-repeat;
                    background-color: #ccd0d7;
                    background-image: url(../../../../../assets/images/icons.png);
                    cursor: pointer;
                    transition: all .2s linear;
                    &.slider-prev {
                        background-position: -467px -1431px;
                    }
                    &.slider-next {
                        background-position: -466px -1367px;
                    }
                    &:hover {
                        background-color: #00a1d6;
                    }
                    &.disabled {
                        background-color: #dcdcdc;
                    }
                }
            }
        }
        .mode-select {
            position: absolute;
            right: 0;
            top: 4px;
            border-left: 1px solid #e5e9ef;
            li {
                width: 16px;
                height: 16px;
                margin-left: 10px;
                float: left;
                background-repeat: no-repeat;
                background-image: url("../../../../../assets/images/icons.png");
                cursor: pointer;
                &.detail-mode {
                    background-position: -279px -1815px;
                    &.selected, &:hover {
                        background-position: -343px -1815px;
                    }
                }
                &.simple-mode {
                    background-position: -281px -1880px;
                    &.selected, &:hover {
                        background-position: -345px -1880px;
                    }
                }
            }
        }
        .ep-list {
            clear: both;
            ul {
                margin: 0 -20px 0 0;
                height: auto;
            }
        }
    }
</style>