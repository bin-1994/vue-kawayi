<template>
    <div class="banner-container" @mouseenter="pause" @mouseleave="autoPlay">
        <div class="banner-body">
            <div class="images clearfix" :style="listStyle">
                <div class="image-item" v-for="(item, index) in list" :key="index">
                    <a :href="`/bangumi/media/md${item.data_id}`" target="_blank"><img :src="item.cover" /></a>
                </div>
            </div>
        </div>
        <div class="banner-footer">
            <div class="banner-mask"></div>
            <div class="banner-tool">
                <a :href="`/bangumi/media/md${list[activeIndex].data_id}`" target="_blank">{{ list[activeIndex].title }}</a>
                <ul class="banner-tabs">
                    <li :class="['banner-tabs-item', {active: index == activeIndex}]" v-for="(item, index) in list" :key="index" @click="selectIndex(index)"></li>
                </ul>
            </div>
            <div class="banner-buttons"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Banner',
    props: ['list'],
    data() {
        return {
            timer: null,
            timeOut: null,
            isAnimation: false,
            duration: 4000,
            speed: 300,
            activeIndex: 0,
        }
    },
    computed: {
        listStyle() {
            return {
                transform: `translateX(-${100 * this.activeIndex}%)`,
                transitionDuration: `${Number(this.speed / 1000).toFixed(1)}s`
            }
        },
    },
    mounted() {
        this.autoPlay()
    },
    methods: {
        selectIndex(index) {
            this.activeIndex = index
        },
        autoPlay() {
            this.pause()
            this.timer = setInterval(() => {
                if (this.activeIndex < (this.list.length - 1)) {
                    if (++this.activeIndex === this.list.length) {
                        this.timeOut = setTimeout(() => {
                            this.activeIndex = 0
                            this.isAnimation = true

                            setTimeout(() => {
                                this.isAnimation = false
                            }, this.duration / 4)

                        }, this.duration / 4)
                    }
                } else {
                    this.activeIndex = 0
                }
            }, this.duration)
        },
        pause() {
            clearInterval(this.timer)
        }
    }
}
</script>

<style lang="scss">
    .banner-container {
        position: relative;
        width: 100%;
        height: calc(100% - 52px);
        background-color: #f1f2f3;
        border-radius: 6px;
        overflow: hidden;
        .banner-body {
            position: relative;
            overflow: hidden;
            width: 100%;
            height: 100%;
            .images {
                position: relative;
                white-space: nowrap;
                .image-item {
                    display: inline-block;
                    transition: all .3s;
                    width: 100%;
                    img {
                        display: inline-block;
                        position: relative;
                        line-height: 1;
                        width: 100%;
                        height: 100%;
                        vertical-align: middle;
                        background-color: #f1f2f3;
                        object-fit: cover;
                    }
                }
            }
        }
        .banner-footer {
            position: relative;
            padding: 0 16px;
            .banner-mask {
                height: 870px;
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 1;
                user-select: none;
                pointer-events: none;
                background-color: #2f3238;
                -webkit-mask-image: linear-gradient(0,#2f3238 11%,transparent 20%);
            }
            .banner-tool {
                position: absolute;
                margin-top: 0;
                flex-grow: 1;
                z-index: 2;
                transition: filter .3s cubic-bezier(.645,.045,.355,1);
                bottom: 27px;
                left: 17px;
                a {
                    margin-bottom: 16px;
                    height: 28px;
                    line-height: 28px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    display: block;
                    font-size: 20px;
                    font-weight: 400;
                    line-height: 25px;
                    color: #fff;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .banner-tabs {
                    display: flex;
                    .banner-tabs-item {
                        width: 12px;
                        display: inline-block;
                        height: 4px;
                        margin: 0 3px;
                        border-radius: 4px;
                        background-color: rgba(255,255,255,.4);
                        overflow: hidden;
                        cursor: pointer;
                        transition: width .3s;
                        &.active {
                            width: 47px;
                            background-color: #fff;
                        }
                    }
                }
            }
            .banner-buttons {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                position: absolute;
                z-index: 2;
            }
        }
    }
</style>