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
        row-key="materialId" 
        fit
        highlight-current-row
        style="width: 100%"
        @expand-change="loadStoreList"
      >

        <el-table-column type="expand">
          <template slot-scope="scope">
          <el-table
          v-loading="listLoading"
          :row-key="scope.row.child.materialId" 
          :data="scope.row.child"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
        <el-table-column
          prop="batchNo"
          label="批次号"
          width="180"
        />
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
          label="价格"
          width="100"
        />
        <el-table-column
          prop="inTime"
          label="入库时间"
        />
      </el-table>
    </template>
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
      
        />

      </el-table>
      <!--分页信息-->
      <pagination v-show="total>0" :total="total" :page.sync="queryPage.page" :limit.sync="queryPage.limit" @pagination="sumList" />

    </el-card>
  
  </template>
  
  <script>
    import Pagination from '@/components/Pagination'
    import { getUserId } from '@/utils/global'
    import { sumList,list } from '@/api/im/materialStore'

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
          dataItems: [],
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
        this.sumList()
      },
      methods: {
        onSearch() {
          this.queryPage.page = 1
          this.queryPage.materialNameS = this.search.materialNameS
          this.queryPage.sdateS = this.search.inTimeS[0]
          this.queryPage.edateS = this.search.inTimeS[1]
          this.sumList()
        },
        onReset() {
          this.search = {
            materialNameS: '',
            inTimeS: ''
          }
        },
        sumList() {
          this.listLoading = true
          this.queryPage.userId=getUserId()
          this.queryPage.isPage = 'true'
          sumList(this.queryPage).then(response => {
            const res = response.data
            this.datas = res.data.list
            this.total = res.data.total
            this.listLoading = false
          })
        },
        loadStoreList(row,expandedRows) {
          // 存储当前行的数据
          this.dataItems=row

          // 由于expand-change对于异步加载第一轮dom不渲染先加一个存在的dom让接口返回值可以渲染
          this.datas.forEach(item => {
            item.child=[]
          })
          if(expandedRows.length>0){
            this.listLoading = true
            this.queryPage.userId=getUserId()
            this.queryPage.materialId=row.materialId
            list(this.queryPage).then(response => {
              const res = response.data
              this.dataItems.child.push(...res.data)
              this.listLoading = false
            })
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
