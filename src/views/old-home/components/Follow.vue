<template>
    <section class="wrap-right">
        <div class="follow-header">
            <h3>我的追番</h3>
            <a href="/member/bangumi" target="_blank" class="follow-more" v-if="USER_INFO">更多<i class="iconfont icon-arrow-right"></i></a>
        </div>
        <empty v-if="list.length === 0"></empty>
        <div class="follow-list" v-else>
            <div class="follow-item clearfix" v-for="(item, index) in list.slice(0, 4)" :key="index">
                <a :href="`/bangumi/media/md${item.media_id}`" class="follow-cover" target="_blank">
                    <lazy-img :src="item.video_cover"></lazy-img>
                </a>
                <div class="details">
                    <a class="season-title" target="_blank">{{ item.title }}</a>
                    <div :class="['ep-info', {'highlight': item.not_watch}]">{{ epInfo(item) }}</div>
                    <a :href="last(item)" class="ep-watch" target="_blank">{{ epWatch(item) }}</a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import LazyImg from '../../../components/common/LazyImg'
import Empty from './Empty'
export default {
    name: 'Follow',
    props: ['list'],
    methods: {
        epInfo(item) {
            return 2 === item.is_finish ? `全${item.ep_total}话` : -1 == item.ep_index ? `尚未开播` : `更新至第${item.ep_index}话`
        },
        epWatch(item) {
            return 3 == item.follow_state ? `看完了` : item.ep_id && item.watch_ep ? `看到${item.watch_ep}` : `尚未观看`
        },
        last(item) {
            return item.ep_id ? `/bangumi/play/ep${item.ep_id}` : 'javascript:void(0);'
        }
    },
    computed: {
        ...mapGetters(['USER_INFO'])
    },
    components: {
        LazyImg,
        Empty
    }
}
</script>

<style lang="scss">
    .wrap-right {
        min-height: 300px;
        .follow-header {
            height: 36px;
            line-height: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            h3 {
                float: left;
                font-size: 18px;
                font-weight: 400;
            }
            .follow-more {
                display: flex;
                align-items: center;
                padding: 0 0 0 12px;
                width: 58px;
                height: 22px;
                border: 1px solid silver;
                border-radius: 2px;
                color: #505050;
                text-align: center;
                font-size: 12px;
                line-height: 16px;
                transition: all .2s;
                box-sizing: border-box;
                &:hover {
                    background-color: #f4f4f4;
                }
            }
        }
        .follow-list {
            width: 100%;
            padding-top: 20px;
            overflow: hidden;
            // height: 285px;
            .follow-item {
                margin-top: 16px;
                &:first-child {
                    margin-top: 0;
                }
                .follow-cover {
                    float: left;
                    width: 141px;
                    height: 80px;
                }
                .details {
                    padding-left: 151px;
                    .season-title {
                        display: block;
                        height: 36px;
                        line-height: 18px;
                        margin-bottom: 8px;
                        font-size: 14px;
                        color: #212121;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        word-break: break-word;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .ep-info {
                        margin-bottom: 4px;
                    }
                    .ep-info, 
                    .ep-watch {
                        display: block;
                        height: 16px;
                        line-height: 16px;
                        font-size: 12px;
                        color: #999;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .highlight {
                        color: #fb7299;
                    }
                }
            }
        }
    }
</style>