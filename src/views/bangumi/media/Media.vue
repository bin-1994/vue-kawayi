<template>
    <div>
        <main-header class="mini-type"></main-header>
        <div class="taper-line"></div>
        <media-info></media-info>
        <media-tab></media-tab>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatType } from '../../../utils/format'
import MainHeader from '../../../components/header/Header'
import MediaInfo from './components/header/Info'
import MediaTab from './components/Tab'
export default {
    name: 'Media',
    asyncData(ctx) {
        let params = {
            viewType: 'media',
            id: ctx.route.params.id.substr(2),
            cookie: ctx.cookie
        }
        return Promise.all([
            ctx.store.dispatch('bangumi/FETCH_MEDIA_INFO', params),
            ctx.store.dispatch('bangumi/FETCH_USER_STATE', params)
        ])
    },
    metaInfo() {
        let meta = [
            {vmid: 'description', name: 'description', content: this.MEDIA_INFO.story.replace(/\n|\r/g, '')},
            {vmid: 'keywords', name: 'keywords', content: this.MEDIA_INFO.keywords},
            {vmid: 'og:type', property: 'og:type', content: 'videolist'},
            {vmid: 'og:title', property: 'og:title', content: this.MEDIA_INFO.title},
            {vmid: 'og:description', property: 'og:description', content: this.MEDIA_INFO.story.replace(/\n|\r/g, '')},
            {vmid: 'og:image', property: 'og:image', content: this.MEDIA_INFO.cover},
        ]
        if (this.MEDIA_INFO.is_limit != 0) {
            meta.push({name: 'robots', content: 'noindex,nofollow,noarchive'})
        }
        return {
            title: `${this.MEDIA_INFO.title}_${formatType(this.MEDIA_INFO.type)}`,
            meta: meta
        }
    },
    computed: {
      ...mapGetters('bangumi', ['MEDIA_INFO', 'USER_STATE']),
    },
    components: {
        MainHeader,
        MediaInfo,
        MediaTab
    }
}
</script>

<style lang="scss">
.taper-line {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100px;
    background: linear-gradient(rgba(0,0,0,.4),transparent);
}
</style>