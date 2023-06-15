<template>
    <el-dialog 
        :title="formObj.title" 
        width="55%"
        :visible.sync="dialogFormVisible">   
        <el-form ref="formObj" :model="formObj" :rules="rules" label-width="100px" class="demo-ruleForm" >
            <el-card>
                <div slot="header" class="clearfix">
                <span>基本信息</span>
                </div>
                <el-row>
                    <el-col span="12">
                    <el-form-item label="发起人" prop="userId">
                        <el-input v-model="formObj.userName" :disabled="true"/>
                    </el-form-item>
                    </el-col>
                    <el-col span="12">
                    <el-form-item label="发起节点" prop="startActivityId">
                        <el-select
                            v-model="formObj.startActivityId"
                            :loading="loading"
                            @change="onStartActivityChanged" 
                            placeholder="请选择">
                            <el-option
                                v-for="item in activityItems"
                                :key="item.activityId"
                                :label="item.activityName"
                                :value="{ value: item.activityId, label: item.activityName}"
                            />
                        </el-select>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col span="12">
                    <el-form-item label="业务类型" prop="bizType">
                        <el-select
                            v-model="formObj.bizType"
                            :loading="loading"
                            @change="onBizTypeChanged" 
                            placeholder="请选择">
                            <el-option
                                v-for="item in bizTypeItems"
                                :key="item.DICTID"
                                :label="item.DICTNAME"
                                :value="item.DICTID"
                            />
                        </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col span="12">
                    <el-form-item label="业务编号" prop="bizNo">
                        <el-input v-model="formObj.bizNo" :disabled="true"/>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col span="24">
                    <el-form-item label="业务标题" prop="businessKey">
                        <el-input v-model="formObj.businessKey"/>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col span="24">
                    <el-form-item label="业务路由" prop="routeUrl">
                        <el-input v-model="formObj.routeUrl"/>
                    </el-form-item>
                    </el-col>
                </el-row>

                
                
            </el-card>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="onStart()">确定 </el-button>
        </div>
    </el-dialog>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { getCacheDictCodeList } from '@/api/sm/dict'
    import {getBizNo} from '@/api/comm/id'
    import {startProcessInstance} from '@/api/wf/instance'
    import {getProcessDefinitionList} from '@/api/wf/deployment'
    export default {
        name: 'processStarter',
        components: {},
        computed: {
            ...mapGetters([
            'user'
            ])
        },
        data() {
            return {
                dialogFormVisible: false,
                formObj: {
                    id:'',
                    processDefinitionKey:'',
                    title:'',
                    userId: '',
                    userName: '',
                    startActivityId:'',
                    startActivityName:'',
                    bizType:'',
                    bizNo:'',
                    businessKey:'',
                    routeUrl:''
                },
                activityItems:[],
                bizTypeItems:[],
                rules: {
                    userId: [{ required: true, message: '发起人必须填写', trigger: 'change' }],
                    startActivityId: [{ required: true, message: '发启节点必须填写', trigger: 'change' }],    
                    bizType: [{ required: true, message: '业务类型必须填写', trigger: 'change' }],   
                    bizNo: [{ required: true, message: '业务编号必须填写', trigger: 'change' }],                     
                    businessKey: [{ required: true, message: '业务标题必须填写', trigger: 'change' }],
                    routeUrl: [{ required: true, message: '业务路由必须填写', trigger: 'change' }]
                },
                loading: false,
            }
        },
        methods: {
            init(id,procKey,procName) {
                this.formObj = {
                    id:id,
                    processDefinitionKey:procKey,
                    title:'流程启动'+'-'+procName,
                    userId: this.user.username,
                    userName: this.user.nickName
                    }
                this.$nextTick(() => {
                    this.$refs['formObj'].clearValidate()
                })
                this.dialogFormVisible = true
                this.onLoadActivityItem(id)
                this.initBizType()
            },
            onLoadActivityItem(processDefinitionId){                
                this.loading = true
                getProcessDefinitionList({processDefinitionId: processDefinitionId}).then(response => {
                    const res = response.data
                    this.activityItems = res.data
                    this.loading = false
                })
            },
            onStartActivityChanged(data){
                this.formObj.startActivityId=data.value
                this.formObj.startActivityName=data.label
            },
            onBizTypeChanged(value){
                this.getBizNo(value)
            },
            getBizNo(bizType){
                this.loading = true
                getBizNo({bizType:bizType}).then(response => {
                    const res = response.data
                    this.formObj.bizNo = res.data.bizNo
                    this.loading = false
                })
            },
            initBizType(){
                this.loading = true
                getCacheDictCodeList({typeId: 'JBOS_PROC_BIZTYPE'}).then(response => {
                    const res = response.data
                    this.bizTypeItems = res.data
                    this.loading = false
                })
            },
            onStart(){
                this.$refs['formObj'].validate((valid) => {
                    if (valid) {
                        const data={formObj:this.formObj}
                        startProcessInstance(data).then(response => {
                            this.dialogFormVisible = false
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
  