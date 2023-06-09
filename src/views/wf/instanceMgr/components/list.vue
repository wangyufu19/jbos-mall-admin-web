<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>流程实例列表</span>
    </div>
    <div class="filter-container">
      <el-input v-model="search.bizNoS" placeholder="业务编号" class="filter-item" style="width: 200px;" />
      <el-input v-model="search.bizTypeS" placeholder="业务类型" class="filter-item" style="width: 200px;" />
      <el-button size="medium" type="primary" @click="onSearch">查询</el-button>
      <el-button size="medium" type="primary" @click="onReset">重置</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="datas"
      border
      stripe
      fit
      highlight-current-row
      style="width: 100%"
      @row-click="onRowClick"
    >
      <el-table-column
        prop="procInstId"
        label="实例ID"
        width="280"
      />
      <el-table-column
        prop="bizNo"
        label="业务编号"
        width="200"
      />
      <el-table-column
        prop="bizType"
        label="业务类型"
        width="120"
      />
      <el-table-column
        prop="startTime"
        label="开始时间"
        width="160"
      />
      <el-table-column
        prop="endTime"
        label="结束时间"
        width="160"
      />
      <el-table-column
        prop="procState"
        label="状态"
        width="120"
        :formatter="onFormatter"
      />
      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button size="mini" @click="onViewProcessTask(row)">查看任务</el-button>
          <el-button v-if="row.procState==='20'" type="warning" size="mini" @click="onSuspend(row)">暂停</el-button>
          <el-button v-if="row.procState==='99'" type="success" size="mini"  @click="onActivate(row,$index)">激活</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页信息-->
    <pagination v-show="total>0" :total="total" :page.sync="queryPage.page" :limit.sync="queryPage.limit" @pagination="getMemberList" />
   
  </el-card>
</template>

<script>
import { getProcessInstanceList,suspendProcessInstance,activateProcessInstance} from '@/api/wf/instance'
import Pagination from '@/components/Pagination'
import { task } from './task.vue'

export default {
  name: 'List',
  components: { Pagination,task },
  data() {
    return {
      search: {
        bizNoS: '',
        bizTypeS: ''
      },
      datas: [],
      listLoading: true,
      total: 0,
      queryPage: {
        page: 1,
        limit: 20
      },
      addOrUpdateVisible: false
    }
  },
  created() {
    this.onList()
  },
  methods: {
    onSearch() {
      this.queryPage.page = 1
      this.queryPage.bizNoS = this.search.bizNoS
      this.queryPage.bizTypeS = this.search.bizTypeS
      this.onList()
    },
    onReset() {
      this.search = {
        bizNoS: '',
        bizTypeS: ''
      }
    },
    onList() {
      this.listLoading = true
      this.queryPage.isPage = 'true'
      getProcessInstanceList(this.queryPage).then(response => {
        const res=response.data
        this.datas = res.data.list
        this.total = res.data.total
        this.listLoading = false
      })
    },
    onFormatter(row,column){
      if(column.property==='procState'){        
        if(row.procState==='20'){
          return '运行中'
        }else if(row.procState==='90') {
          return '已结束'
        }else if(row.procState==='99') {
          return '已暂停'
        }
      }
    },
    onSuspend(row) {
      suspendProcessInstance({ processInstanceId: row.procInstId }).then(response => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.onList()
      })
    },
    onActivate(row, index) {
      activateProcessInstance({ processInstanceId: row.procInstId }).then(response => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.onList()
      })
    },
  }
}
</script>

<style scoped>
  .filter-container{
    margin-bottom: 10px;
  }
</style>
