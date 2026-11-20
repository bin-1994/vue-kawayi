<template>
    <div class="relevant-wrap clearfix">
        <div class="relevant-item" v-for="item in list" :key="item.media_id">
            <a :href="`/bangumi/media/md${item.media_id}`" target="_blank" class="relevant-item-cover">
                <lazy-img :src="item.cover"></lazy-img>
            </a>
            <a :href="`/bangumi/media/md${item.media_id}`" target="_blank" class="relevant-item-title">{{ item.title }}</a>
        </div>
    </div>
</template>

<script>
import LazyImg from '../../../../../components/common/LazyImg'
export default {
    name: 'Relevant',
    props: {
        list: {
            type: Array,
            default: []
        }
    },
    components: {
        LazyImg
    }
}
</script>

<style lang="scss">
    .relevant-wrap {
        position: relative;
        width: max-content;
        .relevant-item {
            width: 160px;
            float: left;
            margin-right: 20px;
            .relevant-item-cover {
                display: block;
                position: relative;
                width: 100%;
                height: 214px;
                margin-top: 20px;
            }
            .relevant-item-title {
                display: block;
                text-align: left;
                font-size: 14px;
                line-height: 14px;
                height: 16px;
                color: #222;
                padding-top: 8px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            &:last-child {
                margin-right: 0;
            }
        }
    }
</style>