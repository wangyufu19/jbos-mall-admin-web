<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>项目流程配置列表</span>
    </div>
    <div class="filter-container">
      <el-select
        v-model="search.yearS"
        clearable
        :loading="loading"
        placeholder="项目年度">
        <el-option
            v-for="item in feeTypeItems"
            :key="item.DICTID"
            :label="item.DICTNAME"
            :value="item.DICTID"
        />
      </el-select>
      <el-input v-model="search.projectNameS" placeholder="项目名称" class="filter-item" style="width: 200px;" />

      <el-button size="medium" type="primary" @click="onSearch">查询</el-button>
      <el-button size="medium" type="primary" @click="onReset">重置</el-button>
    </div>
    <div class="filter-container">
      <el-button size="medium" style="margin-left: 10px;" type="primary" @click="onShowAdd">配置</el-button>
 
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
        prop="projectAmt"
        label="项目金额"
        width="120"
      />
      <el-table-column
        prop="projectMaxAmt"
        label="最高限额"
        width="120"
      />
      <el-table-column
        prop="projectType"
        label="项目类型"
        width="120"
      />
      <el-table-column
        prop="assetType"
        label="资产类型"
        width="120"
      />
      <el-table-column
        prop="status"
        label="项目状态"
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
    <!--新增或编辑-->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="onList" />
  </el-card>
</template>

<script>

import { getProjectPacketList,packet,unPacket} from '@/api/abs/assetPoolMgr'
import Pagination from '@/components/Pagination'
import AddOrUpdate from './addOrUpdate'

export default {
  name: 'List',
  components: { Pagination,AddOrUpdate},
  data() {
    return {
      search: {
        projectNameS: ''
      },
      datas: [],
      listLoading: false,
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
      this.queryPage.projectNameS = this.search.projectNameS
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
    onShowAdd() {
      this.addOrUpdateVisible = true
      const formObj = Object()
      this.$nextTick(() => {
        this.$refs['addOrUpdate'].init(formObj, 'create')
      })
    },
    onShowUpdate(row) {
      const formObj = Object.assign({}, row)
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs['addOrUpdate'].init(formObj, 'update')
      })
    },
    onDeleteOne(row, index) {
      deleteOne({ id: row.id, bizNo: row.bizNo }).then(response => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.datas.splice(index, 1)
      })
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
