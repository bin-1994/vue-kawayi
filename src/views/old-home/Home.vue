<template>
    <div>
        <main-header></main-header>
        <banner :list="$store.state.home.bannerList" :duration="4000" v-if="$store.state.home.bannerList.length > 0"></banner>
        <div class="k-wrap">
            <timeline></timeline>
            <follow :list="FOLLOW_LIST"></follow>
        </div>
        <div class="k-wrap" v-if="4 < ONLINE.length">
            <coming-soon></coming-soon>
        </div>
        <div class="k-wrap">
            <dynamic></dynamic>
            <rank></rank>
        </div>
        <main-footer></main-footer>
    </div>
</template>

<script>
import MainHeader from '../../components/header/Header'
import MainFooter from '../../components/footer/Footer'
import Banner from './components/Banner'
import Timeline from './components/Timeline'
import Follow from './components/Follow'
import Rank from './components/Rank'
import ComingSoon from './components/ComingSoon'
import Dynamic from './components/Dynamic'
import HomeModule from '../../store/modules/home'
import Cookie from '../../utils/cookie'
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
            ctx.store.dispatch('home/FETCH_FOLLOW', ctx.cookie)
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
        ONLINE() {
            return this.$store.state.home.onlineList
        }
    },
    mounted() {
        // Cookie.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJiaXViaXViaXUiLCJleHAiOjE1NzA1Mjk4NTcsImlzcyI6InBycHJwciIsInVpZCI6MX0.r4XwBMuxx1urwY_NAj6j68KJAO2EOgQvWpBAA1X7hmQ', "d7")

        // console.log(Cookie.get('token'))
    },
    destroyed () {
      // 注销模块
      this.$store.unregisterModule('home')
    },
    components: {
        MainHeader,
        Banner,
        Timeline,
        Rank,
        Follow,
        Dynamic,
        ComingSoon,
        MainFooter
    }
}
</script>

<style lang="scss">
    .k-wrap {
        display: flex;
        justify-content: space-between;
        width: 1630px;
        margin: 40px auto 0;
    }
    .zone-list-box {
        width: 1286px;
        height: 404px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
        .item {
            margin: 0 30px 24px 0
        }
    }

    .time-line .zone-list-box {
        width: 1287px;
        height: 376px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        justify-content: flex-start;
        overflow: auto;
    }

@media screen and (max-width: 1870px) {
    .k-wrap {
        width: 1414px;
        &.banner-wrapper {
            height: 405px;
        }
        .zone-list-box {
            width: 1070px;
            .time-line-card {
                margin: 0 30px 24px 0;
                width: 227px;
            }
            .video-card {
                &:nth-child(n+11) {
                    display: none;
                }
            }
        }
    }
}

@media screen and (max-width: 1654px) {
    .k-wrap {
        width: 1198px;
        &.banner-wrapper {
            height: 343px;
        }
        .zone-list-box {
            width: 854px;
            .video-card {
                &:nth-child(n+9) {
                    display: none;
                }
            }
        }
    }
}

@media screen and (max-width: 1438px) {
    .k-wrap {
        width: 999px;
        .zone-list-box {
            width: 710px;
            height: 360px;
            .time-line-card {
                margin: 0 20px 24px 0;
                width: 210px;
                .item-right {
                    width: 130px;
                }
            }
            .video-card {
                width: 170px;
                .card-pic {
                    height: 106px;
                }
                &:nth-child(n+9) {
                    display: none;
                }
            }
        }
        .wrap-right {
            width: 265px;
            .rank-wrap:nth-child(n+11) {
                display: none;
            }
            .rank-name {
                width: 235px;
            }
        }
        &.banner-wrapper {
            height: 286px;
        }
        .dynamic-wrapper {
            .zone-list-box {
                height: 322px;
            }
        }
    }
}
</style>