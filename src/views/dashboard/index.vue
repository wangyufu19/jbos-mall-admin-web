<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName"  @tab-click="handleClick">
        <el-tab-pane  label="我的待办" name="db">
          <my-work ref="db" v-if="activeName=='db'" :getWorkType="activeName"/>
        </el-tab-pane>
        <el-tab-pane  label="我的已办" name="yb">
          <my-work ref="yb" v-if="activeName=='yb'" :getWorkType="activeName"/>
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
      activeName: 'db'
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

