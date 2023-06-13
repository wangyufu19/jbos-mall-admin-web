<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>流程部署列表</span>
    </div>
    <div class="filter-container">
      <el-input v-model="search.procKeyS" placeholder="流程编码" class="filter-item" style="width: 200px;" />
      <el-input v-model="search.procNameS" placeholder="流程名称" class="filter-item" style="width: 200px;" />
      <el-button size="medium" type="primary" @click="onSearch">查询</el-button>
      <el-button size="medium" type="primary" @click="onReset">重置</el-button>
    </div>
    <div class="filter-container">
      <el-upload      
        style="margin-top:10px;" 
        :action="upload.actionUrl"
        :headers="upload.headers"
        :show-file-list="false"
        :data="upload.data"
        :before-upload="onBeforeUpoad"
        :on-success="onUploadSuccess"
        :on-error="onUploadError">
        <el-button size="medium" type="primary">部署</el-button>
      </el-upload>
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
        prop="procKey"
        label="流程编码"
        width="200"
      />
      <el-table-column
        prop="procName"
        label="流程名称"
        width="200"
      />
      <el-table-column
        prop="version"
        label="版本"
        width="120"
      />
      <el-table-column
        prop="resource"
        label="部署资源"
        width="200"
      />
      <el-table-column
        prop="deployTime"
        label="部署时间"
        width="160"
      />
      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="onProcessView(row)">流程预览</el-button>
          <el-button type="danger" size="mini" @click="onUnDeploy(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页信息-->
    <pagination v-show="total>0" :total="total" :page.sync="queryPage.page" :limit.sync="queryPage.limit" @pagination="onList" />
    <ProcessViewer ref="processViewer"/>
  </el-card>
</template>

<script>
import {getToken} from "@/utils/global";
import { getProcessDeploymentList,deploy,unDeploy} from '@/api/wf/deployment'
import Pagination from '@/components/Pagination'
import ProcessViewer from './processViewer.vue'

export default {
  name: 'List',
  components: { Pagination,ProcessViewer},
  data() {
    return {
      search: {
        procKeyS: '',
        procNameS: ''
      },
      datas: [],
      upload:{
        actionUrl:process.env.VUE_APP_BASE_API+'/admin/workflow/deployment/deploy',
        headers:{'accessToken':getToken()},
        data:{}
      },
      listLoading: true,
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
      this.queryPage.procKeyS = this.search.procKeyS
      this.queryPage.procNameS = this.search.procNameS
      this.onList()
    },
    onReset() {
      this.search = {
        procKeyS: '',
        procNameS: ''
      }
    },
    onList() {
      this.listLoading = true
      this.queryPage.isPage = 'true'
      getProcessDeploymentList(this.queryPage).then(response => {
        const res=response.data
        this.datas = res.data.list
        this.total = res.data.total
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
        this.onList()
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
    onProcessView(row){
      this.$nextTick(() => {
        this.$refs['processViewer'].init(row.id,row.procName )
      })
    },
    onUnDeploy(row) {
      unDeploy({ id: row.id}).then(response => {
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
</style>
