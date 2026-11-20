<template>
    <div>
        <main-header></main-header>
        <div class="rank-wrap">
            <p class="rank-tips">根据7天内数据展示，动态更新</p>
            <ul class="rank-list-wrap">
            <rank-item v-for="(item, index) in RANKLIST" :key="item.media_id" :item="item" :index="index"></rank-item>
            </ul>
        </div>
    </div>
</template>

<script>
import MainHeader from '../../components/header/Header'
import RankItem from './components/RankItem'
import HomeModule from '../../store/modules/home'

export default {
    name: 'Rank',
    asyncData(ctx) {
        // 注册模块
        ctx.store.registerModule('home', HomeModule)
        return Promise.all([
            ctx.store.dispatch('home/FETCH_RANK', {top: 49}),
        ])
    },
    metaInfo() {
        return {
            titleTemplate: '卡哇伊排行榜',
        }
    },
    computed: {
        RANKLIST() {
            return this.$store.state.home.rankList
        }
    },
    methods: {
        epIndex(item) {
            return 2 === item.is_finish ? `全${item.ep_total}话` : (-1 == item.ep_index ? `尚未更新` : `更新至${formatEp(item.ep_index)}`)
        }
    },
    destroyed () {
      // 注销模块
      this.$store.unregisterModule('home')
    },
    components: {
        MainHeader,
        RankItem
    }
}
</script>

<style lang="scss">
    .rank-wrap {
        margin: 0 auto;
        min-width: 107px;
        max-width: 1286px;
        width: 90%;
        .rank-tips {
            font-size: 14px;
            color: #505050;
            display: flex;
            align-items: center;
            margin: 18px 0 14px 0;
        }
        .rank-item {
            transition: .2s;
            overflow: hidden;
            border-bottom: 1px solid #e5e9ef;
            position: relative;
            &:hover {
                box-shadow: 0 2px 5px #ccc;
            }
            .num {
                top: 20px;
                left: 0;
                width: 70px;
                height: 120px;
                line-height: 120px;
                position: absolute;
                text-align: center;
                font-size: 36px;
                font-weight: 700;
                color: #b8c0cc;
                font-family: Helvetica Neue,Tahoma,Arial,PingFangSC-Regular,Hiragino Sans GB,Microsoft Yahei,sans-serif;
            }
            .content {
                padding: 20px 0 0 70px;
                overflow: hidden;
                .cover {
                    display: block;
                    width: 90px;
                    height: 120px;
                    border-radius: 4px;
                    background-color: #e7e7e7;
                    position: relative;
                    float: left;
                    img {
                        width: 90px;
                        height: 120px;
                        border-radius: 4px;
                    }
                }
                .info {
                    display: block;
                    height: 120px;
                    margin-left: 106px;
                    box-sizing: content-box;
                    padding-bottom: 20px;
                    position: relative;
                    &:hover .title {
                        color: #00a1d6;
                    }
                    .title {
                        height: 42px;
                        line-height: 42px;
                        font-size: 18px;
                        font-weight: 700;
                        color: #222;
                        transition: .3s;
                        display: inline-block;
                    }
                    .ep-state {
                        font-size: 12px;
                        color: #99a2aa;
                    }
                    .datas {
                        margin-top: 20px;
                        color: #99a2aa;
                        font-size: 12px;
                        .data-count {
                            width: 80px;
                            margin-right: 20px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            transition: .3s;
                        }
                    }
                }
            }
        }
    }
</style>