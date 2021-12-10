<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>商品列表</span>
    </div>
    <div class="filter-container">
      <el-input v-model="search.productCodeS" placeholder="商品编号" class="filter-item" style="width: 200px;" />
      <el-input v-model="search.productNameS" placeholder="商品名称" class="filter-item" style="width: 200px;" />
      <el-button size="medium" type="primary" @click="onSearch">查询</el-button>
      <el-button size="medium" type="primary" @click="onReset">重置</el-button>
    </div>
    <div class="button-container">
      <el-radio-group v-model="actionType" @change="onChangeActionType">
        <el-radio-button label="">全部</el-radio-button>
        <el-radio-button label="20">销售中</el-radio-button>
        <el-radio-button label="50">已下架</el-radio-button>
        <el-radio-button label="10">草稿箱</el-radio-button>
      </el-radio-group>
      <el-button type="primary" @click="onShowPublish">发布商品</el-button>
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
        prop="productCode"
        label="商品编号"
        width="200"
      />
      <el-table-column
        prop="title"
        label="商品标题"
        width="120"
      />
      <el-table-column
        prop="priceScope"
        label="价格"
        width="80"
      />
      <el-table-column
        prop="amount"
        label="累计销量"
        width="120"
      />
      <el-table-column
        prop="inventory"
        label="库存数量"
        width="150"
      />
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="150"
      />
      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="onShowUpdate(row)"> 编辑</el-button>
          <el-button v-if="row.status==='20'" size="mini" type="danger" @click="offShelfOne(row,$index)">下架</el-button>
          <el-button v-if="row.status==='50'" size="mini" type="success" @click="shelfOne(row,$index)">上架</el-button>
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
import { list,offShelfOne,shelfOne} from '@/api/pm/product'
import Pagination from '@/components/Pagination'
import AddOrUpdate from "./addOrUpdate";

export default {
  name: 'List',
  components: { Pagination,AddOrUpdate },
  data() {
    return {
      search: {
        productCodeS: '',
        productNameS: ''
      },
      actionType:'20',
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
      this.queryPage.productCodeS = this.search.productCodeS
      this.queryPage.productNameS = this.search.productNameS
      this.onList()
    },
    onReset() {
      this.search = {
        productCodeS: '',
        productNameS: ''
      }
    },
    onList() {
      this.listLoading = true
      this.queryPage.status=this.actionType
      this.queryPage.isPage = 'true'
      list(this.queryPage).then(response => {
        const res=response.data
        this.datas = res.data.list
        this.total = res.data.total
        this.listLoading = false
      })
    },
    onChangeActionType(){
      this.onList()
    },
    onShowPublish() {
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
    offShelfOne(row, index) {
      offShelfOne({ seqId: row.productSeqId}).then(response => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.datas.splice(index, 1)
      })
    },
    shelfOne(row, index){
      shelfOne({ seqId: row.productSeqId}).then(response => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.onList()
      })
    }
  }
}
</script>

<style scoped>
  .filter-container{
    margin-bottom: 10px;
  }
  .button-container{
    margin-bottom: 1px;
  }
</style>
