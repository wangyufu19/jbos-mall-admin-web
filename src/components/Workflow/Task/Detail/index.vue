<template>   
    <div>
    <el-table
        v-loading="listLoading"
        :data="datas"
        border
        stripe
        fit
        highlight-current-row
        style="width: 100%"
    >
        <el-table-column
            prop="taskName"
            label="任务名称"
            width="120"
        />
        <el-table-column
            prop="assigneeName"
            label="任务用户"
            width="200"
        />
        <el-table-column
            prop="startTime"
            label="开始时间"
            width="160"
        />
        <el-table-column
            prop="endTime"
            label="结束时间"
            width="160"
        />
        <el-table-column
            prop="taskState"
            label="状态"
            width="80"
            :formatter="onFormatter"
        />
        <el-table-column
            prop="opinion"
            label="审批意见"
            width="160"
            :formatter="onFormatter"
        />
        <el-table-column v-if="this.isUserTask==='true'" label="操作" align="center">
            <template slot-scope="{row,$index}">
            <el-button v-if="row.taskState==='20'" type="primary" size="mini" @click="onShowTrans(row)">流转</el-button>
            <el-button v-if="row.taskState==='20'" type="primary" size="mini"  @click="onShowGrant(row,$index)">授权</el-button>
            </template>
      </el-table-column>
    </el-table>   
    <trans v-if="transVisible" ref="trans" @onRefresh="onRefresh"/>
    </div>
</template>

<script>
    import { getProcessTaskDetailList } from '@/api/wf/task'
    import trans from './trans.vue'

    export default {
        name: 'detail',
        components: {trans},
        props: ['activeName','getProcInstId','getTaskDefKey',"isUserTask"],
        data() {
            return {
                datas: [],
                listLoading: false,
                transVisible: false,
            }
        },
        watch: {
            activeName(val){
                this.getProcessTaskDetailList(this.getProcInstId,this.getTaskDefKey)
            },
            getProcInstId(val) {
                this.getProcessTaskDetailList(this.getProcInstId,this.getTaskDefKey)
            },
            getTaskDefKey(val){
                this.getProcessTaskDetailList(this.getProcInstId,this.getTaskDefKey)
            }
        },
        created() {    
            this.getProcessTaskDetailList(this.getProcInstId,this.getTaskDefKey)
        },
        methods: {
            getProcessTaskDetailList(procInstId,taskDefKey){
                this.loading = true
                getProcessTaskDetailList({procInstId: procInstId,taskDefKey:taskDefKey}).then(response => {
                    const res = response.data
                    this.datas = res.data.list
                    this.listLoading = false
                })
            },
            onFormatter(row,column){
                if(column.property==='taskState'){        
                    if(row.taskState==='20'){
                        return '审批中'
                    }else if(row.taskState==='90') {
                        return '审批成功'
                    }else if(row.taskState==='99') {
                        return '审批退回'
                    }
                }else if(column.property==='opinion'){
                    if(row.opinion==='100'){
                        return '同意'
                    }else if(row.opinion==='101') {
                        return '驳回'
                    }
                }
            },
            onShowTrans(row){
                this.transVisible = true
                this.$nextTick(() => {
                    this.$refs['trans'].init(row.procInstId,row.taskDefKey,row.assignee)
                })
            },
            onRefresh(){
                this.getProcessTaskDetailList(this.getProcInstId,this.getTaskDefKey)
            }
        }
    }
</script>
<style scoped>
  .filter-container{
    margin-bottom: 10px;
  }
</style>
