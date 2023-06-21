<template>
    <div>
        <div v-if="this.getMultiInstance==='true'" class="filter-container">
            <el-button size="medium" type="primary" @click="onAddAssignee">加签</el-button>
        </div>
        <viewer 
            :getProcDefId="this.getProcDefId" 
            :getProcInstId="this.getProcInstId" 
            :getCurrentActivityId="this.getCurrentActivityId"
            :getCurrentActivityName="this.getCurrentActivityName"
            :getMultiInstance="this.getMultiInstance"/>
        <addAssignee v-if="actionPageVisible" ref="addAssignee"/>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import Viewer from '@/components/Workflow/Viewer'
    import AddAssignee from './addAssignee.vue'
    export default {
        name: 'process',
        props: [
            'getProcDefId',
            'getProcInstId',
            'getCurrentActivityId',
            'getCurrentActivityName',
            'getMultiInstance',
            'getElementVariable'
        ],
        components: {Viewer,AddAssignee},
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

            },
            getElementVariable(val){

            }            
        },
        methods: {
            onAddAssignee(){
                this.actionPageVisible = true
                this.$nextTick(() => {
                    this.$refs['addAssignee'].init(
                        this.user.username,
                        this.getProcInstId,
                        this.getCurrentActivityId,
                        this.getCurrentActivityName,
                        this.getMultiInstance,
                        this.getElementVariable)
                })
            }
        }
    }
</script>