<template>
    <div class="media-info-score-wrp">
        <!-- <div class="media-info-score">
            <div class="media-info-score-content">9.1</div>
            <div class="media-info-star-wrapper">
                <span class="review-stars">
                    <i class="icon-star"><i></i></i>
                </span>
                <div class="media-info-review-times"></div>
                <div class="to-review-btn">
                    <i class="icon-edit"></i>
                </div>
            </div>
        </div>
        <div class="media-info-score-empty">
            <div>暂无评分</div>
            <div class="not-enough">评分人数不足</div>
            <div class="to-review-btn">
                <i class="icon-edit"></i>
            </div>
        </div> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Score',
    computed: {
        ...mapGetters('bangumi', ['MEDIA_INFO'])
    }
}
</script>

<style lang="scss">
    .media-info-score-wrp {
        float: right;
        padding-top: 26px;
        &:hover {
            .to-review-btn {
                display: block;
            }
        }
    }
    .media-info-score {
        white-space: nowrap;
        & .media-info-score-content, 
        & .media-info-star-wrapper{
            display: inline-block;
            vertical-align: top;
            height: 36px;
        }
        .media-info-score-content {
            margin: 0 7px 0 0;
            text-align: right;
            color: #ffa726;
            font-size: 36px;
            line-height: 36px;
        }
        .review-stars {
            display: block;
            box-sizing: border-box;
            width: auto;
            &>i {
                display: inline-block;
                font-size: 12px;
                line-height: 21px;
                &+i {
                    margin-left: 4px;
                }
            }
        }
        .media-info-review-times {
            color: #f4f4f4;
            font-size: 12px;
            line-height: 1;
            text-align: left;
        }
        .to-review-btn {
            display: none;
            color: #f4f4f4;
            text-align: left;
            cursor: pointer;
            font-size: 12px;
            line-height: 1;
        }
    }
    .media-info-score-empty {
        color: #f4f4f4;
        text-align: left;
        margin: 0 8px 0 0;
        div:first-child {
            box-sizing: border-box;
            font-size: 20px;
            line-height: 1;
        }
        .not-enough, .not-start {
            margin-top: 7px;
            font-size: 12px;
            line-height: 1;
        }
        .to-review-btn {
            text-align: left;
            margin-top: 7px;
            margin-left: 0;
        }
    }
</style>