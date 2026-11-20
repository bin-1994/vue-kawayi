<template>
    <ul class="nav-link">
        <li class="nav-link-item" v-for="(item, index) in navList" :key="index">
            <a :href="item.link" class="link" target="_blank">{{ item.title }}</a>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'MainNav',
    data() {
        return {
            navList: [
                {title: '首页', link: '/'},
                {title: '番剧', link: '/classify'},
                {title: '排行榜', link: '/ranking'},
            ]
        }
    }
}
</script>

<style lang="scss">
    .nav-link {
        padding: 10px 0;
        height: 36px;
        display: flex;
        align-items: center;
        .nav-link-item {
            margin-right: 12px;
            .link {
                font-size: 14px;
                color: #212121;
                display: flex;
                white-space: nowrap;
                &:hover {
                    color: #00a1d6;
                }
            }
        }
    }
</style>