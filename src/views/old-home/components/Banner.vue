<template>
    <div class="banner-wrapper k-wrap" ref="wrapper">
        <div class="banner-images">
            <ul ref="images" :class="['banner-images-wrapper', 'clearfix', {'no-anime': jump}]" :style="listStyle">
                <li class="image-item" v-for="(item, index) in list" :key="index">
                    <a :href="`/bangumi/media/md${item.data_id}`" target="_blank">
                        <lazy-img :src="item.cover" :alt="item.title"></lazy-img>
                    </a>
                </li>
                <li class="image-item" v-if="list.length > 0">
                    <a :href="`/bangumi/media/md${list[0].data_id}`" target="_blank">
                        <lazy-img :src="list[0].cover" :alt="list[0].title"></lazy-img>
                    </a>
                </li>
            </ul>
            <div class="banner-bottom-shadow">
                <div class="banner-info" :style="textStyle">
                    <span v-for="(item, index) in list" :key="index" v-show="(currentIndex % list.length) === index"><a :href="`/bangumi/media/md${item.data_id}`" target="_blank">{{ item.title }}</a></span>
                </div>
                <div class="banner-mini" ref="thumbs">
                    <a :href="cursorLink" target="_blank" class="thumb-cursor" :style="cursorStyle"></a>
                    <div class="banner-thumb-item" v-for="(item, index) in list" :key="index"><a :href="`/bangumi/media/md${item.data_id}`" target="_blank"><lazy-img :src="item.cover" :alt="item.title"></lazy-img></a></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LazyImg from '../../../components/common/LazyImg'
export default {
    name: 'Banner',
    data() {
        return {
            timer: null,
            timeOut: null,
            jump: false,
            currentIndex: 0,
            textWidth: 0,
        }
    },
    props: {
        size: {
            type: String,
            default: 'large'
        },
        auto: {
            type: Boolean,
            default: true
        },
        duration: {
            type: Number,
            default: 3000
        },
        speed: {
            type: Number,
            default: 300
        },
        list: {
            type: Array,
            default () {
                return []
            }
        }
    },
    computed: {
        listStyle() {
            return {
                transform: `translateX(-${100 * this.currentIndex}%)`,
                transitionDuration: `${Number(this.speed / 1000).toFixed(1)}s`
            }
        },
        cursorStyle() {
            let size = 'large' === this.size ? 72 : 62
            return {
                left: `${this.currentIndex % this.list.length * size}px`,
                transitionDuration: `${Number(this.speed / 1000).toFixed(1)}s`
            }
        },
        cursorLink() {
            return this.list.length > 0 && (`/bangumi/media/md${this.list[this.currentIndex % this.list.length].data_id}`)
        },
        textStyle() {
            return this.textWidth > 0 ? {width: this.textWidth} : {}
        }
    },
    watch: {
        list() {
            this.clearTimer()
            this.$nextTick(() => {
                this.setThumbsHover()
            })
        }
    },
    mounted() {
        let offsetWidth = this.$refs.wrapper.offsetWidth
        this.textWidth = offsetWidth - this.$refs.thumbs.offsetWidth - 20
        if (this.list.length > 1) {
            this.$el.addEventListener('mouseenter', () => {
                this.clearTimer()
            }, false)
            this.$el.addEventListener('mouseleave', () => {
                null === this.timer && this.setTimer()
            }, false)
            this.setThumbsHover()
        }
    },
    methods: {
        setThumbsHover() {
            for (let i = 1; i < this.$refs.thumbs.children.length; i++) {
                this.$refs.thumbs.children[i].removeEventListener('mouseenter', this.hoverHandler, false)
                this.$refs.thumbs.children[i].setAttribute('data-index', i - 1)
                this.$refs.thumbs.children[i].addEventListener('mouseenter', this.hoverHandler, false)
            }
            this.setTimer()
        },
        hoverHandler(event) {
            let index = Number(event.target.getAttribute('data-index'))
            this.currentIndex = index
        },
        setTimer() {
            this.timer = setInterval(() => {
                if (this.currentIndex < this.list.length) {
                    ++this.currentIndex === this.list.length && (
                        this.timeOut = setTimeout(() => {
                            this.jump = true
                            this.currentIndex = 0
                            setTimeout(() => {
                                this.jump = false
                            }, this.duration / 4)
                        }, this.duration / 4)
                    )
                } else {
                    this.currentIndex = 0
                }
            }, this.duration);
        },
        clearTimer() {
            clearInterval(this.timer)
            this.timer = null
            clearInterval(this.timeOut)
            this.timeOut = null
        }
    },
    components: {
        LazyImg
    }
}
</script>

<style lang="scss">
    .banner-wrapper {
        position: relative;
        height: 467px;
        background-color: #555;
        margin-top: 20px;
        border-radius: 2px;
        .banner-images {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .banner-images-wrapper {
            height: 100%;
            white-space: nowrap;
            transform: translateX(0);
            transition: transform .3s ease;
            &.no-anime {
                transition: none!important;
            }
            .image-item {
                display: inline-block;
                vertical-align: top;
                position: relative;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                overflow: hidden;
                a, img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    line-height: 44px;
                    font-size: 12px;
                    text-align: center;
                }
            }
        }
        .banner-bottom-shadow {
            position: absolute;
            width: 100%;
            height: 62px;
            bottom: 0;
            left: 0;
            background: linear-gradient(-180deg,rgba(0,0,0,0),rgba(0,0,0,.75));
        }
        .banner-info {
            position: absolute;
            bottom: 9px;
            left: 10px;
            line-height: 22px;
            height: 22px;
            font-size: 14px;
            color: #fff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            span {
                line-height: 22px;
                left: 0;
                top: 0;
            }
            a {
                color: #fff;
            }
        }
        .banner-mini {
            position: absolute;
            bottom: 9px;
            right: 8px;
            .thumb-cursor {
                position: absolute;
                box-sizing: border-box;
                border-radius: 2px;
                border: 2px solid #f25d8e;
                top: 0;
                transition: left .3s ease;
                width: 64px;
                height: 48px;
            }
            .banner-thumb-item {
                box-sizing: border-box;
                float: left;
                margin-right: 8px;
                border-radius: 2px;
                border: 2px solid #fff;
                overflow: hidden;
                width: 64px;
                height: 48px;
                a, img {
                    width: auto;
                    display: block;
                    object-fit: cover;
                    margin-left: -35%;
                    font-size: 12px;
                    text-align: center;
                    line-height: 44px;
                    height: 100%;
                }
            }
        }
    }
</style>