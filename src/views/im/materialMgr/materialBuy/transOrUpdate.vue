<template>
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
        <el-col span="12">
          <el-form-item label="申请人" prop="applyUserId">
            <el-input v-model="formObj.applyUserName" :disabled="true"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="申请部门" prop="applyDepId">
            <el-input v-model="formObj.applyDepName" :disabled="true"/>
          </el-form-item>
        </el-col>
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
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item  label="总办日期" prop="gmoTime">
            <el-date-picker
              v-model="formObj.gmoTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="采购总金额" prop="totalAmt">
            <el-input v-model="formObj.totalAmt"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="采购用途" prop="purpose">
            <el-input type="textarea" rows="5" v-model="formObj.purpose"/>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card>
        <div slot="header" class="clearfix">
          <span>物品信息</span>
        </div>
        <div class="filter-container">
          <el-button size="medium" type="primary" @click="onAddRow()">新增行</el-button>
          <el-button size="medium" type="primary" @click="onDeleteRow()">删除行</el-button>
        </div>
        <el-table
          v-loading="listLoading"
          :data="datas"
          border
          stripe
          fit
          highlight-current-row
          style="width: 100%"
          :row-class-name="tableRowClassName"
          @row-click="onRowClick"
        >
          <el-table-column
            prop="materialName"
            label="物品名称"
            width="120"
          >
            <editable-cell slot-scope="{row}"
                           :can-edit="editModeEnabled"
                           v-model="row.materialName">
              <span slot="content">{{row.materialName}}</span>
            </editable-cell>

          </el-table-column>
          <el-table-column
            prop="amount"
            label="数量"
            width="120"
          >
            <editable-cell slot-scope="{row}"
                           :can-edit="editModeEnabled"
                           v-model="row.amount"
                           @input="e => onAmountChange(row,$index,e)"
            >
              <span slot="content">{{row.amount}}</span>
            </editable-cell>
          </el-table-column>
          <el-table-column
            prop="price"
            label="单价"
            width="120"
          >
            <editable-cell slot-scope="{row,$index}"
                           :can-edit="editModeEnabled"
                           v-model="row.price"
                           @input="e => onPriceChange(row,$index,e)"
            >
              <span slot="content">{{row.price}}</span>
            </editable-cell>
          </el-table-column>
          <el-table-column
            prop="sumAmt"
            label="小计"
          >

          </el-table-column>
        </el-table>
      </el-card>
      <el-card>
        <div slot="header" class="clearfix">
          <span>流程信息</span>
        </div>
        <el-row>
          <el-steps>
            <el-step 
              v-for="item in taskItems"
              :title="item.title"
              :description="item.description"
              :status="item.status">
            </el-step>
          </el-steps>
        </el-row>
      </el-card>
      <el-card v-if="this.$route.params.workType==='waiting'">
        <div slot="header" class="clearfix">
          <span>审批信息</span>
        </div>
        <el-row>
          <el-col>
            <el-form-item label="审批意见" prop="opinion">
              <el-select
                v-model="opinion"
                clearable
                :loading="loading"
                placeholder="请选择">
                <el-option
                  v-for="item in processOpinionDict"
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
            <el-form-item label="意见内容" prop="opinionDesc">
              <el-input type="textarea" rows="5" v-model="opinionDesc"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card>
        <el-button v-if="this.$route.params.workType==='waiting'" type="primary" @click="onDoTrans()">流转</el-button>
        <el-button v-if="this.$route.params.workType==='processed'&&this.formObj.isDrawback==='true'" type="primary" @click="onDoDrawback()">撤回</el-button>
        
      </el-card>
    </el-form>

</template>

<script>
    import { mapGetters } from 'vuex'
    import EditableCell from './components/EditableCell'
    import { getUserId } from '@/utils/global'
    import { getBizno,infoById,doTrans,doDrawback} from '@/api/im/materialBuy'
    import { getUserTaskStepList } from '@/api/wf/task'
    import { getCacheDictCodeList } from '@/api/sm/dict'

    export default {
      name: "addOrUpdate",
      components: {
        EditableCell
      },
      computed: {
        ...mapGetters([
          'user'
        ])
      },
      data() {
        return {
          formObj: {
            processInstanceId: '',
            taskId: '',
            taskDefKey: '',
            taskName:'',
            userId: '',
            depId: '',
            bizId: '',
            bizNo: '',
            applyUserId: '',
            applyDepId: '',
            applyTime: '',
            gmoTime: '',
            totalAmt: '',
            purpose: '',
            bizState:'10',
            isDrawback:''
          },        
          opinion: '100',
          opinionDesc:'',
          processOpinionDict: [],
          loading: false,
          rules: {
            bizNo: [{ required: true, message: '业务编号必须填写', trigger: 'change' }],
            applyUserId: [{ required: true, message: '申请人必须填写', trigger: 'change' }],
            applyDepId: [{ required: true, message: '申请部门必须填写', trigger: 'change' }],
            applyTime: [{ required: true, message: '申请日期必须填写', trigger: 'change' }],
            gmoTime: [{ required: true, message: '总办会议必须填写', trigger: 'change' }],
            totalAmt: [{ required: true, message: '采购总金额必须填写', trigger: 'change' }]
          },
          taskItems: [],
          datas: [],
          editModeEnabled: true,
          currentRow: ''
        }
      },
      created() {  
        if (this.formObj.bizId === undefined || this.formObj.bizId === '') {
          this.formObj.bizId=this.$route.params.bizId
        }     
        this.getUserTaskStepList()
        this.getInfoById(this.formObj.bizId)
        this.initOpinion()
      },
      methods: {
        tableRowClassName({ row, rowIndex }) {
          // 把每一行的索引放进row
          row.index = rowIndex
        },
        onRowClick(row,column,event) {
          this.currentRow = row.index
          row.status=1
        },
        onResetRowStatus(){
          this.datas.map(item => {
            if (item.status) {
              item.status = 0
            }
            return item
          })
        },
        getBizno(){
          this.loading = true
          getBizno().then(response => {
            const res = response.data
            this.formObj.bizNo = res.data
            this.loading = false
          })
        },
        getUserTaskStepList(){
          this.loading = true
          getUserTaskStepList({procInstId: this.$route.params.procInstId}).then(response => {
            const res = response.data
            this.taskItems = res.data
            this.loading = false
          })
        },
        getInfoById(id){
          this.loading = true
          const params ={
            id: id,
            userId: getUserId(),
            processInstanceId:this.$route.params.procInstId,
            taskId:this.$route.params.taskId
          }
          infoById(params).then(response => {
            const res = response.data
            this.formObj = res.data.materialBuyDto.materialBuy
            this.datas = res.data.materialBuyDto.materialList
            this.formObj.isDrawback = res.data.isDrawback
        
            this.loading = false
            this.formObj.processInstanceId=this.$route.params.procInstId
            this.formObj.taskId=this.$route.params.taskId
            this.formObj.taskDefKey=this.$route.params.taskDefKey
            this.formObj.taskName=this.$route.params.taskName
            this.formObj.userId=getUserId()
            this.formObj.depId=this.user.depId
          })
        },
        initOpinion(){
          this.loading = true
          getCacheDictCodeList({typeId: 'IM_PROCESS_OPINION'}).then(response => {
            const res = response.data
            this.processOpinionDict = res.data
            this.loading = false
          })
        },
        onAddRow() {
          this.onResetRowStatus()
          const row = {
            materialName: '',
            amount: '',
            price: '',
            status: 1
          }
          this.datas.push(row)
        },
        onDeleteRow() {
          if (this.currentRow === undefined || this.currentRow === '') {
            this.$message({
              message: '请选择操作的数据',
              type: 'success'
            })
            return
          }
          this.datas.splice(this.currentRow, 1)
          this.currentRow=this.currentRow-1
        },
        onAmountChange(row,index,value){
          if(row.amount && row.price){
            row.sumAmt = row.amount*row.price
          }else{
            row.sumAmt=0
          }
        },
        onPriceChange(row,index,value){
          if(row.amount && row.price){
            row.sumAmt = row.amount*row.price
          }else{
            row.sumAmt=0
          }
        },
        onDoTrans(){
          this.$refs['formObj'].validate((valid) => {
            if (valid) {
              this.formObj.opinion=this.opinion
              this.formObj.opinionDesc=this.opinionDesc
              const data={formObj:this.formObj}
              doTrans(data).then(response => {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
              })
            }
          })
        },
        onDoDrawback(){
          this.$refs['formObj'].validate((valid) => {
            if (valid) {
              const data={formObj:this.formObj}
              doDrawback(data).then(response => {
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
</style>
