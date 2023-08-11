<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>基础资产池</span>
    </div>
    <div class="filter-container">
      <el-input v-model="search.acctNoS" placeholder="贷款账号" class="filter-item" style="width: 200px;" />

      <el-button size="medium" type="primary" @click="onSearch">查询</el-button>
      <el-button size="medium" type="primary" @click="onReset">重置</el-button>
    </div>
    <div class="filter-container">
      <el-button size="medium" style="margin-left: 10px;" type="primary" @click="onInPool">入池</el-button>

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
        prop="acctNo"
        label="贷款账号"
        width="160"
      />
      <el-table-column
        prop="customName"
        label="客户名称"
        width="120"
      />
      <el-table-column
        prop="sex"
        label="性别"
        width="60"
      />
      <el-table-column
        prop="certId"
        label="身份证号码"
        width="200"
      />
      <el-table-column
        prop="monthIncome"
        label="月收入"
        width="80"
      />
      <el-table-column
        prop="grantLimit"
        label="授信额度"
        width="100"
      />
      <el-table-column
        prop="surplusLimit"
        label="剩余额度"
        width="100"
      />
      <el-table-column
        prop="loanSurplusAmt"
        label="贷款余额"
        width="100"
      />
      <el-table-column
        prop="loanSdate"
        label="贷款放款日"
        width="100"
      />
      <el-table-column
        prop="loanEdate"
        label="贷款到期日"
        width="100"
      />
      <el-table-column
        prop="loanRate"
        label="贷款利率"
        width="100"
      />
      <el-table-column
        prop="refundType"
        label="还款方式"
        width="100"
      />
      <el-table-column
        prop="payIrtType"
        label="付息方式"
        width="100"
      />
      <el-table-column
        prop="creditRate"
        label="信用评级"
        width="80"
      />
      <el-table-column
        prop="fiveClassify"
        label="五级分类"
        width="80"
      />
      <el-table-column
        prop="loanType"
        label="业务品种"
        width="80"
      />
      <el-table-column label="操作" align="center" width="160">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="onOutPool(row,$index)"> 出池 </el-button>
          <el-button size="mini" type="view" @click="onShowView(row,$index)"> 查看 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页信息-->
    <pagination v-show="total>0" :total="total" :page.sync="queryPage.page" :limit.sync="queryPage.limit" @pagination="onList" />
    <InPool v-if="inPoolVisible" ref="inPool" @refreshDataList="onList" />
  </el-card>
</template>

<script>
import request from '@/utils/request'
import Pagination from '@/components/Pagination'
import InPool from './inPool.vue'

export default {
  name: 'List',
  components: { Pagination,InPool},
  data() {
    return {
      search: {
        acctNoS: ''
      },
      datas: [],
      listLoading: false,
      total: 0,
      queryPage: {
        page: 1,
        limit: 20
      },
      inPoolVisible: false
    }
  },
  created() {
    this.onList()
  },
  methods: {
    onSearch() {
      this.queryPage.page = 1
      this.queryPage.acctNoS = this.search.acctNoS
      this.onList()
    },
    onReset() {
      this.search = {
        acctNoS: ''
      }
    },
    onList() {
      this.listLoading = true
      this.queryPage.isPage = 'true'
      request({
        url: '/admin/basicAsset/getBasicAssetList',
        method: 'get',
        params: this.queryPage 
      }).then(response => {
        const res=response.data
        this.datas = res.data.list
        this.total = res.data.total
        this.listLoading = false
      })
    },
    onInPool(row){
      const formObj = Object.assign({}, row)
      this.inPoolVisible = true
      this.$nextTick(() => {
        this.$refs['inPool'].init(formObj, 'inPool')
      })
    },
    onOutPool(row, index) {
      request({
        url: '/admin/basicAsset/outPool',
        method: 'post',
        data: { id: row.id, acctNo: row.acctNo }
      }).then(response => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.datas.splice(index, 1)
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
