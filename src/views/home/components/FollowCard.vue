<template>
    <div class="follow-card">
        <a class="video-template" :href="`/bangumi/media/md${item.media_id}`" target="_blank">
            <div class="video-cover">
                <lazy-img :src="item.video_cover"></lazy-img>
            </div>
            <div class="video-mask">
                <div class="video-count-wrap">
                    <div class="video-info">{{ epWatch }}</div>
                </div>
            </div>
        </a>
        <div class="video-info-wrap">
            <a class="video-info-title" :href="last" target="_blank" :title="item.title">{{ item.title }}</a>
            <a :class="['video-info-sub-title', {'new': item.not_watch}]" :href="last" target="_blank">{{ epIndex }}</a>
        </div>
    </div>
</template>

<script>
import { formatEp, formatTime } from '../../../utils/format'
import LazyImg from '../../../components/common/LazyImg.vue'
export default {
    name: 'FollowCard',
    props: {
        item: {
            require: true,
        },
    },
    computed: {
        epIndex() {
            return 2 === this.item.is_finish ? `全${this.item.ep_total}话` : (-1 == this.item.ep_index ? `尚未更新` : `更新至${formatEp(this.item.ep_index)}`)
        },
        epWatch() {
            return 3 == this.item.follow_state ? `看完了` : this.item.ep_id && this.item.watch_ep ? `看到${this.item.watch_ep} ${ this.item.progress ? formatTime(this.item.progress) : ''}` : `尚未观看`
        },
        last() {
            return this.item.ep_id ? `/bangumi/play/ep${this.item.ep_id}` : 'javascript:void(0);'
        }
    },
    components: {
        LazyImg
    }
}
</script>

<style lang="scss">
    .follow-card {
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
        }
        .new {
            color: #fb7299;
        }
    }
</style>