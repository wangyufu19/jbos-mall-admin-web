<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>会员列表</span>
    </div>
    <div class="filter-container">
      <el-input v-model="search.fullNameS" placeholder="会员名称" class="filter-item" style="width: 200px;" />
      <el-button size="medium" type="primary" @click="onSearch">查询</el-button>
      <el-button size="medium" type="primary" @click="onReset">重置</el-button>
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
        prop="fullName"
        label="会员名称"
        width="120"
      />
      <el-table-column
        prop="nickName"
        label="昵称"
        width="120"
      />
      <el-table-column
        prop="sex"
        label="性别"
        width="80"
        :formatter="onFormatter"
      />
      <el-table-column
        prop="mobilePhone"
        label="手机号码"
        width="120"
      />
      <el-table-column
        prop="email"
        label="邮箱"
        width="150"
      />
      <el-table-column
        prop="grade"
        label="等级"
        width="80"
        :formatter="onFormatter"
      />
      <el-table-column
        prop="integral"
        label="积分"
        width="80"
      />
      <el-table-column
        prop="registryTime"
        label="注册时间"
        width="150"
      />
      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="onLock(row)"> 锁定</el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="onUnLock(row,$index)">解锁</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页信息-->
    <pagination v-show="total>0" :total="total" :page.sync="queryPage.page" :limit.sync="queryPage.limit" @pagination="getMemberList" />
  </el-card>
</template>

<script>
import { list } from '@/api/mm/member'
export default {
  name: 'List',
  data() {
    return {
      search: {
        fullNameS: ''
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
    this.getMemberList()
  },
  methods: {
    onReset() {
      this.search = {
        fullNameS: ''
      }
    },
    getMemberList() {
      this.listLoading = true
      list(this.search).then(response => {
        const res=response.data
        this.datas = res.data
        this.listLoading = false
      })
    },
    onFormatter(row,column){
      if(column.property==='sex'){
        if(row.sex===1){
          return '男'
        }else if(row.sex===2) {
          return '女'
        }
      }else if(column.property==='grade'){
        return '普通会员'
      }
    },
  }
}
</script>

<style scoped>
  .filter-container{
    margin-bottom: 10px;
  }
</style>
