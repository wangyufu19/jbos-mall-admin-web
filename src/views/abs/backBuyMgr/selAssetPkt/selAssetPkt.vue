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
          </el-row>
          <el-row>
          <el-col span="12">
            <el-form-item  label="回购类型" prop="backBuyType">
              <el-select
                v-model="formObj.backBuyType"
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
          <el-col span="12">
            <el-form-item label="回购文件" prop="backBuyFile">
              <el-upload      
                style="margin-top: 5px;margin-left: 10px;" 
                :action="upload.actionUrl"
                :headers="upload.headers"
                :show-file-list="false"
                :data="upload.data"
                :before-upload="onBeforeUpoad"
                :on-success="onUploadSuccess"
                :on-error="onUploadError">
                <el-button size="mini" type="primary">导入</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          </el-row>
         
        
      </el-card>
      </el-form>
      
  
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="this.formObj.bizState==='10'&&dialogStatus !== 'view'" type="primary" @click="dialogStatus==='create'?onAdd():onUpdate()">确定 </el-button>
        <el-button v-if="this.formObj.bizState==='10'&&dialogStatus !== 'view'" type="primary" @click="onStartTrans()">流转</el-button>
      </div>

    </el-dialog>
  </template>
  
  <script>
      import { mapGetters } from 'vuex'
      import {getToken} from "@/utils/global";

      export default {
        name: "selAssetPkt",
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
              create: '回购管理-选定资产包'
            },
            formObj: {
              yearNo: '',
              holidayName:'',
              startDate: '',
              endDate: ''
            },
            upload:{
              actionUrl:process.env.VUE_APP_BASE_API+'/admin/io/upload',
              headers:{'accessToken':getToken()},
              data:{}
            },
            loading: false,
            rules: {
              projectName: [{ required: true, message: '项目名称必须填写', trigger: 'change' }],
              backBuyType: [{ required: true, message: '回购类型必须填写', trigger: 'change' }],
              startDate: [{ required: true, message: '开始日期必须填写', trigger: 'change' }],
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
  