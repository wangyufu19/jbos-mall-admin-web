<template>
    <el-dialog 
        :title="title" 
        width="60%"
        :visible.sync="dialogFormVisible"
        append-to-body> 
        <el-card>
            <div slot="header" class="clearfix">
            <span>领取人信息</span>
            </div>
            <el-form ref="formObj" :model="formObj" :rules="rules" label-width="100px" class="demo-ruleForm" >
                <el-row>
                    <el-col span="12">
                    <el-form-item label="实例Id" prop="processInstanceId">
                        <el-input v-model="formObj.processInstanceId" :disabled="true"/>
                    </el-form-item>
                    </el-col>
                    <el-col span="12">
                    <el-form-item label="活动Id" prop="activityId">
                        <el-input v-model="formObj.activityId" :disabled="true"/>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col span="12">
                    <el-form-item label="活动名称" prop="activityName">
                        <el-input v-model="formObj.activityName" :disabled="true"/>
                    </el-form-item>
                    </el-col>
                    <el-col span="12">
                    <el-form-item label="元素变量" prop="elementVariable">
                        <el-input v-model="formObj.elementVariable" :disabled="true"/>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col span="24">
                    <el-form-item label="领取人" prop="assignees">
                        <el-input v-model="formObj.assignees"/>
                    </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
           
        </el-card>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="onAddAssignee()">确定 </el-button>
            </div>
    </el-dialog>
</template>

<script>
    import { addAssignee } from '@/api/wf/task'
    export default {
        name: 'addAssignee',
        data() {
            return {
                title:'',
                dialogFormVisible: false,
                formObj:{
                    userId:'',
                    processInstanceId:'',
                    activityId:'',
                    activityName:'',
                    multiInstance:'',
                    elementVariable:'',
                    assignees:''
                },
                rules: {
                    processInstanceId: [{ required: true, message: '实例Id必须填写', trigger: 'change' }],
                    activityId: [{ required: true, message: '活动Id必须填写', trigger: 'change' }],
                    activityName: [{ required: true, message: '活动名称必须填写', trigger: 'change' }],
                    multiInstance: [{ required: true, message: '是否多实例必须填写', trigger: 'change' }],
                    elementVariable: [{ required: true, message: '元素变量必须填写', trigger: 'change' }],
                    assignees: [{ required: true, message: '领取人必须填写', trigger: 'change' }]
                },
            }
        },
        methods: {
            init(userId,processInstanceId,activityId,activityName,multiInstance,elementVariable) {
                this.dialogFormVisible = true
                this.title='加签'
                this.formObj.userId=userId
                this.formObj.processInstanceId=processInstanceId
                this.formObj.activityId=activityId
                this.formObj.activityName=activityName
                this.formObj.multiInstance=multiInstance
                this.formObj.elementVariable=elementVariable
                this.formObj.assignees=''
            },
            onAddAssignee(){
                this.$refs['formObj'].validate((valid) => {
                    if (valid) {
                        const data=this.formObj
                        addAssignee(data).then(response => {
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