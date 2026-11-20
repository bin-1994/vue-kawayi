<template>
    <li class="bangumi-item">
        <a :href="`/bangumi/media/md${item.media_id}`" target="_blank" class="item-cover">
            <lazy-img :src="item.cover"></lazy-img>
        </a>
        <a :href="`/bangumi/media/md${item.media_id}`" target="_blank" class="item-info">
            <h4 class="item-title">{{ item.title }}</h4>
            <div class="item-story">{{ item.story }}</div>
            <div class="item-state">
                <!-- <span class="watch-state">{{ watchEp }}</span>
                <i></i>
                <span :class="['ep-state', {'highlight': item.not_watch}]">{{ epIndex }}</span> -->
            </div>
        </a>
        <div class="bangumi-options">
            <i class="iconfont icon-more" @click="trigger"></i>
            <ul :class="['options-list', {'shown': shown}]">
                <li :class="['options-item', {'disabled': 1 === item.follow_state}]" @click="changeState(1)">标记为 想看</li>
                <li :class="['options-item', {'disabled': 2 === item.follow_state}]" @click="changeState(2)">标记为 在看</li>
                <li :class="['options-item', {'disabled': 3 === item.follow_state}]" @click="changeState(3)">标记为 看过</li>
                <li class="options-item" @click="unfollow()">取消追番</li>
            </ul>
        </div>
    </li>
</template>

<script>
import LazyImg from '../../../components/common/LazyImg'
export default {
    name: 'BangumiItem',
    props: ['item'],
    data() {
        return {
            shown: false,
            timestamp: 0,
        }
    },
    mounted() {
        document.addEventListener('click', () => {
            this.close()
        })
    },
    destroyed() {
        document.removeEventListener('click', this.close())
    },
    methods: {
        trigger(event) {
            event.stopPropagation()
            this.timestamp = Date.now()
            this.shown = void 0 === event ? !this.shown :　!!event
        },
        close() {
            if (Date.now - this.timestamp < 20) return false
            this.shown = false
        },
        changeState(state) {
            if (state === this.item.follow_state) {
                return this.timestamp = Date().now, false
            }
            this.$emit('cmd', 'state', {
                media_id: this.item.media_id,
                follow_state: state
            })
            this.close()
        },
        unfollow() {
            this.$emit('cmd', 'follow', {
                media_id: this.item.media_id,
                series_id: this.item.series_id
            })
            this.close()
        }
    },
    components: {
        LazyImg
    }
}
</script>

<style lang="scss">
    .bangumi-item {
        display: block;
        position: relative;
        width: 33.33%;
        height: 140px;
        float: left;
        margin-bottom: 30px;
        box-sizing: border-box;
        padding-right: 20px;
        .item-cover {
            position: relative;
            display: block;
            float: left;
            width: 110px;
            height: 140px;
            overflow: hidden;
            border-radius: 2px;
            box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1);
        }
        .item-info {
            display: block;
            position: relative;
            padding-left: 130px;
            height: 140px;
            .item-title {
                font-weight: 400;
                color: #222;
                line-height: 24px;
                font-size: 18px;
                padding: 0 10px 0 0;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin: 0 0 8px 0;
            }
            .item-story {
                display: -webkit-box;
                font-weight: 400;
                color: #222;
                line-height: 20px;
                max-height: 60px;
                font-size: 12px;
                overflow: hidden;
                text-overflow: ellipsis;
                margin: 0 0 8px 0;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                white-space: normal;
            }
        }
        .bangumi-options {
            position: absolute;
            right: 20px;
            bottom: 6px;
            font-size: 14px;
            i.iconfont {
                display: block;
                width: 20px;
                height: 20px;
                font-size: 20px;
                color: #d8d8d8;
                cursor: pointer;
            }
            .options-list {
                position: absolute;
                right: 0;
                bottom: 0;
                padding: 6px 0;
                background-color: #fff;
                border: 1px solid #e5e9ef;
                border-radius: 2px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                visibility: hidden;
                opacity: 0;
                transform: scaleY(0);
                transform-origin: center bottom;
                transition: all .3s;
                &.shown {
                    transform: none;
                    visibility: visible;
                    opacity: 1;
                }
                .options-item {
                    width: auto;
                    height: 35px;
                    line-height: 35px;
                    padding: 0 20px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    cursor: pointer;
                    color: #212121;
                    &:hover {
                        color: #00a1d6;
                        background-color: #e5e9ef;
                    }
                    &.disabled {
                        color: #e7e7e7;
                        background-color: transparent;
                        cursor: not-allowed;
                    }
                }
            }
        }
    }
</style>