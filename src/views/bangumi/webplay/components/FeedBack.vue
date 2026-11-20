<template>
    <div class="player-feedback-wrap" v-if="show">
        <div class="player-feedback">
            <div class="player-feedback-title">
                <span>播放问题反馈</span>
                <span class="player-feedback-close" @click="close">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8 6.939l3.182-3.182a.75.75 0 111.061 1.061L9.061 8l3.182 3.182a.75.75 0 11-1.061 1.061L8 9.061l-3.182 3.182a.75.75 0 11-1.061-1.061L6.939 8 3.757 4.818a.75.75 0 111.061-1.061L8 6.939z"></path></svg>
                </span>
            </div>
            <div class="player-feedback-content">
                <div class="player-feedback-default-content">
                    <div class="player-feedback-hint">提交遇到的问题会尽快解决 喵~</div>
                    <div class="player-feedback-tabmenu">
                        <div :class="['player-feedback-tabmenu-list', {'selected': index === select}]" v-for="(item, index) in tabList" :key="index" @click="onSelect(index)">
                            {{ item }}
                        </div>
                    </div>
                    <div class="player-feedback-textarea-wrap" v-if="select === 5">
                        <textarea class="player-feedback-textarea" maxlength="100" placeholder="问题描述,限输入100字以内" v-model="message"></textarea>
                    </div>
                    <div class="player-feedback-contact-information">
                        <span class="player-feedback-contact-information-tip">联系邮箱:</span>
                        <input type="text" class="player-feedback-contact-input" maxlength="32" placeholder="(选填)" v-model="contact">
                    </div>
                    <div class="player-feedback-tips" v-if="tips">
                        <span>{{ tips }}</span>
                    </div>
                    <div class="player-feedback-submit-wrap">
                        <div class="player-feedback-submit" @click="submit">确定</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="player-feedback-mask"></div>
    </div>
</template>

<script>
import Bus from '../../../../utils/eventbus'
import { post } from '../../../../utils/axios'

export default {
    name: 'FeedBack',
    props: ['epInfo'],
    data() {
        return {
            tabList: ['加载失败', '视频错误', '音画不同步', '黑屏有声', '求资源', '其他'],
            select: 0,
            show: false,
            message: '',
            contact: '',
            tips: '',
            flag: false
        }
    },
    methods: {
        close() {
            this.tips = ''
            this.contact = ''
            this.message = ''
            this.select = 0
            this.show = false
        },
        onSelect (index) {
            this.select = index
        },
        submit() {
            let data = {
                media_id: this.epInfo.media_id,
                ep_id: this.epInfo.ep_id,
                reason: this.tabList[this.select],
                message: this.message,
                contact: this.contact,
                url: window.location.href,
                title: document.title
            }
            !this.flag && (this.flag = true) &&
            post(`/feedback/video`, data).then(res => {
                this.tips = res.message
                this.flag = false
                if (res.code === 1) {
                    return false
                }
                this.show = false
            }).catch(() => {
                this.flag = false
            })
        }
    },
    created() {
        Bus.$on('TRIGGER_FEEDBACK', (bool) => {
            this.show = bool
        })
    }
}
</script>

<style lang="scss">
    .player-feedback-wrap {
        position: relative;
        .player-feedback-mask {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 2000;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3);
        }
        .player-feedback {
            z-index: 2001;
            margin: 0;
            padding: 0;
            background-color: #fff;
            width: 440px;
            border-radius: 2px;
            position: fixed;
            top: 50%;
            left: 50%;
            margin-left: -220px;
            margin-top: -290px;
            border: 1px solid #e5e9ef;
            box-shadow: rgba(0, 0, 0, 0.6) 1px 1px 40px 0px;
            overflow: hidden;
            .player-feedback-title {
                width: inherit;
                height: 60px;
                line-height: 60px;
                font-size: 18px;
                text-align: center;
                border-bottom: 1px solid #e5e9ef;
                .player-feedback-close {
                    display: inline-block;
                    fill: #222;
                    width: 22px;
                    height: 22px;
                    position: absolute;
                    right: 10px;
                    top: 8px;
                    cursor: pointer;
                }
            }
            .player-feedback-content {
                .player-feedback-default-content {
                    margin: 30px 50px;
                    .player-feedback-hint {
                        font-size: 14px;
                        color: #99a2aa;
                        margin-bottom: 20px;
                    }
                    .player-feedback-tabmenu {
                        overflow: hidden;
                        .player-feedback-tabmenu-list {
                            position: relative;
                            display: block;
                            float: left;
                            width: 50%;
                            padding-left: 20px;
                            box-sizing: border-box;
                            font-size: 12px;
                            margin-bottom: 16px;
                            height: 18px;
                            line-height: 18px;
                            cursor: pointer;
                            &:before {
                                position: absolute;
                                content: '';
                                top: 2px;
                                left: 0;
                                display: inline-block;
                                width: 12px;
                                height: 12px;
                                border: 1px solid #ccc;
                                border-radius: 50%;
                            }
                            &.selected:after  {
                                content: '';
                                position: absolute;
                                top: 5px;
                                left: 3px;
                                display: inline-block;
                                width: 8px;
                                height: 8px;
                                background: #00a1d6;
                                border-radius: 50%;
                            }
                        }
                    }
                    .player-feedback-textarea-wrap {
                        margin-bottom: 20px;
                        .player-feedback-textarea {
                            resize: none;
                            width: 318px;
                            height: 78px;
                            border: 1px solid #e5e9ef;
                            color: #6d757a;
                            border-radius: 4px;
                            padding: 10px;
                        }
                    }
                    .player-feedback-contact-information {
                        position: relative;
                        overflow: hidden;
                        padding-bottom: 16px;
                        .player-feedback-contact-information-tip {
                            display: inline-block;
                            font-size: 12px;
                            color: #222;
                            float: left;
                            height: 30px;
                            line-height: 30px;
                            margin-right: 8px;
                        }
                        .player-feedback-contact-input {
                            text-indent: 12px;
                            font-size: 12px;
                            color: #99a2aa;
                            border: 1px solid #e5e9ef;
                            width: 270px;
                            height: 30px;
                            line-height: 30px;
                            float: left;
                            border-radius: 4px;
                            margin-top: 1px;
                            box-sizing: border-box;
                        }
                    }
                    .player-feedback-tips {
                        text-align: center;
                        padding-bottom: 16px;
                        color: #e40c0c;
                    }
                    .player-feedback-submit-wrap {
                        overflow: hidden;
                        .player-feedback-submit {
                            width: 120px;
                            height: 40px;
                            border: none;
                            border-radius: 4px;
                            line-height: 40px;
                            text-align: center;
                            font-size: 14px;
                            margin: 0 auto;
                            background-color: #00a1d6;
                            color: #fff;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
</style>