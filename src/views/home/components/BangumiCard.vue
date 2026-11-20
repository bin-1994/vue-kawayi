<template>
    <div class="bangumi-card">
        <div :class="['time-line-wrap', {empty: item.pub_string}]">
            <div class="date">{{ formatDate }}</div>
            <div class="line">
                <div class="point-wrap">
                    <span class="point"></span>
                </div>
            </div>
        </div>
        <a class="bangumi-template" :href="`/bangumi/media/md${item.media_id}`" target="_blank">
            <div class="bangumi-cover">
                <lazy-img :src="item.cover"></lazy-img>
            </div>
            <div class="bangumi-mask"></div>
        </a>
        <div class="bangumi-info-wrap">
            <a class="bangumi-info-title" :href="`/bangumi/media/md${item.media_id}`" target="_blank" :title="item.title">{{ item.title }}</a>
            <a class="bangumi-info-sub-title" :href="`/bangumi/media/md${item.media_id}`" target="_blank">{{ item.subtitle }}</a>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatNum } from '../../../utils/format'
import LazyImg from '../../../components/common/LazyImg.vue'
export default {
    name: 'BangumiCard',
    props: ['item'],
    computed: {
        follows() {
            return this.USER_INFO ? formatNum(this.item.series_follow) : '-'
        },
        ...mapGetters(['USER_INFO']),
        formatDate() {
            if (this.item.pub_string) {
                return `敬请期待`
            }

            let dayEqual = (thisDay, thatDay) => {
                return thisDay.getFullYear() === thatDay.getFullYear() && thisDay.getMonth() === thatDay.getMonth() && thisDay.getDate() === thatDay.getDate()
            }
            let str = '',
            date = new Date(this.item.pub_time * 1000),
            now = new Date(),
            today = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
            yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1),
            updateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate())

            if (dayEqual(updateTime, yesterday)) {
                str = '昨天'
            } else if (dayEqual(updateTime, today)) {
                str = '今天'
            } else {
                str = `${date.getMonth() + 1}月${date.getDate()}日`
            }
            return str
        }
    },
    components: {
        LazyImg
    }
}
</script>

<style lang="scss">
    .bangumi-card {
        position: relative;
        border-radius: 6px;
        width: 100%;
        .time-line-wrap {
            position: relative;
            height: 70px;
            text-align: center;
            &.empty {
                .date {
                    color: #9499a0;
                }
            }
            .date {
                height: 18px;
                line-height: 18px;
                font-size: 16px;
                color: #222;
                margin-bottom: 6px;
                transform: translateY(11px);
                font-weight: 500;
            }
            .line {
                position: absolute;
                left: 0;
                right: 0;
                top: 53px;
                height: 1px;
                background-color: #e5e9ef;
            }
            .point-wrap {
                position: absolute;
                top: -2px;
                left: 50%;
                margin-left: -14px;
                width: 28px;
                height: 5px;
                background-color: #fff;
            }
            .point {
                display: block;
                margin: 0 auto;
                width: 5px;
                height: 5px;
                border-radius: 50%;
                background-color: #ccd0d7;
            }
        }
        .bangumi-template {
            display: block;
            position: relative;
            padding-top: 134%;
            background-color: #f1f2f3;
        }
        .bangumi-cover {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 1;
            border-radius: 6px;
            overflow: hidden;
            img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .bangumi-mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            pointer-events: none;
        }
        .bangumi-info-wrap {
            margin-top: 10px;
        }
        .bangumi-info-title {
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-word;
            line-break: anywhere;
            -webkit-line-clamp: 1;
            color: #18191C;
            font-size: 15px;
            line-height: 22px;
            &:hover {
                color: #00aeec;
            }
        }
        .bangumi-info-sub-title {
            margin-top: 4px;
            font-size: 13px;
            line-height: 16px;
            color: #9499a0;
            display: block;
            &:hover {
                color: #00aeec;
            }
        }
    }
</style>