<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>物品采购列表</span>
    </div>
    <div class="filter-container">
      <el-input v-model="search.bizNoS" placeholder="业务编号" class="filter-item" style="width: 200px;" />
      <el-select
        v-model="search.feeTypeS"
        clearable
        :loading="loading"
        placeholder="费用类型">
        <el-option
            v-for="item in feeTypeItems"
            :key="item.DICTID"
            :label="item.DICTNAME"
            :value="item.DICTID"
        />
      </el-select>
      <el-date-picker
        v-model="search.applyTimeS"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="申请日期">
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
      @row-click="onClick"
    >
      <el-table-column
        prop="bizNo"
        label="业务编号"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="applyUserName"
        label="申请人"
        width="100"
      />
      <el-table-column
        prop="applyDepName"
        label="申请部门"
        width="180"
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
        value-format="yyyy-MM-dd"
      />
      <el-table-column
        prop="totalAmt"
        label="总金额"
        width="100"
      />
      <el-table-column
        prop="bizState"
        label="状态"
        width="100"
        :formatter="onFormatter"
      />
      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="view" @click="onShowView(row,$index)"> 查看 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页信息-->
    <pagination v-show="total>0" :total="total" :page.sync="queryPage.page" :limit.sync="queryPage.limit" @pagination="onList" />
    <!--新增或编辑物品采购信息-->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="onList" />
  </el-card>

</template>

<script>
  import { getCacheDictCodeList } from '@/api/sm/dict'
  import { getUserId } from '@/utils/global'
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
        feeTypeItems: [],
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
      this.initFeeType()
      this.onList()
    },
    methods: {
      initFeeType(){
        this.loading = true
        getCacheDictCodeList({typeId: 'IM_FEETYPE'}).then(response => {
          const res = response.data
          this.feeTypeItems = res.data
          this.loading = false
        })
      },
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
      onFormatter(row,column){
        if(column.property==='bizState'){
          if(row.bizState==='10'){
            return '草稿中'
          }else if(row.bizState==='20') {
            return '审批中'
          }else if(row.bizState==='90') {
            return '已结束'
          }
        }
      },
      onClick(row){
        this.$emit('selectMaterialBuy',row)
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
  .edit-cell {
    min-height: 35px;
    cursor: pointer;
  }
</style>
