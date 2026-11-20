<template>
     <div class="media-info-count">
        <span class="media-info-count-item">
            <span class="media-info-label">人气值</span>
            <em>{{ views }}</em>
        </span>
        <span class="media-info-count-item">
            <span class="media-info-label" @click="restFollowNum">追番人数</span>
            <em>{{ follows }}</em>
        </span>
        <span class="media-info-count-item">
            <span class="media-info-label">神作指数</span>
            <em>-</em>
        </span>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatNum } from '../../../../../utils/format'
import { post } from '../../../../../utils/axios'
export default {
    name: 'Datas',
    computed: {
        ...mapGetters('bangumi', ['MEDIA_INFO']),
        views() {
            return this.$store.state.userInfo ? formatNum(this.MEDIA_INFO.count.views) || '-' : '-' 
        },
        follows() {
            return this.$store.state.userInfo ? formatNum(this.MEDIA_INFO.count.series_follow) || '-' : '-'
        },
        // danmaku() {
        //     return this.MEDIA_INFO.comments ? formatNum(this.MEDIA_INFO.comments) : '-'
        // }
    },
    methods: {
        restFollowNum() {
            post(`/bangumi/rest`, {series_id: this.MEDIA_INFO.season_id})
        }
    }
}
</script>

<style lang="scss">
    .media-info-count {
        font-size: 12px;
        color: #222;
        padding-top: 30px;
        line-height: 1;
        float: left;
        .media-info-count-item {
            display: inline-block;
            width: 96px;
            border-right: 1px solid #fff;
            text-indent: 20px;
            height: 34px;
            color: #fff;
            .media-info-label {
                line-height: 12px;
                display: block
            }
            em {
                padding-top: 6px;
                line-height: 17px;
                font-style: normal;
                font-weight: 700;
                display: block
            }
            &:first-child {
                width: 76px;
                text-indent: 0;
            }
            &:last-child {
                border-right-color: rgba(0,0,0,0);
                width: 76px;
            }
        }
    }
</style>