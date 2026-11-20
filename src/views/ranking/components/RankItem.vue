<template>
    <li class="rank-item">
        <div class="num">{{ index + 1 }}</div>
        <div class="content">
            <a :href="`/bangumi/media/md${item.media_id}`" target="_blank" class="cover">
                <lazy-img :src="item.cover"></lazy-img>
            </a>
            <div class="info">
                <a :href="`/bangumi/media/md${item.media_id}`" target="_blank" class="title">{{ item.title }}</a>
                <div class="ep-state">{{ epIndex }}</div>
                <div class="datas">
                    <span class="data-count">{{ views }}</span>
                    <span class="data-count">{{ follsows }}</span>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import { formatEp, formatNum } from '../../../utils/format'
import LazyImg from '../../../components/common/LazyImg.vue'
import { mapGetters } from 'vuex'
export default {
    name: 'RankItem',
    props: ['item', 'index'],
    computed: {
        ...mapGetters(['USER_INFO']),
        epIndex() {
            return 2 === this.item.is_finish ? `全${this.item.ep_total}话` : (-1 == this.item.ep_index ? `尚未更新` : `更新至${formatEp(this.item.ep_index)}`)
        },
        views() {
            return this.USER_INFO ? `${formatNum(this.item.views)}人气` : `-`
        },
        follsows() {
            return this.USER_INFO ? `${formatNum(this.item.series_follow)}追番` : `-`
        }
    },
    components: {
        LazyImg
    }
}
</script>