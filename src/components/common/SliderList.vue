<template>
    <div class="slider-wrapper">
        <div class="slider-content" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
            <slot></slot>
        </div>
        <div class="slider-contro clearfix" v-show="hasSlider">
            <transition name=fade>
                <div class="contro-item" v-show="needSlide && moving && 'touch' === slideType"></div>
            </transition>
            <span :class="['slider-prev', {disabled: 0 === offsetX && !prePage}]" v-show="detailMode && (needSlide || prePage) && 'click' === slideType" @click="slidePrev"></span>
            <i class="slider-prev-mask" v-show="detailMode && (needSlide || prePage) && 'click' === slideType && offsetX < 0"></i>
            <span :class="['slider-next', {disabled: offsetX === sliderMax && !nextPage}]" v-show="detailMode && (needSlide || nextPage) && 'click' === slideType" @click="slideNext"></span>
            <i class="slider-next-mask" v-show="detailMode && (needSlide || nextPage) && 'click' === slideType && offsetX > sliderMax"></i>
        </div>
    </div>
</template>

<script>
import Bus from '../../utils/eventbus';
let flag = false
export default {
    name: 'SliderList',
    data() {
        return {
            startX: 0,
            startStamp: 0,
            moveStamp: 0,
            moving: false,
            distanceX: 0,
            offsetX: 0,
            wrapperW: 0,
            contentW: 0,
            timer: null
        }
    },
    props: {
        autoIndex: {
            type: Number,
            default: 0
        },
        length: {
            type: Number,
            required: true
        },
        slideType: {
            type: String,
            default: 'touch'
        },
        canReset: {
            type: Boolean,
            default: false
        },
        canEnd: {
            type: Boolean,
            default: false
        },
        skew: {
            type: Number,
            default: 0
        },
        disabledResize: {
            type: Boolean,
            default: false
        },
        prePage: {
            type: Boolean,
            default: false
        },
        nextPage: {
            type: Boolean,
            default: false
        },
        detailMode: {
            type: Boolean,
            default: true
        },
        hasSlider: {
            type: Boolean,
            default: true
        },
    },
    computed: {
        sliderMax() {
            return this.wrapperW - this.contentW
        },
        needSlide() {
            return this.contentW > this.wrapperW
        },
        slideWidth() {
            return this.wrapperW - this.skew
        }
    },
    watch: {
        autoIndex() {
            this.$nextTick(() => {
                this.handerResize()
            })
        },
        distanceX() {
            let offset = this.offsetX + this.distanceX
            offset = (offset = offset <= 0 ? offset : 0) >= this.sliderMax ? offset : this.sliderMax,
            0 !== this.distanceX && (this.moving = !0,
            this.moveContent(offset))
        }
    },
    mounted() {
        if (this.canReset) {
            Bus.$on('RESET_SLIDER_STAT', () => {
                if (this.$el.children[0].children[0]) {
                    this.$el.children[0].children[0].style.transition = 'none'
                    this.moveContent(0, true)
                    this.offsetX = 0
                    setTimeout(() => {
                        this.$el.children[0].children[0].style.transition = 'transform .3s ease'
                    }, 100)
                }
            })
            Bus.$on('SLIDER_TO_INDEX', () => {
                if (this.autoIndex > 0) {
                    let offset = -(this.contentW / this.length) * (this.autoIndex - .2)
                    this.offsetX = offset < this.sliderMax ? this.sliderMax : offset
                    this.moveContent(this.offsetX)
                } else {
                    if (this.$el.children[0].children[0]) {
                        this.$el.children[0].children[0].style.transition = 'none'
                        this.moveContent(0, true)
                        this.offsetX = 0
                        setTimeout(() => {
                            this.$el.children[0].children[0].style.transition = 'transform .3s ease'
                        }, 100)
                    }
                }
            })
            if (this.canEnd) {
                Bus.$on('SLIDER_TO_END', () => {
                    if (this.$el.children[0].children[0]) {
                        this.$el.children[0].children[0].style.transition = 'none'
                        this.moveContent(this.sliderMax, true)
                        this.offsetX = this.sliderMax
                        setTimeout(() => {
                            this.$el.children[0].children[0].style.transition = 'transform .3s ease'
                        }, 100)
                    }
                })
            }
        }
        this.wrapperW = this.$el.offsetWidth,
        window.addEventListener('resize', this.handerResize, false)
    },
    updated() {
        if (this.detailMode) {
            if (this.contentW = this.$el.children[0].children[0].scrollWidth, !flag && this.needSlide && this.autoIndex > 0) {
                let offset = -(this.contentW / this.length) * (this.autoIndex - .2)
                this.offsetX = offset < this.sliderMax ? this.sliderMax : offset
                this.moveContent(this.offsetX)
                flag = true
            }
            this.$emit('ready', this.needSlide)
        }
    },
    methods: {
        handerResize() {
            if (this.wrapperW = this.$el.offsetWidth, this.contentW = this.$el.children[0].children[0].scrollWidth, this.needSlide && this.autoIndex > 0) {
                let offset = -(this.contentW / this.length) * (this.autoIndex - .2)
                this.offsetX = offset < this.sliderMax ? this.sliderMax : offset,
                this.moveContent(this.offsetX)
            } else {
                this.needSlide && !this.disabledResize && (this.offsetX = 0, this.moveContent(0))
            }
        },
        touchStart(event) {
            'touch' === this.slideType && (this.clearTimer(), this.initData(), this.needSlide && 1 === event.touches.length && (document.body.addEventListener('touchmove', this.preventScroll, !!window.supportPassive && {
                passive: false
            }), this.startStamp = event.startStamp, this.startX = event.touches[0].clientX))
        },
        touchMove(event) {
            this.needSlide && 0 !== this.startX && 'touch' === this.slideType && (this.moveStamp = event.timeStamp,
                this.distanceX = event.changedTouches[0].clientX - this.startX)
        },
        touchEnd(event) {
            if ('touch' === this.slideType) {
                if (this.needSlide && event.timeStamp - this.moveStamp < 30) {
                    let offset = this.distanceX / (this.timeStamp - this.startStamp)
                    this.autoSlide(offset, () => {
                        this.initData()
                    })
                } else {
                    this.initData()
                    document.body.removeEventListener('touchmove', this.preventScroll, !!window.supportPassive && {
                        passive: false
                    })
                }
            }
        },
        slidePrev() {
            if (this.offsetX < 0 && null === this.timer) {
                this.distanceX = this.slideWidth
                this.timer = setTimeout(() => {
                    this.offsetX += this.slideWidth
                    this.offsetX > 0 && (this.offsetX = 0)
                    this.distanceX = 0
                    this.clearTimer()
                }, 300)
            } else {
                this.prePage && this.$emit('pagepre')
            }
        },
        slideNext() {
            if (this.offsetX > this.sliderMax && null === this.timer) {
                this.distanceX = -this.slideWidth
                this.timer = setTimeout(() => {
                    this.offsetX -= this.slideWidth
                    this.offsetX < this.sliderMax && (this.offsetX = this.sliderMax)
                    this.distanceX = 0
                    this.clearTimer()
                }, 300)
            } else {
                this.nextPage && this.$emit('pagenext')
            }
        },
        clearTimer() {
            this.timer && clearInterval(this.timer)
            this.timer = null
        },
        autoSlide(move, func) {
            if (!this.timer) {
                let offset = Math.abs(move)
                this.timer = setInterval(() => {
                    if (move > 0) {
                        this.distanceX = this.distanceX + 35 * move
                        (move -= offset / 35) <= 0 && (move = 0)
                    } else if (move < 0) {
                        this.distanceX = this.distanceX + 35 * move
                        (move += offset / 35) >= 0 && (move = 0)
                    } else {
                        func && func()
                    }
                }, 10)
            }
        },
        moveContent(offset) {
            if (this.$el.children[0].children[0]) {
                this.$el.children[0].children[0].style.transform = `translate3d(${offset}px,0,0)`
                this.$el.children[0].children[0].style.webkitTransform = `translate3d(${offset}px,0,0)`
                this.$el.children[1].children[0].style.left = offset / this.sliderMax * (this.wrapperW - 90) +　"px"
            }
        },
        initData() {
            this.startStamp = 0
            this.moveStamp = 0
            let move = this.offsetX + this.distanceX
            if (this.distanceX > 0) {
                this.offsetX = move <= 0 ? move : 0
            } else {
                this.offsetX = move >= this.sliderMax ? move : this.sliderMax
            }
            this.distanceX = 0
            this.startX = 0
            this.moving = false
        },
        preventScroll(event) {
            event.cancelable && !event.defaultPrevented && event.preventDefault()
        }
    }
}
</script>

<style lang="scss">
    .slider-wrapper {
        position: relative;
        width: 100%;
        .slider-content {
            overflow: hidden;
        }
        .slider-contro {
            height: .10666667rem;
            position: relative;
            .contro-item {
                position: absolute;
                top: 0;
                min-width: 5px;
                width: 90px;
                height: .10666667rem;
                border: .064rem;
                background-color: rgba(0,0,0,.2);
            }
            .slider-prev-mask,
            .slider-next-mask {
                display: none;
            }
        }
    }
</style>