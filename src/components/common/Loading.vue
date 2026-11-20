<template>
    <div class="load-state" v-if="!source">
        <span class="loading" v-if="'loading' === this.state">正在加载</span>
        <span class="error" v-if="'error' === this.state">加载失败<a href="javascript:;" @click="reloads()">点击重试</a></span>
        <span class="empty" v-if="'loaded' === this.state">没有数据(-_-#)</span>
    </div>
</template>

<script>
export default {
    name: 'Loading',
    props: {
        state: {
            default: 'loading'
        },
        data: {}
    },
    computed: {
        source() {
            let str = Object.prototype.toString
            return "[object Array]" === str.call(this.data) ? 0 !== this.data.length : "[object Object]" === str.call(this.data) ? ("{}" === JSON.stringify(this.data)) : void 0
        }
    },
    methods: {
        reloads() {
            this.$emit("reload")
        }
    }
}
</script>

<style lang="scss">
    .load-state {
        text-align: center;
        color: #99a2aa;
        height: 100%;
        display: table;
        width: 100%;
        a {
            color: #00a1d6;
        }
        span {
            vertical-align: middle;
            display: table-cell;
            &:before {
                text-align: center;
                content: "";
                display: inline-block;
                vertical-align: middle;
                width: 20px;
                height: 20px;
                background-image: url(../../assets/images/empty-icon.png);
                background-repeat: no-repeat;
                margin-right: 5px;
                margin-top: -3px;
            }
            &.loading:before {
                width: 24px;
                height: 24px;
                margin-top: -5px;
                background-image: url(../../assets/images/loading.gif);
            }
            &.empty:before {
                background-position: center -598px;
            }
            &.error:before {
                background-position: center -471px;
            }
        }
    }
</style>