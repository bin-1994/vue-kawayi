<template>
    <div class="time-line-card item">
        <a :href="`/bangumi/media/md${item.media_id}`" class="preview" target="_blank" :title="item.title">
            <lazy-img :src="item.cover" :alt="item.title"></lazy-img>
        </a>
        <div class="item-right">
            <a :href="`/bangumi/media/md${item.media_id}`" class="timeline-title" target="_blank" :title="item.title">{{ item.title }}</a>
            <a :class="['timeline-ep', {published: item.new}]" target="_blank" :href="link">{{ epIndex }}</a>
        </div>
    </div>
</template>

<script>
import LazyImg from '../../../components/common/LazyImg'
export default {
    name: 'Item',
    props: ['item'],
    computed: {
        epIndex() {
            return 2 == this.item.is_finish ? `全${this.item.ep_total}话` : -1 == this.item.ep_index ? '尚未更新' : (isNaN(this.item.ep_index) ? this.item.ep_index : `第${this.item.ep_index}话`)
        },
        link() {
            return this.item.ep_id ? `/bangumi/play/ep${this.item.ep_id}` : `/bangumi/media/md${this.item.media_id}`
        }
    },
    components: {
        LazyImg
    }
}
</script>

<style lang="scss">
    .time-line {
        .time-line-card {
            width: 227px;
            height: 70px;
            display: flex;
            justify-content: space-between;
            margin: 0 30px 24px 0;
            .preview {
                width: 70px;
                height: 70px;
                border-radius: 2px;
                overflow: hidden;
                margin-right: 12px;
                img {
                    width: 100%;
                    margin-top: -8%;
                }
            }
            .item-right {
                width: 152px;
                font-weight: 500;
                .timeline-title {
                    font-size: 14px;
                    height: 37px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    margin: 2px 0 12px;
                    &:hover {
                        color: #00a1d6;
                    }
                }
                .timeline-ep {
                    width: 100%;
                    color: #999;
                    display: inline-block;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-weight: 400;
                    font-size: 12px;
                }
                .published {
                    color: #00a1d6;
                }
            }
        }
    }
</style>