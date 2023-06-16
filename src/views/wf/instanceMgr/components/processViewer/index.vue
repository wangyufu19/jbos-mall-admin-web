<template>
    <el-dialog 
        :title="title" 
        width="90%"
        :visible.sync="dialogFormVisible">   
        <el-card>
            <el-tabs v-model="activeName"  @tab-click="handleClick">
                <el-tab-pane  label="流程信息" name="process">
                    <process ref="process" v-if="activeName=='process'" :getId="this.id" :getProcInstId="this.procInstId" :getCurrentActivityId="this.currentActivityId"/>
                </el-tab-pane>
                <el-tab-pane label="用户任务" name="task">
                    <detail :getProcInstId="this.procInstId" :getTaskDefKey="this.currentActivityId" :isUserTask="'true'"/>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </el-dialog>
</template>
<script>
    import { mapGetters } from 'vuex'
    import process from './process.vue'
    import Detail from '@/components/Workflow/Task/Detail'
    export default {
        name: 'processViewer',
        components: {process,Detail},
        computed: {
            ...mapGetters([
            'user'
            ])
        },
        data() {
            return {
                dialogFormVisible: false,
                activeName: 'process',
                userId:'',
                id:'',
                title:'',
                procInstId:'',
                currentActivityId:'',
                procState:''
            }
        },
        watch: {
            activeName(val) {
                this.activeName = val
            }
        },
        created() {
            // init the default selected tab
            const tab = this.$route.query.tab
            if (tab) {
                this.activeName = tab
            }
        },
        methods: {
            init(id,procName,procInstId,currentActivityId,procState) {
                this.activeName='process',
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
  