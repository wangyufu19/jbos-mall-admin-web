<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="24" :xs="24">
          <my-work/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import myWork from './components/myWork'
export default {
  name: 'Dashboard',
  components: { myWork }
}
</script>

