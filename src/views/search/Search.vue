<template>
    <div>
        <main-header :show-search="false"></main-header>
        <div class="search-wrapper">
            <search-header></search-header>
            <div class="error-wrap" v-if="0 == SEARCH_LIST.length && 'loaded' === LOAD_STATE">
                <p class="text">没有找到相关数据</p>
            </div>
            <ul class="search-body" v-else>
                <li class="search-item" v-for="item in SEARCH_LIST" :key="item.media_id">
                    <div class="search-item-wrap">
                        <a :href="`/bangumi/media/md${item.media_id}`" target="_blank" class="search-cover" :title="item.title">
                            <lazy-img :src="item.cover" key="item.cover"></lazy-img>
                        </a>
                        <div class="search-info">
                            <div class="headline">
                                <span class="bangumi-label">{{ labelTypeFormat(item.type) }}</span>
                                <a :href="`/bangumi/media/md${item.media_id}`" target="_blank" :title="item.title" class="title" v-html="replaceEm(item.title)"></a>
                            </div>
                            <div class="info-wrap">
                                <div class="info-item">版本：<span>{{ versionFormat(item.version) }}</span></div>
                                <div class="info-item">地区：<span>{{ areaFormat(item.area) }}</span></div>
                                <div class="info-item">开播时间：<span>{{ pubTimeFormat(item) }}</span></div>
                                <div class="info-item">声优：<span :title="item.cast">{{ item.cast }}</span></div>
                            </div>
                            <div class="info-story">简介：{{ item.story }}</div>
                            <ep-group :ep-list="item.episodes" v-if="item.episodes && item.episodes.length > 0"></ep-group>
                        </div>
                    </div>
                </li>
            </ul>
            
            <pagination :count="TOTAL" :curr-page="parseInt($route.query.page || 1)" :total-pages="PAGES" @change="pageChange"></pagination>
        </div>
    </div>
</template>

<script>
import MainHeader from '../../components/header/Header'
import SearchHeader from './components/Header'
import LazyImg from '../../components/common/LazyImg'
import SearchModule from '../../store/modules/search'
import { formatDate } from '../../utils/format'
import EpGroup from './components/EpGroup'
import Pagination from '../../components/common/Pagination'
export default {
    name: 'Search',
    metaInfo () {
        let title = this.$route.query.keyword ? `${this.$route.query.keyword} - 搜索结果` : `搜索`
        return {
            title: title
        }
    },
    asyncData(ctx) {
        ctx.store.registerModule('search', SearchModule)
        return Promise.all([
            ctx.store.dispatch('search/FETCH_SEARCH_LIST', ctx.route.query)
        ])
    },
    computed: {
        SEARCH_LIST() {
            return this.$store.state.search.searchList
        },
        TOTAL() {
            return this.$store.state.search.total
        },
        PAGES() {
            return this.$store.state.search.pages
        },
        LOAD_STATE() {
            this.$store.state.search.loadState
        }
    },
    methods: {
        replaceEm(title) {
            return title.replace(new RegExp(this.$route.query.keyword,'g'), `<em class="keyword">${this.$route.query.keyword}</em>`)
        },
        versionFormat(number) {
            switch (number) {
                case 1:
                    return '正片'
                case 2:
                    return '电影'
                default:
                    return '其他'
            }
        },
        areaFormat(number) {
            switch (number) {
                case 101:
                    return '中国大陆'
                case 102:
                    return '中国台湾'
                case 103:
                    return '中国香港'
                case 104:
                    return '中国澳门'
                case 201:
                    return '日本'
                case 301:
                    return '美国'
                case 401:
                    return '韩国'
                case 101201:
                    return '中国、日本'
                case 101301:
                    return '中国、美国'
                default:
                    return '其他'
            }
        },
        labelTypeFormat(number) {
            switch (number) {
                case 1:
                    return '动画'
                case 2:
                    return '电视剧'
                default:
                    return '未知'
            }
        },
        pubTimeFormat(item) {
            return item.pub_string ? item.pub_string : formatDate(item.pub_time)
        },
        pageChange(page) {
            let query = {
                keyword: this.$route.query.keyword,
                page: page
            }
            this.$router.push({path: 'search', query: query})
        }
    },
    destroyed () {
      // 注销模块
      this.$store.unregisterModule('search')
    },
    components: {
        MainHeader,
        SearchHeader,
        LazyImg,
        EpGroup,
        Pagination
    }
}
</script>

<style lang="scss">
    .search-wrapper {
        width: 980px;
        margin: 0 auto;
        .page-list {
            padding: 20px 0;
        }
    }
    .search-body {
        position: relative;
        .search-item {
            position: relative;
            border-bottom: 1px solid #e5e9ef;
            height: auto;
            min-height: 214px;
            margin-top: 20px;
            .search-item-wrap {
                margin-bottom: 30px;
            }
            .search-cover {
                position: relative;
                overflow: hidden;
                border-radius: 2px;
                display: block;
                width: 160px;
                height: 214px;
                margin-right: 20px;
                float: left;
                &:hover:after {
                    position: absolute;
                    content: '';
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,.5);
                    background-repeat: no-repeat;
                    background-size: 38%;
                    background-position: 55px 73px;
                    background-image: url(../../assets/images/logoplay.png);
                }
            }
            .search-info {
                position: relative;
                overflow: hidden;
                min-height: 214px;
                font-size: 12px;
                .headline {
                    height: 24px;
                    margin-bottom: 15px;
                    font-size: medium;
                    .bangumi-label {
                        display: inline-block;
                        height: 22px;
                        padding: 0 10px;
                        border: 1px solid #979797;
                        color: #979797;
                        text-align: center;
                        line-height: 22px;
                        border-radius: 100px;
                        margin-right: 12px;
                        font-size: 12px;
                        vertical-align: middle;
                    }
                    .title {
                        display: inline-block;
                        height: 24px;
                        max-width: 600px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        vertical-align: middle;
                        margin-right: 6px;
                        font-weight: 700;
                        line-height: 24px;
                        font-size: 16px;
                        color: #222;
                        .keyword {
                            color: #f25d8e;
                            font-style: normal;
                            font-weight: 700;
                        }
                    }
                }
                .info-wrap {
                    font-size: 12px;
                    .info-item {
                        overflow: hidden;
                        display: inline-block;
                        width: 49%;
                        height: auto;
                        margin-top: 0;
                        line-height: 17px;
                        margin-bottom: 0;
                        color: #b0b7bd;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        span {
                            color: #222;
                        }
                    }
                }
                .info-story {
                    height: 40px;
                    line-height: 20px;
                    color: #99a2aa;
                    margin-top: -2px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    margin-bottom: 21px;
                }
            }
        }
    }
    .error-wrap {
        width: 100%;
        margin-top: 20px;
        background-color: #fff;
        line-height: 440px;
        text-align: center;
        height: inherit;
        color: #777;
        position: relative;
        border: 1px solid #e5e9ef;
        background: url(../../assets/images/no-more.png) 50% 100% no-repeat;
        .text {
            font-size: 25px;
        }
    }
</style>