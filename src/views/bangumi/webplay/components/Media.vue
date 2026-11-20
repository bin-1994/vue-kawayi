<template>
    <div class="media-wrapper clearfix">
        <div class="media-info">
            <a :href="`/bangumi/media/md${MEDIA_INFO.media_id}`" target="_blank" class="media-cover"><img :src="MEDIA_INFO.cover"></a>
            <div class="media-right">
                <h1 class="media-title">{{ h1title }}</h1>
                <div class="media-count">{{ views }}人气  ·  {{ follows }}追番</div>
                <div class="pub-wrapper clearfix">
                    <!-- <span>{{ version }}</span> -->
                    <span>{{ pubDateShow }}</span>
                    <span v-if="indexShow">{{ indexShow }}</span>
                    <span>{{ EP_INFO.vid }}</span>
                    <div class="tips-wrap" v-if="MEDIA_INFO.publish.tips">
                        <i class="split-line"></i>
                        <span>{{ MEDIA_INFO.publish.tips }}</span>
                    </div>
                </div>
                <div ref="storyWrapper" :class="['media-story', {'webkit-ellipsis': !descExpand}]">
                    <span ref="story" class="absolute" v-html="story"></span>
                    <span v-html="story"></span>
                    <i @click="expandDesc" v-show="needExpand">{{ descExpand ? `收起` : `展开` }}</i>
                </div>
                <!-- <div class="media-rating">
                    <h4 :class="['score', {'gray': MEDIA_INFO.rating.score <= 0}]">{{ ratingScore }}</h4>
                    <p>{{ ratingText }}</p>
                </div> -->
                <div class="media-tool-bar">
                    <div class="btn-rating">
                        <ul class="star-wrapper clearfix">
                            <li v-for="(item, index) in stars" :key="index"><i :class="['iconfont', {'icon-star-empty': 'empty' === item.type}, {'icon-star-full': 'full' === item.type}]" ></i></li>
                        </ul>
                        <span>{{ btnRatingText }}</span>
                    </div>
                    <div :class="['btn-follow', {'followed': MEDIA_FOLLOW}]" @click="follow">
                        <i class="iconfont icon-love"></i>
                        <span>{{ followBtnText }}</span>
                        <div class="bangumi-options clearfix" v-if="MEDIA_FOLLOW">
                            <ul class="opt-list">
                                <li :class="{disabled: 1 === USER_STATE.progress.follow_state}" @click.stop="markAs(1)">标记为 想看</li>
                                <li :class="{disabled: 2 === USER_STATE.progress.follow_state}" @click.stop="markAs(2)">标记为 在看</li>
                                <li :class="{disabled: 3 === USER_STATE.progress.follow_state}" @click.stop="markAs(3)">标记为 已看</li>
                                <li>取消追番</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatDate, formatEp, formatNum } from '../../../../utils/format'
import { post } from '../../../../utils/axios'
export default {
    name: 'Media',
    data() {
        return {
            expandShow: false,
            needExpand: false,
            descExpand: false,
            resizeHandler: () => {},
        }
    },
    computed: {
        ...mapGetters('bangumi', ['MEDIA_INFO', 'EP_INFO', 'USER_STATE', 'MEDIA_FOLLOW']),
        version() {
            let version = ['未知', '正片', '电影', '其他']
            return version[this.MEDIA_INFO.version]
        },
        views() {
            return this.$store.state.userInfo ? formatNum(this.MEDIA_INFO.count.views) || '-' : '`'
        },
        follows() {
            return this.$store.state.userInfo ? formatNum(this.MEDIA_INFO.count.series_follow) || '-' : '-'
        },
        pubDateShow() {
            return this.MEDIA_INFO.publish.pub_string ? this.MEDIA_INFO.publish.pub_string : formatDate(this.MEDIA_INFO.publish.pub_time) + '开播'
        },
        h1title() {
            if (2 == this.MEDIA_INFO.version && 1 == this.MEDIA_INFO.episodes.length) {
                return this.MEDIA_INFO.title
            }
            return `${this.MEDIA_INFO.title}${this.EP_INFO.ep_index ? '：' + formatEp(this.EP_INFO.ep_index, this.MEDIA_INFO.type) : ''} ${this.EP_INFO.title ? this.EP_INFO.title : ''}`
        },
        indexShow() {
            return 2 == this.MEDIA_INFO.publish.is_finish ? `已完结，全${this.MEDIA_INFO.publish.ep_total}${1 === this.MEDIA_INFO.type ? '话' : '集'}` : (-1 == this.MEDIA_INFO.publish.ep_index ? `尚未开播` : (this.MEDIA_INFO.publish.on_air ? `连载中，${this.MEDIA_INFO.publish.on_air}更新` : ''))
        },
        ratingScore() {
            return 0 === this.MEDIA_INFO.rating.score ? "暂无评分" : this.MEDIA_INFO.rating.score
        },
        ratingText() {
            return this.MEDIA_INFO.rating.total > 0 ? `${this.MEDIA_INFO.rating.total}人评分` : '评分人数不足'
        },
        btnRatingText() {
            return this.USER_STATE.review && this.USER_STATE.review.review_id ? "已点评" : "点评"
        },
        stars() {
            let score = Math.round(this.USER_STATE.review && this.USER_STATE.review.score || 0),
                stars = [{type: "empty"}, {type: "empty"}, {type: "empty"}, {type: "empty"}, {type: "empty"}]
            if (0 === score)
                return stars
            for (let i = 0; i < 10; i++)
                (i < 2 || i < score) && (stars[Math.floor(i / 2)].type = "full")
            return stars
        },
        followBtnText() {
          let text = (1 == this.MEDIA_INFO.type) ? '番' : '剧'
          return this.MEDIA_FOLLOW ? '已追' + text : '追' + text
        },
        story() {
            return this.MEDIA_INFO.story.replace(/\n/g,"<br/>")
        }
    },
    mounted() {
        this.resizeHandler = () => {
            let wrapperHeight = this.$refs.storyWrapper ? this.$refs.storyWrapper.clientHeight : 0,
                storyHeight = this.$refs.story ? this.$refs.story.clientHeight : 0
            this.needExpand = storyHeight > wrapperHeight
        }
        this.resizeHandler()
        window.addEventListener('resize', this.resizeHandler)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeHandler)
    },
    methods: {
        expandDesc(event) {
            event.stopPropagation()
            event.preventDefault()
            this.descExpand = !this.descExpand
        },
        // resizeHandler() {
        //     let wrapperHeight = this.$refs.storyWrapper ? this.$refs.storyWrapper.clientHeight : 0,
        //         storyHeight = this.$refs.story ? this.$refs.story.clientHeight : 0
        //     this.needExpand = storyHeight > wrapperHeight
        // },
        follow() {
            let url = this.MEDIA_FOLLOW ? `add` : `del`
            let data = {
                series_id: this.MEDIA_INFO.season_id,
                media_id: this.MEDIA_INFO.media_id
            }
            post(`/follow/${url}`, data).then(res => {
                if (0 === res.code) {
                    this.$store.dispatch('bangumi/CHANGE_MEDIA_FOLLOW', !this.MEDIA_FOLLOW)
                }
            })
        },
        markAs(state) {
            if (state === this.USER_STATE.progress.follow_state) {
                return
            }
            let data = {
                state: state,
                media_id: this.MEDIA_INFO.media_id
            }
            post(`/bangumi/state`, data).then(res => {
                if (1 === res.code) {
                    return
                }
                this.$store.dispatch('bangumi/CHANGE_PROGRESS', {
                    follow_state: state
                })
            })
        }
    }
}
</script>

<style lang="scss">
    .media-wrapper {
        padding: 16px 0;
        .media-cover {
            position: relative;
            display: block;
            float: left;
            width: 134px;
            height: 179px;
            z-index: 2;
            border-radius: 2px;
            overflow: hidden;
            background-color: #f4f5f7;
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .media-right {
            position: relative;
            padding-left: 150px;
            height: 100%;
            z-index: 1;
            // h1 {
            //     display: none;
            //     color: #222;
            //     font-size: 18px;
            //     line-height: 22px;
            //     font-weight: 500;
            //     text-overflow: ellipsis;
            //     white-space: nowrap;
            //     overflow: hidden;
            //     margin-bottom: 16px;
            // }
            .media-title {
                display: block;
                height: 20px;
                line-height: 20px;
                font-size: 18px;
                color: #212121;
                font-weight: 500;
                margin-top: 4px;
                margin-bottom: 16px;
                padding-right: 240px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .media-count {
                height: 16px;
                line-height: 16px;
                font-size: 14px;
                color: #999;
                margin-bottom: 8px;
            }
            .pub-wrapper {
                height: 16px;
                margin-bottom: 8px;
                font-size: 14px;
                color: #212121;
                span {
                    display: inline-block;
                    margin-right: 10px;
                    color: #212121;
                }
                .tips-wrap {
                    display: inline-block;
                    height: 16px;
                    .split-line {
                        height: 16px;
                        width: 1px;
                        display: inline-block;
                        line-height: 16px;
                        background-color: silver;
                        margin-right: 16px;
                        vertical-align: top;
                    }
                    span {
                        color: #fb7299;
                    }
                }
            }
            .media-story {
                position: relative;
                display: block;
                font-size: 14px;
                color: #212121;
                min-height: 18px;
                line-height: 18px;
                word-wrap: break-word;
                word-break: break-all;
                white-space: normal;
                &.webkit-ellipsis {
                    display: -webkit-box!important;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    word-wrap: break-word!important;
                    word-break: break-word!important;
                    white-space: normal!important;
                    overflow: hidden!important;
                    text-overflow: ellipsis!important;
                    i {
                        position: absolute;
                        padding-left: 12px;
                        right: 0;
                        bottom: -2px;
                    }
                }
                i {
                    position: relative;
                    display: inline-block;
                    vertical-align: top;
                    padding-left: 4px;
                    height: 18px;
                    line-height: 18px;
                    text-align: right;
                    color: #00a1d6;
                    background-color: #fff;
                    font-style: normal;
                    cursor: pointer;
                    z-index: 3;
                }
                .absolute {
                    position: absolute;
                    display: inline-block;
                    vertical-align: top;
                    top: 0;
                    left: 0;
                    right: 0;
                    line-height: 18px;
                    opacity: 0;
                    z-index: 2;
                }
            }
            .media-rating {
                margin-top: 11px;
                .score {
                    position: relative;
                    height: 24px;
                    line-height: 24px;
                    font-weight: 700;
                    font-size: 24px;
                    color: #ffa726;
                    margin-bottom: 4px;
                    font-family: HelveticaNeue-Bold;
                    padding-right: 14px;
                    display: inline-block;
                    &:after {
                        content: "\5206";
                        display: block;
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        width: 14px;
                        height: 16px;
                        line-height: 16px;
                        font-size: 12px;
                        text-align: right;
                        font-family: PingFangSC-Regular;
                        font-weight: 400;
                    }
                    &.gray {
                        font-size: 20px;
                        color: silver;
                        font-weight: 500;
                        font-family: PingFangSC-Regular;
                        padding-right: 0;
                        &:after {
                            display: none;
                        }
                    }
                }
                p {
                    height: 16px;
                    line-height: 16px;
                    font-size: 12px;
                    color: #999;
                }
            }
            .media-tool-bar {
                position: absolute;
                top: 0;
                right: 0;
                height: 32px;
                .btn-rating {
                    height: 30px;
                    border-radius: 2px;
                    border: 1px solid silver;
                    float: left;
                    padding: 0 10px;
                    transition: width .3s ease;
                    color: #505050;
                    background-color: #fff;
                    white-space: nowrap;
                    cursor: pointer;
                    margin-right: 12px;
                    .star-wrapper {
                        position: relative;
                        display: inline-block;
                        vertical-align: top;
                        height: 20px;
                        margin-right: 8px;
                        padding-top: 7px;
                        li {
                            position: relative;
                            margin-right: 1px;
                            display: inline-block;
                            vertical-align: top;
                            width: 16px;
                            height: 16px;
                            i {
                                position: absolute;
                                top: 0;
                                left: 0;
                                display: block;
                                width: 100%;
                                height: 100%;
                                line-height: 16px;
                                font-size: 16px;
                                text-align: center;
                                color: #999;
                            }
                        }
                    }
                    span {
                        display: inline-block;
                        vertical-align: top;
                        height: 30px;
                        line-height: 30px;
                        font-size: 14px;
                    }
                }
                .btn-follow {
                    position: relative;
                    float: left;
                    width: 72px;
                    height: 32px;
                    text-align: center;
                    background-color: #fb7299;
                    color: #fff;
                    border-radius: 2px;
                    cursor: pointer;
                    transition: all .3s ease;
                    font-size: 14px;
                    &:hover {
                        background-color: #ff85ad;
                        .bangumi-options {
                            transform: none;
                            visibility: visible;
                            opacity: 1;
                        }
                    }
                    i {
                        display: inline-block;
                        vertical-align: top;
                        width: 14px;
                        height: 14px;
                        line-height: 14px;
                        margin-top: 9px;
                        margin-right: 9px;
                        color: #fff;
                        font-size: 18px;
                    }
                    span {
                        display: inline-block;
                        vertical-align: top;
                        height: 32px;
                        line-height: 32px;
                        font-size: 14px; 
                    }
                    .bangumi-options {
                        position: absolute;
                        right: 0;
                        width: 128px;
                        bottom: -160px;
                        font-size: 14px;
                        height: 160px;
                        z-index: 11;
                        visibility: hidden;
                        opacity: 0;
                        transform: scaleY(0);
                        transform-origin: center top;
                        transition: all .3s;
                        .opt-list {
                            position: absolute;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            padding: 6px 0;
                            background-color: #fff;
                            border: 1px solid #e5e9ef;
                            border-radius: 4px;
                            box-shadow: 0 2px 4px rgba(0,0,0,.2);
                            transition: all .3s;
                            li {
                                width: auto;
                                height: 35px;
                                line-height: 35px;
                                padding: 0 20px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                cursor: pointer;
                                color: #212121;
                                &:hover {
                                    background-color: #e5e9ef;
                                    color: #00a1d6;
                                }
                                &.disabled {
                                    color: #e7e7e7;
                                    background-color: rgba(0,0,0,0);
                                    cursor: not-allowed;
                                }
                            }
                        }
                    }
                    &.followed {
                        background-color: #e7e7e7;
                        color: #999;
                        i {
                            display: none;
                        }
                    }
                }
            }
        }
    }
</style>