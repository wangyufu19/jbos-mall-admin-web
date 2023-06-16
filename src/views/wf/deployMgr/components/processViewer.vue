<template>
    <el-dialog 
        :title="title" 
        width="80%"
        :visible.sync="dialogFormVisible">   
        <el-dialog
            width="60%"
            :title="innerTitle"
            :visible.sync="innerVisible"
            append-to-body>
            <el-card>
            <div slot="header" class="clearfix">
            <span>流程变量</span>
            </div>
            <el-table
                v-loading="listLoading"
                :data="variables"
                border
                stripe
                fit
                highlight-current-row
                style="width: 100%"
                >
                <el-table-column
                    prop="DICTID"
                    label="变量名称"
                    width="140"
                />
                <el-table-column
                    prop="variableValue"
                    label="变量值"
                    width="300"
                >
                    <editable-cell slot-scope="{row}"
                            :can-edit="true"
                            v-model="row.variableValue">
                        <span slot="content">{{row.variableValue}}</span>
                    </editable-cell>
                </el-table-column>
                <el-table-column
                    prop="DICTNAME"
                    label="备注"
                />
            </el-table>
            </el-card>
       
            <div slot="footer" class="dialog-footer">
                <el-button @click="innerVisible = false">取消</el-button>
                <el-button type="primary" @click="onTrans()">确定 </el-button>
            </div>
        </el-dialog>
        <el-card>
        <div v-if="this.procState==='20'">
            <el-button type="primary" @click="onShowTrans()">流转</el-button>
            <el-button type="primary">授权</el-button>
        </div>
        <viewer :getId="id" :getProcInstId="procInstId" :getCurrentActivityId="currentActivityId"/>
        </el-card>
    </el-dialog>
</template>
<script>
    import { mapGetters } from 'vuex'
    import EditableCell from '@/components/EditableCell'
    import Viewer from '@/components/Workflow/Viewer'
    import { getCacheDictCodeList } from '@/api/sm/dict'
    import {completeUserTask} from '@/api/wf/task'

    export default {
        name: 'processViewer',
        components: {EditableCell,Viewer},
        computed: {
            ...mapGetters([
            'user'
            ])
        },
        data() {
            return {
                listLoading:false,
                dialogFormVisible: false,
                innerVisible: false,
                variables: [],
                userId:'',
                id:'',
                title:'',
                innerTitle:'',
                procInstId:'',
                currentActivityId:'',
                procState:'',
                formObj: {
                }
            }
        },
        methods: {
            init(id,procName,procInstId,currentActivityId,procState) {
                this.userId=this.user.username,
                this.id=id
                this.title='流程预览'+'-'+procName
                this.procInstId=procInstId
                this.currentActivityId=currentActivityId
                this.procState=procState
                this.dialogFormVisible = true
            },
            onList(){
                this.loading = true
                getCacheDictCodeList({typeId: 'JBOS_PROC_VARIABLE'}).then(response => {
                    const res = response.data
                    this.variables = res.data
                    this.loading = false
                })
            },
            onShowTrans(){
                this.innerVisible = true
                this.innerTitle=this.title+"-"+"流转"
                this.onList()
            },
            onTrans(){
                if(this.variables.length>0){
                    const data={userId:this.userId,processInstanceId:this.procInstId,variables:this.variables}
                    completeUserTask(data).then(response => {
                        this.dialogFormVisible = false
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        })
                    })
                }
            }
        }
    }
</script>
<style scoped>
   
</style>
  