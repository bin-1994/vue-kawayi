<template>
    <div class="notice-wrap" v-show="notice">
        {{ notice }}
    </div>
</template>

<script>
export default {
    name: 'Notice',
    data() {
        return {
            notice: ''
        }
    },
    mounted() {
        this.notice = '页面有问题可尝试清空缓存（Ctrl+F5）'
    }
}
</script>

<style lang="scss">
    .notice-wrap {
        position: relative;
        padding: 10px 0;
        width: 100%;
        line-height: 20px;
        border-radius: 2px;
        text-align: center;
        color: #e78b1f;
        background-color: #fff1d3;
        border: 1px solid #f8dfaa;
        margin-bottom: 20px;
        box-sizing: border-box;
    }
</style>