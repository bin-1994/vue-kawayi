<template>
    <div class="bangumi-media">
        <div class="bangumi-media-header">
            <h4>点评</h4>
            <div class="rate-wrapper clearfix">
                <div class="btn-go-write">
                    <i class="icon-write">
                        <b class="iconfont path1"></b>
                        <b class="iconfont path2"></b>
                        <b class="iconfont path3"></b>
                    </i>去写点评
                </div>
                <!-- <div class="btn-my-write">
                    我的点评：
                    <span class="review-stars"></span>
                    <span class="btn-small-text">修改</span>
                </div> -->
            </div>
            <div class="btn-more-review">查看全部点评</div>
        </div>
        <div class="bangumi-media-body clearfix">
            <div class="nodata" v-if="0 === list.length">
                <span>如何评价本作？去写点评吧！</span>
            </div>
            <ul class="bangumi-review-list" v-else>
                <bangumi-review-item v-for="(item, index) in list.slice(0, 3)" :key="index" :item="item"></bangumi-review-item>
            </ul>
        </div>
    </div>
</template>

<script>
import BangumiReviewItem from './ReviewItem'
export default {
    name: 'Media',
    props: {
        list: {
            type: Array,
            required: true,
            default: []
        }
    },
    components: {
        BangumiReviewItem
    }
}
</script>

<style lang="scss">
    .bangumi-media {
        width: 100%;
        padding-top: 20px;
        margin: 20px auto 0;
        border-top: 1px solid #e5e9ef;
        .bangumi-media-header {
            width: 100%;
            height: 25px;
            h4 {
                float: left;
                line-height: 24px;
                height: 24px;
                font-size: 18px;
                color: #222;
                font-weight: 700;
            }
            .rate-wrapper {
                float: left;
                margin-left: 20px;
                margin-top: -5px;
                .btn-go-write {
                    display: block;
                    margin-top: 6px;
                    float: left;
                    height: 24px;
                    font-size: 14px;
                    color: #222;
                    line-height: 24px;
                    cursor: pointer;
                    i {
                        display: inline-block;
                        font-size: 22px;
                        vertical-align: top;
                        margin-right: 8px;
                    }
                    &:hover {
                        color: #00a1d6;
                    }
                }
            }
            .btn-more-review {
                float: right;
                line-height: 22px;
                border: 1px solid #b7c0cc;
                border-radius: 2px;
                height: 22px;
                padding: 0 10px;
                font-size: 12px;
                color: #6e7579;
                cursor: pointer;
                &:hover {
                    color: #00a1d6;
                    border-color: #00a1d6;
                }
            }
        }
        .bangumi-media-body {
            width: 100%;
            overflow: hidden;
            .bangumi-review-list {
                display: block;
                float: left;
                margin-top: 20px;
            }
            .nodata {
                padding: 20px 0;
                min-height: 210px;
                background: url(../../../../../assets/images/nodata.png) center 20px no-repeat;
                background-size: 180px;
                span {
                    display: block;
                    margin-top: 200px;
                    color: #6d757a;
                    font-size: 14px;
                    text-align: center;
                }
            }
        }
    }
</style>