<template>
    <li @click="openEp" :class="['ep-item', {'lastplay': lastPlay}, {simple: mode == 2}]" :title="domTitle">
        <div class="ep-index-number">{{ epItem.index }}</div>
        <div class="ep-text">
            <h4 class="ep-index">{{ epIndexRender }}</h4>
            <p class="ep-title">{{ epItem.title }}</p>
            <span class="mark-icon" v-if="newest">新</span>
        </div>
    </li>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatEp } from '../../../../../utils/format'
export default {
    name: 'EpItem',
    props: {
        epItem: {
            type: Object,
            required: true
        },
        mode: {
            type: Number,
            required: true
        },
        index: {
            type: Number
        }
    },
    computed: {
        ...mapGetters('bangumi', ['MEDIA_INFO', 'USER_STATE']),
        epIndex() {
            return formatEp(this.epItem.ep_index, this.MEDIA_INFO.type)
        },
        epIndexRender() {
            return 1 === this.mode ? this.epIndex : this.epItem.ep_index
        },
        domTitle() {
            return this.epItem.title ? `${this.epIndex}：${this.epItem.title}` : this.epIndex
        },
        newest() {
            let now = Date.parse(new Date()),
                ctime = (this.epItem.ctime * 1000) + (3 * 86400000)
                return now < ctime ? true : false
        },
        lastPlay() {
            return this.USER_STATE.progress && (this.USER_STATE.progress.ep_id == this.epItem.ep_id)
        }
    },
    methods: {
        openEp() {
            window.open(`/bangumi/play/ep${this.epItem.ep_id}`)
        }
    }
}
</script>

<style lang="scss">
    .ep-item {
        position: relative;
        display: inline-block;
        vertical-align: top;
        margin: 20px 20px 0 0;
        width: 205px;
        height: 60px;
        background-color: #f4f5f7;
        border: 1px solid #f4f5f7;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: 12px;
        cursor: pointer;
        &.simple {
            width: 66px;
            height: 38px;
            padding: 0;
            margin: 20px 8px 0 0;
            .ep-index-number {
                display: none;
            }
            .ep-text {
                margin: 0;
                padding: 0;
                width: auto;
                height: auto;
            }
            .ep-index {
                text-align: center;
                font-size: 14px;
                color: #6d757a;
                height: 38px;
                line-height: 38px;
                padding: 0 2px;
            }
            .ep-title {
                display: none;
            }
        }
        &:last-child {
            margin-right: 0;
        }
        &:hover .ep-index, &:hover .ep-title {
            color: #00a1d6;
        }
        &.lastplay {
            .ep-index-number:before {
                opacity: 1;
                position: absolute;
                top: 0;
                left: 0;
                content: '上次观看';
                width: 100%;
                height: 100%;
                text-align: center;
                letter-spacing: 1px;
                font-size: 14px;
                color: #fff;
                z-index: 10;
                line-height: 60px;
                background: rgba(0,0,0,.6);
                border-radius: 4px;
                transition: all .2s linear;
            }
            &:hover .ep-index-number:before {
                opacity: 0;
            }
        }
        .ep-index-number {
            position: relative;
            float: left;
            width: 96px;
            height: 60px;
            text-align: center;
            line-height: 60px;
            font-size: 32px;
            font-weight: bold;
            background-color: rgba(255,255,255,.6);
            color: #99a2aa;
            border-radius: 4px 0 0 4px;
        }
        .ep-text {
            // padding: 8px;
            margin-left: 106px;
            padding-top: 8px;
        }
        .ep-index {
            line-height: 1;
            color: #000;
            white-space: nowrap;
            height: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 400;
        }
        .ep-title {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            white-space: normal;
            line-height: 16px;
            max-height: 32px;
            word-break: break-word;
            word-wrap: break-word;
            color: #99a2aa;
            overflow: hidden;
        }
        .mark-icon {
            position: absolute;
            top: -6px;
            right: -2px;
            padding: 0 4px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            color: #fff;
            font-size: 12px;
            border-radius: 2px;
            background-color: #fb7299;
        }
    }
</style>