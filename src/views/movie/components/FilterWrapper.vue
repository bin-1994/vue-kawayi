<template>
    <div class="filter-wrapper">
        <div class="filter-title">筛选</div>
        <div class="filter-list">
            <filter-block v-for="(item, index) in FILTER_LIST" :key="index" :list="item.list || []" :filter-key="item.key" :free="item.free || false" :min-line="item.line || 0" :filter-name="item.title"></filter-block>
        </div>
    </div>
</template>

<script>
import FilterBlock from './FilterBlock'
export default {
    name: 'FilterWrapper',
    computed: {
        FILTER_LIST() {
            return this.$store.state.filter.filters
        }
    },
    components: {
        FilterBlock
    }
}
</script>

<style lang="scss">
    .filter-wrapper {
        float: right;
        width: 260px;
        padding-top: 20px;
        .filter-title {
            height: 44px;
            line-height: 1;
            font-size: 18px;
            color: #222;
        }
    }
</style>