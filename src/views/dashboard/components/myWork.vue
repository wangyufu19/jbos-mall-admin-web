<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>我的待办</span>
    </div>
    <el-table
      v-loading="listLoading"
      :data="datas"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        prop="bizNo"
        label="业务编号"
        width="180"
      />
    </el-table>
  </el-card>
</template>

<script>
  import { getUserId } from '@/utils/auth'
  import Pagination from '@/components/Pagination'
  import { getMyWorkList } from '@/api/dashboard'
  export default {
    name: "myWork",
    components: { Pagination, getMyWorkList },
    data(){
      return {
        datas: [],
        listLoading: true,
        total: 0,
        queryPage: {
          pageNum: 1,
          pageSize: 5
        }
      }
    },
    created() {
      this.getMyWorkList()
    },
    methods: {
      getMyWorkList() {
        this.listLoading = true
        this.queryPage.userId=getUserId()
        this.queryPage.isPage = 'true'
        getMyWorkList(this.queryPage).then(response => {
          const res = response.data
          this.datas = res.data.list
          this.total = res.data.total
          this.listLoading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
