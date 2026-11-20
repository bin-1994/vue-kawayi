<template>
    <router-view/>
</template>

<script>
export default {
    name: 'Layout',
    asyncData(ctx) {
        return Promise.all([
            ctx.store.dispatch('FETCH_USER', ctx.cookie)
        ])
    },
    metaInfo() {
        return {
            title: '可爱即正义！',
            titleTemplate: '%s_kawaii_卡哇伊',
            meta: [
                {vmid: 'description', name: 'description', content: '卡哇伊-追番、追剧，为您一网打尽'},
                {vmid: 'keywords', name: 'keywords', content: '影视,番剧,动画,动漫,视频,二次元,卡哇伊,kawayi,kawaii'}
            ]
        }
    }
}
</script>