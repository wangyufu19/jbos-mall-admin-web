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
            <el-form-item  label="项目名称" prop="projectName">
              <el-select
                v-model="formObj.projectName"
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
          <el-col span="12">
            <el-form-item  label="项目金额" prop="projectAmt">
              <el-input v-model="formObj.projectAmt" :disabled="true"/>
            </el-form-item>
          </el-col>
          </el-row>
          <el-row>
          <el-col span="12">
            <el-form-item label="业务品种" prop="loanType">
              <el-select
                v-model="formObj.loanType"
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
         
        
      </el-card>
      </el-form>
      
  
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="this.formObj.bizState==='10'&&dialogStatus !== 'view'" type="primary" @click="dialogStatus==='create'?onAdd():onUpdate()">确定 </el-button>
      </div>

    </el-dialog>
  </template>
  
  <script>
      import { mapGetters } from 'vuex'
  
      export default {
        name: "analysis",
        components: {
        
        },
        computed: {
          ...mapGetters([
            'user'
          ])
        },
        data() {
          return {
            activeName: 'buy',
            dialogFormVisible: false,
            dialogStatus: '',
            textMap: {
              analysis: '资产池分析-项目分析'
            },
            formObj: {
              projectName: '',
              projectAmt:'',
              loanType: '',
              endDate: ''
            },
            loading: false,
            rules: {
              projectName: [{ required: true, message: '项目名称必须填写', trigger: 'change' }],
              projectAmt: [{ required: true, message: '项目金额必须填写', trigger: 'change' }],
              loanType: [{ required: true, message: '业务品种必须填写', trigger: 'change' }],
              endDate: [{ required: true, message: '截止日期必须填写', trigger: 'change' }]
            },
            buyProcessItems:[],
            backBuyProcessItems:[],
            editModeEnabled: true
          }
        },
        methods: {
          init(formObj, dialogStatus) {
            this.dialogStatus = dialogStatus
            this.dialogFormVisible = true

            if (dialogStatus === 'analysis') {
              this.formObj = {
                id: undefined,
                projectNo: '',
                projectName: '',
                projectType: '',
                assetType: '',
                projectAmt: 0.00,
                projectMaxAmt: 0.00,
                applyTime:  new Date (),
                purpose: '',
                bizState:'10'
              }
              this.$nextTick(() => {
                this.$refs['formObj'].clearValidate()
              })

            } else {
              this.getInfoById(formObj.id)
            }
          },

          getInfoById(id){
            this.loading = true
           
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
  