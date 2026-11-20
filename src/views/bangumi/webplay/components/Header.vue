<template>
    <div class="bangumi-header clearfix">
        <div class="header-info">
            <h1 :title="h1title">{{ h1title }}</h1>
            <div class="info-second">
                <span>{{ MEDIA_INFO.areas.name }}</span>
                <span>{{ version }}</span>
                <span>{{ pubDateShow }}</span>
                <span v-if="indexShow">{{ indexShow }}</span>
                <span v-if="MEDIA_INFO.tips">{{ MEDIA_INFO.tips }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatDate, formatEp } from '../../../../utils/format'
export default {
    name: 'BangumiHeader',

    computed: {
        ...mapGetters('bangumi', ['MEDIA_INFO', 'EP_INFO']),
        version() {
            let version = ['未知', '正片', '电影', '其他']
            return version[this.MEDIA_INFO.version]
        },
        pubDateShow() {
            return this.MEDIA_INFO.pub_string ? this.MEDIA_INFO.pub_string : formatDate(this.MEDIA_INFO.pub_time) + '开播'
        },
        h1title() {
            return `${this.MEDIA_INFO.title}${this.EP_INFO.ep_index ? '：' + formatEp(this.EP_INFO.ep_index, this.MEDIA_INFO.type) : ''} ${this.EP_INFO.title ? this.EP_INFO.title : ''}`
        },
        indexShow() {
            return 2 == this.MEDIA_INFO.is_finish ? `已完结，全${this.MEDIA_INFO.ep_total}${1 === this.MEDIA_INFO.type ? '话' : '集'}` : (-1 == this.MEDIA_INFO.ep_index ? `尚未开播` : (this.MEDIA_INFO.on_air ? `连载中，${this.MEDIA_INFO.on_air}更新` : ''))
        }
    },
}
</script>

<style lang="scss">
    .bangumi-header {
        position: relative;
        display: flex;
        width: 100%;
        margin-bottom: 16px;
        .header-info {
            h1 {
                font-size: 18px;
                font-weight: 500;
                color: #212121;
                line-height: 26px;
                height: 26px;
                margin-bottom: 12px;
                max-width: 700px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .info-second {
                position: relative;
                height: 16px;
                line-height: 16px;
                font-size: 12px;
                margin-top: 11px;
                display: flex;
                align-items: center;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #999;
                span {
                    display: inline-block;
                    height: 16px;
                    margin-left: 8px;
                    &:first-child {
                        margin-left: 0;
                        &:after {
                            content: '';
                            display: inline-block;
                            vertical-align: top;
                            width: 1px;
                            height: 8px;
                            background-color: #757575;
                            margin-left: 8px;
                            margin-top: 5px;
                        }
                    }
                }
            }
        }
    }
</style>