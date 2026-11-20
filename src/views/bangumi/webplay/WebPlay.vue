<template>
    <div>
        <main-header></main-header>
        <div class="player-container clearfix">
            <bangumi-player></bangumi-player>
            <div class="info-wrapper">
                <div class="info-left">
                    <media-info></media-info>
                    <!-- <review-list :list="MEDIA_INFO.reviews"></review-list> -->
                    <comment></comment>
                </div>
                <div class="info-right">
                    <notice></notice>
                    <danmaku></danmaku>
                    <ep-list></ep-list>
                    <!-- <ep-section title="小剧场" :list="MEDIA_INFO.sp" v-if="MEDIA_INFO.sp && MEDIA_INFO.sp.length > 0" :index="EP_INDEX[1]"></ep-section> -->
                    <!-- <ep-section title="预告" :list="MEDIA_INFO.pv" v-if="MEDIA_INFO.pv && MEDIA_INFO.pv.length > 0" :index="EP_INDEX[2]"></ep-section> -->
                    <series-list></series-list>
                </div>
            </div>
        </div>
        <feed-back :ep-info="EP_INFO"></feed-back>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatType, formatEp } from '../../../utils/format'
import MainHeader from '../../../components/header/Header'
import BangumiHeader from './components/Header'
import BangumiPlayer from './components/Player'
import MediaInfo from './components/Media'
import ReviewList from './components/Review'
import EpList from './components/EpList'
import SeriesList from './components/Series'
import FeedBack from './components/FeedBack'
import Notice from './components/Notice'
import EpSection from './components/Section'
import Comment from './components/Comment'
import Danmaku from './components/Danmaku'
export default {
    name: 'WebPlay',
    asyncData(ctx) {
        const params = {
            viewType: 'play',
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
            {vmid: 'referrer', name: 'referrer', content: 'never'},
            {vmid: 'og:type', property: 'og:type', content: 'video'},
            {vmid: 'og:title', property: 'og:title', content: this.MEDIA_INFO.title},
            {vmid: 'og:description', property: 'og:description', content: this.MEDIA_INFO.story.replace(/\n|\r/g, '')},
            {vmid: 'og:image', property: 'og:image', content: this.MEDIA_INFO.cover},
        ]
        let version = `0.6.0`
        if (this.MEDIA_INFO.is_limit != 0) {
            meta.push({vmid: 'robots', name: 'robots', content: 'noindex,nofollow,noarchive'})
        }
        return {
            title: `${this.MEDIA_INFO.title}${this.EP_INFO.ep_index ? '：' + formatEp(this.EP_INFO.ep_index, this.MEDIA_INFO.type) : ''}_${formatType(this.MEDIA_INFO.type)}`,
            meta: meta,
            link: [
                {vmid: 'player.css', rel: 'stylesheet', href: `/player.min.css?v=${version}`},
                {vmid: 'comment.css', rel: 'stylesheet', href: `/comment.min.css?v=${version}`}
            ],
            script: [
                {vmid: 'hls.js', src: '/hls.min.js', type: 'text/javascript'},
                {vmid: 'jquery.js', src: '/jquery.min.js', type: 'text/javascript'},
                {vmid: 'lottie.js', src: '/lottie.min.js', type: 'text/javascript'},
                {vmid: 'danmaku.js', src: `/danmaku.min.js?v=${version}`, type: 'text/javascript'},
                {vmid: 'player.js', src: `/player.min.js?v=${version}`, type: 'text/javascript'},
                {vmid: 'comment.js', src: `/comment.min.js?v=${version}`, type: 'text/javascript'},
            ],
            bodyAttrs: {
                style: 'opacity:0'
            }
        }
    },
    mounted() {
        this.setSize()
        // window.document.body.style.opacity = ''
        window.addEventListener('resize', this.setSize)

        console.log(window.document.body.style.opacity)
    },
    methods: {
        setSize() {
            let rightWidth = 350,
                winHeight = window.innerHeight || document.documentElement.clientHeight,
                winWidth = window.innerWidth || document.documentElement.clientWidth,
                proportion = parseInt(16 * (.743 * winHeight - 108.7) / 9),
                _width = winWidth - 152 - rightWidth,
                minWidth = _width < proportion ? _width : proportion
            minWidth < 638 && (minWidth = 638)
            1280 < minWidth && (minWidth = 1280)
            let width = minWidth + rightWidth,
                playerHeight = Math.round(9 * width / 16)
            // playerHeight += 56
            document.querySelector('.player-container').style.width = `${width}px`
            document.querySelector('.player-wrapper').style.height = `${playerHeight}px`
        }
    },
    computed: {
      ...mapGetters('bangumi', ['MEDIA_INFO', 'EP_INFO', 'EP_INDEX']),
    },
    components: {
        MainHeader,
        BangumiHeader,
        BangumiPlayer,
        MediaInfo,
        EpList,
        ReviewList,
        SeriesList,
        FeedBack,
        Notice,
        EpSection,
        Comment,
        Danmaku
    }
}
</script>

<style lang="scss">
    .player-container {
        position: relative;
        margin: 20px auto;
        max-width: 1660px;
        min-width: 988px;
        box-sizing: border-box;
    }
    .info-wrapper {
        display: flex;
        justify-content: space-between;
        .info-left {
            width: 100%;
        }
        .info-right {
            // position: absolute;
            // right: 0;
            margin-left: 16px;
            width: 320px;
            padding-top: 16px;
        }
    }
</style>