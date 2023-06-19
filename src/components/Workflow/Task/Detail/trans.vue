<template>
    <el-dialog 
        :title="title" 
        width="80%"
        :visible.sync="dialogFormVisible"
        append-to-body> 
        <el-card>
        <div slot="header" class="clearfix">
        <span>流程变量</span>
        </div>
        <div class="filter-container">
          <el-button size="medium" type="primary" @click="onAddRow()">新增行</el-button>
          <el-button size="medium" type="primary" @click="onDeleteRow()">删除行</el-button>
        </div>
        <el-table
            v-loading="listLoading"
            :data="variables"
            border
            stripe
            fit
            highlight-current-row
            style="width: 100%"
            :row-class-name="tableRowClassName"
            @row-click="onRowClick"
            >
            <el-table-column
                prop="DICTID"
                label="变量名称"
                width="140"
            >
                <editable-cell slot-scope="{row}"
                        :can-edit="true"
                        v-model="row.DICTID">
                    <span slot="content">{{row.DICTID}}</span>
                </editable-cell>
            </el-table-column>
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
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="onTrans()">确定 </el-button>
        </div>
    </el-dialog>
</template>
<script>
    import EditableCell from '@/components/EditableCell'
    import { getCacheDictCodeList } from '@/api/sm/dict'
    import {completeUserTask} from '@/api/wf/task'
    export default {
        name: 'trans',
        components: {EditableCell},
        data() {
            return {
                dialogFormVisible: false,
                title:'',
                procInstId:'',
                taskDefKey:'',
                assignee:'',
                variables: [],
                currentRow: '',
                loading:false
            }
        },
        methods: {
            init(procInstId,taskDefKey,assignee) {
                this.dialogFormVisible = true
                this.title='流转任务'
                this.procInstId=procInstId
                this.taskDefKey=taskDefKey
                this.assignee=assignee
                this.onList()
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
                if(this.variables.length>0){
                    const data={
                        userId:this.assignee,processInstanceId:this.procInstId,taskDefKey:this.taskDefKey,variables:this.variables
                    }
                    completeUserTask(data).then(response => {
                        this.dialogFormVisible = false
                        this.$emit('onRefresh');
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        })
                    })
                }
            },
            tableRowClassName({ row, rowIndex }) {
                // 把每一行的索引放进row
                row.index = rowIndex
            },
            onRowClick(row,column,event) {
                this.currentRow = row.index
            },
            onAddRow() {
                const row = {
                    DICTID: '',
                    variableValue: '',
                    DICTNAME: ''
                }
                this.variables.push(row)
            },
            onDeleteRow() {
                if (this.currentRow === undefined || this.currentRow === '') {
                    this.$message({
                    message: '请选择操作的数据',
                    type: 'success'
                    })
                    return
                }
                this.variables.splice(this.currentRow, 1)
                this.currentRow=this.currentRow-1
            }
        }
            
    }
</script>

<style scoped>
  .filter-container{
    margin-bottom: 10px;
  }
</style>
