<template>
    <el-dialog 
        :title="title" 
        width="80%"
        :visible.sync="dialogFormVisible">   
        <el-dialog
            width="60%"
            top="5%"
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
                    width="200"
                />
                <el-table-column
                    prop="variableValue"
                    label="变量值"
                    width="380"
                >
                    <editable-cell slot-scope="{row}"
                            :can-edit="true"
                            v-model="row.variableValue">
                        <span slot="content">{{row.variableValue}}</span>
                    </editable-cell>
                </el-table-column>
            </el-table>
            </el-card>
       
            <div slot="footer" class="dialog-footer">
                <el-button @click="innerVisible = false">取消</el-button>
                <el-button type="primary" @click="onStart()">确定 </el-button>
            </div>
        </el-dialog>
        <el-card>
        <div v-if="this.procState==='20'">
            <el-button type="primary" @click="onTrans()">流转</el-button>
            <el-button type="primary">授权</el-button>
        </div>
        <viewer :getId="id" :getProcInstId="procInstId" :getCurrentActivityId="currentActivityId"/>
        </el-card>
    </el-dialog>
</template>
<script>
    import EditableCell from '@/components/EditableCell'
    import Viewer from '@/components/Workflow/Viewer'
    import { getCacheDictCodeList } from '@/api/sm/dict'

    export default {
        name: 'processViewer',
        components: {EditableCell,Viewer},
        data() {
            return {
                listLoading:false,
                dialogFormVisible: false,
                innerVisible: false,
                variables: [],
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
            onTrans(){
                this.innerVisible = true
                this.innerTitle=this.title+"-"+"流转"
                this.onList()
            }
        }
    }
</script>
<style scoped>
   
</style>
  