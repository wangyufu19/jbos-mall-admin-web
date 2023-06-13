<template>   
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
            width="200"
        />
        <el-table-column
            prop="endTime"
            label="结束时间"
            width="200"
        />
        <el-table-column
            prop="taskState"
            label="状态"
            width="120"
            :formatter="onFormatter"
        />
        <el-table-column
            prop="opinion"
            label="审批意见"
            width="120"
            :formatter="onFormatter"
        />
        
    </el-table>   
</template>

<script>
    import { getProcessTaskDetailList } from '@/api/wf/task'
    export default {
        name: 'detail',
        props: ['getProcInstId'],
        data() {
            return {
                datas: [],
                listLoading: false,
            }
        },
        watch: {
            getProcInstId(val) {
                this.getProcessTaskDetailList(this.getProcInstId)
            }
        },
        created() {    
           this.getProcessTaskDetailList(this.getProcInstId)
        },
        methods: {
            getProcessTaskDetailList(procInstId){
                this.loading = true
                getProcessTaskDetailList({procInstId: procInstId}).then(response => {
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
        }
    }
</script>
<style scoped>
  .filter-container{
    margin-bottom: 10px;
  }
</style>
