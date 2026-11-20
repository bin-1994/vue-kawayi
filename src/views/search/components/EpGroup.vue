<template>
    <div class="navigate-wrap">
        <div class="v-switcher" v-if="isShowBar">
            <slider-list :length="navGroup.length" slideType="click" :skew="50" :can-reset="true">
                <ul class="ep-list">
                    <li :class="['ep-item', {active: index == nowIndex}]" v-for="(item, index) in navGroup" :key="item.ep_id" @click="handleSwitchChange(index)"><span>{{ item.label }}</span></li>
                </ul>
            </slider-list>
        </div>
        <a :href="`/bangumi/play/ep${epList[0].ep_id}`" target="_blank" class="play-btn" v-if="epList.length == 1">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="play-btn-svg"><path d="M12.7005118,6.45096054 C14.1229144,7.30642257 14.121066,8.69451224 12.7005118,9.54886258 L4.57548779,14.4354182 C3.15308516,15.2908802 2,14.6503349 2,12.9807384 L2,3.01908474 C2,1.36022525 3.15493359,0.710054608 4.57548779,1.56440495 L12.7005118,6.45096054 Z"></path></svg>
        立即播放
        </a>

        <div class="ep-wrap" v-else-if="isFull">
            <a class="ep-item" v-for="item in epArr" :href="`/bangumi/play/ep${item.ep_id}`" target="_blank" :key="item.ep_id" :title="`${item.ep_index} ${item.title}`">{{ item.ep_index }}</a>
            <a class="ep-item" href="javascript:;" @click="switchShow">收起</a>
        </div>

        <div class="ep-wrap" v-else>
            <template v-if="showPagination">
            <a class="ep-item" v-for="item in navGroup[0].data.slice(0, 9)" :href="`/bangumi/play/ep${item.ep_id}`" target="_blank" :key="item.ep_id" :title="`${item.ep_index} ${item.title}`">{{ item.ep_index }}</a>
            <a class="ep-item" href="javascript:;" @click="switchShow">...</a>
            <a class="ep-item" v-for="item in last3ep" :href="`/bangumi/play/ep${item.ep_id}`" target="_blank" :key="item.ep_id" :title="`${item.ep_index} ${item.title}`">{{ item.ep_index }}</a>
            </template>
            <template v-else>
                <a class="ep-item" v-for="item in navGroup[0].data" :href="`/bangumi/play/ep${item.ep_id}`" target="_blank" :key="item.ep_id" :title="`${item.ep_index} ${item.title}`">{{ item.ep_index }}</a>
            </template>
        </div>
    </div>
</template>

<script>
import SliderList from '../../../components/common/SliderList'
export default {
    name: 'EpGroup',
    props: {
        epList: {
            default: [],
            type: Array
        }
    },
    data() {
        return {
            isFull: false,
            isShowBar: false,
            navIsBegin: true,
            navIsEnd: false,
            showNavSwitcher: true,
            navGroup: [],
            last3ep: [],
            tagArr: [],
            epArr: [],
            canRender: true,
            nowIndex: 0,
        }
    },
    computed: {
        showPagination() {
            return this.epArr.length >= 14
        }
    },
    created() {
        this.formatData(this.epList),
        this.canRender = true
    },
    methods: {
        carouselNav() {

        },
        handleHeaderMove() {

        },
        formatData(list) {
            let epLength = list.length
            epLength && (this.last3ep = list.slice(epLength - 3, epLength)),
            this.navGroup = this.arrGroup(list, 50)
            this.tagArr.push(this.navGroup[0].label),
            this.tagArr.push(this.navGroup[0].label),
            this.epArr = this.navGroup[0].data

            // console.log(this.)
        },
        arrGroup(list, limit) {
            let arr = []
            for (let i = 0; i < list.length; i += limit) {
                let nav = {
                    data: list.slice(i, i + limit)
                }
                nav.label = `${nav.data[0].ep_index}-${nav.data[nav.data.length - 1].ep_index}`
                arr.push(nav)
            }
            let last = arr[arr.length - 1]
            return 1 === last.data.length && (last.label = last.data[0].ep_index, arr.pop(), arr.push(last)), arr
        },
        switchShow() {
            this.isShowBar = !this.isShowBar,
            this.isFull = !this.isFull
        },
        handleSwitchChange(index) {
            // this.tagArr.push(this.navGroup[index].label),
            // this.navIsEnd = index === this.navGroup.length - 1,
            // this.navIsBegin = 0 === index,
            // this.tagArr.length > 2 && this.tagArr.shift()
            this.nowIndex = index, 
            this.epArr = this.navGroup[index].data
        }
    },
    components: {
        SliderList
    }
}
</script>

<style lang="scss">
    .navigate-wrap {
        position: relative;
        padding-top: 26px;
        .play-btn {
            margin-top: 16px;
            float: left;
            width: 110px;
            height: 32px;
            border-radius: 4px;
            font-size: 14px;
            line-height: 32px;
            text-align: center;
            color: #00a1d6;
            border: 1px solid #00a1d6;
            .play-btn-svg {
                display: inline-block;
                width: 16px;
                height: 16px;
                fill: #00a1d6;
                top: 2px;
                position: relative;
            }
            &:hover {
                background-color: #00a1d6;
                color: #fff;
                .play-btn-svg {
                    fill: #fff;
                }
            }
        }
    }
    .ep-wrap {
        padding-top: 2px;
        .ep-item {
            float: left;
            width: 42px;
            height: 42px;
            border-radius: 2px;
            border: 1px solid #e5e9ef;
            line-height: 42px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 14px;
            color: #6c7579;
            text-align: center;
            margin-left: 6px;
            margin-top: 6px;
            border-radius: 6px;
            &:nth-child(16n+1) {
                margin-left: 0;
            }
            &:first-child {
                margin-left: 0;
            }
            &:hover {
                background-color: #00a1d6;
                color: #fff;
            }
        }
    }
    .v-switcher {
        position: relative;
        height: 27px;
        padding-right: 63px;
        margin-top: -27px;
        &:before {
            position: absolute;
            content: '';
            background-color: #e5e9ef;
            left: 0;
            right: 0;
            bottom: 0;
            height: 1px;
        }
        .ep-list {
            position: relative;
            white-space: nowrap;
            display: flex;
            white-space: nowrap;
            transition: transform .3s ease;
            text-align: left;
            flex-direction: row;
            transition-property: transform;
            transition-timing-function: cubic-bezier(.645,.045,.355,1);
            .ep-item {
                display: inline-block;
                font-size: 12px;
                color: #000;
                cursor: pointer;
                padding: 0 14px;
                border-bottom: 1px solid transparent;
                box-sizing: border-box;
                height: 27px;
                line-height: 27px;
                span {
                    display: block;
                    line-height: 12px;
                }
                &.active, &:hover {
                    color: #00a1d6;
                    border-bottom-color: #00a1d6;
                }
                &.active:after {
                    display: block;
                    content: '';
                    width: 1px;
                    left: 50%;
                    position: relative;
                    height: 7px;
                    border: 4px solid transparent;
                    border-bottom-color: #00a1d6;
                    transform: translateX(-50%);
                }
            }
        }
        .slider-contro {
            position: absolute!important;
            right: -66px!important;
            top: -4px!important;
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
                background-image: url(../../../assets/images/icons.png);
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
</style>