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
        <el-col span="24">
          <el-form-item  label="" prop="assetType">
          <el-upload
            class="upload-demo"
            drag
            :action="upload.actionUrl"
            :headers="upload.headers"
            :show-file-list="false"
            :data="upload.data"
            :before-upload="onBeforeUpoad"
            :on-success="onUploadSuccess"
            :on-error="onUploadError"
            >
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
      </div>

    </el-dialog>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import {Message } from 'element-ui'
  import {getToken} from "@/utils/global";
  
  export default {
    name: "inPool",
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
          inPool: '基础资产池-入池',
          view: '基础资产池-查看'
        },
        upload:{
          actionUrl:process.env.VUE_APP_BASE_API+'/admin/basicAsset/inPool',
          headers:{'accessToken':getToken()},
          data:{}
        },
      }
    },
    methods: {
      init(formObj, dialogStatus) {
        this.dialogStatus = dialogStatus
        this.dialogFormVisible = true
      },
      onBeforeUpoad(file){
        console.log(file)
      },
      onUploadSuccess(response,file, fileList){
        if(response.retCode !==undefined&&response.retCode==='0000'){
          this.$message({
              message: '操作成功',
              type: 'success'
          })
          this.dialogFormVisible = false
          this.$emit('refreshDataList')
        }else{
          Message({
            message: response.retMsg || 'Error',
            type: 'error',
            duration: 3 * 1000
          })
        }
      },
      onUploadError(response,file, fileList){
        Message({
          message: '服务器响应异常，请联系管理员!',
          type: 'error',
          duration: 3 * 1000
        })
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
  