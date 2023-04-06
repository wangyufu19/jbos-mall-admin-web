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
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button v-if="this.formObj.bizState==='10'&&this.dialogStatus==='update'" type="primary" @click="dialogStatus==='create'?onAdd():onUpdate()">确定 </el-button>
      <el-button v-if="this.dialogStatus==='update'" type="primary" @click="onStartTrans()">流转</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import { mapGetters } from 'vuex'
    import EditableCell from './components/EditableCell'
    import { getBizno,add,infoById,update,startTrans } from '@/api/im/materialBuy'
    import { getMaterialList }  from '@/api/im/materialList'
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
          dialogFormVisible: false,
          dialogStatus: '',
          textMap: {
            create: '物品采购-发起流程',
            update: '物品采购-修改流程',
            view: '物品采购-查看流程'
          },
          formObj: {
            bizNo: '',
            applyUserId: '',
            applyDepId: '',
            applyTime: '',
            gmoTime: '',
            totalAmt: '',
            purpose: '',
            bizState:'10'
          },
          loading: false,
          rules: {
            bizNo: [{ required: true, message: '业务编号必须填写', trigger: 'change' }],
            applyUserId: [{ required: true, message: '申请人必须填写', trigger: 'change' }],
            applyDepId: [{ required: true, message: '申请部门必须填写', trigger: 'change' }],
            applyTime: [{ required: true, message: '申请日期必须填写', trigger: 'change' }],
            gmoTime: [{ required: true, message: '总办会议必须填写', trigger: 'change' }],
            totalAmt: [{ required: true, message: '采购总金额必须填写', trigger: 'change' }]
          },
          datas: [],
          editModeEnabled: true,
          currentRow: ''
        }
      },
      methods: {
        init(formObj, dialogStatus) {
          if (dialogStatus === 'create') {
            this.dialogStatus = dialogStatus
            this.dialogFormVisible = true
            this.formObj = {
              id: undefined,
              bizNo: '',
              applyUserId: this.user.LOGINNAME,
              applyUserName: this.user.USERNAME,
              applyDepId:this.user.DEPID,
              applyDepName:this.user.DEPNAME,
              applyTime:  new Date (),
              gmoTime: '',
              totalAmt: '',
              purpose: '',
              bizState:'10'
            }
            this.$nextTick(() => {
              this.$refs['formObj'].clearValidate()
            })
            this.datas=[]
            this.getBizno()
          } else {
            this.dialogStatus = dialogStatus
            this.dialogFormVisible = true
            this.getInfoById(formObj.id)
            this.getMaterialList(formObj.id)
          }
        },
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
        getInfoById(id){
          this.loading = true
          infoById({id: id}).then(response => {
            const res = response.data
            this.formObj = res.data
            this.loading = false
          })
        },
        getMaterialList(id){
          this.loading = true
          getMaterialList({bizid: id}).then(response => {
            const res = response.data
            this.datas = res.data
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
        onAdd() {
          this.$refs['formObj'].validate((valid) => {
            if (valid) {
              const data={formObj:this.formObj,materials:this.datas}
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
              const data={formObj:this.formObj,materials:this.datas}
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
              const data={action:this.dialogStatus,formObj:this.formObj,materials:this.datas}
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
</style>
