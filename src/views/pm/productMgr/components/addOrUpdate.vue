<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="80%" :append-to-body="true">
    <el-form ref="formObj" :model="formObj" :rules="rules" label-width="100px" class="demo-ruleForm" >
      <el-card>
        <div slot="header" class="clearfix">
          <span>商品分类</span>
        </div>
      </el-card>
      <el-card>
        <div slot="header" class="clearfix">
          <span>商品基本信息</span>
        </div>
        <el-row>
          <el-col span="12">
            <el-form-item label="商品编号" prop="bizNo">
              <el-input v-model="formObj.productCode" :disabled="true"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="商品标题" prop="applyUserId">
              <el-input v-model="formObj.title"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card>
        <div slot="header" class="clearfix">
          <span>商品详情</span>
        </div>
      </el-card>
      <el-card>
        <div slot="header" class="clearfix">
          <span>规格和库存</span>
        </div>
      </el-card>
      <el-card>
        <div slot="header" class="clearfix">
          <span>服务和承诺</span>
        </div>
      </el-card>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button v-if="this.formObj.bizState==='10'" type="primary" @click="dialogStatus==='create'?onAdd():onUpdate()">发布 </el-button>
      <el-button type="primary" @click="onSave()">保存草稿</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { getNo,add,update,save } from '@/api/pm/product'
  export default {
    name: "addOrUpdate",
    data() {
      return {
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          create: '商品列表-发布商品',
          update: '商品列表-修改商品'
        },
        formObj: {
          productCode: '',
          productName: '',
          title: '',
          bizState:'10'
        },
        loading: false,
        rules: {
          productCode: [{ required: true, message: '商品编号必须填写', trigger: 'change' }],
          productName: [{ required: true, message: '商品名称必须填写', trigger: 'change' }],
          title: [{ required: true, message: '商品标题必须填写', trigger: 'change' }]
        },
        sku: [],
        editModeEnabled: true,
      }
    },
    methods:{
      init(formObj, dialogStatus) {
        if (dialogStatus === 'create') {
          this.dialogStatus = dialogStatus
          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs['formObj'].clearValidate()
          })
          this.sku=[]
          this.getNo()
        }else {
          this.dialogStatus = dialogStatus
          this.dialogFormVisible = true
        }
      },
      getNo(){
        this.loading = true
        getNo().then(response => {
          const res = response.data
          this.formObj.productCode = res.data.productNo
          this.loading = false
        })
      },
      onAdd() {
        this.$refs['formObj'].validate((valid) => {
          if (valid) {
            const data={formObj:this.formObj,sku:this.sku}
            add(data).then(response => {
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
            const data={formObj:this.formObj,materials:this.datas}
            update(data).then(response => {
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
    }
  }
</script>

<style scoped>

</style>
