<template>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="80%" :append-to-body="true">
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
            <el-form-item  label="流程类型" prop="processType">
              <el-select
                v-model="formObj.processType"
                clearable
                :loading="loading"
                placeholder="请选择">
                <el-option
                    v-for="item in processTypeItems"
                    :key="item.DICTID"
                    :label="item.DICTNAME"
                    :value="item.DICTID"
                />
              </el-select>
            </el-form-item>
          </el-col>
          </el-row>
          <el-row>
          <el-col span="12">
            <el-form-item label="任务名称" prop="taskName">
              <el-input v-model="formObj.taskName"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item  label="任务人员" prop="taskOperator">
                <el-input v-model="formObj.taskOrg"/>
            </el-form-item>
          </el-col>
          </el-row>
          <el-row>
          <el-col span="24">
            <el-form-item  label="推送类型" prop="pushType">
              <el-select
                v-model="formObj.pushType"
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
            <el-form-item label="推送机构" prop="pushOrg">
              <el-input v-model="formObj.pushOrg"/>
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
      import { getCacheDictCodeList } from '@/api/sm/dict'

      export default {
        name: "addOrUpdate",
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
              create: '流程配置-配置',
              update: '流程配置-修改',
              view: '流程配置-查看'
            },
            formObj: {
              projectNo: '',
              projectName:'',
              projectType:'',
              assetType: '',
              projectAmt: 0.00,
              projectMaxAmt: 0.00,
              applyTime: '',
              purpose: '',
              bizState:'10'
            },
            loading: false,
            rules: {
              projectName: [{ required: true, message: '项目名称必须填写', trigger: 'change' }],
              processType: [{ required: true, message: '流程类型必须填写', trigger: 'change' }],
              taskName: [{ required: true, message: '任务名称必须填写', trigger: 'change' }],
              taskOperator: [{ required: true, message: '任务人员必须填写', trigger: 'change' }]
            },
            processTypeItems:[],
            buyProcessItems:[],
            backBuyProcessItems:[],
            editModeEnabled: true
          }
        },
        methods: {
          init(formObj, dialogStatus) {
            this.dialogStatus = dialogStatus
            this.dialogFormVisible = true

            if (dialogStatus === 'create') {
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
            this.initBusinessDict('ABS_FLOWTYPE')
          },
          initBusinessDict(typeId){
            this.loading = true
            getCacheDictCodeList({typeId: typeId}).then(response => {
              const res = response.data
              if(typeId==='ABS_FLOWTYPE'){
                this.processTypeItems = res.data
              }
              this.loading = false
            })
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
  