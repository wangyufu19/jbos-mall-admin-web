<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form ref="formObj" :model="formObj" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="角色编码" prop="roleCode">
        <el-input v-model="formObj.roleCode" v-if="dialogStatus==='create'" :disabled="false"/>
        <el-input v-model="formObj.roleCode" v-else-if="dialogStatus==='update'" :disabled="true"/>
      </el-form-item>
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="formObj.roleName" />
      </el-form-item>
      <el-form-item label="角色类型" prop="roleType">
        <el-select v-model="formObj.roleType" placeholder="请选择">
          <el-option label="功能权限" value="100" />
          <el-option label="其它" value="101" />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="dialogStatus==='create'?onAdd():onUpdate()">确定 </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addRole, updateRole } from '@/api/sm/role'
import { getFuncTree } from '@/api/sm/func'
export default {
  name: 'AddOrEditRole',
  data() {
    return {
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '角色信息-新增',
        update: '角色信息-更新'
      },
      formObj: {
        id: undefined,
        roleCode: '',
        roleName: '',
        roleType: '100'
      },
      rules: {
        roleCode: [{ required: true, message: '角色编码必须填写', trigger: 'change' }],
        roleName: [{ required: true, message: '角色名称必须填写', trigger: 'change' }],
        roleType: [{ required: true, message: '角色类型必须填写', trigger: 'change' }]
      },
      items: []
    }
  },
  methods: {
    init(formObj, dialogStatus) {
      if (dialogStatus === 'create') {
        this.dialogStatus = dialogStatus
        this.dialogFormVisible = true
        this.formObj = {
          id: undefined,
          parentId: formObj.parentId,
          roleCode: '',
          roleName: '',
          roleType: '100'
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
    async loadTreeData(parentId) {
      await getFuncTree({ parentId: parentId }).then(response => {
        const res=response.data
        this.items = res.data
      })
    },
    async loadNode(node, resolve) {
      if (node.level === 0) {
        await this.loadTreeData('0')
        return resolve(this.items)
      } else if (node.level > 0) {
        await this.loadTreeData(node.data.id)
        return resolve(this.items)
      }
    },
    onAdd() {
      this.$refs['formObj'].validate((valid) => {
        if (valid) {
          addRole(this.formObj).then(response => {
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
          updateRole(this.formObj).then(response => {
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
.filter-container{
  margin-bottom: 10px;
}
/deep/ .el-dialog__title {
  color: #303133;
}
/deep/ .el-dialog__header {
    border-bottom: 1px solid #e3e8ee;
}

</style>
