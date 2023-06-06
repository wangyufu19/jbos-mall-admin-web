<template>
  <el-card style="margin-bottom:20px;">
    <div class="filter-container">
      <el-input v-model="search.bizNoS" placeholder="业务编号" class="filter-item" style="width: 200px;" />
      <el-select
        v-model="search.bizTypeS"
        clearable
        :loading="loading"
        placeholder="业务类型">
        <el-option
            v-for="item in bizTypeItems"
            :key="item.DICTID"
            :label="item.DICTNAME"
            :value="item.DICTID"
        />
      </el-select>
      <el-button size="medium" type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
      <el-button size="medium" type="primary" @click="onReset">重置</el-button>
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
          <el-button v-if="getWorkType==='waiting' && row.taskState==='处理中'" type="primary" size="mini" @click="onTrans(row)">办理</el-button>
          <el-button v-if="getWorkType==='processed'" type="primary" size="mini" @click="onTrans(row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="queryPage.page" :limit.sync="queryPage.limit" @pagination="getMyWorkList" />
  </el-card>
</template>

<script>
  import Layout from '@/layout'
  import { getUserId } from '@/utils/auth'
  import Pagination from '@/components/Pagination'
  import { getCacheDictCodeList } from '@/api/dict'
  import { getMyWorkList } from '@/api/dashboard'

  const loadView = (view) => { // 路由懒加载
    return resolve => require([`@/views/${view}`], resolve)
  }
  export default {
    name: "myWork",
    props: ['getWorkType'],
    components: { Pagination, getMyWorkList },
    data(){
      return {
        search: {
          bizNoS: '',
          bizTypeS: ''
        },
        datas: [],
        bizTypeItems: [],
        listLoading: true,
        loading: false,
        total: 0,
        queryPage: {
          pageNum: 1,
          pageSize: 10
        }
      }
    },
    created() {
      this.initBizType()
      this.getMyWorkList()
    },
    methods: {
      initBizType(){
        this.loading = true
        getCacheDictCodeList({typeId: 'JBOS_PROC_BIZTYPE'}).then(response => {
          const res = response.data
          this.bizTypeItems = res.data
          this.loading = false
        })
      },
      getMyWorkList() {
        this.listLoading = true
        this.queryPage.workType=this.getWorkType
        this.queryPage.userId=getUserId()
        this.queryPage.isPage = 'true'
        getMyWorkList(this.queryPage).then(response => {
          const res = response.data
          this.datas = res.data.list
          this.total = res.data.total
          this.listLoading = false
        })
      },
      onSearch() {
        this.queryPage.page = 1
        this.queryPage.bizNoS = this.search.bizNoS
        this.queryPage.bizTypeS = this.search.bizTypeS
        this.getMyWorkList()
      },
      onReset() {
        this.search = {
          bizNoS: '',
          bizTypeS: ''
        }
        this.onSearch()
      },
      onTrans(row){
        const formObj = Object.assign({}, row)
        var title='我的待办-'+row.bizType
        if(this.getWorkType==='processed'){
          title='我的已办-'+row.bizType
        }
        const myWorkRoute = [
          {
            path: '/user', component: Layout, redirect: '/myWork',
            children: [
              {
                path: 'myWork',
                component: loadView(row.routeUrl),
                name: 'myWork',
                meta: { title: title, icon: 'user', noCache: true }
              }
            ]
          }
        ]
        this.$router.addRoutes(myWorkRoute)

        this.$router.push({ 
          name: 'myWork',
          params: { 
            workType:this.getWorkType,
            bizId:row.bizId,
            procInstId:row.procInstId,
            taskId:row.taskId,
            taskDefKey:row.taskDefKey,
            taskName:row.taskName,
            taskState:row.taskState 
          } 
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .filter-container{
    margin-bottom: 10px;
  }

</style>
