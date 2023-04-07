<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form ref="formObj" :model="formObj" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="类型编码" prop="typeId">
        <el-input v-model="formObj.typeId" v-if="dialogStatus==='create'" :disabled="false"/>
        <el-input v-model="formObj.typeId" v-else-if="dialogStatus==='update'" :disabled="true"/>
      </el-form-item>
      <el-form-item label="类型名称" prop="typeName">
        <el-input v-model="formObj.typeName" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="dialogStatus==='create'?onAdd():onUpdate()">确定 </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addDictType, updateDictType } from '@/api/dict'
export default {
  name: 'AddOrUpdate',
  data() {
    return {
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '字典类型-新增',
        update: '字典类型-更新'
      },
      formObj: {
        id: undefined,
        typeId: '',
        typeName: ''
      },
      rules: {
        typeId: [{ required: true, message: '类型编码必须填写', trigger: 'change' }],
        typeName: [{ required: true, message: '类型名称必须填写', trigger: 'change' }],
      }
    }
  },
  methods: {
    init(formObj, dialogStatus) {
      if (dialogStatus === 'create') {
        this.dialogStatus = dialogStatus
        this.dialogFormVisible = true
        this.formObj = {
          id: undefined,
          typeId: '',
          typeName: ''
        }
        this.$nextTick(() => {
          this.$refs['formObj'].clearValidate()
        })
      } else {
        this.dialogStatus = dialogStatus
        this.dialogFormVisible = true
        this.formObj = formObj
      }
    },
    onAdd() {
      this.$refs['formObj'].validate((valid) => {
        if (valid) {
          addDictType(this.formObj).then(response => {
            this.dialogFormVisible = false
            this.$emit('refreshDataList')
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          })
        }
      })
    },
    onUpdate() {
      this.$refs['formObj'].validate((valid) => {
        if (valid) {
          updateDictType(this.formObj).then(response => {
            this.dialogFormVisible = false
            this.$emit('refreshDataList')
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

<style scoped>

</style>
