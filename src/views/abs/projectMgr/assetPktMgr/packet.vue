<template>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="60%" :append-to-body="true">
      <el-form 
        ref="formObj" 
        :model="formObj" 
        :rules="rules" 
        label-width="120px" 
        :label-position="right" 
        class="demo-ruleForm">
      <el-card>
        <el-row>
          <el-col span="12">
            <el-form-item  label="项目名称" prop="projectNo">
              <el-select
                v-model="formObj.projectNo"
                clearable
                :loading="loading"
                placeholder="请选择">
                <el-option
                    v-for="item in datas"
                    :key="item.DICTID"
                    :label="item.DICTNAME"
                    :value="item.DICTID"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
        <el-col span="24">
          <el-form-item  label="" prop="assetType">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件</div>
          </el-upload>
        </el-form-item>
        </el-col>
        </el-row>
      </el-card>
      </el-form>
      
  
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='packet'?onAdd():onUpdate()">确定 </el-button>
      </div>

    </el-dialog>
  </template>
  
  <script>
      import { mapGetters } from 'vuex'
  
      export default {
        name: "packet",
        components: {
        
        },
        computed: {
          ...mapGetters([
            'user'
          ])
        },
        data() {
          return {
            dialogFormVisible: false,
            dialogStatus: '',
            textMap: {
              packet: '资产包管理-封包',
              view: '资产包管理-查看'
            },
            formObj: {
              projectNo: '',
              projectName: '',
            },
            loading: false,
            rules: {
              projectNo: [{ required: true, message: '项目名称必须填写', trigger: 'change' }],

            }
          }
        },
        methods: {
          init(formObj, dialogStatus) {
            this.dialogStatus = dialogStatus
            this.dialogFormVisible = true

            if (dialogStatus === 'packet') {
              this.formObj = {
                id: undefined,
                projectNo: '',
                projectName: ''
              }
              this.$nextTick(() => {
                this.$refs['formObj'].clearValidate()
              })

            } 
          },

          onAdd() {
            this.$refs['formObj'].validate((valid) => {
              if (valid) {
                const data={action:this.dialogStatus,formObj:this.formObj,materiaassetItemsls:this.assetItems}
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
                const data={action:this.dialogStatus,formObj:this.formObj,assetItems:this.assetItems}
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
          onStartTrans(){
            this.$refs['formObj'].validate((valid) => {
              if (valid) {
                const data={action:this.dialogStatus,formObj:this.formObj,assetItems:this.assetItems}
                startTrans(data).then(response => {
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
  