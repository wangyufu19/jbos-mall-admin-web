<template>
  <el-card>
  <el-form ref="pwdForm" :model="pwdForm" :rules="pwdRules">
    <el-form-item prop="username" label="用户名称">
      <el-input
        ref="username"
        v-model="pwdForm.username"
        placeholder="用户名称"
        name="username"
        type="text"
        disabled="true"
      />
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input
        :key="passwordType"
        ref="password"
        v-model="pwdForm.password"
        :type="passwordType"
        placeholder="密码"
        name="password"
      />
    </el-form-item>
    <el-form-item prop="confirmPassword" label="确认密码">
      <el-input
        :key="passwordType"
        ref="confirmPassword"
        v-model="pwdForm.confirmPassword"
        :type="passwordType"
        placeholder="确认密码"
        name="confirmPassword"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
    </el-form-item>
  </el-form>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Password',
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度必须大于6位数字'))
      } else {
        callback()
      }
    }
    return {
      pwdForm: {
        loginName:'',
        username: '',
        password: '',
        confirmPassword: ''
      },
      pwdRules: {
        username: [{ required: true,message: '用户名必须填写', trigger: 'blur'}],
        password: [{ required: true, message: '密码必须填写',trigger: 'blur', validator: validatePassword }],
        confirmPassword: [{ required: true, message: '确认密码必须填写',trigger: 'blur',validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password'
    }
  },
  created() {
    this.pwdForm.loginName=this.user.LOGINNAME
    this.pwdForm.username=this.user.USERNAME
  },
  methods: {
    save() {
      this.$refs.pwdForm.validate(valid => {
        if (valid) {
          this.loading = true
          const data={
            loginName:this.pwdForm.loginName,
            password:this.pwdForm.password,
            confirmPassword:this.pwdForm.confirmPassword
          }
          changePwd(data).then(response => {
            this.loading = false
            this.$message({
              message: '操作成功',
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
