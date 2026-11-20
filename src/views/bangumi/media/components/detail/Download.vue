<template>
    <div class="download-module">
        <ul class="download-wrap">
            <li class="download-item" v-for="(item, index) in list" :key="index">{{ index + 1 }}·{{ item }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [
                '[Nekomoe kissaten][takt op.Destiny][01][1080p][JPSC].mp4', 
                '[Nekomoe kissaten][takt op.Destiny][02][1080p][JPSC].mp4', 
                '[Nekomoe kissaten][takt op.Destiny][03][1080p][JPSC].mp4', 
                '[Nekomoe kissaten][takt op.Destiny][04][1080p][JPSC].mp4', 
                '[Nekomoe kissaten][takt op.Destiny][05][1080p][JPSC].mp4', 
            ]
        }
    }
}
</script>

<style lang="scss">
    .download-module {
        position: relative;
        .download-wrap {
            display: flex;
            justify-content: space-between;
            align-content: flex-start;
            flex-wrap: wrap;
        }
        .download-item {
            background-color: #f4f5f7;
            width: 410px;
            padding: 10px;
            margin-top: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &:nth-child(1n) {
                // margin-right: 20px;
            }
        }
    }
</style>