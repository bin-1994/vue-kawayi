<template>
    <div class="review-wrapper">
        <div class="review-header">
            <h4>点评</h4>
            <a href="http://" target="_blank" class="more-link" v-if="0 < list.length">查看全部</a>
        </div>
        <ul class="review-list">
            <li class="review-item" v-for="(item, index) in list" :key="index">
                <a href="http://" target="_blank" class="review-wrap">
                    <div class="review-header">
                        <div class="author-name">{{ item.author.nickname }}</div>
                        <ul class="review-star clearfix">
                            <li v-for="(item, index) in starFormat(item.score)" :key="index"><i :class="['iconfont', {'icon-star': 'empty' === item.type}, {'icon-star-light': 'full' === item.type}] "></i></li>
                        </ul>
                    </div>
                    <p class="review-content">{{ item.content }}</p>
                    <span class="pub-time">{{ reviewDate(item.utime) }}</span>
                </a>
            </li>
            <div class="empty-wrapper" v-if="0 === list.length">
                <div class="empty-tip">推荐还是吐槽？点评一下吧！</div>
                <div class="btn-go-write" @click="verifyOpen">去写点评</div>
            </div>
        </ul>
    </div>
</template>

<script>
import { formatFriendlyTime } from '../../../../utils/format'
export default {
    name: 'Review',
    props: {
        list: {
            type: Array,
            default: []
        }
    },
    methods: {
        starFormat(score) {
            let stars = [{type: "empty"}, {type: "empty"}, {type: "empty"}, {type: "empty"}, {type: "empty"}]
            if (0 === score) {
                return stars
            }
            for (let i = 0; i < 10; i++)
                (i < 2 || i < score) && (stars[Math.floor(i / 2)].type = 'full')
            return stars
        },
        reviewDate(time) {
            return formatFriendlyTime(new Date(time * 1000))
        },
        verifyOpen() {

        }
    }
}
</script>

<style lang="scss">
.review-wrapper {
    padding: 16px 0;
    border-top: 1px solid #e5e9ef;
    .review-header {
        display: flex;
        justify-content: space-between;
        height: 24px;
        color: #212121;
        margin-bottom: 16px;
        h4 {
            float: left;
            height: 24px;
            line-height: 24px;
            font-size: 16px;
            font-weight: 400;
        }
        .more-link {
            display: block;
            height: 24px;
            line-height: 24px;
            font-size: 12px;
            color: #212121;
            transition: color .3s ease;
            &:hover {
                color: #00a1d6;
            }
        }
    }
    .review-list {
        height: 152px;
        white-space: nowrap;
        overflow: hidden;
        .review-item {
            position: relative;
            display: inline-block;
            vertical-align: top;
            width: 33.333%;
            height: 152px;
            padding-right: 10px;
            overflow: hidden;
            box-sizing: border-box;
            &:last-child {
                padding-right: 0;
            }
            .review-wrap {
                display: block;
                padding: 12px 16px;
                border-radius: 2px;
                height: 100%;
                background-color: #f4f4f4;
            }
            .review-header {
                position: relative;
                height: 18px;
                margin-bottom: 8px;
                .author-name {
                    display: block;
                    float: left;
                    height: 18px;
                    line-height: 18px;
                    font-size: 12px;
                    color: #505050;
                    max-width: 90px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-right: 8px;
                }
                .review-star {
                    display: block;
                    float: left;
                    height: 18px;
                    width: 72px;
                    li {
                        position: relative;
                        display: inline-block;
                        vertical-align: top;
                        width: 16px;
                        height: 16px;
                    }
                }
            }
            .review-content {
                height: 69px;
                font-size: 12px;
                color: #212121;
                line-height: 18px;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
                word-wrap: break-word;
                word-break: break-word;
                white-space: normal;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .pub-time {
                position: absolute;
                left: 16px;
                bottom: 12px;
                height: 18px;
                line-height: 18px;
                color: #999;
                font-size: 12px;
            }
        }
        .empty-wrapper {
            width: 100%;
            padding-top: 21px;
            .empty-tip {
                height: 16px;
                line-height: 16px;
                text-align: center;
                color: #999;
                font-size: 12px;
            }
            .btn-go-write {
                display: block;
                border: 1px solid #00a1d6;
                border-radius: 2px;
                width: 78px;
                height: 28px;
                line-height: 28px;
                margin: 12px auto 0;
                font-size: 12px;
                text-align: center;
                cursor: pointer;
                color: #00a1d6;
                background-color: #fff;
                transition: all .3s ease;
                &:hover {
                    color: #fff;
                    background-color: #00a1d6;
                }
            }
        }
    }
}
</style>