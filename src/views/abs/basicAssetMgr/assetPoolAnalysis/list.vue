<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>资产池分析</span>
    </div>
    <div class="filter-container">
      <el-button size="medium" style="margin-left: 10px;" type="primary" @click="onAnalysis">分析</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="datas"
      border
      stripe
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        prop="projectNo"
        label="项目编号"
        width="120"
      />
      <el-table-column
        prop="projectName"
        label="项目名称"
        width="160"
      />
      <el-table-column
        prop="loanType"
        label="业务品种"
        width="120"
      />
      <el-table-column
        prop="loanSurplusAmt"
        label="贷款总金额"
        width="120"
      />
      <el-table-column
        prop="loanSurplusPerc"
        label="比例"
        width="120"
      />
      <el-table-column
        prop="projectAmt"
        label="项目所占金额"
        width="120"
      />
      <el-table-column
        prop="projectAmtPerc"
        label="比例"
        width="120"
      />
      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="view" @click="onShowView(row,$index)"> 查看资产 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页信息-->
    <pagination v-show="total>0" :total="total" :page.sync="queryPage.page" :limit.sync="queryPage.limit" @pagination="onList" />
    <Analysis v-if="analysisVisible" ref="analysis" @refreshDataList="onList" />
  </el-card>
</template>

<script>
import request from '@/utils/request'
import Pagination from '@/components/Pagination'
import Analysis from './analysis.vue'

export default {
  name: 'List',
  components: { Pagination,Analysis},
  data() {
    return {
      search: {
        projectNoS: ''
      },
      datas: [],
      listLoading: false,
      total: 0,
      queryPage: {
        page: 1,
        limit: 20
      },
      analysisVisible: false
    }
  },
  created() {
    this.onList()
  },
  methods: {
    onSearch() {
      this.queryPage.page = 1
      this.queryPage.projectNoS = this.search.projectNoS
      this.onList()
    },
    onReset() {
      this.search = {
        projectNoS: ''
      }
    },
    onList() {
      // this.listLoading = true
      // this.queryPage.isPage = 'true'
      // request({
      //   url: '/admin/basicAsset/getBasicAssetList',
      //   method: 'get',
      //   params: this.queryPage 
      // }).then(response => {
      //   const res=response.data
      //   this.datas = res.data.list
      //   this.total = res.data.total
      //   this.listLoading = false
      // })
    },
    onAnalysis(row){
      const formObj = Object.assign({}, row)
      this.analysisVisible = true
      this.$nextTick(() => {
        this.$refs['analysis'].init(formObj, 'analysis')
      })
    }
  }
}
</script>

<style scoped>
  .filter-container{
    margin-bottom: 10px;
  }
</style>
