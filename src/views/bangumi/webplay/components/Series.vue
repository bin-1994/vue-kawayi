<template>
    <div class="series-wrapper" v-if="renderList.length > 0">
        <div class="series-header">相关系列</div>
        <div class="series-list-wrapper">
            <div class="series-item" v-for="item in renderList" :key="item.media_id">
                <div @click="changeSeason(item.media_id)" class="series-cover">
                    <lazy-img :src="item.video_cover"></lazy-img>
                </div>
                <div class="series-info">
                    <div @click="changeSeason(item.media_id)" class="series-title">{{ item.season_title }}</div>
                    
                    <div class="series-count">{{ followsCount(item.follows) }}</div>
                </div>
            </div>
            <div class="expand-more" v-if=" this.MEDIA_INFO.seasons.length > 4" @click="expand">{{ expanded ? '收起' : '展开'}}</div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatEp, formatNum } from '../../../../utils/format'
import LazyImg from '../../../../components/common/LazyImg'
export default {
    name: 'Series',
    data() {
        return {
            expanded: false
        }
    },
    computed: {
        ...mapGetters('bangumi', ['MEDIA_INFO']),
        renderList() {
            let list = this.MEDIA_INFO.seasons.filter((item) => {
                return item.media_id !== this.MEDIA_INFO.media_id
            })
            return list.length > 3 && !this.expanded ? list.slice(0, 3) : list
        }
    },
    methods: {
        expand() {
            this.expanded = !this.expanded
        },
        epIndex(item) {
            return 2 === item.is_finish ? `全${item.ep_total}话` : (-1 == item.ep_index ? `尚未更新` : `更新至${formatEp(item.ep_index)}`)
        },
        followsCount(num) {
            return `${formatNum(num)}人追番`
        },
        changeSeason(id) {
            this.$router.replace(`/bangumi/play/ss${id}`)
        }
    },
    components: {
        LazyImg
    }
}
</script>

<style lang="scss">
    .series-wrapper {
        position: relative;
        width: 100%;
        margin-bottom: 20px;
        .series-header {
            width: 100%;
            height: 20px;
            line-height: 20px;
            margin-bottom: 16px;
            color: #222;
            font-size: 16px;
        }
        .series-list-wrapper {
            width: 100%;
            .series-item {
                width: 100%;
                height: 80px;
                overflow: hidden;
                margin-bottom: 12px;
                .series-cover {
                    position: relative;
                    display: block;
                    float: left;
                    width: 141px;
                    height: 80px;
                    border-radius: 2px;
                    overflow: hidden;
                    background-color: #f4f4f4;
                    cursor: pointer;
                }
                .series-info {
                    padding-left: 151px;
                    height: 80px;
                    .series-title {
                        width: 100%;
                        height: 36px;
                        line-height: 18px;
                        font-size: 14px;
                        color: #212121;
                        font-weight: 500;
                        margin-bottom: 8px;
                        cursor: pointer;
                    }
                    .pub-info {
                        height: 16px;
                        line-height: 16px;
                        font-size: 12px;
                        color: #505050;
                        margin-bottom: 4px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .series-count {
                        height: 16px;
                        font-size: 12px;
                        line-height: 16px;
                        color: #999;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
            .expand-more {
                width: 100%;
                height: 42px;
                line-height: 42px;
                border-radius: 2px;
                background-color: #f4f4f4;
                font-size: 12px;
                color: #505050;
                text-align: center;
                cursor: pointer;
            }
        }
    }
</style>