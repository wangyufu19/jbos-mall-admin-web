<template>
  <el-form ref="formObj" :model="formObj">
    <el-form-item label="姓名">
      <el-input v-model.trim="formObj.fullName"/>
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model.trim="formObj.nickName" />
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="formObj.sex">
        <el-radio :label="1">男</el-radio>
        <el-radio :label="2">女</el-radio>
      </el-radio-group>
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
          account:''
        }
      }
    }
  },
  data() {
    return {
      formObj: {
        account: this.base.account,
        fullName: '',
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
            fullName:this.formObj.fullName,
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
