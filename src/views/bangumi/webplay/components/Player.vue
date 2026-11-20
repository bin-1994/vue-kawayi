<template>
    <div class="player-wrapper">
        <div class="bgray-btn-wrap">
            <div class="bgray-btn" @click="openFeedback">播放问题反馈</div>
        </div>
        <div id="player-wrapper" v-if="!hasLimit"></div>
        <div class="player-mask" v-show="showMask">
            <div class="player-limit-mask" v-if="notStart">
                <div class="mask-body no-start">
                    <div class="mask-bg"></div>
                    <div class="mask-info"><span>{{ pubTime }}</span> 开播 敬请期待！</div>
                </div>
            </div>
            <div class="player-limit-mask" v-else-if="hasLimit && MEDIA_INFO.episodes.length > 0">
                <div class="mask-body">
                    <div class="mask-bg"></div>
                    <div class="mask-info">非常抱歉，根据版权方要求<br>无法观看本片</div>
                    <div class="mask-btn" v-if="hasJumpUrl" @click="jumpUrl">前往观看</div>
                </div>
            </div>
            <div class="bar-wrapper">
                <div class="left-bar"></div>
                <div class="right-bar"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatEp, formatDate } from '../../../../utils/format'
import Bus from '../../../../utils/eventbus'
import { post } from '../../../../utils/axios'
export default {
    name: 'Player',
    data() {
        return {
            showMask: true
        }
    },
    beforeMount() {
        this.bindCallbacks()
        !this.notStart && this.checkPlayer()
    },
    computed: {
      ...mapGetters('bangumi', ['MEDIA_INFO', 'EP_INFO', 'EP_INDEX', 'MEDIA_FOLLOW']),
      hasNextEp() {
          let length = this.MEDIA_INFO.episodes.length - 1
          return length > -1 && this.MEDIA_INFO.episodes[length].ep_id !== this.EP_INFO.ep_id
      },
      playerParmas() {
          return {
                container: document.getElementById('player-wrapper'),
                autoplay: true,
                cover: this.MEDIA_INFO.video_cover || this.MEDIA_INFO.cover,
                title: `${this.MEDIA_INFO.title} ${this.EP_INFO.title_format} ${this.EP_INFO.title}`,
                epList: this.MEDIA_INFO.episodes,
                epInfo: this.EP_INFO,
                epIndex: this.EP_INDEX,
                mediaInfo: this.MEDIA_INFO,
                userInfo: this.$store.state.userInfo || {}
          }
      },
      hasLimit() {
          return this.MEDIA_INFO.is_limit > 1
      },
      hasJumpUrl() {
          return this.MEDIA_INFO.jump_url || this.EP_INFO.jump_url
      },
      notStart() {
          return this.MEDIA_INFO.episodes.length == 0 && this.MEDIA_INFO.publish.ep_index == -1 && this.MEDIA_INFO.publish.is_finish == 1
      },
      pubTime() {
          return this.MEDIA_INFO.publish.pub_string ? this.MEDIA_INFO.publish.pub_string : formatDate(this.MEDIA_INFO.publish.pub_time)
      },
      canPlay() {
          return this.MEDIA_INFO.episodes.length > 0 && this.MEDIA_INFO.is_limit == 0
      }
    },
    methods: {
        checkPlayer() {
            window.player && window.player.destroy && window.player.destroy()
            this.renderPlayer()
        },
        renderPlayer() {
            !this.isLimit && window.MoePlayer &&
            (window.player = new MoePlayer(this.playerParmas)),
            this.showMask = false
        },
        bindCallbacks() {
            window.bangumiCallNext = () => {
                this.$router.replace({path: `/bangumi/play/ep${this.MEDIA_INFO.episodes[this.EP_INDEX + 1].ep_id}`})
            },
            window.selectEp = (info) => {
                this.$router.replace({path: `/bangumi/play/ep${info.ep_id}`})
            }
            // window.lastWatchProgressHandler = (duration) => {
            //     let history = window.localStorage &&  window.localStorage.getItem('history')
            //         history = (history ? JSON.parse(history) : [])
            //     let length = history.length,
            //         index = void 0
            //     for (index = 0; index < length; index++) {
            //         if (history[index].media_id === this.MEDIA_INFO.media_id) {
            //             history.splice(index, 1)
            //             length--
            //             break
            //         }
            //     }
            //     length >= 6 && history.pop()
            //     history.unshift({
            //         media_id: this.MEDIA_INFO.media_id,
            //         title: this.MEDIA_INFO.title,
            //         cover: this.MEDIA_INFO.cover,
            //         ep_id: this.EP_INFO.ep_id,
            //         ep_index: this.EP_INFO.ep_index,
            //         timestamp: Date.now(),
            //         duration: duration
            //     })
            //     localStorage.setItem('history', JSON.stringify(history))
            // },
            window.incrPlay = () => {
                this.canPlay && post(`/rank/add`, {
                    media_id: this.MEDIA_INFO.media_id,
                    ep_id: this.EP_INFO.ep_id
                })
            }
            window.hearbeat = (time) => {
                if (!this.MEDIA_FOLLOW) {
                    return false
                }
                post(`/bangumi/progress`, {
                    series_id: this.MEDIA_INFO.season_id,
                    media_id: this.MEDIA_INFO.media_id,
                    ep_id: this.EP_INFO.ep_id,
                    ep_index: this.EP_INFO.format_title,
                    progress: parseInt(time * 1000),
                })
            }
        },
        jumpUrl() {
            window.open(this.MEDIA_INFO.jump_url || this.EP_INFO.jump_url)
        },
        openFeedback() {
            Bus.$emit('TRIGGER_FEEDBACK', true)
        }
    },
    watch: {
        EP_INFO() {
            this.checkPlayer()
        }
    }
}
</script>

<style lang="scss">
    .player-wrapper {
        position: relative;
        .bgray-btn-wrap {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: -32px;
            width: 32px;
            height: 200px;
            .bgray-btn {
                transition: all .3s;
                cursor: pointer;
                // margin:  10px 0;
                background-color: #fff;
                text-align: center;
                padding: 7px 5px;
                display: block;
                // left: 100%;
                font-size: 12px;
                line-height: 12px;
                // margin-left: 10px;
                width: 20px;
                border-radius: 2px;
                border: 1px solid #e5e9ef;
                color: #99a2aa;
                &:hover {
                    color: #6d757a;
                    border-color: #6d757a;
                }
            }
        }
    }
    #player-wrapper {
        position: relative;
        // z-index: 201;
        width: 100%;
        height: 100%;
    }
    .player-mask {
        position: absolute;
        top: 0;
        left: 0;
        background-color: #333;
        z-index: 131;
        width: 100%;
        height: 100%;
        box-shadow: 0 2px 6px 0 rgba(0,0,0,.06);
        .player-limit-mask {
            width: 100%;
            height: 100%;
            color: #fff;
            padding-bottom: 46px;
            box-sizing: border-box;
            .mask-body {
                position: relative;
                width: 100%;
                margin: 0 auto;
                top: 50%;
                transform: translateY(-50%);
                text-align: center;
                .mask-bg {
                    width: 175px;
                    height: 154px;
                    background-image: url(../../../../assets/images/limit-area.png);
                    margin: 0 auto 16px;
                    background-repeat: no-repeat;
                    background-position: 50%;
                }
                .mask-info {
                    font-weight: 400;
                    width: 100%;
                    font-size: 16px;
                    line-height: 22px;
                    span {
                        color: #fb7299;
                    }
                }
                .mask-btn {
                    width: 130px;
                    height: 40px;
                    margin-top: 16px;
                    box-sizing: border-box;
                    display: inline-block;
                    font-size: 14px;
                    text-align: center;
                    line-height: 38px;
                    border-radius: 2px;
                    border: 1px solid rgba(0,0,0,0);
                    position: relative;
                    cursor: pointer;
                    transition: all .3s linear;
                    background-color: #00a1d6;
                    color: #fff;
                    &:hover {
                        background-color: #00b5e5;
                        border-color: #00b5e5;
                    }
                }
                &.no-start {
                    .mask-bg {
                        width: 175px;
                        height: 154px;
                        background-image: url(../../../../assets/images/limit-no-start.png);
                        margin: 0 auto 16px;
                        background-repeat: no-repeat;
                        background-position: 50%;
                    }
                }
            }
        }
        .bar-wrapper {
            position: absolute;
            width: 100%;
            height: 46px;
            bottom: 0;
            left: 0;
            background-color: #fff;
            .left-bar {
                position: absolute;
                bottom: 13px;
                width: 24%;
                height: 20px;
                left: 2.5%;
                background-color: #f4f4f4;
            }
            .right-bar {
                position: absolute;
                bottom: 13px;
                width: 69%;
                height: 20px;
                right: 2.5%;
                background-color: #f4f4f4;
            }
        }
    }
</style>