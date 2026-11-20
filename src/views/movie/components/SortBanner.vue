<template>
    <ul class="sort-banner">
        <sort-item v-for="(item, index) in ORDERS.slice(0, sliceIndex)" :key="index" :item="item" :current="current" :sort="hash.sort || 0"></sort-item>
    </ul>
</template>

<script>
import SortItem from './SortItem'
import Bus from '../../../utils/eventbus'
import { mapGetters } from 'vuex'
export default {
    name: 'SortBanner',
    data() {
        return {
            current: 1
        }
    },
    props: {
        hash: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapGetters(['USER_INFO']),
        ORDERS() {
            return this.$store.state.filter.orders
        },
        sliceIndex() {
            return this.USER_INFO ? 5 : 3
        }
    },
    watch: {
        hash: {
            handler(hash) {
                this.current = hash.order
            },
            deep: true
        }
    },
    mounted() {
        void 0 !== this.hash.order && (this.current = this.hash.order)
        Bus.$on('FILTER_RESET', () => {
            this.current = this.hash.order
        })
        Bus.$on('FILTER_INIT', hash => {
            this.cursor = hash[this.filterKey]
        })
    },
    components: {
        SortItem
    }
}
</script>

<style lang="scss">
    .sort-banner {
        height: 44px;
        font-size: 14px;
        line-height: 1;
        position: relative;
    }
</style>