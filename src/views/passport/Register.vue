<template>
    <div>
        <main-header></main-header>
        <div class="form-wrapper">
            <div class="title-line"><span>注册</span></div>
            <form action="post" class="body-container" onsubmit="return false;">
                <div class="form-group">
                    <div class="input-wrap">
                        <input type="email" autocomplete="off" placeholder="你的邮箱" v-model="form.email" :class="['form-input', {'error': emailTip}]">
                        <email-selection :key-value="form.email" top="48px" @cb-value="getNewUname"></email-selection>
                    </div>
                    <p class="tip-message">{{ emailTip }}</p>
                </div>
                <div class="form-hidden-group"></div>
                <div class="form-group">
                    <div class="input-wrap">
                        <input type="text" autocomplete="off" placeholder="昵称" v-model="form.nickname" :class="['form-input', {'error': nicknameTip}]" @input="checkNickname">
                    </div>
                    <p class="tip-message">{{ nicknameTip }}</p>
                </div>
                <div class="form-hidden-group">
                    <div class="safe-wrap" v-show="safeFlag">
                        <p>安全系数</p>
                        <div class="safe-password" ref="safe">
                            <div class="safe-line red"></div>
                            <div class="safe-line orange"></div>
                            <div class="safe-line yellow"></div>
                            <div class="safe-line b5dc05"></div>
                            <div class="safe-line c519"></div><span>安全</span>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-wrap">
                        <input type="password" autocomplete="off" placeholder="密码（6-16个字符组成，区分大小写）" v-model="form.password" @input="checkPassword" :class="['form-input', {'error': passwordTip}]">
                    </div>
                    <p class="tip-message">{{ passwordTip }}</p>
                </div>
                <div class="form-hidden-group"></div>
                <div class="form-group">
                    <div class="input-wrap">
                        <input type="password" autocomplete="off" placeholder="确认密码" v-model="form.confirmPassword" :class="['form-input', {'error': cfPwTip}]">
                    </div>
                    <p class="tip-message">{{ cfPwTip }}</p>
                </div>
                <div class="form-hidden-group"></div>
                <div class="form-group">
                    <div class="input-wrap">
                        <input type="text" autocomplete="off" placeholder="注册码" v-model="form.regCode" :class="['form-input', {'error': regCodeTip}]">
                        <a href="https://answer.kawayi.cc" target="_blank" class="code-btn">去获取</a>
                    </div>
                    <p class="tip-message">{{ regCodeTip }}</p>
                </div>
                <div class="form-hidden-group"></div>
                <div class="remember">
                    <label>
                        <label :class="['remember-check', {'active': form.agree}]">
                            <input type="checkbox" v-model="form.agree">
                        </label>
                        我已同意《卡哇伊用户使用协议》和《卡哇伊隐私政策》
                    </label>
                </div>
                <div class="form-group btn-wrap">
                    <div :class="['btn', 'btn-primary', {'disabled': !form.agree}]" @click="submit">{{ flag ? '注册中...' : '注册' }}</div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import MainHeader from '../../components/header/Header'
import EmailSelection from './components/EmailSelect'
import { post, fetch } from '../../utils/axios'
import cookie from '../../utils/cookie'
export default {
    name: 'Register',
    metaInfo() {
        return {
            title: '注册',
        }
    },
    data() {
        return {
            form: {
                email: '',
                nickname: '',
                password: '',
                confirmPassword: '',
                regCode: '',
                agree: false
            },
            emailTip: '',
            nicknameTip: '',
            passwordTip: '',
            cfPwTip: '',
            regCodeTip: '',
            flag: false,
            safeFlag: false
        }
    },
    methods: {
        getNewUname(e) {
            this.form.email = e.value
        },
        onEmailInput() {
            if (this.form.email) {
                let reg = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/
                this.emailTip = reg.test(this.form.email) ? '' : '邮箱格式不正确'
            } else {
                this.emailTip = '请输入邮箱'
            }
        },
        onNicknameInput() {
            this.nicknameTip = this.form.nickname ? `` : '请输入昵称'
        },
        // onPasswordInput() {
        //     this.passwordTip = this.form.password ? '' : '喵，你没输入密码么？'
        // },
        confirmPass() {
            this.cfPwTip = this.form.password ? this.form.password != this.form.confirmPassword ? `密码不一致` : `` : `请输入确认密码`
        },
        onRegCodeInput() {
            this.regCodeTip = this.form.regCode ? '' : `请输入注册码`
        },
        checkPassword() {
            if (this.form.password) {
                this.passwordTip = this.form.password.length < 6 ? '密码不能小于6个字符' : this.form.password.length > 16 ? '密码不能大于16个字符' : ''
            } else {
                this.passwordTip = '喵，你没输入密码么？'
            }
            
            this.safeFlag = true
            switch (this.getPasswordLevel(this.form.password)) {
                case 0:
                case 1:
                    this.weak()
                    break;
                case 2:
                    this.medium1()
                    break;
                case 3:
                    this.medium2()
                    break;
                case 4:
                    this.medium3()
                    break;
                case 5:
                    this.tough()
                    break;
            }
        },
        checkNickname() {
            fetch(`/check/nickname`, {nickname: this.form.nickname.trim()}).then(res => {
                if (1 == res.code) {
                    this.nicknameTip = res.message
                } else {
                    this.nicknameTip = ""
                }
            }).catch(err => {
                this.nicknameTip = "服务器出错"
            })
        },
        getPasswordLevel(password) {
            return 0 
            + (password.length > 6) 
            + (/[a-z]/.test(password) && /[A-Z]/.test(password))
            + (/\d/.test(password) && /\D/.test(password))
            + (/[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/.test(password) && /\w/.test(password))
            + (password.length > 10)
        },
        weak() {
            this.$refs.safe.innerHTML = `<div class='safe-line red'></div><div class='safe-line e7e7e7e'></div><div class='safe-line e7e7e7e'></div><div class='safe-line e7e7e7e'></div><div class='safe-line e7e7e7e'></div><span style='color:#bc0001'>弱</span>`
        },
        medium1() {
            this.$refs.safe.innerHTML = `<div class='safe-line red'></div><div class='safe-line orange'></div><div class='safe-line e7e7e7e'></div><div class='safe-line e7e7e7e'></div><div class='safe-line e7e7e7e'></div><span style='color:#ff9537'>中</span>`
        },
        medium2() {
            this.$refs.safe.innerHTML = `<div class='safe-line red'></div><div class='safe-line orange'></div><div class='safe-line yellow'></div><div class='safe-line e7e7e7e'></div><div class='safe-line e7e7e7e'></div><span style='color:#ffd800'>中</span>`
        },
        medium3() {
            this.$refs.safe.innerHTML = `<div class='safe-line red'></div><div class='safe-line orange'></div><div class='safe-line yellow'></div><div class='safe-line b5dc05'></div><div class='safe-line e7e7e7e'></div><span style='color:#ffd800'>中</span>`
        },
        tough() {
            this.$refs.safe.innerHTML = `<div class='safe-line red'></div><div class='safe-line orange'></div><div class='safe-line yellow'></div><div class='safe-line b5dc05'></div><div class='safe-line c519'></div><span>安全</span>`
        },
        checkoutEmpty() {
            this.onEmailInput(),
            this.onNicknameInput(),
            this.checkPassword(),
            this.confirmPass(),
            this.onRegCodeInput()
        },
        submit() {
            if (this.form.agree && this.checkoutEmpty(), this.form.email && this.form.password && this.form.regCode && this.form.nickname && this.form.confirmPassword) {
                if (this.flag)
                    return
                this.flag = true,
                post(`/register/email`, this.form).then(res => {
                    this.flag = false
                    if (res.code == 0) {
                        window.location.href = '/login'
                    }
                })
            }
        }
    },
    components: {
        MainHeader,
        EmailSelection
    }
}
</script>

<style lang="scss">
    .form-wrapper {
        width: 980px;
        margin: 20px auto 0;
        .title-line {
            width: 100%;
            height: 28px;
            border-bottom: 1px solid #ddd;
            margin-bottom: 28px;
            text-align: center;
            span {
                font-size: 36px;
                height: 56px;
                margin: 0 auto;
                padding: 0 20px;
                background: #fff;
                text-align: center;
            }
        }
        .body-container {
            padding: 60px 0;
        }
        .form-group {
            width: 420px;
            margin: 0 auto;
            font-size: 12px;
            position: relative;
            .input-wrap {
                position: relative;
                font-size: 14px;
                display: inline-block;
                width: 100%;
                .form-input {
                    -webkit-appearance: none;
                    background-color: #fff;
                    background-image: none;
                    border-radius: 4px;
                    border: 1px solid #dcdfe6;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    color: #606266;
                    display: inline-block;
                    font-size: inherit;
                    height: 40px;
                    line-height: 40px;
                    outline: 0;
                    padding: 0 15px;
                    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
                    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
                    width: 100%;
                    &:hover {
                        border-color: #c0c4cc;
                    }
                    &:focus {
                        border-color: #00a1d6;
                    }
                    &.error {
                        border-color: #f66495;
                    }
                }
                .code-btn {
                    position: absolute;
                    right: 2px;
                    top: 2px;
                    width: 130px;
                    height: 36px;
                    padding: 0 4px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #fff;
                    background-color: #00a1d6;
                    border-color: #00a1d6;
                    box-sizing: border-box;
                    border-radius: 2px;
                    display: block;
                    text-align: center;
                    line-height: 36px;
                }
            }
            .tip-message {
                color: #f45d90;
                position: absolute;
                right: -20px;
                top: 12px;
                transform: translate3d(100%,0,0);
                font-size: 12px;
            }
        }
        .form-hidden-group {
            width: 420px;
            height: 40px;
            margin: 0 auto;
        }
        .remember {
            margin: 0 auto 10px;
            color: #717171;
            width: 420px;
            font-size: 12px;
            display: flex;
            align-items: center;
            -webkit-box-pack: justify;
            justify-content: space-between;
            &>label {
                justify-content: flex-start;
                display: flex;
                align-items: center;
            }
            .remember-check {
                display: inline-block;
                width: 14px;
                height: 14px;
                background-image: url(../../assets/images/checkbox.svg);
                background-repeat: no-repeat;
                background-size: 14px 14px;
                background-position: 50%;
                cursor: pointer;
                margin-right: 8px;
                &.active {
                    background-image: url(../../assets/images/checkbox-active.svg);
                }
                input {
                    display: none;
                }
            }
            span {
                color: #bbb;
                margin-left: 10px;
            }
        }
        .btn-wrap {
            display: flex;
            justify-content: space-between;
            align-content: center;
            .btn {
                color: #555;
                display: inline-block;
                height: 36px;
                border: 1px solid #ccc;
                border-radius: 2px;
                width: 100%;
                font-size: 14px;
                text-align: center;
                line-height: 38px;
                cursor: pointer;
                transition: all .3s;
                &:hover {
                    background-color: #f7f7f7;
                }
                &.btn-primary {
                    border-color: #00a7de;
                    color: #fff;
                    background-color: #00a1d6;
                    &:hover {
                        background-color: #00bee7;
                    }
                }
                &.disabled {
                    color: #999;
                    background-color: #f5f5f5;
                    border-color: #d9d9d9;
                    &:hover {
                        cursor: not-allowed;
                        color: #999;
                        background-color: #f5f5f5;
                        border-color: #d9d9d9;
                    }
                }
            }
        }
    }
    .safe-wrap {
        width: 415px;
        border-radius: 3px;
        line-height: 20px;
        padding: 10px 0;
        margin: 0 auto;
        // display: none;
        font-weight: 700;
        overflow: hidden;
        font-size: 15px;
        p {
            float: left;
        }
        .safe-password {
            color: #49c519;
        }
        .safe-line {
            width: 30px;
            height: 5px;
            border-radius: 5px;
            margin: 7px 10px 0 15px;
            float: left;
        }
        .red {
            background-color: #ff0000;
        }
        .orange {
            background-color: #ff7700;
        }
        .yellow {
            background-color: #ffd800;
        }
    }
</style>