<template>
    <el-card>
      <div slot="header" class="clearfix">
        <span>物品库存列表</span>
      </div>
      <div class="filter-container">
        <el-input v-model="search.materialNameS" placeholder="物品名称" class="filter-item" style="width: 200px;" />
        
        <el-date-picker
            v-model="search.inTimeS"
            type="daterange"
            range-separator="至"
            start-placeholder="入库开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
        </el-date-picker>
  
        <el-button size="medium" type="primary" @click="onSearch">查询</el-button>
        <el-button size="medium" type="primary" @click="onReset">重置</el-button>
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
          prop="batchNo"
          label="批次号"
          width="160"
        >
        </el-table-column>
        <el-table-column
          prop="materialName"
          label="物品名称"
          width="180"
        />
        <el-table-column
          prop="amount"
          label="数量"
          width="100"
        />
        <el-table-column
          prop="surplusAmt"
          label="剩余数量"
          width="100"
        />
        <el-table-column
          prop="price"
          label="单价"
          width="100"
        />
        <el-table-column
          prop="inTime"
          label="入库时间"
        />

      </el-table>
      <!--分页信息-->
      <pagination v-show="total>0" :total="total" :page.sync="queryPage.page" :limit.sync="queryPage.limit" @pagination="onList" />

    </el-card>
  
  </template>
  
  <script>
    import Pagination from '@/components/Pagination'
    import { getUserId } from '@/utils/global'
    import { list } from '@/api/im/materialStore'

    export default {
      name: "materialStoreList",
      components: { Pagination},
      data(){
        return {
          search: {
            materialNameS: '',
            inTimeS: ''
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
        this.onList()
      },
      methods: {
        onList() {
          this.listLoading = true
          this.queryPage.userId=getUserId()
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
          this.queryPage.materialNameS = this.search.materialNameS
          this.queryPage.sdateS = this.search.inTimeS[0]
          this.queryPage.edateS = this.search.inTimeS[1]
          this.onList()
        },
        onReset() {
          this.search = {
            materialNameS: '',
            inTimeS: ''
          }
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
