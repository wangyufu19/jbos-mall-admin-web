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
          <el-form-item label="总金额" prop="totalAmt">
            <el-input v-model="formObj.totalAmt"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="用途" prop="purpose">
            <el-input type="textarea" rows="5" v-model="formObj.purpose"/>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <MaterialList :action="dialogStatus" :datas="datas" @setTotalAmt="onSetTotalAmt"/>
      <step :getProcInstId="this.$route.params.procInstId"/>
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
    import MaterialList from '../../components/materialList.vue'
    import Step from '@/components/Workflow/Task/Step'
    import { getUserId } from '@/utils/global'
    import { getBizno,infoById,doTrans,doDrawback} from '@/api/im/materialBuy'
    import { getCacheDictCodeList } from '@/api/sm/dict'

    export default {
      name: "addOrUpdate",
      components: {
        MaterialList,Step
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
            activityId: '',
            activityName:'',
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
            totalAmt: [{ required: true, message: '总金额必须填写', trigger: 'change' }]
          },
          datas: []
        }
      },
      created() {  
        if (this.formObj.bizId === undefined || this.formObj.bizId === '') {
          this.formObj.bizId=this.$route.params.bizId
        }     
        this.getInfoById(this.formObj.bizId)
        this.initOpinion()
      },
      methods: {
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
          const params ={
            action:'trans',
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
            this.formObj.activityId=this.$route.params.activityId
            this.formObj.activityName=this.$route.params.activityName
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
        onSetTotalAmt(totalAmt){
          this.formObj.totalAmt=totalAmt
        },
        onDoTrans(){
          this.$refs['formObj'].validate((valid) => {
            if (valid) {
              this.formObj.opinion=this.opinion
              this.formObj.opinionDesc=this.opinionDesc
              const data={formObj:this.formObj,materials:this.datas}
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
