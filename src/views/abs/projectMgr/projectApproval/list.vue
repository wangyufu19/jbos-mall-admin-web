<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>项目列表</span>
    </div>
    <div class="filter-container">
      <el-input v-model="search.projectNameS" placeholder="项目名称" class="filter-item" style="width: 200px;" />

      <el-button size="medium" type="primary" @click="onSearch">查询</el-button>
      <el-button size="medium" type="primary" @click="onReset">重置</el-button>
    </div>
    <div class="filter-container">
      <el-button size="medium" style="margin-left: 10px;" type="primary" @click="onShowAdd">立项登记</el-button>
 
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
      >
      </el-table-column>
      <el-table-column
        prop="projectName"
        label="项目名称"
        width="200"
      >
      <template slot-scope="{row,$index}">
        <el-link v-if="row.projectSte==='10'" type="primary" @click="onShowUpdate(row)">{{row.projectName}}</el-link>
        <div v-else="row.projectSte==='10'">{{row.projectName}}</div>
      </template>
      </el-table-column>
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
        :formatter="onFormatter"
      >
      <template slot-scope="scope">
			<el-select v-model="scope.row.projectType"  placeholder="请选择" filterable allow-create>
				<el-option v-for="item in projectTypeItems " :key="item.DICTID" :label="item.DICTNAME" :value="item.DICTID">
				</el-option>
			</el-select>
		  </template>

      </el-table-column>
      <el-table-column
        prop="assetType"
        label="资产类型"
        width="120"
        :formatter="onFormatter"
      />
      <el-table-column
        prop="projectSte"
        label="项目状态"
        width="120"
        :formatter="onFormatter"
      />
      <el-table-column
        prop="createTime"
        label="登记日期"
        width="120"
      />
      <el-table-column label="操作" align="center" width="200" fixed="right">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.projectSte==='10'" size="mini" type="danger" @click="onDeleteOne(row,$index)"> 删除 </el-button>
          <el-button size="mini" type="primary" @click="onShowView(row,$index)"> 归档 </el-button>
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
import request from '@/utils/request'
import Pagination from '@/components/Pagination'
import AddOrUpdate from './addOrUpdate'
import { getCacheDictCodeList } from '@/api/sm/dict'

export default {
  name: 'List',
  components: { Pagination,AddOrUpdate},
  data() {
    return {
      search: {
        yearItems:[],
        yearS:'',
        projectNameS: ''
      },
      datas: [],
      projectTypeItems: [],
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
    this.initBusinessDict('ABS_PROJECTTYPE')
    this.onList()
  },
  methods: {
    onSearch() {
      this.queryPage.page = 1
      this.queryPage.yearS = this.search.yearS
      this.queryPage.projectNameS = this.search.projectNameS
      this.onList()
    },
    onReset() {
      this.search = {
        projectNoS: ''
      }
    },
    initBusinessDict(typeId){
      this.loading = true
      getCacheDictCodeList({typeId: typeId}).then(response => {
        const res = response.data
        if(typeId==='ABS_PROJECTTYPE'){
          this.projectTypeItems = res.data
        }
        this.loading = false
      })
    },
    onList() {
      this.listLoading = true
      this.queryPage.isPage = 'true'
      request({
        url: '/admin/projectApproval/getProjectList',
        method: 'get',
        params: this.queryPage 
      }).then(response => {
        const res=response.data
        this.datas = res.data.list
        this.total = res.data.total
        this.listLoading = false
      })
    },
    onFormatter(row,column){
      if(column.property==='projectType'){
        if(row.projectType==='10'){
          return '公募'
        }else if(row.projectType==='20') {
          return '私募'
        }
      }else if(column.property==='assetType'){
        if(row.assetType==='10'){
          return '消费信贷'
        }else if(row.assetType==='20') {
          return '企业信贷'
        }
      }else if(column.property==='projectSte'){
        if(row.projectSte==='10'){
          return '草稿中'
        }else if(row.projectSte==='20') {
          return '已立项'
        }
      }

    },
    onShowAdd() {
      this.addOrUpdateVisible = true
      const rowObj = Object()
      this.$nextTick(() => {
        this.$refs['addOrUpdate'].init(rowObj, 'create')
      })
    },
    onShowUpdate(row) {
      const rowObj = Object.assign({}, row)
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs['addOrUpdate'].init(rowObj, 'update')
      })
    },
    onDeleteOne(row, index) {
      request({
        url: '/admin/projectApproval/deleteRegistrationInfo',
        method: 'post',
        data: { id: row.id, projectNo: row.projectNo }
      }).then(response => {
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
