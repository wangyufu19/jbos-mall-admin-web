<template>
  <div class="login-container">
    <el-form ref="registryForm" :model="registryForm" :rules="registryRules" auto-complete="on" label-position="left">

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="registryForm.username"
          placeholder="手机/邮箱"
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
          v-model="registryForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="doRegistry"
        />
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="registryForm.confirmPassword"
          :type="passwordType"
          placeholder="确认密码"
          name="confirmPassword"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="doRegistry"
        />
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="doRegistry">注册</el-button>


    </el-form>
  </div>
</template>

<script>
import { registry }  from '@/api/mm/account'
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
      registryForm: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      registryRules: {
        username: [{ required: true,message: '用户名必须填写', trigger: 'blur'}],
        password: [{ required: true, message: '密码必须填写',trigger: 'blur', validator: validatePassword }],
        confirmPassword: [{ required: true, message: '确认密码必须填写',trigger: 'blur',validator: validatePassword}]
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
  methods: {
    doRegistry() {
      this.$refs.registryForm.validate(valid => {
        if (valid) {
          this.loading = true
          const data={
            account:this.registryForm.username,
            password:this.registryForm.password,
            confirmPassword:this.registryForm.confirmPassword
          }
          registry(data).then(response => {
            this.loading = false
            this.$message({
              message: '注册成功',
              type: 'success'
            })
          }).catch(() => {
            this.loading = false
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
  }
</style>
