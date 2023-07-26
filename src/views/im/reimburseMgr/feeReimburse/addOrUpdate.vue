<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="80%" :append-to-body="true">
    <el-form ref="formObj" :model="formObj" :rules="rules" label-width="100px" class="demo-ruleForm" >
      <el-card>
        <div slot="header" class="clearfix">
          <span>基本信息</span>
        </div>
      <el-row>
        <el-col span="12">
          <el-form-item label="业务编号" prop="bizNo">
            <el-input v-model="formObj.bizNo" :disabled="true"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="申请人" prop="applyUserId">
            <el-input v-model="formObj.applyUserName" :disabled="true"/>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="申请部门" prop="applyDepId">
            <el-input v-model="formObj.applyDepName" :disabled="true"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="费用类型" prop="feeType">
            <el-select
              v-model="formObj.feeType"
              clearable
              :loading="loading">
              <el-option
                  v-for="item in feeTypeItems"
                  :key="item.DICTID"
                  :label="item.DICTNAME"
                  :value="item.DICTID"
              />
            </el-select>

          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="费用模板" prop="feeTmplt">
            <el-select
              v-model="formObj.feeTmplt"
              clearable
              :loading="loading">
              <el-option
                  v-for="item in feeTmpltItems"
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
          <el-form-item label="申请日期" prop="applyTime">
            <el-date-picker
              :disabled="true"
              v-model="formObj.applyTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"/>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="总金额" prop="totalAmt">
            <el-input v-model.number="formObj.totalAmt" :disabled="true"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="备注" prop="bizDesc">
            <el-input type="textarea" rows="5" v-model="formObj.bizDesc"/>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card>
        <div slot="header" class="clearfix">
          <span>收款信息</span>
        </div>
        <el-row>
          <el-col span="12">
            <el-form-item label="收款人" prop="acctName">
              <el-input v-model="formObj.acctName"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="收款账号" prop="acctNo">
              <el-input v-model="formObj.acctNo"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="开户银行" prop="bankName">
              <el-input v-model="formObj.bankName"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="交易类型" prop="tradeType">
              <el-select
              v-model="formObj.tradeType"
              clearable
              :loading="loading">
              <el-option
                  v-for="item in tradeTypeItems"
                  :key="item.DICTID"
                  :label="item.DICTNAME"
                  :value="item.DICTID"
              />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <FeeItem :editModeEnabled="editModeEnabled" :datas="feeReimburseItem" @setTotalAmt="onSetTotalAmt"/>
      <InvoiceItem :editModeEnabled="editModeEnabled" :datas="invoiceItem"/>
      <step v-if="this.formObj.instId!=null" :getProcInstId="this.formObj.instId"/>
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
    import SelectMaterialBuy from '../../materialMgr/materialBuy/selectMaterialBuy.vue'
    import FeeItem from './components/feeItem.vue'
    import InvoiceItem from './components/invoiceItem.vue'
    import Step from '@/components/Workflow/Task/Step'
    import { getCacheDictCodeList } from '@/api/sm/dict'
    import { getBizNo,add,infoById,update,startTrans } from '@/api/im/feeReimburse'

    export default {
      name: "addOrUpdate",
      components: {
        SelectMaterialBuy,
        FeeItem,
        InvoiceItem,
        Step
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
            create: '费用报销-发起流程',
            update: '费用报销-修改流程',
            view: '费用报销-查看流程'
          },
          formObj: {
            bizNo: '',
            applyUserId: '',
            applyDepId: '',
            applyTime: '',
            feeType: '',
            feeTmplt:'',
            tradeType:'',
            totalAmt: '',
            bizDesc: '',
            bizState:'10'
          },
          loading: false,
          rules: {
            bizNo: [{ required: true, message: '业务编号必须填写', trigger: 'change' }],
            applyUserId: [{ required: true, message: '申请人必须填写', trigger: 'change' }],
            applyDepId: [{ required: true, message: '申请部门必须填写', trigger: 'change' }],
            applyTime: [{ required: true, message: '申请日期必须填写', trigger: 'change' }],
            totalAmt: [{ required: true, message: '总金额必须填写', trigger: 'change' }]
          },
          feeReimburseItem: [],
          invoiceItem: [],
          feeTypeItems: [],
          feeTmpltItems:[],
          tradeTypeItems:[],
          editModeEnabled: true
        }
      },
      methods: {
        init(formObj, dialogStatus) {
          this.dialogStatus = dialogStatus
          this.dialogFormVisible = true
          if (dialogStatus === 'view') {
            this.editModeEnabled=false
          }else{
            this.editModeEnabled=true
          }
          if (dialogStatus === 'create') {
            this.formObj = {
              id: undefined,
              bizNo: '',
              applyUserId: this.user.username,
              applyUserName: this.user.nickName,
              applyDepId:this.user.depId,
              applyDepName:this.user.depName,
              applyTime:  new Date (),
              totalAmt: '',
              bizDesc: '',
              bizState:'10'
            }
            this.$nextTick(() => {
              this.$refs['formObj'].clearValidate()
            })
            this.feeReimburseItem=[]
            this.invoiceItem=[]
            this.getBizNo()
          } else {
            this.getInfoById(formObj.id)
          }
          this.initBusinessDict('IM_FEETYPE')
          this.initBusinessDict('IM_FEETMPLT')
          this.initBusinessDict('IM_TRADETYPE')
        },
        getBizNo(){
          this.loading = true
          getBizNo().then(response => {
            const res = response.data
            this.formObj.bizNo = res.data
            this.loading = false
          })
        },
        initBusinessDict(typeId){
          this.loading = true
          getCacheDictCodeList({typeId: typeId}).then(response => {
            const res = response.data
            if(typeId==='IM_FEETYPE'){
              this.feeTypeItems = res.data
            }else if(typeId==='IM_FEETMPLT'){
              this.feeTmpltItems = res.data
            }else if(typeId==='IM_TRADETYPE'){
              this.tradeTypeItems = res.data
            }
            this.loading = false
          })
        },
        getInfoById(id){
          this.loading = true
          infoById({id: id}).then(response => {
            const res = response.data
            this.formObj = res.data.feeReimburseDto.feeReimburse
            this.feeReimburseItem = res.data.feeReimburseDto.feeReimburseItem
            this.loading = false
          })
        },
        onSetTotalAmt(totalAmt){
          this.formObj.totalAmt=totalAmt
        },
        onAdd() {
          this.$refs['formObj'].validate((valid) => {
            if (valid) {
              const data={action:this.dialogStatus,formObj:this.formObj,feeReimburseItem:this.feeReimburseItem}
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
              const data={action:this.dialogStatus,formObj:this.formObj,feeReimburseItem:this.feeReimburseItem}
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
              const data={action:this.dialogStatus,formObj:this.formObj,feeReimburseItem:this.datas}
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
