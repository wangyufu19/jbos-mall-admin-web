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
        <span>访问统计</span>
      </div>
      <el-tabs v-model="statisticTag"  @tab-click="handleClick">
        <el-tab-pane label="区域分布" name="city">
          <el-radio v-model="echartType" label="pie">饼状图</el-radio>
          <el-radio v-model="echartType" label="bar">柱状图</el-radio>
          <pie-chart v-if="echartType=='pie'"/>
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
      statisticTag: 'city',
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

