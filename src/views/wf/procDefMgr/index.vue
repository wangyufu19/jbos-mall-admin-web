<template>
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="流程设计" name="designer">
          <diagram/>
        </el-tab-pane>
      </el-tabs>      
    </div>
</template>

<script>
import diagram from '@/components/diagram'
export default {
  name: 'procDefMgr',
  components: { diagram},
  data() {
    return {
      activeName: 'designer',
    }
  },
  methods: {
   
  }
}
</script>

<style lang="less" scoped>
</style>