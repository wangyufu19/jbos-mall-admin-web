
<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item prop="captchaText">
        <el-col :span="13">
          <el-input
            class="captchaInput"
            ref="captcha"
            v-model="loginForm.captchaText"
            placeholder="验证码"
            name="captchaText"
            type="text"
            tabindex="3"
            @keyup.enter.native="handleLogin"
          />
        </el-col>
        <el-col :span="11">
          <img alt="验证码不清楚，请重新刷新图片！"  :src="loginForm.captchaSrc" @click="refreshCaptcha" style="width:180px;height:40px;">
        </el-col>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>


    </el-form>
  </div>
</template>

<script>
import { captcha } from '@/api/captcha'

export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度必须大于6位数字'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
        captchaToken: '',
        captchaText:'',
        captchaSrc:''
      },
      loginRules: {
        username: [{ required: true,message: '用户名必须填写', trigger: 'blur'}],
        password: [{ required: true, message: '密码必须填写',trigger: 'blur', validator: validatePassword }],
        captchaText: [{ required: true, message: '验证码必须填写',trigger: 'blur'}]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.refreshCaptcha()
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    refreshCaptcha(){
      captcha().then(response=>{
        const res=response.data
        this.loginForm.captchaToken=res.data.captchaToken
        this.loginForm.captchaSrc='data:image/jpeg;base64,'+res.data.captchaSrc
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(response => {
            alert(this.$router.currentRoute.fullPath)
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
            this.refreshCaptcha()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">

  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .captchaInput{
      padding: 0px 0px 0px 15px;
    }

  }
</style>

