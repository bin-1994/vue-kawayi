<template>
    <div class="media-info-card">
        <div class="mic-title">{{ info.title }}</div>
        <template v-if="info.content && '' != info.content">
        <div class="mic-content" :style="{height: staticShow ? `${info.height}px` : 'auto'}">
            <span ref="content" v-html="staffRender"></span>
        </div>
        <div class="mic-expand" v-if="expandShow" @click="expand">展开更多</div>
        </template>
        <div class="mic-nodata" v-else :style="[{height: `${info.height}px`}, {'line-height': `${info.height}px`}]">QAQ!暂时还没有找到相关的资料</div>
    
    </div>
</template>

<script>
export default {
    name: 'InfoCard',
    data() {
        return {
            staticShow: true,
            expandShow: false
        }
    },
    props: {
        info: {
            type: Object,
            required: true
        }
    },
    computed: {
        staffRender() {
            return this.info.content ? this.info.content.replace(/(\r\n)|(\n)|(\r)/g, "<br>") : ""
        }
    },
    mounted() {
        this.$refs.content && this.$refs.content.offsetHeight > 174 ? this.expandShow = true : this.staticShow = false
    },
    methods: {
        expand() {
            this.staticShow = false
            this.expandShow = false
        }
    }
}
</script>

<style lang="scss">
    .media-info-card {
        position: relative;
        font-size: 12px;
        box-sizing: border-box;
        padding: 20px;
        width: 350px;
        min-height: 274px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.07);
        &+.media-info-card {
            margin-top: 10px;
        }
        .mic-title {
            font-size: 18px;
            line-height: 24px;
            margin-bottom: 6px;
            font-weight: 700;
        }
        .mic-content {
            position: relative;
            overflow: hidden;
            transition: all .3s linear;
            span {
                top: 0;
                left: 0;
                font-size: 14px;
                line-height: 24px;
                display: inline-block;
                vertical-align: middle;
                word-wrap: break-word;
                word-break: break-all;
                max-height: 1000px;
            }
        }
        .mic-nodata {
            text-align: center;
            color: #6d757a;
        }
        .mic-expand {
            position: absolute;
            font-size: 12px;
            width: 48px;
            text-align: center;
            height: 16px;
            line-height: 16px;
            color: #99a2aa;
            cursor: pointer;
            bottom: 20px;
            left: 50%;
            margin-left: -24px;
        }
    }
</style>