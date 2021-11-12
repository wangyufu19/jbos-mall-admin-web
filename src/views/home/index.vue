<template>
  <div class="app-container">
    <el-card  class="box-card">
      <el-tabs v-model="activeName"  @tab-click="handleClick" stretch>
        <el-tab-pane  label="登录" name="login">
          <login ref="login" v-if="activeName=='login'"/>
        </el-tab-pane>
        <el-tab-pane  label="注册" name="registry">
          <registry ref="registry" v-if="activeName=='registry'"/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { login,registry } from './components'
export default {
  name: 'HomeMgr',
  components: {
    login,
    registry
  },
  data() {
    return {
      activeName: 'login'
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
  }
}
</script>

<style lang="scss" scoped>
  #app{
    position:relative;
    .box-card{
      position: absolute;
      top: 100px;
      left: 400px;
      right:400px;
      bottom: 100px;

    }
  }
</style>
