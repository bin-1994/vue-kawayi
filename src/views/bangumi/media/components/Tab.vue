<template>
    <div class="media-tab-wrp">
        <div class="media-tab-nav">
            <ul class="clearfix">
                <li v-for="(item, index) in tabConfig" :key="index" :class="{on: selectIndex == index}" @click="setCurrentIndex(index)">{{ item.name }}</li>
            </ul>
        </div>
        <div class="media-tab-content">
            <transition  name="fade" mode="out-in">
                <component :is="componentName"></component>
            </transition>
        </div>
    </div>
</template>

<script>
import TabDetail from './detail/Detail'
import TabReview from './review/Review'
export default {
    name: 'MediaTab',
    data() {
        return {
            tabConfig: [
                {
                    name: '详情',
                    hash: 'detail',
                    component: TabDetail,
                },
                {
                    name: '点评',
                    hash: 'review',
                    component: TabReview
                }
            ],
            selectIndex: 0
        }
    },
    computed: {
        componentName() {
            return null !== this.selectIndex ? this.tabConfig[this.selectIndex].component : ''
        }
    },
    mounted() {
        this.initCurrentIndex()
    },
    methods: {
        initCurrentIndex() {
            let index = 0
            this.tabConfig.forEach((item, i) => {
                '#' + item.hash === window.location.hash && (index = i)
            })
            this.selectIndex = index
        },
        setCurrentIndex(index) {
            window.hash = this.tabConfig[index].hash
            this.selectIndex = index
        }
    },
    components: {
        TabDetail,
        TabReview
    }
}
</script>

<style lang="scss">
    .media-tab-wrp {
        position: relative;
        background-color: #f4f5f7;
        padding-bottom: 20px;
        z-index: 10;
        .media-tab-nav {
            position: relative;
            height: 60px;
            background-color: #fff;
            margin-bottom: 11px;
            ul {
                width: 1280px;
                margin: 0 auto;
                position: relative;
                font-size: 16px;
                li {
                    cursor: pointer;
                    float: left;
                    padding: 0 6px;
                    line-height: 58px;
                    color: #222;
                    transition: all .1s linear;
                    border-bottom: 3px solid rgba(0,0,0,0);
                    &+li {
                        margin-left: 28px;
                    }
                    &.on, &:hover {
                        color: #00a1d6;
                        border-bottom-color: #00a1d6;
                    }
                }
            }
        }
        .media-tab-content {
            min-height: 210px;
        }
    }
    .media-tab-detail-wrp {
        width: 1280px;
        margin: 0 auto;
        position: relative;
        top: 0;
        .media-tab-detail-l-wrp {
            float: left;
            width: 920px;
        }
        .media-tab-detail, .media-tab-detail-l {
            box-sizing: border-box;
            padding: 20px;
            border-radius: 4px;
            background-color: #fff;
            box-shadow: 0 1px 2px 0 rgba(0,0,0,.07);
        }
        .media-tab-module-wrp {
            vertical-align: top;
            border-top: 1px solid #e5e9ef;
            padding-top: 20px;
            margin-top: 20px;
            &:first-child {
                margin-top: 0;
                border-top: none;
                padding-top: 0;
            }
            .media-tab-module-title {
                display: inline-block;
                font-size: 18px;
                font-weight: 700;
                color: #222;
                height: 24px;
                line-height: 24px;
            }
            .media-tab-module-more {
                float: right;
                line-height: 22px;
                border: 1px solid #b7c0cc;
                border-radius: 2px;
                height: 22px;
                padding: 0 10px;
                font-size: 12px;
                color: #6e7579;
                cursor: pointer;
                margin: 0 0 0 10px;
            }
            .media-tab-module-content {
                overflow: hidden;
            }
        }
        .media-tab-detail-r {
            margin-left: 930px;
        }
    }

    @media screen and (max-width: 1400px) {
        .media-tab-wrp {
            .media-tab-nav ul {
                width: 1100px;
            }
        }
        .media-tab-detail-wrp {
            width: 1100px;
            .media-tab-detail-l-wrp {
                width: 740px;
            }
            .media-tab-detail-r {
                margin-left: 750px;
            }
        }
    }
</style>