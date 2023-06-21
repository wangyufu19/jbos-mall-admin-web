<template>
    <el-dialog 
        :title="title" 
        width="90%"
        :visible.sync="dialogFormVisible"
        :before-close="onRefresh">   
        <el-card>
            <el-tabs v-model="activeName"  @tab-click="handleClick">
                <el-tab-pane label="流程信息" name="process">
                    <process 
                        ref="process" 
                        v-if="activeName=='process'" 
                        :getProcDefId="this.procDefId" 
                        :getProcInstId="this.procInstId" 
                        :getCurrentActivityId="this.currentActivityId"
                        :getCurrentActivityName="this.currentActivityName"
                        :getMultiInstance="this.multiInstance"
                        :getElementVariable="this.elementVariable"/>
                </el-tab-pane>
                <el-tab-pane label="用户任务" name="task">
                    <detail 
                        :activeName="this.activeName" 
                        :getProcInstId="this.procInstId" 
                        :getActivityId="this.currentActivityId" 
                        :getMultiInstance="this.multiInstance"
                        :isUserTask="'true'"/>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </el-dialog>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { getProcessInstanceCurrentActivityId} from '@/api/wf/instance'
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
                title:'',
                procDefId:'',
                procInstId:'',
                currentActivityId:'',
                currentActivityName:'',
                multiInstance:'false',
                elementVariable:'',
                procState:''
            }
        },
        watch: {
            activeName(val) {
                this.activeName = val
                this.loadProcessInstanceCurrentActivityId()
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
            init(procDefId,procName,procInstId,procState) {
                this.dialogFormVisible = true
                this.activeName='process',
                this.userId=this.user.username,
                this.title='流程预览'+'-'+procName
                this.procDefId=procDefId
                this.procInstId=procInstId
                this.procState=procState
                this.multiInstance='false'
                this.elementVariable=''
                this.loadProcessInstanceCurrentActivityId()
            },
            loadProcessInstanceCurrentActivityId(){
                getProcessInstanceCurrentActivityId({processDefinitionId:this.procDefId,processInstanceId: this.procInstId }).then(response => {
                    const res=response.data
                    this.currentActivityId = res.data.currentActivityId
                    this.currentActivityName = res.data.currentActivityName
                    this.multiInstance = res.data.multiInstance
                    this.elementVariable = res.data.elementVariable
                })
            },
            onRefresh(){
                this.dialogFormVisible = false
                this.$emit('onRefresh');
            }
        }
    }
</script>
<style scoped>
   
</style>
  