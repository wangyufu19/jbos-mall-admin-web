<template>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="90%" :append-to-body="true">
      <el-form 
        ref="formObj" 
        :model="formObj" 
        :rules="rules" 
        label-width="160px" 
        :label-position="right" 
        class="demo-ruleForm">
      <el-card>
      <el-tabs v-model="activeName"  @tab-click="handleClick">
        <el-tab-pane  label="项目信息" name="baseInfo">
        <el-card>
        <div slot="header" class="clearfix">
          <span>基本信息</span>
        </div>
        <el-row>
          <el-col span="12">
            <el-form-item label="项目编号" prop="projectInfo.projectNo">
              <el-input v-model="formObj.projectInfo.projectNo"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item  label="项目名称" prop="projectInfo.projectName">
                <el-input v-model="formObj.projectInfo.projectName"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="项目类型" prop="projectInfo.projectType">
              <el-select
                v-model="formObj.projectInfo.projectType"
                clearable
                :loading="loading"
                placeholder="请选择">
                <el-option
                    v-for="item in proejctTypeItems"
                    :key="item.DICTID"
                    :label="item.DICTNAME"
                    :value="item.DICTID"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="资产类型" prop="projectInfo.assetType">
              <el-select
                v-model="formObj.projectInfo.assetType"
                clearable
                :loading="loading"
                placeholder="请选择">
                <el-option
<<<<<<< HEAD
                    v-for="item in assetTypeItems"
=======
                    v-for="item in basicAssetItems"
>>>>>>> 85f6bf0a9be30cb7cfb6813da92564270126cc9c
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
            <el-form-item label="项目金额" prop="projectInfo.projectAmt">
              <el-input-number v-model="formObj.projectInfo.projectAmt" controls-position="right" :precision="2"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="最高限额" prop="projectInfo.projectMaxAmt">
              <el-input-number v-model="formObj.projectInfo.projectMaxAmt" controls-position="right" :precision="2"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="封包日期" prop="projectInfo.packetDate">
              <el-date-picker
                v-model="formObj.projectInfo.packetDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="利息起算日" prop="projectInfo.irtStartDate">
              <el-date-picker
                v-model="formObj.projectInfo.irtStartDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="发行日期" prop="projectInfo.issueDate">
              <el-date-picker
                v-model="formObj.projectInfo.issueDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="结束日期" prop="projectInfo.endDate">
              <el-date-picker
                v-model="formObj.projectInfo.endDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="法定到期日" prop="projectInfo.lawEndDate">
              <el-date-picker
                v-model="formObj.projectInfo.lawEndDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
<<<<<<< HEAD
            <el-form-item label="是否循环购买" prop="projectInfo.isRecycleBuy">
=======
            <el-form-item label="是否循环购买" prop="isRecycleBuy">
>>>>>>> 85f6bf0a9be30cb7cfb6813da92564270126cc9c
              <el-select
                v-model="formObj.projectInfo.isRecycleBuy"
                clearable
                :loading="loading"
                placeholder="请选择">
                <el-option
                    v-for="item in yesNoItems"
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
            <el-form-item label="循环购买开始日期" prop="projectInfo.buySDate">
              <el-date-picker
                v-model="formObj.projectInfo.buySDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="循环购买截止日期" prop="projectInfo.buyEDate">
              <el-date-picker
                v-model="formObj.projectInfo.buyEDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"/>
            </el-form-item>
          </el-col>
        </el-row>
        </el-card>
        <el-card>
        <div slot="header" class="clearfix">
          <span>账户信息</span>
        </div>
          <el-row>
            <el-col span="12">
              <el-form-item label="内部账本金清算账号" prop="acctInfo.innerPrincipalAcctNo">
                <el-input v-model="formObj.acctInfo.innerPrincipalAcctNo"/>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item  label="内部账利息清算账号" prop="acctInfo.innerInterestAcctNo">
                  <el-input v-model="formObj.acctInfo.innerInterestAcctNo"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="外部账本金收款账号" prop="acctInfo.outerPrincipalAcctNo">
                <el-input v-model="formObj.acctInfo.outerPrincipalAcctNo"/>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item  label="外部账利息收款账号" prop="acctInfo.outerInterestAcctNo">
                  <el-input v-model="formObj.acctInfo.outerInterestAcctNo"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        </el-tab-pane>
        <el-tab-pane  label="准入模型" name="entryModule">
           <EntryItem :editModeEnabled="editModeEnabled" :datas="entryItems"/>
        </el-tab-pane>
        <el-tab-pane  label="资产品种" name="assetType">
           <AssetItem :editModeEnabled="editModeEnabled" :datas="assetItems"/>
        </el-tab-pane>
        <el-tab-pane  label="项目组人员" name="projectTeam">
          <TeamItem :editModeEnabled="editModeEnabled" :datas="teamItems"/>
        </el-tab-pane>
      </el-tabs>
      </el-card>
      </el-form>
      
  
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="this.formObj.projectInfo.projectSte==='10'&&dialogStatus !== 'view'" type="primary" @click="dialogStatus==='create'?onAdd():onUpdate()">确定 </el-button>
        <el-button v-if="this.formObj.projectInfo.projectSte==='10'&&dialogStatus !== 'view'" type="primary" @click="onStartTrans()">流转</el-button>
      </div>

    </el-dialog>
  </template>
  
  <script>
      import request from '@/utils/request'
      import { mapGetters } from 'vuex'
      import { getCacheDictCodeList } from '@/api/sm/dict'
      import EntryItem from './components/entryItem'
      import AssetItem from './components/assetItem'
      import TeamItem from './components/teamItem'

      export default {
        name: "addOrUpdate",
        components: {
          EntryItem,
          AssetItem,
          TeamItem
        },
        computed: {
          ...mapGetters([
            'user'
          ])
        },
        data() {
          return {
            activeName: 'baseInfo',
            dialogFormVisible: false,
            dialogStatus: '',
            textMap: {
              create: '项目立项-登记',
              update: '项目立项-修改',
              view: '项目立项-查看'
            },
            loading: false,
            formObj: {
              projectInfo:{
                id: undefined,
                projectNo: '',
                projectName:'',
                projectType:'',
                assetType: '',
                projectAmt: 0.00,
                projectMaxAmt: 0.00,
                isRecycleBuy: '',
                projectSte:'10'
              },
              acctInfo:{
                innerPrincipalAcctNo:'',
                innerInterestAcctNo:'',
                outerPrincipalAcctNo:'',
                outerInterestAcctNo:''
              }
            },
            loading: false,
            rules: {
              projectInfo:{
                projectNo: [{ required: true, message: '项目编号必须填写', trigger: 'change' }],
                projectName: [{ required: true, message: '项目名称必须填写', trigger: 'change' }],
                projectType: [{ required: true, message: '项目类型必须填写', trigger: 'change' }],
                assetType: [{ required: true, message: '基础资产必须填写', trigger: 'change' }],
                projectAmt: [
                  { required: true, message: '项目金额必须填写',trigger: 'change' },
                  { type:'number',message: '项目金额必须数值',trigger: 'change' },
                ],
                projectMaxAmt: [
                  { required: true, message: '最高限额必须填写', trigger: 'change' },
                  { type:'number',message: '最高限额必须数值',trigger: 'change' },
                ],
                packetDate: [{ required: true, message: '封包日期必须填写', trigger: 'change' }],
                irtStartDate: [{ required: true, message: '利息起算日必须填写', trigger: 'change' }],
                issueDate: [{ required: true, message: '发行日期必须填写', trigger: 'change' }],
                endDate: [{ required: true, message: '结束日期必须填写', trigger: 'change' }],
                lawEndDate: [{ required: true, message: '法定到期日必须填写', trigger: 'change' }],
                isRecycleBuy: [{ required: true, message: '是否循环购买必须填写', trigger: 'change' }]
              },
              acctInfo:{
                innerPrincipalAcctNo: [{ required: true, message: '内部账本金清算账号必须填写', trigger: 'change' }],
                innerInterestAcctNo: [{ required: true, message: '内部账利息清算账号必须填写', trigger: 'change' }],
                outerPrincipalAcctNo: [{ required: true, message: '外部账本金收款账号必须填写', trigger: 'change' }],
                outerInterestAcctNo: [{ required: true, message: '外部账利息收款账号必须填写', trigger: 'change' }]
              }
            },
            proejctTypeItems:[],
            assetTypeItems:[],
            yesNoItems:[],
            entryItems:[],
            assetItems:[],
            teamItems:[],
            editModeEnabled: true
          }
        },
        watch: {
          activeName(val) {
            this.activeName = val
          }
        },
        created() {
          // init the default selected tab
          const tab = this.$route.query.tab
          if (tab) {
            this.activeName = tab
          }
        },
        methods: {
          handleClick(tab, event) {
            console.log(tab, event)
          },
          init(rowObj, dialogStatus) {
            this.dialogStatus = dialogStatus
            this.dialogFormVisible = true

            if (dialogStatus === 'create') {
              this.formObj = {
                projectInfo:{
                  id: undefined,
                  projectNo: '',
                  projectName:'',
                  projectType:'',
                  assetType: '',
                  projectAmt: 0.00,
                  projectMaxAmt: 0.00,
                  isRecycleBuy: '',
                  projectSte:'10'
                },
                acctInfo:{
                  innerPrincipalAcctNo:'',
                  innerInterestAcctNo:'',
                  outerPrincipalAcctNo:'',
                  outerInterestAcctNo:''
                }
              }
              this.$nextTick(() => {
                this.$refs['formObj'].clearValidate()
              })
            } else {
              this.getInfoById(rowObj.id)
            }
            this.initBusinessDict('ABS_PROJECTTYPE')
            this.initBusinessDict('ABS_ASSETTYPE')
<<<<<<< HEAD
            this.initBusinessDict('JBOS_YEANO')
=======
>>>>>>> 85f6bf0a9be30cb7cfb6813da92564270126cc9c
          },
          initBusinessDict(typeId){
            this.loading = true
            getCacheDictCodeList({typeId: typeId}).then(response => {
              const res = response.data
              if(typeId==='ABS_PROJECTTYPE'){
                this.proejctTypeItems = res.data
              }else if(typeId==='ABS_ASSETTYPE'){
<<<<<<< HEAD
                this.assetTypeItems = res.data
              }else if(typeId==='JBOS_YEANO'){
                this.yesNoItems = res.data
=======
                this.basicAssetItems = res.data
>>>>>>> 85f6bf0a9be30cb7cfb6813da92564270126cc9c
              }
              this.loading = false
            })
          },
          getInfoById(id){
            this.loading = true
            request({
              url: '/admin/projectApproval/getRegistrationInfo',
              method: 'get',
              params: {id: id} 
            }).then(response => {
              const res = response.data
              this.formObj.projectInfo = res.data.projectInfo
              this.formObj.acctInfo = res.data.acctInfo
              this.loading = false
            })
          },

          onAdd() {
            this.$refs['formObj'].validate((valid) => {
              if (valid) {
                this.formObj.createUserId=this.user.username
                const data={
                  action:this.dialogStatus,
                  projectInfo:this.formObj.projectInfo,
                  acctInfo:this.formObj.acctInfo,
                  assetItems:this.assetItems}
                request({
                  url: '/admin/projectApproval/registration',
                  method: 'post',
                  data: data 
                }).then(response => {
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
                this.formObj.updateUserId=this.user.username
                const data={
                  action:this.dialogStatus,
                  projectInfo:this.formObj.projectInfo,
                  acctInfo:this.formObj.acctInfo,
                  assetItems:this.assetItems}
                request({
                  url: '/admin/projectApproval/registration',
                  method: 'post',
                  data: data 
                }).then(response => {
                  this.dialogFormVisible = false
                  this.$emit('refreshDataList')
                  this.$message({
                    message: '操作成功',
                    type: 'success'
                  })
                })
              }else{
                this.$message({
                  message: '请输入必须填写项!',
                  type: 'error',
                  duration: 3 * 1000
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
  