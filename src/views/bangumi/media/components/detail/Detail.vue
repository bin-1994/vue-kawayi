<template>
    <div class="media-tab-detail-wrp clearfix">
        <div class="media-tab-detail-l-wrp">
            <div class="media-tab-detail-l">
                <div class="media-tab-module-wrp">
                    <div class="media-tab-module-content">
                        <div class="season-slideer-wrapper" v-if="MEDIA_INFO.seasons && 1 < MEDIA_INFO.seasons.length">
                            <slider-list :length="MEDIA_INFO.seasons.length" slide-type="click" :auto-index="currentIndex">
                                <div class="season-slider-list">
                                    <router-link :to="`/bangumi/media/md${item.media_id}`" v-for="(item, index) in MEDIA_INFO.seasons" :key="index" target="_blank">{{ item.season_title }}</router-link>
                                </div>
                            </slider-list>
                        </div>
                        <episode></episode>
                    </div>
                </div>
                <!-- <div class="media-tab-module-wrp">
                    <div class="media-tab-module-title">下载</div>
                    <div class="media-tab-module-content">
                        <banguimi-download :list="MEDIA_INFO.downloads"></banguimi-download>
                    </div>
                </div> -->
                <bangumi-media :list="[]"></bangumi-media>
                <!-- <div class="media-tab-module-wrp" v-if="MEDIA_INFO.related.length > 0">
                    <div class="media-tab-module-title">相关推荐</div>
                    <div class="media-tab-module-more">更多</div>
                    <div class="media-tab-module-content">
                        <relative :list="MEDIA_INFO.related"></relative>
                    </div>
                </div> -->
            </div>
        </div>
        <div class="media-tab-detail-r">
            <info-card v-for="(item, index) in infoConfig" :key="index" :info="item"></info-card>
        </div>
    </div>
</template>

<script>
import SliderList from '../../../../../components/common/SliderList'
import Episode from './Episode'
import BanguimiDownload from './Download.vue'
import InfoCard from './InfoCard'
import BangumiMedia from './Media'
import Relative from './Relevant'
import { mapGetters } from 'vuex'
export default {
    name: 'Deatil',
    computed: {
        ...mapGetters('bangumi', ['MEDIA_INFO']),
        infoConfig() {
            return [{
                title: '制作人员',
                height: 164,
                content: this.MEDIA_INFO.staff || ''
            }, {
                title: '角色配音',
                height: 164,
                content: this.MEDIA_INFO.cast || ''
            }]
        },
        currentIndex() {
            let index = 0
            return this.MEDIA_INFO.seasons.forEach((item, i) => {
                item.media_id === this.MEDIA_INFO.media_id && (index = i)
            }), index
        }
    },
    components: {
        SliderList,
        Episode,
        InfoCard,
        Relative,
        BangumiMedia,
        BanguimiDownload
    }
}
</script>

<style lang="scss">
    .season-slideer-wrapper {
        .slider-wrapper {
            position: relative;
            margin-bottom: 17px;
            &:hover .slider-contro {
                opacity: 1;
            }
            .slider-contro {
                position: absolute;
                right: auto;
                top: 0;
                padding-right: 0;
                border-right: none;
                width: 100%;
                z-index: 10;
                opacity: 0;
                transition: all .3s;
                span {
                    position: absolute;
                    top: 7px;
                    width: 22px;
                    height: 22px;
                    cursor: pointer;
                    box-shadow: 0 0 4px rgba(0,0,0,.16);
                    transition: all .3s;
                    border-radius: 11px;
                    z-index: 11;
                    &.slider-prev {
                        left: -11px;
                        background: url(../../../../../assets/images/small-arrows-left.png) 50% no-repeat #fff;
                    }
                    &.slider-next {
                        right: -11px;
                        background: url(../../../../../assets/images/small-arrows-right.png) 50% no-repeat #fff;
                    }
                    &.disabled {
                        display: none;
                        background-color: #dcdcdc;
                    }
                    &:hover {
                        background-color: #fff;
                        box-shadow: 0 0 8px rgba(0,0,0,.24);
                    }
                }
            }
        }
        .season-slider-list {
            height: 36px;
            white-space: nowrap;
            transition: transform .3s ease,-webkit-transform .3s ease;
            a {
                display: inline-block;
                vertical-align: top;
                font-size: 14px;
                cursor: pointer;
                position: relative;
                margin: 0 14px 0 10px;
                line-height: 34px;
                height: 36px;
                border-top: 1px solid #e5e9ef;
                border-bottom: 1px solid #e5e9ef;
                background-color: #f4f5f7;
                min-width: 60px;
                text-align: center;
                box-sizing: border-box;
                color: #222;
                padding: 0 15px;
                &:hover {
                    color: #00a1d6;
                }
                &:first-child {
                    border-radius: 4px 0 0 4px;
                    margin-left: 0;
                    &::before {
                        background: #f4f5f7;
                        border: 1px solid #e5e9ef;
                        border-right: none;
                        box-sizing: border-box;
                        border-radius: 4px 0 0 4px;
                        left: 0;
                        background: none;
                    }
                }
                &:last-child {
                    margin-right: 0;
                    border-right: 1px solid #e5e9ef;
                    border-radius: 0 4px 4px 0;
                    &::after {
                        display: none;
                    }
                }
                &::before {
                    content: '';
                    position: absolute;
                    left: -9px;
                    top: -1px;
                    background: url(../../../../../assets/images/arrows-before.png) no-repeat;
                    width: 10px;
                    height: 36px;
                    z-index: 10;
                }
                &::after {
                    content: '';
                    position: absolute;
                    right: -12px;
                    top: -1px;
                    background: url(../../../../../assets/images/arrows-after.png) no-repeat;
                    width: 13px;
                    height: 36px;
                    z-index: 10;
                }
                &.router-link-active {
                    background-color: #00a1d6;
                    border-color: #00a1d6;
                    color: #fff;
                    &:first-child:before {
                        background: #00a1d6;
                        border: 1px solid #00a1d6;
                        border-right: none;
                        box-sizing: border-box;
                        border-radius: 4px 0 0 4px;
                    }
                    &:before {
                       background: url(../../../../../assets/images/arrows-before-on.png) no-repeat; 
                    }
                    &:after {
                        left: auto;
                        margin-left: 0;
                        border: none;
                        background: url(../../../../../assets/images/arrows-after-on.png) no-repeat; 
                    }
                }
            }
        }
    }
</style>