<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="14" :xs="24">
    <el-card>
      <div slot="header" class="clearfix">
        <span>我的工作</span>
      </div>
      <el-tabs v-model="activeName"  @tab-click="handleClick">
        <el-tab-pane  label="我的待办" name="waiting">
          <my-work ref="waiting" v-if="activeName=='waiting'" :getWorkType="activeName"/>
        </el-tab-pane>
        <el-tab-pane  label="我的已办" name="processed">
          <my-work ref="processed" v-if="activeName=='processed'" :getWorkType="activeName"/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    </el-col>
    <el-col :span="10" :xs="24">
    <el-card>
      <div slot="header" class="clearfix">
        <span>访问统计信息</span>
      </div>
      <el-tabs v-model="echartType"  @tab-click="handleClick">
        <el-tab-pane  label="饼状图" name="pie">
          <pie-chart v-if="echartType=='pie'"/>
        </el-tab-pane>
        <el-tab-pane  label="柱状图" name="bar">
          <bar-chart v-if="echartType=='bar'"/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
</el-col>
    </el-row>
  </div>
</template>



<script>
import myWork from './components/myWork'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'

export default {
  name: 'Dashboard',
  components: { myWork,PieChart,BarChart },
  data() {
    return {
      activeName: 'waiting',
      echartType: 'pie'
    }
  },
  watch: {
    activeName(val) {
      this.activeName = val
    },
    echartType(val) {
      this.echartType = val
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

