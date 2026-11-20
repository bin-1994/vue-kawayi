<template>
    <div class="ep-list-wrapper" v-if="MEDIA_INFO.episodes.length > 0">
        <div class="list-title clearfix">
            <h4>选集</h4>
            <span class="mode-change">
                <i :class="['iconfont', {'icon-ep-list-simple': SIMPLE_MODE}, {'icon-ep-list-detail': !SIMPLE_MODE}]" @click="modeChange"></i>
            </span>
            <span class="ep-list-progress">{{ EP_INDEX + 1 }} / {{ MEDIA_INFO.episodes.length }}</span>
        </div>
        <div :class="['list-wrapper', {'simple': SIMPLE_MODE}]" ref="epList">
            <ul :style="listHeight">
                <ep-item v-for="(item, index) in renderGroup" :ep-item="item" :simple-mode="SIMPLE_MODE" :key="index"></ep-item>
            </ul>
        </div>
    </div>
</template>

<script>
import EpItem from './EpItem'
import { mapGetters } from 'vuex'
export default {
    name: 'EpList',
    data() {
        return {
            scrollIndex: 0,
            simpleMode: false,
            scrollHandler: () => {},
            renderGroup: [],
        }
    },
    computed: {
        ...mapGetters('bangumi', ['MEDIA_INFO', 'EP_INFO', 'SIMPLE_MODE', 'EP_INDEX']),
        listHeight() {
            if (this.SIMPLE_MODE) {
                return {
                    height: `${46 * (this.MEDIA_INFO.episodes.length < 4 ? 1 : Math.ceil(this.MEDIA_INFO.episodes.length / 4)) +1}px`
                }
            } else {
                return {
                    height: `${36 * this.MEDIA_INFO.episodes.length - 6}px`
                }
            }
        },
        // 'MEDIA_INFO'() {
        //     this.autoScroll()
        // }
    },
    watch: {
        EP_INFO() {
            this.autoScroll()
        }
    },
    mounted() {
        // this.$refs.epList.scrollTop = document.querySelectorAll('.ep-item')[this.EP_INDEX].offsetTop - (71 + 16)
        this.autoScroll(),
        this.scrollHandler = () => {
            this.SIMPLE_MODE ? this.scrollIndex = this.$refs.epList.scrollTop <= 4 ? 0 : Math.floor((this.$refs.epList.scrollTop - 4) / 46) : this.scrollIndex = Math.floor(this.$refs.epList.scrollTop / 36),
            // if (this.SIMPLE_MODE) {
            //     this.scrollIndex = this.$refs.epList.scrollTop <= 4 ? 0 : Math.floor((this.$refs.epList.scrollTop - 4) / 46)
            // } else {
            //     this.scrollIndex = Math.floor(this.$refs.epList.scrollTop / 36)
            // }
            this.getRenderList()
        }

        window.setTimeout(() => {
            this.$refs.epList && this.$refs.epList.addEventListener('scroll', this.scrollHandler, !!window.supportPassive && {
                passive: false
            }),
            this.autoScroll()
        })
    },
    beforeDestroy() {
        this.$refs.epList && this.$refs.epList.removeEventListener('scroll', this.scrollHandler, !!window.supportPassive && {
            passive: false
        })
    },
    methods: {
        autoScroll() {
            this.$refs.epList && (this.scrollIndex = this.SIMPLE_MODE ? Math.floor(this.EP_INDEX / 4) : this.EP_INDEX)
            this.getRenderList(this.EP_INDEX)
            this.$nextTick(() => {
                if (this.scrollIndex > 1) {
                    let offsetTop = (this.scrollIndex - 2) * (this.SIMPLE_MODE ? 46 : 36)
                    this.$refs.epList.scrollTop = offsetTop,
                    this.$refs.epList.scrollTop !== offsetTop ? (this.$refs.epList.scrollTop = offsetTop,
                    this.$refs.epList.scrollTop !== offsetTop && this.scrollHandler()) : this.scrollHandler()
                } else {
                    0 !== this.$refs.epList.scrollTop ? this.$refs.epList.scrollTop = 0 : this.scrollHandler()
                }
            })
        },
        getRenderList() {
            let start = this.scrollIndex < 2 || this.MEDIA_INFO.episodes.length <= (this.SIMPLE_MODE ? 20 : 5) ? 0 : (this.scrollIndex - 2) * (this.SIMPLE_MODE ?  4 : 1),
                end = this.scrollIndex > this.MEDIA_INFO.episodes.length - (this.SIMPLE_MODE ? 10 : 12) ? this.MEDIA_INFO.episodes.length : (this.scrollIndex + (this.SIMPLE_MODE ? 10 : 12)) * (this.SIMPLE_MODE ? 4 : 1)

            this.renderGroup = this.MEDIA_INFO.episodes.slice(start, end)
        },
        modeChange() {
            this.$store.dispatch('bangumi/CHANGE_EP_MODE')
            this.autoScroll()
        }
    },
    components: {
        EpItem
    }
}
</script>

<style lang="scss">
    .ep-list-wrapper {
        position: relative;
        background-color: #f4f4f4;
        border-radius: 2px;
        margin-bottom: 20px;
        .list-title {
            height: 42px;
            padding: 0 16px;
            h4 {
                float: left;
                height: 42px;
                line-height: 42px;
                font-size: 16px;
                color: #212121;
                font-weight: 400;
                max-width: 220px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .mode-change {
                display: block;
                float: left;
                width: 30px;
                height: 42px;
                line-height: 42px;
                font-size: 16px;
                font-weight: 400;
                text-align: center;
                color: #757575;
                position: relative;
                i:hover {
                    color: #00a1d6;
                    cursor: pointer;
                }
            }
            .ep-list-progress {
                display: block;
                float: right;
                height: 42;
                line-height: 42px;
                font-size: 12px;
                color: #999;
            }
        }
        .list-wrapper {
            position: relative;
            padding: 0 6px 6px;
            display: block;
            overflow-y: scroll;
            max-height: 350px;
            ul {
                position: relative;
            }
            &.simple {
                padding-left: 10px;
            }
        }
    }
</style>