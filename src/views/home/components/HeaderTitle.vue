<template>
    <div class="header-wrap">
        <div class="left-wrap">
            <div class="header-title">{{ title }}</div>
            <slot></slot>
        </div>
        <div class="right-wrap">
            <a class="more-btn" :href="moreLink" target="_blank"><span>查看更多</span></a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderTitle',
    props: {
        title: {
            default: '未命名标题',
            type: String
        },
        moreLink: {
            default: '#',
            type: String
        }
    },
}
</script>

<style lang="scss">
    .header-wrap {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        z-index: 1;
        height: 34px;
        margin-bottom: 12px;
        .left-wrap {
            display: flex;
            height: 100%;
            flex-direction: row;
            align-items: center;
            .header-title {
                margin-right: 10px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                font-size: 24px;
                color: #18191c;
            }
        }
        .right-wrap {
            display: flex;
            height: 100%;
            flex-direction: row;
            align-items: center;
            .more-btn {
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 8px;
                color: #18191c;
                border: 1px solid #e3e5e7;
                margin-left: 8px;
                transform-origin: center;
                transition: .2s;
                padding: 8px 12px;
                cursor: pointer;
                &:hover {
                    background-color: #e3e5e7;
                }
            }
        }
        
    }
</style>