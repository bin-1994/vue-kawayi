<template>
    <div class="dynamic-wrapper">
        <header class="dynamic-header">
            <div class="dynamic-title">番剧动态</div>
            <a href="/movie/index#category=1&version=0&area=1&state=0&month=0&year=0&style=0&order=2&sort=0&page=1" target="_blank" class="more">更多<i class="iconfont icon-arrow-right"></i></a>
        </header>
        <div class="zone-list-box">
            <dynamic-item v-for="(item, index) in DYNAMIC" :key="index" :item="item"></dynamic-item>
        </div>
    </div>
</template>

<script>
import DynamicItem from './DynamicItem'
export default {
    name: 'Dynamic',
    computed: {
        DYNAMIC() {
            return this.$store.state.home.dynamicList
        }
    },
    components: {
        DynamicItem
    }
}
</script>

<style lang="scss">
    .dynamic-wrapper {
        .dynamic-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
            height: 36px;
            .dynamic-title {
                margin: 0 20px 0 0;
                vertical-align: bottom;
                font-size: 20px;
                line-height: 36px;
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
        .zone-list-box {
            height: 364px;
        }
    }
</style>