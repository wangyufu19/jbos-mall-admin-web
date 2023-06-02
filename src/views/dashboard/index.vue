<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName"  @tab-click="handleClick">
        <el-tab-pane  label="我的待办" name="waiting">
          <my-work ref="waiting" v-if="activeName=='waiting'" :getWorkType="activeName"/>
        </el-tab-pane>
        <el-tab-pane  label="我的已办" name="processed">
          <my-work ref="processed" v-if="activeName=='processed'" :getWorkType="activeName"/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>



<script>
import myWork from './components/myWork'
export default {
  name: 'Dashboard',
  components: { myWork },
  data() {
    return {
      activeName: 'waiting'
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
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

