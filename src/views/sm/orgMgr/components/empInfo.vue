<template>
  <div>
    <div class="filter-container">
      <el-input v-model="search.badgeS" placeholder="工号" class="filter-item" style="width: 200px;" />
      <el-input v-model="search.empNameS" placeholder="姓名" class="filter-item" style="width: 200px;" />
      <el-button size="medium" type="primary" @click="onSearch">查询</el-button>
      <el-button size="medium" type="primary" @click="onReset">重置</el-button>     
    </div>
    <div class="filter-container">
      <el-button size="medium" type="primary" @click="onShowAdd">新增</el-button>
      <el-button size="medium" type="primary" :loading="downloadLoading" @click="onExport">导出</el-button>
      <el-upload      
        style="margin-top: -36px;margin-left: 168px;" 
        :action="upload.actionUrl"
        :headers="upload.headers"
        :show-file-list="false"
        :data="upload.data"
        :before-upload="onBeforeUpoad"
        :on-success="onUploadSuccess"
        :on-error="onUploadError">
        <el-button size="medium" type="primary">导入</el-button>
      </el-upload>
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
        prop="badge"
        label="工号"
        width="100"
      />
      <el-table-column
        prop="empName"
        label="姓名"
        width="160"
      />
      <el-table-column
        prop="orgName"
        label="所属机构"
        width="140"
      />
      <el-table-column
        prop="depName"
        label="所属部门"
        width="140"
      />
      <el-table-column
        prop="headShipName"
        label="职务"
        width="100"
      />
      <el-table-column label="操作" align="center" width="300" fixed="right">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="onShowUpdate(row)"> 编辑</el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="onDeleteOne(row,$index)"> 删除 </el-button>
          <el-button size="mini"  @click="onSynchToCamunda(row,$index)"> 同步CAMUNDA </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--员工列表分页信息-->
    <pagination v-show="total>0" :total="total" :page.sync="queryPage.page" :limit.sync="queryPage.limit" @pagination="getEmpList" />
    <!--新增或编辑人员信息-->
    <add-or-edit-emp v-if="addOrUpdateVisible" ref="addOrEditEmp" @refreshDataList="getEmpList" />
  </div>
</template>
<script>
import request from '@/utils/request'
import {exportExcel } from '@/utils/export'
import {getToken} from "@/utils/global";
import {Message } from 'element-ui'
import Pagination from '@/components/Pagination'
import {getEmpList, deleteEmp ,synchToCamunda, exportEmp} from '@/api/sm/emp'
import AddOrEditEmp from './addOrEditEmp'

export default {
  components: { Pagination, AddOrEditEmp },
  props: ['getOrgId', 'getOrgName'],
  data() {
    return {
      search: {
        badgeS: '',
        empNameS: ''
      },
      datas: [],
      listLoading: true,
      downloadLoading: false,
      upload:{
        actionUrl:process.env.VUE_APP_BASE_API+'/admin/io/upload',
        headers:{'accessToken':getToken()},
        data:{}
      },
      total: 0,
      queryPage: {
        page: 1,
        limit: 20
      },
      addOrUpdateVisible: false
    }
  },
  watch: {
    getOrgId(val) {
      this.getEmpList()
    }
  },
  created() {
    this.getEmpList()
  },
  methods: {
    getEmpList() {
      this.listLoading = true
      this.queryPage.isPage = 'true'
      this.queryPage.orgId = this.getOrgId
      getEmpList(this.queryPage).then(response => {
        const res = response.data
        this.datas = res.data.list
        this.total = res.data.total
        this.listLoading = false
      })
    },
    onSearch() {
      this.queryPage.page = 1
      this.queryPage.badgeS = this.search.badgeS
      this.queryPage.empNameS = this.search.empNameS
      this.getEmpList()
    },
    onReset() {
      this.search = {
        badgeS: '',
        empNameS: ''
      }
    },
    onShowAdd() {
      this.addOrUpdateVisible = true
      const formObj = Object()
      formObj.orgId = this.getOrgId
      formObj.orgName = this.getOrgName
      this.$nextTick(() => {
        this.$refs['addOrEditEmp'].init(formObj, 'create')
      })
    },
    onExport(){
      this.listLoading = true
      request({
        url: '/admin/emp/export',
        method: 'post',
        data:{},
        responseType: "blob"
      }).then(response => {
        if(response.data instanceof Blob){
          exportExcel(response.data,'application/vnd.ms-excel','员工信息表.xlsx');
        }     
        this.listLoading = false
      })
    },
    onBeforeUpoad(file){
      console.log(file)
    },
    onUploadSuccess(response,file, fileList){
      if(response.retCode !==undefined&&response.retCode==='0000'){
        this.$message({
            message: '操作成功',
            type: 'success'
        })
      }else{
        Message({
          message: response.retMsg || 'Error',
          type: 'error',
          duration: 3 * 1000
        })
      }
    },
    onUploadError(response,file, fileList){
      Message({
        message: '服务器响应异常，请联系管理员!',
        type: 'error',
        duration: 3 * 1000
      })
    },
    onShowUpdate(row) {
      const formObj = Object.assign({}, row)
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs['addOrEditEmp'].init(formObj, 'update')
      })
    },
    onDeleteOne(row, index) {
      deleteEmp({ id: row.id, badge: row.badge }).then(response => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.datas.splice(index, 1)
      })
    },
    onSynchToCamunda(row, index){
      synchToCamunda({ userId: row.badge,userName:row.empName }).then(response => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter-container{
    margin-bottom: 10px;
  }

</style>

