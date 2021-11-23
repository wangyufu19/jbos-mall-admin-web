<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <list/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { list } from './components'
export default {
  name: 'productMgr',
  components: {
    list
  }
}
</script>

<style scoped>

</style>
