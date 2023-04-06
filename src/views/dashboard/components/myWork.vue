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
        width="200"
      />
      <el-table-column
        prop="bizType"
        label="业务类型"
        width="100"
      />
      <el-table-column
        prop="taskName"
        label="任务名称"
        width="100"
      />
      <el-table-column
        prop="startTime"
        label="时间"
        width="180"
      />
      <el-table-column
        prop="taskState"
        label="状态"
        width="100"
      />
      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.taskState==='处理中'" type="primary" size="mini" @click="onTrans(row)">办理</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  import Layout from '@/layout'
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
      },
      onTrans(row){
        const formObj = Object.assign({}, row)
        const myWorkRoute = [
          {
            path: '/user', component: Layout, redirect: '/myWork',

            children: [
              {
                path: 'myWork',
                component: () => import('@/views/im/materialMgr/materialBuy/transOrUpdate'),
                name: 'myWork',
                meta: { title: '我的待办', icon: 'user', noCache: true }
              }
            ]
          }
        ]
        this.$router.addRoutes(myWorkRoute)
        this.$router.push({ 
          name: 'myWork',
          params: { bizId:row.bizId,procInstId:row.procInstId,taskState:row.taskState } 
        })
      }
    }
  }
</script>

<style scoped>

</style>
