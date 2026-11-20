<template>
    <div class="history-drop-list">
        <section class="list-container">
            <div class="empty-data" v-if="!historyList">你还没有历史记录</div>
            <div class="history-item" v-for="(item, index) in historyList" :key="index" @click="clickHandler(item.ep_id)">
                <span class="history-title">{{ item.title }} </span>
                <span class="history-ep">看到第{{ item.ep_index }}话</span>
            </div>
        </section>
        <div class="more-btn" @click="removeHistory">清除历史记录</div>
    </div>
</template>

<script>
export default {
    name: 'History',
    data() {
        return {
            historyList: []
        }
    },
    mounted() {
        this.historyList = JSON.parse(window.localStorage.getItem('history'))
    },
    methods: {
        removeHistory() {
            this.historyList = []
            window.localStorage.removeItem('history')
        },
        clickHandler(ep_id) {
            window.open(`/bangumi/play/ep${ep_id}`)
        }
    }
}
</script>

<style lang="scss">
    .history-drop-list {
        position: absolute;
        width: 270px;
        left: 50%;
        background-color: #fff;
        border-radius: 0 0 10px 10px;
        transform: translate(-50%);
        box-shadow: 0 10px 10px 0 rgba(0,0,0,.16);
        z-index: 300;
        overflow: hidden;
        display: none;
        .empty-data {
            margin: 24px auto;
            text-align: center;
            color: #777;
        }
        .list-container {
            // min-height: 50px;
            .history-item {
                padding: 10px 24px;
                cursor: pointer;
                &:hover {
                    background-color: #f5f5f5;
                }
            }
            .history-title {
                width: 100%;
                display: block;
            }
            .history-ep {
                font-size: 12px;
                display: block;
                color: rgba(0,0,0,.3);
            }
        }
        .more-btn {
            background-color: #f4f4f4;
            padding: 12px 0;
            cursor: pointer;
            text-align: center;
            color: rgba(0,0,0,.56)
        }
    }
</style>