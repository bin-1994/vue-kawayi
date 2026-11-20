<template>
    <div>
        <member-header></member-header>
        <div class="page-vip wrapper">
            <div class="col-full clearfix">
                <table class="table-list">
                    <thead>
                        <tr>
                            <th>转账单号</th>
                            <th>时间</th>
                            <th>时长</th>
                            <th>金钱</th>
                            <th>状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>2654887548855</td>
                        <td>2020年09月04日</td>
                        <td>1年</td>
                        <td>11￥</td>
                        <td>审核中</td>
                    </tbody>
                </table>
                <section class="vip" v-show="showModel">
                    <div class="pay-for-moeny-list">
                        <div :class="['pay-for-moeny-item', {'pay-for-money-item-active': select == index}]" v-for="(item, index) in moenyList" @click="selectVip(index)" :key="price">
                        <span class="pay-for-money-dis" v-if="item.text.discount">{{ item.text.discount }}</span>
                        <p class="pay-for-money-price">
                            {{ item.text.disprice }}
                            <i class="pay-for-money-org-price" v-if="item.discount">￥{{ item.price }}</i>
                        </p>
                        <div class="pay-for-money-text">{{ item.text.title }}</div>
                        </div>
                    </div>
                    <div class="pay-for-money-remark">{{ moenyList[select].text.remark }}</div>
                    <div class="pay-for-money-qrcode">
                        <img :src="moenyList[select].qrcode" class="qrcode">
                    </div>
                    <div class="pay-for-money-remark">备注UID，你的UID: {{ $store.state.userInfo.id }}</div>
                    <div class="pay-for-money-input">
                        <input type="text" class="pay-for-money-number" placeholder="转账单号" v-model="number">
                    </div>
                    <div class="pay-for-money-remark">人工审核，请耐心等待</div>
                    <div :class="['pay-for-money-btn', {disable: !number}]">确定赞助</div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import MemberHeader from './components/Header'
import money3 from '../../assets/images/money-3.jpg'
import money6 from '../../assets/images/money-6.jpg'
import money11 from '../../assets/images/money-11.jpg'
export default {
    name: 'Vip',
    metaInfo() {
        return {
            title: `赞助送小会员`,
            bodyAttrs: {
                style: 'background-color:#f4f5f7'
            }
        }
    },
    data() {
        return {
            moenyList: [{
                price: 3,
                disprice: 3,
                qrcode: money3,
                text: {title: '月度小会员', disprice: '￥3/月', remark: '赠送31天小会员'}
            }, {
                price: 9,
                disprice: 6,
                qrcode: money6,
                text: {title: '季度小会员', disprice: '￥6/季', discount: '7折', remark: '赠送93天小会员'}
            }, {
                price: 36,
                disprice: 11,
                qrcode: money11,
                text: {title: '年度小会员', disprice: '￥11/年', discount: '3折', remark: '赠送366天小会员'}
            }],
            select: 0,
            number: null,
            showModel: false
        }
    },
    methods: {
        selectVip (index) {
            this.select = index
        }
    },
    components: {
        MemberHeader
    }
}
</script>

<style lang="scss">
    .page-vip {
        .col-full {
            background-color: #fff;
            box-shadow: 0 0 0 1px #eee;
            border-radius: 2px;
            padding: 20px;
        }
    }
    .table-list {
        width: 100%;
        margin: 24px auto;
        font-size: 12px;
        color: #222;
        border-width: 1px;
        border-color: #e5e9ef;
        border-collapse: collapse;
        box-sizing: border-box;
        thead th {
            height: 46px;
            line-height: 46px;
            border-width: 1px;
            border-style: solid;
            border-color: #e5e9ef;
            background-color: #f2f4f6;
            font-size: 12px;
            color: #222;
            border-collapse: collapse;
            text-align: center;
            font-style: normal;
            font-weight: 400;
        }
        tbody td {
            width: 214px;
            height: 41px;
            line-height: 41px;
            text-align: center;
            border-width: 1px;
            border-style: solid;
            border-color: #e5e9ef;
            font-size: 12px;
            color: #222;;
        }
    }
    .pay-for-moeny-list {
        display: flex;
        align-items: center;
        .pay-for-moeny-item {
            position: relative;
            box-sizing: border-box;
            border: 1px solid #ccd0d7;
            padding: 1px;
            border-radius: 2px;
            width: 160px;
            height: 66px;
            cursor: pointer;
            margin-right: 20px;
            &.pay-for-money-item-active {
                padding: 0;
                border: 2px solid #00a1d6;
            }
        }
        .pay-for-money-dis {
            position: absolute;
            top: -12px;
            right: -2px;
            background: #f25d8e;
            color: #fff;
            border: 2px solid #fff;
            border-radius: 100px;
            padding: 1px 4px;
            z-index: 100px;
        }
        .pay-for-money-price {
            margin-top: 10px;
            font-size: 16px;
            color: #222;
            text-align: center;
        }
        .pay-for-money-org-price {
            font-size: 12px;
            color: #99a2aa;
            text-decoration: line-through;
            vertical-align: middle;
        }
        .pay-for-money-text {
            font-size: 12px;
            color: #99a2aa;
            text-align: center;
        }
    }
    .pay-for-money-remark {
        margin-top: 8px;
        font-size: 12px;
        color: #99a2aa;
    }
    .pay-for-money-qrcode {
        width: 200px;
        margin-top: 8px;
        border: 1px solid #ccd0d7;
        border-radius: 4px;
        overflow: hidden;
        img {
            width: 100%;
        }
    }
    .pay-for-money-input {
        margin-top: 8px;
        .pay-for-money-number {
            padding: 6px 4px;
            border-radius: 4px;
            border: 1px solid #ccd0d7;
            width: 310px;
        }
    }
    .pay-for-money-btn {
        margin-top: 8px;
        background-color: #00a1d6;
        border-radius: 4px;
        width: 320px;
        height: 44px;
        line-height: 44px;
        color: #fff;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
    }
</style>