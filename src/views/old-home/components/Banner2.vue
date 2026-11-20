<template>
    <div class="banner-wrap">
        <div class="header-mask"></div>
        <div class="banner-bg" :style="{backgroundImage: 'url(' + list[currentIndex].cover + ')'}"></div>
        <div class="banner-list-wrap k-wrap" @mouseleave="onOut()">
            <ul class="banner-images-wrapper">
                <li class="image-item" v-for="(item, index) in list.slice(0, 7)" :key="index" v-show="currentIndex == index">
                    <a :href="`/bangumi/media/md${item.data_id}`" target="_blank">
                        <lazy-img :src="item.cover" :alt="item.title"></lazy-img>
                    </a>
                </li>
            </ul>
            <div class="side-list-wrap">
                <ul class="side-list">
                    <transition-group name="banner" mode="in-out">
                    <li :class="['side-item', {'selected': currentIndex == index}, {'only-title': !item.sub_title}]" v-for="(item, index) in list" :key="index" @mouseenter="onEnter(index)">
                        <a :href="`/bangumi/media/md${item.data_id}`" target="_blank">
                            <span class="title">{{ item.title }}</span>
                            <span class="desc">{{ item.sub_title }}</span>
                        </a>
                    </li>
                    </transition-group>
                </ul>
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
    methods: {
        onEnter(index) {
            this.timer && (window.clearInterval(this.timer), this.timer = null)
            this.currentIndex = index
        },
        setupTimer() {
            this.timer || (this.timer = window.setInterval(() => {
                this.currentIndex = this.currentIndex + 1 > this.list.length - 1 ? 0 : this.currentIndex + 1
            }, 5000))
        },
        onOut() {
            this.timer || this.setupTimer()
        }
    },
    mounted() {
        this.setupTimer()
    },
    components: {
        LazyImg
    }
}
</script>

<style lang="scss">
    .banner-wrap {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 500px;
        background-color: #555;
        overflow: hidden;
        .header-mask {
            width: 100%;
            height: 100px;
            position: absolute;
            top: 0;
            left: 0;
            pointer-events: none;
            background: linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,0));
            z-index: 2;
        }
        .banner-bg {
            position: absolute;
            background-size: cover;
            width: 110%;
            min-width: 1120px;
            height: 500px;
            background-repeat: no-repeat;
            filter: blur(40px);
        }
        .banner-list-wrap {
            position: relative;
            margin-top: 0;
            height: 100%;
            background-color: #999;
            .banner-images-wrapper {
                height: 100%;
                flex-shrink: 0;
            }
            .image-item {
                height: 100%;
                background-repeat: no-repeat;
                position: absolute;
                img {
                    margin: 0 auto;
                    height: 100%;
                    object-fit:cover;
                }
            }
        }
        .side-list-wrap {
            position: absolute;
            right: 0;
            top: 0;
            width: 400px;
            height: 100%;
            box-sizing: border-box;
            z-index: 1;
            overflow: hidden;
            background-image: linear-gradient(0deg,#121622,rgba(8,10,15,.5) 79%,rgba(0,0,0,0) 90%);
            .side-list {
                position: absolute;
                bottom: 0;
                width: 100%;
            }
            .side-item {
                &.selected {
                    &.only-title {
                        a {
                            padding: 20px 21px 20px 23px;
                            line-height: 70px;
                        }
                    }
                    a {
                        padding: 8px 21px 10px 20px;
                        height: 78px;
                        background: rgba(0,161,214,.2);
                        box-sizing: border-box;
                        opacity: 1;
                    }
                    .title {
                        font-size: 20px;
                        line-height: 28px;
                        display: block;
                        margin-bottom: 6px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        transition: font-size .2s ease
                    }
                    .desc {
                        display: block;
                        font-size: 14px;
                        color: #fff;
                        line-height: 20px;
                    }
                }
                &.only-title {
                    a {
                        padding-top: 0;
                    }
                    .title {
                        margin-bottom: 0;
                    }
                }
                &:last-child a {
                    margin-bottom: 60px;
                }
                a {
                    padding: 0 21px 0 24px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    font-size: 14px;
                    color: #fff;
                    line-height: 20px;
                    display: block;
                    height: 20px;
                    margin-bottom: 24px;
                    opacity: .6;
                    transition: none;
                }
                .desc {
                    display: none;
                }
            }
        }
    }

    @media screen and (max-width: 1920px) {
        .banner-wrap {
            height: 400px;
            .side-list-wrap {
                width: 300px;
                .side-item {
                    &.selected a {
                        padding: 8px 21px 10px 20px;
                        height: 70px;
                    }
                    &:last-child a {
                        margin-bottom: 28px;
                    }
                    a {
                        margin-bottom: 20px;
                    }
                }
            }
        }
    }
</style>