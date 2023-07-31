<template>
    <el-dialog 
      :title="textMap[dialogStatus]" 
      :visible.sync="dialogFormVisible" 
      width="90%" 
      :append-to-body="true">
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
              <el-input v-model="formObj.projectNo" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item  label="项目简称" prop="simpleName">
                <el-input v-model="formObj.simpleName" :disabled="true"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="formObj.projectName"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="项目类型" prop="projectType">
              <el-input v-model="formObj.projectType" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="资产类型" prop="assetType">
              <el-input v-model="formObj.assetType" :disabled="true"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="发行金额" prop="publicAmt">
              <el-input-number v-model="formObj.publicAmt" controls-position="right" :precision="2" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="交易场所" prop="tradeMarket">
              <el-select
                v-model="formObj.tradeMarket"
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
        <el-tab-pane  label="分档信息" name="assetType">
           <LayerItem :editModeEnabled="editModeEnabled" :datas="layerItems"/>
        </el-tab-pane>
        <el-tab-pane  label="中介机构" name="intermediaryOrg">
          <el-row>
            <el-col span="12">
              <el-form-item label="发行机构" prop="publicComp">
                <el-input v-model="formObj.publicComp"/>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item  label="主承销商" prop="underwriterComp">
                  <el-input v-model="formObj.underwriterComp"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="托管行" prop="trusteeshipBank">
                <el-input v-model="formObj.trusteeshipBank"/>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item  label="律师事务所" prop="lawOffice">
                  <el-input v-model="formObj.lawOffice"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="会计事务所" prop="accountingFirm">
                <el-input v-model="formObj.trusteeshipBank"/>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item  label="评级机构" prop="ratingComp">
                  <el-input v-model="formObj.ratingComp"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane  label="费用信息" name="costInfo">
           <CostItem :editModeEnabled="editModeEnabled" :datas="costItems"/>
        </el-tab-pane>
        <el-tab-pane  label="重要事件" name="eventInfo">
           <EvemtItem :editModeEnabled="editModeEnabled" :payItems="payItems" :eventItems="eventItems"/>
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
      import LayerItem from './components/layerItem'
      import CostItem from './components/costItem'
      import EvemtItem from './components/eventItem'
      export default {
        name: "addOrUpdate",
        components: {
          LayerItem,
          CostItem,
          EvemtItem
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
              create: '项目发行-登记',
              update: '项目发行-修改',
              view: '项目发行-查看'
            },
            formObj: {
              projectNo: '',
              projectName:'',
              projectType:'',
              assetType: '',
              projectAmt: 0.00,
              projectMaxAmt: 0.00,
              packetDate:'',
              irtStartDate:'',
              publicDate: '',
              endDate:'',
              purpose: '',
              bizState:'10'
            },
            loading: false,
            rules: {
              projectNo: [{ required: true, message: '项目编号必须填写', trigger: 'change' }],
              simpleName: [{ required: true, message: '项目简称必须填写', trigger: 'change' }],
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
            layerItems:[],
            costItems:[],
            payItems:[],
            eventItems:[],
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
                publicDate:  new Date (),
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
                const data={action:this.dialogStatus,formObj:this.formObj,layerItems:this.layerItems}
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
                const data={action:this.dialogStatus,formObj:this.formObj,layerItems:this.layerItems}
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
                const data={action:this.dialogStatus,formObj:this.formObj,layerItems:this.layerItems}
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
  