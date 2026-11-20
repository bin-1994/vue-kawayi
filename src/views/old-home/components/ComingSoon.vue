<template>
    <div class="coming-soon-wrapper">
        <div class="block-title">即将开播</div>
        <slider-list slide-type="click" :length="ONLINE.length" :skew="80">
            <div class="card-wrapper clearfix">
                <div class="card-item" v-for="(item, index) in ONLINE" :key="index">
                    <div :class="['time-line-wrapper', {empty: item.pub_string}]">
                        <div class="date">{{ item.pub_string ? '敬请期待' : formatDate(item.pub_time) }}</div>
                        <div class="line">
                            <div class="point-wrapper">
                                <span class="point"></span>
                            </div>
                        </div>
                    </div>
                    <div class="info-wrapper">
                        <a :href="`/bangumi/media/md${item.media_id}`" target="_blank" class="cover-wrapper">
                            <lazy-img :src="item.cover" :alt="item.title"></lazy-img>
                            <span class="count">{{ item.series_follow }}人已追番`</span>
                        </a>
                        <a :href="`/bangumi/media/md${item.media_id}`" target="_blank" class="title">{{ item.title }}</a>
                        <a :href="`/bangumi/media/md${item.media_id}`" target="_blank" class="followed">{{ item.desc }}</a>
                    </div>
                </div>
            </div>
        </slider-list>
    </div>
</template>

<script>
import LazyImg from '../../../components/common/LazyImg'
import SliderList from '../../../components/common/SliderList'
export default {
    name: 'CominSoon',
    computed: {
        ONLINE () {
            return this.$store.state.home.onlineList
        }
    },
    methods: {
        formatDate (time) {
            let dayEqual = (thisDay, thatDay) => {
                return thisDay.getFullYear() === thatDay.getFullYear() && thisDay.getMonth() === thatDay.getMonth() && thisDay.getDate() === thatDay.getDate()
            }
            let datestr = '',
            now = new Date(),
            date = new Date(time * 1000),
            today = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
            yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1),
            updateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            thisYear = new Date(now.getFullYear(), '1', '1'),
            updateYear = new Date(date.getFullYear(), '1', '1'),
            hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
            minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
            if (dayEqual(updateTime, yesterday)) {
                datestr = '昨天'
            } else if (dayEqual(updateTime, today)) {
                datestr = '今天'
            } else {
                datestr = (date.getMonth() + 1) + '月' + date.getDate() + '日';
            }
            return datestr
        }
    },
    components: {
        SliderList,
        LazyImg
    }
}
</script>

<style lang="scss">
    .coming-soon-wrapper {
        width: 100%;
        .block-title {
            font-size: 20px;
            font-weight: 400;
            line-height: 22px;
            margin-bottom: 20px;
            color: #222;
        }
        .card-wrapper {
            white-space: nowrap;
            transition: all .3s ease;
            .card-item {
                position: relative;
                width: 206px;
                padding-right: 10px;
                display: inline-block;
                vertical-align: top;
                &:last-child {
                    padding-right: 0;
                }
                .time-line-wrapper {
                    height: 70px;
                    text-align: center;
                    &.empty {
                        .date {
                            color: #99a2aa;
                        }
                    }
                    .date {
                        height: 18px;
                        line-height: 18px;
                        font-size: 16px;
                        color: #222;
                        margin-bottom: 6px;
                        transform: translateY(11px);
                        font-weight: 500;
                    }
                    .line {
                        position: absolute;
                        left: 0;
                        right: 0;
                        top: 53px;
                        height: 1px;
                        background-color: #e5e9ef;
                        .point-wrapper {
                            position: absolute;
                            top: -2px;
                            left: 86px;
                            width: 29px;
                            height: 5px;
                            background-color: #fff;
                            .point {
                                display: block;
                                margin: 0 auto;
                                width: 5px;
                                height: 5px;
                                border-radius: 50%;
                                background-color: #ccd0d7
                            }
                        }
                    }
                }
                .info-wrapper {
                    position: relative;
                    height: 320px;
                    width: 100%;
                    &:hover .title {
                        color: #00a1d6;
                    }
                    .cover-wrapper {
                        position: relative;
                        display: block;
                        width: 100%;
                        height: 274px;
                        border-radius: 2px;
                        overflow: hidden;
                        &:before {
                            content: '';
                            position: absolute;
                            width: 100%;
                            height: 48px;
                            background: linear-gradient(transparent, rgba(0,0,0,0.4));
                            bottom: 0;
                            left: 0;
                            z-index: 1;
                        }
                        img {
                            display: block;
                            width: 100%;
                        }
                        .count {
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            padding: 6px 8px;
                            color: #fff;
                            z-index: 2;
                            font-size: 12px;
                            line-height: 16px;
                        }
                    }
                    .title, .followed {
                        display: block;
                        margin-top: 10px;
                        height: 16px;
                        line-height: 16px;
                        font-size: 14px;
                        color: #222;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        transition: color .3s ease
                    }
                    .followed {
                        margin-top: 6px;
                        color: #99a2aa;
                        font-size: 12px;
                    }
                }
            }
        }
        .slider-contro {
            position: absolute !important;
            right: auto;
            top: 50%;
            transform: translateY(-50%);
            padding-right: 0;
            border-right: none;
            width: 100%;
            transition: all .3s ease;
            span {
                position: absolute;
                top: 50%;
                display: inline-block;
                transform: translateY(-50%);
                width: 34px;
                height: 34px;
                border-radius: 50%;
                background-repeat: no-repeat;
                background-color: #fff;
                background-image: url(../../../assets/images/icons.png);
                box-shadow: 0 0 4px 0 rgba(0,0,0,.16);
                transition: all .2s linear;
                cursor: pointer;
                z-index: 2;
                &:hover {
                    box-shadow: 0 0 8px rgba(0,0,0,.24);
                }
                &.disabled {
                    opacity: 0;
                }
                &.slider-prev {
                    left: -17px;
                    background-position: -463px -1679px;
                }
                &.slider-next {
                    right: -17px;
                    background-position: -461px -1615px;
                }
            }
        }
    }
</style>