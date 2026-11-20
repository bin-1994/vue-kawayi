<template>
    <li @click="openEp" :class="['ep-item', {simple: simpleMode}, {on: epItem.ep_id === EP_INFO.ep_id}, {'badge': newest}]" :style="posStyle">
        <i class="iconfont icon-play"></i>
        <span class="ep-title" :title="domTitle">{{ epIndexRender }}</span>
        <div class="badge" v-show="newest">新</div>
    </li>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatEp } from '../../../../utils/format'
export default {
    name: 'EpItem',
    props: {
        epItem: {
            type: Object,
            required: true
        },
        simpleMode: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        ...mapGetters('bangumi', ['MEDIA_INFO', 'EP_INFO']),
        epIndex() {
            return formatEp(this.epItem.ep_index, this.MEDIA_INFO.type)
        },
        epIndexRender() {
            return this.simpleMode ? this.epItem.ep_index : this.epIndex + ' ' + this.epItem.title
        },
        domTitle() {
            return this.epItem.title ? `${this.epIndex}：${this.epItem.title}` : this.epIndex
        },
        newest() {
            let now = Date.parse(new Date()),
                ctime = (this.epItem.ctime * 1000) + (3 * 86400000)
                return now < ctime ? true : false
        },
        posStyle() {
            let i = this.epItem.i
            if (this.simpleMode) {
                let top = Math.floor(i / 4),
                    left = i % 4
                return {
                    top: `${46 * top + 4}px`,
                    left: `${73 * left}px`
                }
            } else {
                return {
                    top: `${i * 36}px`,
                    left: 0,
                    right: 0
                }
            }
            
        }
    },
    methods: {
        openEp() {
            this.$router.replace({path: `/bangumi/play/ep${this.epItem.ep_id}`})
        }
    }
}
</script>

<style lang="scss">
    .ep-item {
        position: absolute;
        display: block;
        border-radius: 2px;
        height: 30px;
        padding:  0 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        transition: background-color .3s ease;
        color: #222;
        cursor: pointer;
        i {
            display: none;
            height: 100%;
            line-height: 30px;
            vertical-align: top;
            color: #00a1d6;
            font-size: 13px;
        }
        &.badge {
            padding-right: 44px;
        }
        &.on {
            background-color: #fff;
            color: #00a1d6;
            i {
                display: inline-block;
            }
        }
        &:hover {
            background-color: #fff;
        }
        .ep-title {
            line-height: 30px;
            font-size: 12px;
        }
        .badge {
            position: absolute;
            top: 6px;
            right: 10px;
            padding: 0 4px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            color: #fff;
            font-size: 12px;
            border-radius: 2px;
            background-color: #fb7299;
        }
        &.simple {
            float: left;
            width: 64px;
            height: 36px;
            background-color: #fff;
            border: 1px solid #e5e9ef;
            padding: 0;
            text-align: center;
            transition: none;
            overflow: visible;
            opacity: 1;
            i {
                display: none;
            }
            .ep-title {
                margin-left: 1px;
                width: 60px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                height: 36px;
                line-height: 36px;
                display: block;
            }
            &:hover {
                border-color: #00a1d6;
                color: #00a1d6;
            }
            &.on {
                border-color: #00a1d6;
                background-color: #00a1d6;
                color: #fff;
            }
            .badge {
                top: -4px;
                right: -2px;
                height: 16px;
                line-height: 16px;
            }
        }
    }
</style>