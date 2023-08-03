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
        <el-tab-pane  label="基本信息" name="baseInfo">
        <el-row>
          <el-col span="12">
            <el-form-item label="项目编号" prop="projectNo">
              <el-input v-model="formObj.projectNo"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item  label="项目名称" prop="projectName">
                <el-input v-model="formObj.projectName"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="项目类型" prop="projectType">
              <el-select
                v-model="formObj.projectType"
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
            <el-form-item label="资产类型" prop="assetType">
              <el-select
                v-model="formObj.assetType"
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
            <el-form-item label="项目金额" prop="projectAmt">
              <el-input-number v-model="formObj.projectAmt" controls-position="right" :precision="2"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="最高限额" prop="projectMaxAmt">
              <el-input-number v-model="formObj.projectMaxAmt" controls-position="right" :precision="2"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="封包日期" prop="packetDate">
              <el-date-picker
                v-model="formObj.packetDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="利息起算日" prop="irtStartDate">
              <el-date-picker
                v-model="formObj.irtStartDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="发行日期" prop="publicDate">
              <el-date-picker
                v-model="formObj.publicDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="结束日期" prop="endDate">
              <el-date-picker
                v-model="formObj.endDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="法定到期日" prop="lawEndDate">
              <el-date-picker
                v-model="formObj.lawEndDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="登记日期" prop="approvalDate">
              <el-date-picker
                :disabled="true"
                v-model="formObj.approvalDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="是否循环购买" prop="isRecycleBuy">
              <el-select
                v-model="formObj.isRecycleBuy"
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
            <el-form-item label="循环购买开始日期" prop="buySdate">
              <el-date-picker
                v-model="formObj.buySdate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="循环购买截止日期" prop="buyEdate">
              <el-date-picker
                v-model="formObj.buyEdate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"/>
            </el-form-item>
          </el-col>
        </el-row>
        </el-tab-pane>
        <el-tab-pane  label="账户信息" name="acctInfo">
          <el-row>
            <el-col span="12">
              <el-form-item label="内部账本金清算账号" prop="innerPrincipalAcctNo">
                <el-input v-model="formObj.innerPrincipalAcctNo"/>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item  label="内部账利息清算账号" prop="innerInterestAcctNo">
                  <el-input v-model="formObj.innerInterestAcctNo"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="外部账本金收款账号" prop="outerPrincipalAcctNo">
                <el-input v-model="formObj.outerPrincipalAcctNo"/>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item  label="外部账利息收款账号" prop="outerInterestAcctNo">
                  <el-input v-model="formObj.outerInterestAcctNo"/>
              </el-form-item>
            </el-col>
          </el-row>
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
        <el-button v-if="this.formObj.bizState==='10'&&dialogStatus !== 'view'" type="primary" @click="dialogStatus==='create'?onAdd():onUpdate()">确定 </el-button>
        <el-button v-if="this.formObj.bizState==='10'&&dialogStatus !== 'view'" type="primary" @click="onStartTrans()">流转</el-button>
      </div>

    </el-dialog>
  </template>
  
  <script>
      import { mapGetters } from 'vuex'
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
              projectNo: [{ required: true, message: '项目编号必须填写', trigger: 'change' }],
              projectName: [{ required: true, message: '项目名称必须填写', trigger: 'change' }],
              projectType: [{ required: true, message: '项目类型必须填写', trigger: 'change' }],
              assetType: [{ required: true, message: '资产类型必须填写', trigger: 'change' }],
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
              publicDate: [{ required: true, message: '发行日期必须填写', trigger: 'change' }],
              endDate: [{ required: true, message: '结束日期必须填写', trigger: 'change' }],
              lawEndDate: [{ required: true, message: '法定到期日必须填写', trigger: 'change' }],
              
              innerPrincipalAcctNo: [{ required: true, message: '内部账本金清算账号必须填写', trigger: 'change' }],
              innerInterestAcctNo: [{ required: true, message: '内部账利息清算账号必须填写', trigger: 'change' }],
              outerPrincipalAcctNo: [{ required: true, message: '外部账本金收款账号必须填写', trigger: 'change' }],
              outerInterestAcctNo: [{ required: true, message: '外部账利息收款账号必须填写', trigger: 'change' }]
            },
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
  