<template>
    <li class="bangumi-review-item">
        <div class="item-header">
            <div class="author-name">{{ item.author.nickname }}</div>
            <stars :score="parseInt(item.score)"></stars>
            <ul class="item-star-wrapper"></ul>
            <div class="pub-time">{{ reviewDate }}</div>
        </div>
        <a href="" target="_blank" class="review-content">{{ item.content }}</a>
    </li>
</template>

<script>
import Stars from './Stars'
import { formatFriendlyTime } from '../../../../../utils/format'
export default {
    name: 'RviewItem',
    props: ['item'],
    computed: {
        reviewDate() {
            return formatFriendlyTime(new Date(this.item.utime * 1000))
        }
    },
    components: {
        Stars
    }
}
</script>

<style lang="scss">
    .bangumi-review-item {
        float: left;
        width: 288px;
        height: 162px;
        margin-right: 8px;
        border-radius: 2px;
        background-color: #f4f5f7;
        padding: 20px;
        box-sizing: border-box;
        overflow: hidden;
        &:last-child {
            margin-right: 0;
        }
        .item-header {
            position: relative;
            height: 16px;
            margin-bottom: 12px;
            .author-name {
                display: block;
                float: left;
                height: 16px;
                line-height: 16px;
                font-size: 12px;
                color: #6d757a;
                max-width: 130px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .item-star-wrapper {
                position: relative;
                display: block;
                height: 14px;
                padding-top: 2px;
                float: left;
                margin-left: 8px;
                li {
                    position: relative;
                    margin-right: 4px;
                    display: inline-block;
                    vertical-align: top;
                    width: 12px;
                    height: 12px;
                    background-size: cover;
                    background-position: 50%;
                    background-repeat: no-repeat;
                    font-size: 12px;
                }
            }
            .pub-time {
                height: 16px;
                float: right;
                line-height: 16px;
                color: #99a2aa;
                font-size: 12px;
            }
        }
        .review-content {
            font-size: 12px;
            color: #222;
            line-height: 20px;
            -webkit-line-clamp: 5;
            max-height: 100px;
            word-wrap: break-word;
            word-break: break-word;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    @media screen and (max-width: 1400px) {
        .bangumi-review-item {
            width: 228px;
            margin-right: 8px;
            .pub-time {
                display: none;
            }
        }
    }
</style>