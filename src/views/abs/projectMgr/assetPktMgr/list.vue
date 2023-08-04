<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>资产包列表</span>
    </div>
    <div class="filter-container">
      <el-input v-model="search.projectNoS" placeholder="项目名称" class="filter-item" style="width: 200px;" />

      <el-button size="medium" type="primary" @click="onSearch">查询</el-button>
      <el-button size="medium" type="primary" @click="onReset">重置</el-button>
    </div>
    <div class="filter-container">
      <el-button size="medium" style="margin-left: 10px;" type="primary" @click="onPacket">封包</el-button>
      <el-button size="medium" style="margin-left: 10px;" type="primary" @click="onUnPacket">解包</el-button>
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
        width="160"
      />
      <el-table-column
        prop="projectName"
        label="项目名称"
        width="120"
      />
      <el-table-column
        prop="totalAmt"
        label="封包金额"
        width="120"
      />
      <el-table-column
        prop="packetDate"
        label="封包日期"
        width="200"
      />
      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="view" @click="onShowView(row,$index)"> 查看资产 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页信息-->
    <pagination v-show="total>0" :total="total" :page.sync="queryPage.page" :limit.sync="queryPage.limit" @pagination="onList" />
    <Packet v-if="packetVisible" ref="packet" @refreshDataList="onList" />
  </el-card>
</template>

<script>
import { Message } from 'element-ui'
import {getToken} from "@/utils/global";
import Pagination from '@/components/Pagination'
import Packet from './packet.vue'

export default {
  name: 'List',
  components: { Pagination,Packet},
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
      packetVisible: false
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
    onPacket(row){
      const formObj = Object.assign({}, row)
      this.packetVisible = true
      this.$nextTick(() => {
        this.$refs['packet'].init(formObj, 'packet')
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
