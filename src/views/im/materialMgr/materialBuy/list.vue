<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>物品采购列表</span>
    </div>
    <div class="filter-container">
      <el-input v-model="search.bizNoS" placeholder="业务编号" class="filter-item" style="width: 200px;" />
      <el-input v-model="search.feeTypes" placeholder="费用类型" class="filter-item" style="width: 200px;" />
      <el-input v-model="search.applyTimes" placeholder="申请日期" class="filter-item" style="width: 200px;" />
      <el-button size="medium" type="primary" @click="onSearch">查询</el-button>
      <el-button size="medium" type="primary" @click="onReset">重置</el-button>
      <el-button size="medium" style="margin-left: 10px;" type="primary" @click="onShowAdd">发起流程</el-button>
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
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="applyUserId"
        label="申请人"
        width="100"
      />
      <el-table-column
        prop="applyDepId"
        label="申请部门"
        width="100"
      />
      <el-table-column
        prop="applyTime"
        label="申请日期"
        width="100"
      />
      <el-table-column
        prop="gmoTime"
        label="总办日期"
        width="100"
      />
      <el-table-column
        prop="totalAmt"
        label="总金额"
        width="100"
      />
      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="onShowUpdate(row)"> 编辑</el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="onDeleteOne(row,$index)"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页信息-->
    <pagination v-show="total>0" :total="total" :page.sync="queryPage.page" :limit.sync="queryPage.limit" @pagination="getMaterialBuyList" />
    <!--新增或编辑物品采购信息-->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="onList" />
  </el-card>

</template>

<script>
  import EditableCell from './components/EditableCell'
  import Pagination from '@/components/Pagination'
  import AddOrUpdate from './addOrUpdate'
  import { list,deleteOne } from '@/api/im/materialBuy'
  export default {
    name: "materialBuyList",
    components: { Pagination,AddOrUpdate,EditableCell },
    data(){
      return {
        search: {
          bizNoS: '',
          feeTypeS: '',
          applyTimeS: ''
        },
        editModeEnabled: true,
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
      onList() {
        this.listLoading = true
        this.queryPage.isPage = 'true'
        list(this.queryPage).then(response => {
          const res = response.data
          this.datas = res.data.list
          this.total = res.data.total
          this.listLoading = false
        })
      },
      onSearch() {
        this.queryPage.page = 1
        this.queryPage.bizNoS = this.search.bizNoS
        this.queryPage.feeTypeS = this.search.feeTypeS
        this.queryPage.applyTimeS = this.search.applyTimeS
        this.onList()
      },
      onReset() {
        this.search = {
          bizNoS: '',
          feeTypeS: '',
          applyTimeS: ''
        }
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
      }
    }
  }
</script>

<style scoped>
  .filter-container{
    margin-bottom: 10px;
  }
  .edit-cell {
    min-height: 35px;
    cursor: pointer;
  }
</style>
