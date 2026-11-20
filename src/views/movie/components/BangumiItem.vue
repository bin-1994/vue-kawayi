<template>
    <li class="bangumi-item">
        <a :href="`/bangumi/media/md${item.media_id}`" target="_blank" class="cover-wrapper">
            <lazy-img :src="item.cover"></lazy-img>
            <div class="shadow">{{ shadowText }}</div>
            <span class="corner-tag" v-if="item.bd">BDRip</span>
        </a>
        <a :href="`/bangumi/media/md${item.media_id}`" target="_blank" class="bangumi-title">
            <span class="series" v-show="4 == sortType && item.series_count > 1">系列</span>
            {{ item.title }}
        </a>
        <p class="pub-info">{{ item.subtitle ? item.subtitle : pubInfo }}</p>
    </li>
</template>

<script>
import LazyImg from '../../../components/common/LazyImg'
import { formatNum, formatEp } from '../../../utils/format'
export default {
    name: 'BangumiItem',
    props: {
        item: {
            type: Object,
            required: true
        },
        sortType: {
            type: Number,
            required: true
        }
    },
    serverCacheKey: props => props.item.media_id,
    computed: {
        shadowText() {
            switch (this.sortType) {
                case 0:
                    return  this.item.pub_string ? `${this.item.pub_string}开播` : this.formatTime(this.item.pub_time, '开播', false)
                    break
                case 1:
                    return this.formatTime(this.item.update_time, '更新', true)
                    break
                case 2:
                    return `暂无评分`
                    break
                case 3:
                    return `${formatNum(this.item.series_follow)}人追番`
                    break
                case 4:
                    return `${formatNum(this.item.views)}人气`
                    break
                case 5:
                    return `2%心目中的神作`
                    break
                default:
                    return ''
            }
        },
        pubInfo() {
            return 2 === this.item.is_finish ? `全${this.item.ep_total}话` : (-1 == this.item.ep_index ? `尚未开播` : `更新至${formatEp(this.item.ep_index)}`)
        }
    },
    methods: {
        formatTime(time, str, showTime) {
            let dayEqual = (thisDay, thatDay) => {
                return thisDay.getFullYear() === thatDay.getFullYear() && thisDay.getMonth() === thatDay.getMonth() && thisDay.getDate() === thatDay.getDate()
            }
            if (time = 'string' == typeof time ? parseInt(time) : time) {
                let datestr = '',
                    now = new Date(),
                    date = new Date(time * 1000),
                    today = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
                    yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1),
                    updateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                    thisYear = new Date(now.getFullYear(), '1', '1'),
                    updateYear = new Date(date.getFullYear(), '1', '1'),
                    hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
                    minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
                let hms = showTime ?  hour + ':' + minutes : ''
                if (dayEqual(updateTime, yesterday)) {
                    datestr = '昨天' + hms
                } else if (dayEqual(updateTime, today)) {
                    datestr = '今天' + hms
                } else if (dayEqual(thisYear, updateYear)) {
                    datestr = (date.getMonth() + 1) + '月' + date.getDate() + '日';
                } else {
                    datestr = date.getFullYear() + '年' + (date.getMonth() + 1) + '月';
                }
                return datestr + str;
            } else {
                return '--月--日' + str;
            }
        }
    },
    components: {
        LazyImg
    }
}
</script>

<style lang="scss">
    .bangumi-item {
        width: 160px;
        height: 304px;
        margin-right: 20px;
        display: inline-block;
        vertical-align: top;
        .cover-wrapper {
            position: relative;
            display: block;
            width: 100%;
            height: 214px;
            border-radius: 4px;
            overflow: hidden;
            .shadow {
                position: absolute;
                padding: 28px 10px 0;
                color: #fff;
                bottom: 0;
                left: 0;
                width: 100%;
                box-sizing: border-box;
                height: 50px;
                line-height: 1;
                font-size: 12px;
                white-space: nowrap;
                overflow: hidden;
                background: linear-gradient(0deg,rgba(0,0,0,.6) 0,rgba(0,0,0,0));
                filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=rgb(0,255,255),ff,endColorstr=rgba(153,0,0,0),0,GradientType=0);
            }
            .corner-tag {
                position: absolute;
                width: 60px;
                height: 24px;
                line-height: 24px;
                border-radius: 0 0 0 4px;
                top: 0;
                right: 0;
                font-size: 12px;
                text-align: center;
                background-color: rgb(0, 192, 255);
                color: #fff;
            }
        }
        .bangumi-title {
            display: block;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            word-break: break-word;
            word-wrap: break-word;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #222;
            max-height: 44px;
            font-size: 14px;
            margin-top: 10px;
            line-height: 22px;
            &:hover {
                color: #00a1d6;
            }
            .series {
                border: 1px solid #fb7299;
                color: #fb7299;
                // margin-right: 2px;
                border-radius: 2px;
                padding: 0 5px;
                font-size: 12px;
                // line-height: 19px;
            }
        }
        .pub-info {
            height: 18px;
            line-height: 18px;
            overflow: hidden;
            color: #99a2aa;
            font-size: 12px;
            white-space: nowrap;
            text-overflow: ellipsis
        }
    }
</style>