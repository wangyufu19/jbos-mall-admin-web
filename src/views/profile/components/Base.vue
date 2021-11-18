<template>
  <el-form ref="formObj" :model="formObj">
    <el-form-item label="用户名称">
      <el-input v-model.trim="formObj.username" :disabled="true"/>
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model.trim="formObj.nickName" />
    </el-form-item>
    <el-form-item label="性别">
      <el-input v-model.trim="formObj.sex" />
    </el-form-item>
    <el-form-item label="手机">
      <el-input v-model.trim="formObj.mobilePhone" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="formObj.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onUpdate">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { get,update } from '@/api/mm/member'
export default {
  props: {
    base: {
      type: Object,
      default: () => {
        return {
          account:'',
          username: ''
        }
      }
    }
  },
  data() {
    return {
      formObj: {
        account: this.base.account,
        username: this.base.username,
        nickName: '',
        sex: '',
        mobilePhone: '',
        email: ''
      },
      loading: false,
    }
  },
  created() {
    this.onLoadUserBase();
  },
  methods: {
    onLoadUserBase(){
      this.loading = true
      get({account: this.base.account}).then(response => {
        const res = response.data
        this.formObj = res.data
        this.loading = false
      })
    },
    onUpdate() {
      this.$refs['formObj'].validate((valid) => {
        if (valid) {
          this.loading = true
          const data={
            account:this.formObj.account,
            username:this.formObj.username,
            nickName:this.formObj.nickName,
            sex:this.formObj.sex,
            mobilePhone:this.formObj.mobilePhone,
            email:this.formObj.email
          }
          update(data).then(response => {
            this.loading = false
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          })
        }
      })
    }
  }
}
</script>
