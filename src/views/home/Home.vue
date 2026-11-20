<template>
    <div>
        <main-header></main-header>
        <div class="kwy-layout">
            <div class="grid-container">
                <div class="recommend-container">
                    <banner :list="BANNER"></banner>
                </div>
                <video-card v-for="(item, index) in DYNAMIC" :key="index" :item="item"></video-card>
            </div>

            <!-- <div class="grid-container" v-if="FOLLOW_LIST && FOLLOW_LIST.length > 0">
                <bangumi-follow :list="FOLLOW_LIST"></bangumi-follow>
            </div> -->

            <div class="grid-container">
                <time-line></time-line>
                <rank></rank>
            </div>

            <div class="grid-container">
                <coming-soon></coming-soon>
            </div>
        </div>
    </div>
</template>

<script>
import MainHeader from '../../components/header/Header.vue'
import VideoCard from './components/VideoCard.vue'
import BangumiCard from './components/BangumiCard.vue'
import Banner from './components/Banner.vue'
import TimeLine from './components/Timeline.vue'
import Rank from './components/Rank.vue'
import ComingSoon from './components/ComingSoon.vue'
import BangumiFollow from './components/Follow.vue'

import HomeModule from '../../store/modules/home'

export default {
    name: 'Home',
    asyncData(ctx) {
        // 注册模块
        ctx.store.registerModule('home', HomeModule)
        return Promise.all([
            ctx.store.dispatch('home/FETCH_BANNER'),
            ctx.store.dispatch('home/FETCH_TIMELINE'),
            ctx.store.dispatch('home/FETCH_ONLINE'),
            ctx.store.dispatch('home/FETCH_RANK', {top: 9}),
            ctx.store.dispatch('home/FETCH_DYNAMIC'),
            // ctx.store.dispatch('home/FETCH_FOLLOW', ctx.cookie)
        ])
    },
    metaInfo() {
        return {
            titleTemplate: '卡哇伊',
        }
    },
    computed: {
        FOLLOW_LIST() {
            return this.$store.state.home.followList
        },
        BANNER() {
            return this.$store.state.home.bannerList
        },
        ONLINE() {
            return this.$store.state.home.onlineList
        },
        DYNAMIC() {
            return this.$store.state.home.dynamicList
        }
    },
    destroyed () {
      // 注销模块
      this.$store.unregisterModule('home')
    },
    components: {
        MainHeader,
        Banner,
        VideoCard,
        BangumiCard,
        TimeLine,
        Rank,
        ComingSoon,
        BangumiFollow,
    }
}

</script>

<style lang="scss">
    .kwy-layout {
        position: relative;
        margin: 0 auto;
        width: 100%;
        max-width: 2078px;
        box-sizing: border-box;
    }
    .grid-container {
        display: grid;
        grid-gap: 20px 12px;
        width: 100%;
        margin-bottom: 56px;
        &:first-child {
            margin-top: 24px;
        }
        .grid-item {
            position: relative;
            height: 200px;
            background-color: #555;
        }
    }
    .recommend-container {
        position: relative;
        grid-column: 1/3;
        grid-row: 1/3;
    }
    @media screen and (max-width: 1099.9px) {
        .kwy-layout {
            padding:0 56px!important;
        }
        .grid-container {
            grid-template-columns: repeat(4, 1fr)!important;
            &>div:nth-of-type(1n + 6) {
                display: none!important;
            }
        }
        .follow-wrap {
            grid-column: span 4!important;
            .follow-grid {
                grid-template-columns: repeat(4, 1fr)!important;
                &>div:nth-of-type(1n + 5) {
                    display: none!important;
                }
            }
        }
        .timeline-wrap {
            grid-column: span 3!important;
            .skeleton-wrap {
                grid-template-columns: repeat(3, 1fr)!important;
                &>div:nth-of-type(1n + 7) {
                    display: none!important;;
                }
            }
            .timeline-grid {
                grid-template-columns: repeat(3, 1fr)!important;
                &.first>div:nth-of-type(1n + 7) {
                    display: none!important;;
                }
            }
        }
        .coming-soon-wrap {
            .grid-bangumi {
                grid-column: span 5!important;
                grid-template-columns: repeat(5, 1fr)!important;
                &>div:nth-of-type(1n + 6) {
                    display: none!important;
                }
            }
        }
    }
    @media screen and (min-width: 1100px) and (max-width: 1366.9px) {
        .kwy-layout {
            padding:0 56px!important;
        }
        .grid-container {
            grid-template-columns:repeat(5, 1fr)!important;
            &>div:nth-of-type(1n + 8) {
                display: none!important;
            }
        }
        .follow-wrap {
            grid-column: span 5!important;
            .follow-grid {
                grid-template-columns: repeat(5, 1fr)!important;
                &>div:nth-of-type(1n + 6) {
                    display: none!important;
                }
            }
        }
        .timeline-wrap {
            grid-column: span 4!important;
            .skeleton-wrap {
                grid-template-columns: repeat(4, 1fr)!important;
                &>div:nth-of-type(1n + 9) {
                    display: none!important;
                }
            }
            .timeline-grid {
                grid-template-columns: repeat(4, 1fr)!important;
                &.first>div:nth-of-type(1n + 9) {
                    display: none!important;
                }
            }
        }
        .coming-soon-wrap {
            .grid-bangumi {
                grid-column: span 6!important;
                grid-template-columns: repeat(6, 1fr)!important;
                &>div:nth-of-type(1n + 7) {
                    display: none!important;
                }
            }
        }
    }
    @media screen and (min-width: 1367px) and (max-width: 1700.9px) {
        .kwy-layout {
            padding:0 64px!important;
        }
        .grid-container {
            grid-template-columns:repeat(5, 1fr)!important;
            &>div:nth-of-type(1n + 8) {
                display: none!important;
            }
        }
        .follow-wrap {
            grid-column: span 5!important;
            .follow-grid {
                grid-template-columns: repeat(5, 1fr)!important;
                &>div:nth-of-type(1n + 6) {
                    display: none!important;
                }
            }
        }
        .timeline-wrap {
            grid-column: span 4!important;
            .skeleton-wrap {
                grid-template-columns: repeat(4, 1fr)!important;
                &>div:nth-of-type(1n + 9) {
                    display: none!important;
                }
            }
            .timeline-grid {
                grid-template-columns: repeat(4, 1fr)!important;
                &.first>div:nth-of-type(1n + 9) {
                    display: none!important;
                }
            }
        }
        .coming-soon-wrap {
            .grid-bangumi {
                grid-column: span 6!important;
                grid-template-columns: repeat(6, 1fr)!important;
                &>div:nth-of-type(1n + 7) {
                    display: none!important;
                }
            }
        }
    }
    @media screen and (min-width: 1701px) and (max-width: 2559.9px) {
        .kwy-layout {
            padding:0 96px!important;
            max-width: 2270px!important;
        }
        .grid-container {
            grid-template-columns:repeat(6, 1fr)!important;
            &>div:nth-of-type(1n + 10) {
                display: none!important;
            }
        }
        .follow-wrap {
            grid-column: span 6!important;
            .follow-grid {
                grid-template-columns: repeat(6, 1fr)!important;
                &>div:nth-of-type(1n + 7) {
                    display: none!important;
                }
            }
        }
        .timeline-wrap {
            grid-column: span 5!important;
            .skeleton-wrap {
                grid-template-columns: repeat(5, 1fr)!important;
                &>div:nth-of-type(1n + 11) {
                    display: none!important;;
                }
            }
            .timeline-grid {
                grid-template-columns: repeat(5, 1fr)!important;
                &.first>div:nth-of-type(1n + 11) {
                    display: none!important;
                }
            }
        }
        .coming-soon-wrap {
            .grid-bangumi {
                grid-column: span 7!important;
                grid-template-columns: repeat(7, 1fr)!important;
                &>div:nth-of-type(1n + 8) {
                    display: none!important;;
                }
            }
        }
    }
    @media screen and (min-width: 2560px) {
        .kwy-layout {
            max-width:2078px!important;
        }
        .grid-container {
            grid-template-columns:repeat(7, 1fr)!important;
            &>div:nth-of-type(1n + 13) {
                display: none!important;
            }
        }
    }
    
</style>