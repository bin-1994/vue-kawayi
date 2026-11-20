<template>
    <div class="video-card">
        <a class="video-template" :href="`/bangumi/media/md${item.media_id}`" target="_blank">
            <div class="video-cover">
                <lazy-img :src="showCover ? item.video_cover : item.cover"></lazy-img>
            </div>
            <div class="video-mask">
                <div class="video-count-wrap">
                    <div class="video-count-info">
                        <span class="video-count-item"><img :src="icons.play" />{{ views }}</span>
                        <span class="video-count-item"><img :src="icons.like" />{{ follows }}</span>
                    </div>
                    <div class="video-time">{{ updateTime }}</div>
                </div>
            </div>
        </a>
        <div class="video-info-wrap">
            <a class="video-info-title" :href="link" target="_blank" :title="item.title">{{ item.title }}</a>
            <a :class="['video-info-sub-title', {new: item.new}]" :href="link" target="_blank">{{ epIndex }}</a>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatEp, formatNum, formatFriendlyTime } from '../../../utils/format'
import LazyImg from '../../../components/common/LazyImg.vue'

import PlayIcon from '../../../assets/icons/play.svg'
import LikeIcon from '../../../assets/icons/like.svg'

export default {
    name: 'VideoCard',
    props: {
        item: {
            require: true,
        },
        showCover: {
            default: true,
        }
    },
    data() {
        return {
            icons: {
                play: PlayIcon,
                like: LikeIcon
            }
        }
    },
    computed: {
        epIndex() {
            return 2 === this.item.is_finish ? `全${this.item.ep_total}话` : (-1 == this.item.ep_index ? `尚未更新` : `更新至${formatEp(this.item.ep_index)}`)
        },
        link() {
            return this.item.ep_id ? `/bangumi/play/ep${this.item.ep_id}` : `/bangumi/media/md${this.item.media_id}`
        },
        views() {
            return this.USER_INFO ? formatNum(this.item.views) || `-` : '-'
        },
        follows() {
            return this.USER_INFO ? formatNum(this.item.series_follow) || `-` : '-'
        },
        updateTime() {
            return this.item.update_time ? formatFriendlyTime(new Date(this.item.update_time * 1000)) : ``
        },
        ...mapGetters(['USER_INFO'])
    },
    components: {
        LazyImg
    }
}
</script>

<style lang="scss">
    .video-card {
        position: relative;
        border-radius: 6px;
        width: 100%;
        .video-template {
            position: relative;
            padding-top: 56.25%;
            background-color: #f1f2f3;
            display: block;
        }
        .video-cover {
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
        .corner-tag {
            position: absolute;
            top: 3px;
            right: 3px;
            width: 32px;
            height: 18px;
            line-height: 18px;
            background-color: #fb7299;
            color: #fff;
            text-align: center;
            z-index: 2;
            border-radius: 4px;
            font-size: 14px;
        }
        .video-mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            pointer-events: none;
        }
        .video-count-wrap {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 2;
            box-sizing: border-box;
            padding: 16px 8px 6px;
            border-bottom-right-radius: 8px;
            border-bottom-left-radius: 8px;
            background-image: linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,.5) 100%);
            color: #fff;
            font-size: 13px;
            line-height: 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .video-count-info {
                min-width: 0;
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                .video-count-item {
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                    margin-right: 12px;
                }
            }
        }
        .video-info-wrap {
            margin-top: 10px;
        }
        .video-info-title {
            display: block;
            white-space: normal;
            -webkit-line-clamp: 1;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
            box-sizing: border-box;
            color: #18191C;
            font-size: 15px;
            line-height: 22px;
            height: 22px;
            &:hover {
                color: #00aeec;
            }
        }
        .video-info-sub-title {
            margin-top: 4px;
            font-size: 13px;
            line-height: 16px;
            color: #9499a0;
            display: block;
            &:hover {
                color: #00aeec;
            }
            &.new {
                color: #fb7299;
            }
        }
    }
</style>