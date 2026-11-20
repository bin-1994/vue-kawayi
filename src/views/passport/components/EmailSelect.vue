<template>
    <div class="autocomplete" v-if="0 != emails.length" :style="{'width': width, 'left': left, 'top': top}">
        <ul>
            <li v-for="(item, index) in emails" :key="index" :class="{on: index === currentSelectIndex}" @click="selectEmail(index)">{{ item }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'EmailSelect',
    props: ['keyValue', 'width', 'top', 'left'],
    data() {
        return {
            emails: [],
            currentSelectIndex: 0,
            emailSource: ['qq.com', '163.com', '126.com', 'gmail.com', 'foxmail.com', 'sina.com', 'yeah.net', 'sohu.com', 'outlook.com', 'aliyun.com', 'yahoo.com']
        }
    },
    watch: {
        keyValue() {
            for (let i = 0; i < this.emails.length; i++) {
                if (this.emails[i] === this.keyValue) {
                    return void (this.emails = [])
                }
            }
            this.keyValue.search('@') <= 0 && (this.emails = [])
            let t = [],
                n = []
            if (this.keyValue.search('@') > 0 && 2 === this.keyValue.split('@').length) {
                for (let i = 0; i < this.emailSource.length; i++)
                    t[i] = this.keyValue.split('@')[0] + '@' + this.emailSource[i]
                for (let s = 0; s < t.length; s++)
                    -1 !== t[s].indexOf(this.keyValue) && n.push(t[s])
                this.emails = n
            }
        }
    },
    methods: {
        resetAutoData() {
            this.$emit("cb-value", {
                value: this.emails[this.currentSelectIndex]
            }),
            this.currentSelectIndex = 0,
            this.emails[this.currentSelectIndex] === this.keyValue && (this.emails = [])
        },
        selectEmail(index) {
            this.currentSelectIndex = index,
            this.resetAutoData()
        },
        bindEvent() {
            let length = this.emails.length;
            13 === event.keyCode && length && this.resetAutoData(),
            38 === event.keyCode && length && (this.currentSelectIndex--,
            this.currentSelectIndex < 0 && (this.currentSelectIndex = length - 1),
            this.username = this.emails[this.currentSelectIndex]),
            40 === event.keyCode && length && (this.currentSelectIndex++,
            this.currentSelectIndex > length - 1 && (this.currentSelectIndex = 0),
            this.username = this.emails[this.currentSelectIndex])
        }
    },
    mounted() {
        document.addEventListener('keydown', this.bindEvent)
    }
}
</script>

<style lang="scss">
    .autocomplete {
        position: absolute;
        z-index: 999;
        top: 0;
        left: 0;
        width: 100%;
        border: 1px solid #ddd;
        background-color: #fff;
        li {
            padding: 8px 10px;
            cursor: pointer;
            font-size: 12px;
            color: #666;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &.on {
                background-color: #ddd;
            }
            &:hover {
                background-color: #eee;
            }
        }
    }
</style>