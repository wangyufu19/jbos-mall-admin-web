<template>
    <viewer :getId="this.getId" :getProcInstId="this.getProcInstId" :getCurrentActivityId="this.getCurrentActivityId"/>
</template>
<script>
    import Viewer from '@/components/Workflow/Viewer'
    export default {
        name: 'process',
        props: ['getId','getProcInstId','getCurrentActivityId'],
        components: {Viewer},
        data() {
            return {
            }
        }
    }
</script>