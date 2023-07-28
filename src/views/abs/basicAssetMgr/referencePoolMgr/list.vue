<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>参照池管理</span>
    </div>
    <div class="filter-container">
      <el-button size="medium" style="margin-left: 10px;" type="primary" @click="onPacket">提取</el-button>
      <el-button size="medium" style="margin-left: 10px;" type="primary" @click="onUnPacket">美化</el-button>
      <el-button size="medium" style="margin-left: 10px;" type="primary" @click="onUnPacket">导出</el-button>
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
        prop="certId"
        label="身份证号"
        width="160"
      />
      <el-table-column
        prop="customNo"
        label="客户编号"
        width="120"
      />
      <el-table-column
        prop="name"
        label="借款人姓名"
        width="120"
      />
      <el-table-column
        prop="sex"
        label="性别"
        width="120"
      />
      <el-table-column
        prop="birthDate"
        label="出生年月"
        width="120"
      />
      <el-table-column
        prop="age"
        label="年龄"
        width="120"
      />
      <el-table-column
        prop="marriage"
        label="婚姻状况"
        width="120"
      />
      <el-table-column
        prop="monthIncome"
        label="月收入"
        width="120"
      />
      <el-table-column
        prop="prov"
        label="借款人所在省"
        width="120"
      />
      <el-table-column
        prop="city"
        label="贷款发放地区"
        width="120"
      />
      <el-table-column
        prop="vocation"
        label="职业"
        width="120"
      />
      <el-table-column
        prop="contractNo"
        label="贷款合同号"
        width="120"
      />
      <el-table-column
        prop="acctNo"
        label="贷款账号"
        width="120"
      />
      <el-table-column
        prop="productName"
        label="产品名称"
        width="120"
      />
      <el-table-column
        prop="grantLimit"
        label="授信额度"
        width="120"
      />
      <el-table-column
        prop="surplusLimit"
        label="剩余额度"
        width="120"
      />
      <el-table-column
        prop="loanGrantAmout"
        label="贷款金额"
        width="120"
      />
      <el-table-column
        prop="loanSurplusAmout"
        label="贷款余额"
        width="120"
      />
      <el-table-column
        prop="refundType"
        label="还款方式"
        width="120"
      />
      <el-table-column
        prop="refundFrequency"
        label="还款频率"
        width="120"
      />
      <el-table-column
        prop="initway"
        label="付息方式"
        width="120"
      />
      <el-table-column
        prop="loanGrantRate"
        label="发放利率"
        width="120"
      />
      <el-table-column
        prop="loanPeriod"
        label="贷款期限"
        width="120"
      />
      <el-table-column
        prop="loanGrantDate"
        label="贷款发放日"
        width="120"
      />
      <el-table-column
        prop="loanEndDate"
        label="贷款到期日"
        width="120"
      />
      <el-table-column
        prop="fiveClassify"
        label="五级分类"
        width="120"
      />
      <el-table-column
        prop="creditResult"
        label="信用评级"
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

  </el-card>
</template>

<script>
import { Message } from 'element-ui'
import {getToken} from "@/utils/global";
import Pagination from '@/components/Pagination'


export default {
  name: 'List',
  components: { Pagination},
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
      }
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
      // getProjectPacketList(this.queryPage).then(response => {
      //   const res=response.data
      //   this.datas = res.data.list
      //   this.total = res.data.total
      //   this.listLoading = false
      // })
    },
    onShowView(row){
      const formObj = Object.assign({}, row)
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs['addOrUpdate'].init(formObj, 'view')
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
