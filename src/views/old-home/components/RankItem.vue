<template>
    <div class="rank-wrap">
        <span :class="['rank-num', {on: index < 3}]">{{ index + 1 }}</span>
        <a :href="`/bangumi/media/md${item.media_id}`" target="_blank" class="rank-link">
            <p class="rank-name">
                <span class="rank-title" :title="item.title">{{ item.title }}</span>
                <span class="update">{{ epIndex }}</span>
            </p>
        </a>
    </div>
</template>

<script>
import { formatEp } from '../../../utils/format'
export default {
    name: 'RankItem',
    props: ['item', 'index'],
    computed: {
        epIndex() {
            return 2 === this.item.is_finish ? `全${this.item.ep_total}话` : (-1 == this.item.ep_index ? `尚未更新` : `更新至${formatEp(this.item.ep_index)}`)
        }
    }
}
</script>

<style lang="scss">
    .rank-wrap {
        display: flex;
        justify-content: space-between;
        margin-bottom: 18px;
        &:last-child {
            margin-bottom: 0;
        }
        .rank-num {
            font-size: 14px;
            color: #999;
            width: 18px;
            height: 18px;
            text-align: center;
            line-height: 18px;
            background-color: #fff;
            border-radius: 2px;
            display: inline-block;
            &.on {
                color: #fff;
                background: #00a1d6;
            }
        }
        .rank-link {
            display: inline-block;
            &:hover {
                color: #00a1d6;
            }
        }
        .rank-name {
            width: 290px;
            line-height: 20px;
            display: flex;
            justify-content: space-between;
            .rank-title {
                width: 198px;
                font-size: 14px;
                font-weight: 500;
            }
            .update {
                font-size: 12px;
                color: #999;
                text-align: right;
                min-width: 90px;
            }
            .rank-title, & .update {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
</style>