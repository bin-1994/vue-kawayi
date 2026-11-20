<template>
    <div class="skeleton-wrap">
        <div class="skeleton-card" v-for="(item, index) in length" :key="index">
            <div class="skeleton-video-cover"></div>
            <div class="skeleton-info">
                <div class="skeleton-title"></div>
                <div class="skeleton-sub-title"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Skeleton',
    props: {
        length: {
            default: 10,
            type: Number
        }
    },
}
</script>

<style lang="scss">
    .skeleton-wrap {
        width: 100%;
        display: grid;
        grid-gap: 20px 12px;
        grid-column: span 6;
        grid-template-columns: repeat(6, 1fr);
        opacity: 0;
        visibility: hidden;
        position: relative;
        .skeleton-card {
            position: relative;
        }
        .skeleton-video-cover {
            padding-top: 56.25%;
            border-radius: 6px;
            background-color: #f1f2f3;
        }
        .skeleton-bangumi-cover {
            padding-top: 134%;
            border-radius: 6px;
            background-color: #f1f2f3;
        }
        .skeleton-info {
            margin-top: 10px;
            .skeleton-title {
                margin-bottom: 4px;
                width: 94%;
                height: calc(22px - 4px);
                background-color: #f1f2f3;
                border-radius: 4px;
            }
            .skeleton-sub-title {
                margin-top: 8px;
                width: 50%;
                height: 16px;
                background-color: #f1f2f3;
                border-radius: 4px;
            }
        }
    }
</style>