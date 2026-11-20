<template>
    <div class="video-card">
        <a :href="`/bangumi/media/md${item.media_id}`" target="_blank" class="card-pic">
            <lazy-img :src="item.video_cover" :alt="item.title"></lazy-img>
            <div class="count">
                <div class="left">
                    <span><i class="iconfont icon-play-num"></i>{{ views }}</span>
                </div>
                <!-- <div class="right">1小时前</div> -->
            </div>
        </a>
        <a :href="`/bangumi/media/md${item.media_id}`" target="_blank" class="title" :title="item.title">{{ item.title }}</a>
        <p class="update">{{ epIndex }}</p>
    </div>
</template>

<script>
import { formatEp, formatNum } from '../../../utils/format'
import LazyImg from '../../../components/common/LazyImg'
import { mapGetters } from 'vuex'
export default {
    name: 'DynamicItem',
    props: ['item'],
    computed: {
        epIndex() {
            return 2 === this.item.is_finish ? `全${this.item.ep_total}话` : (-1 == this.item.ep_index ? `尚未更新` : `更新至${formatEp(this.item.ep_index)}`)
        },
        views() {
            return this.USER_INFO ? formatNum(this.item.views) : '-'
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
        width: 206px;
        .card-pic {
            position: relative;
            display: block;
            width: 100%;
            height: 128px;
            overflow: hidden;
            border-radius: 2px;
            &:before {
                content: '';
                position: absolute;
                width: 100%;
                height: 36px;
                background: linear-gradient(transparent, rgba(0, 0, 0, 0.4));
                bottom: 0;
                left: 0;
                z-index: 1;
            }
            &:after {
                opacity: 0;
                content: '';
                display: block;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background: rgba(0,0,0,.2);
                background-repeat: no-repeat;
                background-size: 28%;
                background-position: center;
                // background-image: url(../../../assets/images/logoplay.png);
                transition: opacity .3s ease;
            }
            &:hover:after {
                opacity: 1;
            }
            img {
                width: 100%;
                border-radius: 2px;
            }
            .count {
                display: flex;
                align-items: center;
                position: absolute;
                bottom: 0;
                width: 100%;
                padding: 6px 8px;
                justify-content: space-between;
                color: #fff;
                line-height: 16px;
                z-index: 2;
                font-size: 12px;
                box-sizing: border-box;
                .left {
                    display: flex;
                    align-items: center;
                    span {
                        vertical-align: middle;
                        display: flex;
                        align-items: center;
                        &:first-child {
                            margin-right: 10px;
                        }
                    }
                }
                .right {
                    display: flex;
                    align-items: center;
                }
                
                .iconfont {
                    font-size: 16px;
                    margin-right: 4px;
                }
            }
        }
        .title {
            display: block;
            font-size: 14px;
            line-height: 20px;
            margin: 5px 0 4px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: break-all;
            font-weight: 500;
            padding-right: 12px;
            &:hover {
                color: #00a1d6;
            }
        }
        .update {
            display: flex;
            font-size: 12px;
            color: #999;
            line-height: 16px;
        }
    }
</style>