<template>
    <div class="media-info-wrp">
        <div class="bangumi-info-wrapper">
            <div class="bangumi-info-bg-wrp">
                <div class="bangumi-info-blurbg-wrapper">
                    <div class="bangumi-info-blurbg" :style="{backgroundImage: 'url(' + MEDIA_INFO.cover + ')'}"></div>
                </div>
            </div>
        </div>
        <div class="media-info-content">
            <div class="media-info-inner clearfix">
                <div class="media-preview">
                    <lazy-img :src="MEDIA_INFO.cover" :alt="MEDIA_INFO.title"></lazy-img>
                    <div class="tag-exclusive" v-if="MEDIA_INFO.bd"></div>
                </div>
                <div class="media-info-r">
                    <div class="media-info-title">
                        <span class="media-info-name">{{ MEDIA_INFO.title }}</span>
                        <span class="media-tags">
                            <span class="media-tag" v-for="(item, index) in MEDIA_INFO.styles" :key="index">{{ item.title }}</span>
                        </span>
                    </div>
                    <div class="media-info-datas">
                        <media-datas></media-datas>
                        <media-score></media-score>
                    </div>
                    <div class="media-info-time">
                        <span>{{ pubDateShow }}开播</span>
                        <span>{{ indexShow }}</span>
                    </div>
                    <div class="media-info-story">
                        <span class="media-info-story-text">简介：{{ MEDIA_INFO.story }}</span>
                    </div>
                    <div class="media-info-btns">
                        <div class="bangumi-btn" @click="follow">
                            <div :class="['btn-follow', {'followed': MEDIA_FOLLOW}]">
                                <i></i>
                                {{ followBtnText }}
                            </div>
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
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LazyImg from '../../../../../components/common/LazyImg'
import MediaDatas from './Datas'
import MediaScore from './Score'
import { formatDate } from '.././../../../../utils/format'
import { post } from '../../../../../utils/axios'
export default {
    name: 'Info',
    computed: {
      ...mapGetters('bangumi', ['MEDIA_INFO', 'USER_STATE', 'MEDIA_FOLLOW']),
      pubDateShow() {
          return this.MEDIA_INFO.publish.pub_string ? this.MEDIA_INFO.publish.pub_string : formatDate(this.MEDIA_INFO.publish.pub_time)
      },
      indexShow() {
          return 2 == this.MEDIA_INFO.publish.is_finish ? `已完结，全${this.MEDIA_INFO.publish.ep_total}${1 === this.MEDIA_INFO.type ? '话' : '集'}` : (-1 == this.MEDIA_INFO.publish.ep_index ? `尚未开播` : this.MEDIA_INFO.publish.on_air ? `连载中，${this.MEDIA_INFO.publish.on_air}更新` : '')
      },
      followBtnText() {
          return this.MEDIA_FOLLOW ? '已追番' : '追番'
      }
    },
    methods: {
        follow() {
            let url = this.MEDIA_FOLLOW ? `del` : `add`
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
    },
    components: {
        LazyImg,
        MediaDatas,
        MediaScore
    }
}
</script>

<style lang="scss">
    .bangumi-info-blurbg-wrapper {
        height: 558px;
        width: 100%;
        position: absolute;
        overflow: hidden;
        top: -50px;
        left: 0;
        transform: translateZ(0);
        &:before {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.3);
            filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr=rgba(72,0,0,0),0,endColorstr=rgba(72,0,0,0),0);
            position: absolute;
            top: 0;
            left: 0;
            z-index: 100;
        }
        .bangumi-info-blurbg {
            position: absolute;
            background-size: cover;
            background-position: 50%;
            width: 110%;
            min-width: 1120px;
            height: 496px;
            top: 50%;
            left: 50%;
            margin: -260px -55%;
            z-index: 10;
            background-repeat: no-repeat;
            filter: blur(40px);
            filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10,MakeShadow=false);
        }
    }
    .media-info-wrp {
        position: relative;
        color: #fff;
        .media-info-content {
            position: relative;
            width: 1280px;
            margin: 0 auto;
            .media-info-inner {
                padding:  76px 0 38px;
            }
            .media-preview {
                float: left;
                width: 233px;
                height: 308px;
                position: relative;
                box-sizing: border-box;
                border: 4px solid #fff;
                border-radius: 8px;
                img {
                    width: 225px;
                    height: 300px;
                    display: block;
                    border-radius: 4px;
                }
                .tag-exclusive {
                    background-image: url(../../../../../assets/images/bdrip.png);
                    width: 85px;
                    height: 65px;
                    position: absolute;
                    top: -35px;
                    left: 7px;
                }
            }
            .media-info-r {
                margin-left: 250px;
                // margin-right: 58px;
                .media-info-title {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    .media-info-name {
                        display: inline-block;
                        font-size: 20px;
                        line-height: 22px;
                        font-weight: 700;
                        color: #fff;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .media-tags {
                        opacity: 1;
                        display: inline-block;
                        margin-left: 20px;
                        vertical-align: top;
                        .media-tag {
                            font-size: 12px;
                            display: inline-block;
                            vertical-align: middle;
                            margin-right: 10px;
                            height: 20px;
                            padding: 0 4px;
                            line-height: 20px;
                            color: #fff;
                            border: 1px solid #fff;
                            border-radius: 3px;
                        }
                    }
                }
                .media-info-datas {
                    height: 60px;
                }
            }
        }
        .media-info-time {
            height: 17px;
            line-height: 17px;
            font-size: 12px;
            color: #fff;
            margin-top: 28px;
            span+span {
                margin-left: 20px;
            }
        }
        .media-info-story {
            margin-top: 11px;
            font-size: 12px;
            color: #fff;
            line-height: 20px;
            min-height: 87px;
            .media-info-story-text {
                height: 80px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 4;
            }
        }
        .media-info-btns {
            float: left;
            margin-top: 32px;
            .bangumi-btn {
                position: relative;
                float: left;
                margin-right: 20px;
                .btn-follow {
                    width: 128px;
                    height: 48px;
                    line-height: 48px;
                    color: #fff;
                    background-color: #f36392;
                    font-size: 18px;
                    text-align: center;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all .3s ease;
                    &:hover {
                        background-color: #ff85ad;
                    }
                    i {
                        display: inline-block;
                        vertical-align: -5px;
                        width: 24px;
                        height: 24px;
                        margin-right: 7px;
                        background-repeat: no-repeat;
                        background-image: url(../../../../../assets/icons/heart-bangumi.svg)
                    }
                    &.followed {
                        box-sizing: border-box;
                        line-height: 40px;
                        background-color: hsla(0,0%,100%,.12);
                        border: 4px solid hsla(0,0%,100%,.5);
                        text-shadow: 0 0 4px rgba(0,0,0,.6);
                        i {
                            vertical-align: -6px;
                            background-image: url(../../../../../assets/images/icons.png);
                            background-position: -660px -1938px;
                        }
                    }
                }
                &:hover .bangumi-options {
                    transform: none;
                    visibility: visible;
                    opacity: 1;
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
            }
        }
    }

    @media screen and (max-width: 1400px){
        .media-info-wrp .media-info-content {
            width: 1100px;
        }
    }
</style>