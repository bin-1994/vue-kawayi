<template>
    <div class="wrap-right">
        <header class="rank-header">
            <span class="name">排行榜</span>
            <a href="/ranking" target="_blank" class="more">更多<i class="iconfont icon-arrow-right"></i></a>
        </header>
        <empty v-if="RANKLIST.length === 0"></empty>
        <template v-else>
            <rank-item v-for="(item, index) in RANKLIST" :key="index" :item="item" :index="index"></rank-item>
        </template>
    </div>
</template>

<script>
import RankItem from './RankItem'
import Empty from './Empty'
export default {
    name: 'Rank',
    computed: {
        RANKLIST() {
            return this.$store.state.home.rankList
        }
    },
    components: {
        RankItem,
        Empty
    }
}
</script>

<style lang="scss">
    .wrap-right {
        width: 320px;
        .rank-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 16px;
            height: 36px;
            .name {
                display: inline-block;
                color: #212121;
                vertical-align: bottom;
                font-size: 20px;
                line-height: 28px;
            }
            .more {
                display: flex;
                align-items: center;
                padding: 0 0 0 12px;
                width: 58px;
                height: 22px;
                border: 1px solid silver;
                border-radius: 2px;
                color: #505050;
                text-align: center;
                font-size: 12px;
                line-height: 16px;
                transition: all .2s;
                box-sizing: border-box;
                &:hover {
                    background-color: #f4f4f4;
                }
            }
        }
    }
</style>