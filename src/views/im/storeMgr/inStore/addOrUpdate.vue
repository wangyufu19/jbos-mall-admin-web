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
          <el-form-item  label="采购流程" prop="buyBizNo">
              <el-input v-model="formObj.buyBizNo" v-on:click.native="onSelectBuyFlow"/>
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
            <el-input v-model.number="formObj.totalAmt"/>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <MaterialList :action="dialogStatus" :datas="datas" @setTotalAmt="onSetTotalAmt"/>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button v-if="this.formObj.bizState==='10'" type="primary" @click="dialogStatus==='create'?onAdd():onUpdate()">确定 </el-button>
      <el-button v-if="this.formObj.bizState==='10'" type="primary" @click="onStartTrans()">流转</el-button>
    </div>
    <el-dialog
      width="85%"
      title="选择物品采购流程"
      :visible.sync="selectMaterialBuyVisible"
      append-to-body>
      <SelectMaterialBuy @selectMaterialBuy="onSelectMaterialBuy"/>
    </el-dialog>
  </el-dialog>
  
</template>

<script>
    import { mapGetters } from 'vuex'
    import SelectMaterialBuy from '../../materialMgr/materialBuy/selectMaterialBuy.vue'
    import MaterialList from '../../components/materialList.vue'
    import { getBizNo,add,infoById,update,startTrans } from '@/api/im/materialInStore'

    export default {
      name: "addOrUpdate",
      components: {
        SelectMaterialBuy,
        MaterialList
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
          selectMaterialBuyVisible: false,
          selectMaterialTreeVisible: false,
          textMap: {
            create: '物品入库-发起流程',
            update: '物品入库-修改流程',
            view: '物品入库-查看流程'
          },
          formObj: {
            bizNo: '',
            buyBizId:'',
            buyBizNo:'',
            applyUserId: '',
            applyDepId: '',
            applyTime: '',
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
            totalAmt: [{ required: true, message: '总金额必须填写', type:'number',trigger: 'change' }]
          },
          datas: [],
        }
      },
      methods: {
        init(formObj, dialogStatus) {
          this.selectMaterialBuyVisible=false
          this.dialogStatus = dialogStatus
          this.dialogFormVisible = true
          if (dialogStatus === 'create') {
            this.formObj = {
              id: undefined,
              bizNo: '',
              applyUserId: this.user.username,
              applyUserName: this.user.nickName,
              applyDepId:this.user.depId,
              applyDepName:this.user.depName,
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
            this.getBizNo()
          } else {
            this.getInfoById(formObj.id)
          }
        },
        getBizNo(){
          this.loading = true
          getBizNo().then(response => {
            const res = response.data
            this.formObj.bizNo = res.data
            this.loading = false
          })
        },
        onSelectBuyFlow(){
          this.selectMaterialBuyVisible=true
        },
        onSelectMaterialBuy(row){
          this.formObj.buyBizId=row.id
          this.formObj.buyBizNo=row.bizNo
          this.selectMaterialBuyVisible=false
        },
        getInfoById(id){
          this.loading = true
          infoById({id: id}).then(response => {
            const res = response.data
            this.formObj = res.data.materialInStoreDto.materialInStore
            this.datas = res.data.materialInStoreDto.materialList
            this.loading = false
          })
        },
        onSetTotalAmt(totalAmt){
          this.formObj.totalAmt=totalAmt
        },
        onAdd() {
          this.$refs['formObj'].validate((valid) => {
            if (valid) {
              const data={action:this.dialogStatus,formObj:this.formObj,materials:this.datas}
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
