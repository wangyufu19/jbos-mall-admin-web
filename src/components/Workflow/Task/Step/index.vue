<template>  
    <el-card>
        <div slot="header" class="clearfix">
          <span>流程信息</span>
        </div>
        <el-row>
            <el-steps>
                <el-step 
                    v-for="item in taskItems"
                    :title="item.title"
                    :description="item.description"
                    :status="item.status">
                </el-step>
            </el-steps>
        </el-row>
    </el-card>
</template>
<script>
    import { getUserTaskStepList } from '@/api/wf/task'
    export default {
        name: 'step',
        props: ['getProcInstId'],
        data() {
            return {
                taskItems: []
            }
        },
        watch: {
            getProcInstId(val) {
                this.getUserTaskStepList(this.getProcInstId)
            }
        },
        created() {    
            this.getUserTaskStepList(this.getProcInstId)
        },
        methods: {
            getUserTaskStepList(procInstId){
                getUserTaskStepList({procInstId:procInstId}).then(response => {
                    const res = response.data
                    this.taskItems = res.data
                    this.loading = false
                })
            },
        }
    }
        
</script>