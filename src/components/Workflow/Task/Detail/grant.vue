<template>
    <el-dialog 
        :title="title" 
        width="50%"
        :visible.sync="dialogFormVisible"
        append-to-body> 
        <el-card>
            <div slot="header" class="clearfix">
            <span>领取人信息</span>
            </div>
            <el-form ref="formObj" :model="formObj" :rules="rules" label-width="100px" class="demo-ruleForm" >
                <el-row>
                    <el-col span="24">
                    <el-form-item label="任务名称" prop="activityName">
                        <el-input v-model="formObj.activityName" :disabled="true"/>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col span="24">
                    <el-form-item label="领取人" prop="assignee">
                        <UserSelected @setAssignee="setAssignee"/>
                    </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
           
        </el-card>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="onGrant()">确定 </el-button>
            </div>
    </el-dialog>
</template>

<script>
    import { assignee } from '@/api/wf/task'
    import UserSelected from '@/components/UserSelected'
    export default {
        name: 'grant',
        components: {UserSelected},
        data() {
            return {
                title:'',
                dialogFormVisible: false,
                formObj:{
                    userId:'',
                    processInstanceId:'',
                    taskId:'',
                    activityId:'',
                    activityName:'',
                    assignee:''
                },
                rules: {
                    activityName: [{ required: true, message: '任务名称必须填写', trigger: 'change' }],
                    assignee: [{ required: true, message: '领取人必须填写', trigger: 'change' }]
                },
            }
        },
        methods: {
            init(userId,procInstId,taskId,activityId,activityName) {
                this.dialogFormVisible = true
                this.title='授权任务'
                this.formObj.userId=userId
                this.formObj.processInstanceId=procInstId
                this.formObj.taskId=taskId
                this.formObj.activityId=activityId
                this.formObj.activityName=activityName
                this.formObj.assignee=''
            },
            setAssignee(assignee){
                this.formObj.assignee=assignee
            },
            onGrant(){
                this.$refs['formObj'].validate((valid) => {
                    if (valid) {
                        const data={}
                        data.userId=this.formObj.userId;
                        data.processInstanceId=this.formObj.processInstanceId
                        data.taskId=this.formObj.taskId
                        data.activityId=this.formObj.activityId
                        data.activityName=this.formObj.activityName
                        data.assignee=this.formObj.assignee;

                        assignee(data).then(response => {
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