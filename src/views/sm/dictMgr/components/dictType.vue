<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>字典类型列表</span>
    </div>
    <div class="filter-container">
      <el-input v-model="search.typeIdS" placeholder="类型编号" class="filter-item" style="width: 200px;" />
    </div>
    <div class="filter-container">
      <el-input v-model="search.typeNameS" placeholder="类型名称" class="filter-item" style="width: 200px;" />
      <el-button size="medium" type="primary" @click="onSearch">查询</el-button>
      <el-button size="medium" type="primary" @click="onReset">重置</el-button>
    </div>
    <div class="filter-container">
      <el-button type="primary" @click="onShowAdd">新增</el-button>
      <el-button type="success" @click="onRefreshCache">刷新缓存</el-button>
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
        prop="typeId"
        label="类型编码"
        width="180"
      />
      <el-table-column
        prop="typeName"
        label="类型名称"
        width="130"
      />
      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="onShowUpdate(row)"> 编辑</el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="onDeleteOne(row,$index)"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--角色列表分页信息-->
    <pagination v-show="total>0" :total="total" :page.sync="queryPage.page" :limit.sync="queryPage.limit" @pagination="getDictTypeList" />
    <!--新增或编辑-->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDictTypeList" />
  </el-card>
</template>

<script>
import { getDictTypeList,deleteDictType,refresh } from '@/api/sm/dict'
import AddOrUpdate from "./addOrUpdate";

export default {
  name: 'DictType',
  components: {AddOrUpdate },
  data() {
    return {
      search: {
        typeIdS: '',
        typeNameS: ''
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
    this.getDictTypeList()
  },
  methods: {
    getDictTypeList() {
      this.listLoading = true
      getDictTypeList(this.search).then(response => {
        const res=response.data
        this.datas = res.data
        this.listLoading = false
      })
    },
    onSearch() {
        this.getDictTypeList()
      },
    onReset() {
      this.search = {
        bizNoS: '',
        bizTypeS: ''
      }
      this.onSearch()
    },
    onShowAdd() {
      this.addOrUpdateVisible = true
      const formObj = Object()
      this.$nextTick(() => {
        this.$refs['addOrUpdate'].init(formObj, 'create')
      })
    },
    onRefreshCache(){
      refresh({}).then(response => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
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
      deleteDictType({ typeId: row.typeId}).then(response => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.datas.splice(index, 1)
      })
    },
    onRowClick(row) {
      this.$emit('getTypeId', row.typeId)
    }
  }
}
</script>

<style scoped>
  .filter-container{
    margin-bottom: 10px;
  }
</style>
