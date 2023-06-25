<template>
    <el-dialog 
        :title="title" 
        width="80%"
        :visible.sync="dialogFormVisible">   
        <el-card>
            <div slot="header" class="clearfix">
            <span>流程信息</span>
            </div>
            <viewer :getProcDefId="id" :getProcInstId="procInstId" :getCurrentActivityId="currentActivityId"/>
        </el-card>
    </el-dialog>
</template>
<script>
    import { mapGetters } from 'vuex'
    import Viewer from '@/components/Workflow/Viewer'


    export default {
        name: 'processViewer',
        components: {Viewer},
        computed: {
            ...mapGetters([
            'user'
            ])
        },
        data() {
            return {
                dialogFormVisible: false,
                userId:'',
                id:'',
                title:'',
                innerTitle:'',
                procInstId:'',
                currentActivityId:'',
                procState:''
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
            }
        }
    }
</script>
<style scoped>
   
</style>
  