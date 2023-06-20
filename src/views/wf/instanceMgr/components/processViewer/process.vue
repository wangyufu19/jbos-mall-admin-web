<template>
    <div>
        <div v-if="this.getMultiInstance==='true'" class="filter-container">
            <el-button size="medium" type="primary" @click="onAddAssingee">加签</el-button>
            <el-button size="medium" type="primary" :loading="downloadLoading" @click="onExport">减签</el-button>
        </div>
        <viewer 
            :getId="this.getId" 
            :getProcInstId="this.getProcInstId" 
            :getCurrentActivityId="this.getCurrentActivityId"
            :getCurrentActivityName="this.getCurrentActivityName"
            :getMultiInstance="this.getMultiInstance"/>
        <addAssingee v-if="actionPageVisible" ref="addAssingee"/>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import Viewer from '@/components/Workflow/Viewer'
    import AddAssingee from './addAssignee.vue'
    export default {
        name: 'process',
        props: ['getId','getProcInstId','getCurrentActivityId','getCurrentActivityName','getMultiInstance'],
        components: {Viewer,AddAssingee},
        computed: {
            ...mapGetters([
            'user'
            ])
        },
        data() {
            return {
                actionPageVisible: false
            }
        },
        watch: {
            getProcInstId(val) {

            },
            getCurrentActivityId(val){

            },
            getCurrentActivityName(val){

            },
            getMultiInstance(val){

            }            
        },
        methods: {
            onAddAssingee(row){
                this.actionPageVisible = true
                this.$nextTick(() => {
                    this.$refs['addAssingee'].init(
                        this.user.username,
                        this.getProcInstId,
                        this.getCurrentActivityId,
                        this.getCurrentActivityName,
                        this.getMultiInstance)
                })
            },
        }
    }
</script>