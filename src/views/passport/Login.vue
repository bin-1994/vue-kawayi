<template>
    <div>
        <main-header></main-header>
        <div class="form-wrapper">
            <div class="title-line"><span>登录</span></div>
            <form action="post" class="body-container" onsubmit="return false;">
                <div class="form-group">
                    <div class="input-wrap">
                        <input type="text" autocomplete="off" placeholder="你的邮箱" v-model="form.email" @input="changeInit" :class="['form-input', {'error': usernameTip}]">
                        <email-selection :key-value="form.email" top="48px" @cb-value="getNewUname"></email-selection>
                    </div>
                    <p class="tip-message">{{ usernameTip }}</p>
                </div>
                <div class="form-hidden-group"></div>
                <div class="form-group">
                    <div class="input-wrap">
                        <input type="password" autocomplete="off" placeholder="密码" v-model="form.password" @input="clearPassword" :class="['form-input', {'error': passwordTip}]">
                    </div>
                    <p class="tip-message">{{ passwordTip }}</p>
                </div>
                <div class="form-hidden-group"></div>
                <div class="remember">
                    <label>
                        <label :class="['remember-check', {'active': form.remember}]">
                            <input type="checkbox" v-model="form.remember">
                        </label>
                        保存14天
                        <span>不是自己的电脑上不要勾选此项</span>
                    </label>
                </div>
                <div class="form-group btn-wrap">
                    <div class="btn btn-login" @click="submitLogin">{{ flag ? '登录中...' : '登录' }}</div>
                    <div class="btn btn-register">注册</div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import MainHeader from '../../components/header/Header'
import EmailSelection from './components/EmailSelect'
import { post } from '../../utils/axios'
import cookie from '../../utils/cookie'
export default {
    name: 'Login',
    metaInfo() {
        return {
            title: '登录',
        }
    },
    data() {
        return {
            form: {
                email: '',
                password: '',
                remember: false
            },
            flag: false,
            usernameTip: '',
            passwordTip: '',
        }
    },
    methods: {
        submitLogin() {
            !this.flag && (this.onUsernameInput(), this.onPasswordInput(), this.form.email && this.form.password) && this.login()
            
        },
        onUsernameInput() {
            this.usernameTip = this.form.email ? '' : '请输入注册时用的邮箱'
        },
        onPasswordInput() {
            this.passwordTip = this.form.password ? '' : '喵，你没输入密码么？'
        },
        checkoutEmpty() {
            this.onUsernameInput(),
            this.onPasswordInput()

        },
        changeInit() {
            this.usernameTip = ''
            this.passwordTip = ''
        },
        clearPassword() {
            this.passwordTip = ''
        },
        getNewUname(e) {
            this.form.email = e.value
        },
        login() {
            if (this.checkoutEmpty(), this.form.email && this.form.password) {
                if (this.flag)
                    return
                this.flag = true,
                post(`/login`, this.form).then(res => {
                    this.flag = false
                    this.$toast(res.message)
                    if (res.code == 0) {
                        cookie.set('refresh_token', res.result.token.refresh_token, this.form.remember ? 'd7' : '-1')
                        cookie.set('access_token', res.result.token.access_token, this.form.remember ? 'd14' : '-1')
                        window.location.href = '/'
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
                width: 184px;
                font-size: 14px;
                text-align: center;
                line-height: 38px;
                cursor: pointer;
                transition: all .3s;
                &:hover {
                    background-color: #f7f7f7;
                }
                &.btn-login {
                    border-color: #00a7de;
                    color: #fff;
                    background-color: #00a1d6;
                    &:hover {
                        background-color: #00bee7;
                    }
                }
            }
        }
    }
</style>