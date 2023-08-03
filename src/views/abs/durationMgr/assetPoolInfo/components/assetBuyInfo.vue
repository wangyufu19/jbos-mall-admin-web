<template>
    <div>
        <div class="filter-container">
        <el-input v-model="search.projectNameS" placeholder="项目名称" class="filter-item" style="width: 200px;" />

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
        >
        <el-table-column
            prop="projectNo"
            label="项目编号"
            width="120"
        />
        <el-table-column
            prop="projectName"
            label="项目名称"
            width="220"
        />
        <el-table-column
            prop="projectAmt"
            label="项目金额"
            width="120"
        />
        <el-table-column
            prop="assetPktNo"
            label="资产包号"
            width="120"
        />
        <el-table-column
            prop="selAssetAmt"
            label="已选定金额"
            width="120"
        />
        <el-table-column
            prop="pktPcdAmt"
            label="已处理金额"
            width="120"
        />
        <el-table-column
            prop="pktNoPcdAmt"
            label="未处理金额"
            width="120"
        />
        <el-table-column
            prop="successAmt"
            label="购买成功金额"
            width="120"
        />
        <el-table-column
            prop="failureAmt"
            label="购买失败金额"
            width="120"
        />
        <el-table-column
            prop="assetTransferAmt"
            label="资产转让价款"
            width="120"
        />
        <el-table-column
            prop="assetTransferSurplusAmt"
            label="认购余额"
            width="120"
        />
        <el-table-column
            prop="staticDate"
            label="统计日期"
            width="120"
        />
        <el-table-column label="操作" align="center">
            <template slot-scope="{row,$index}">
            <el-button size="mini" type="view" @click="onShowView(row,$index)"> 查看 </el-button>
            </template>
        </el-table-column>
        </el-table>
        <!--分页信息-->
        <pagination v-show="total>0" :total="total" :page.sync="queryPage.page" :limit.sync="queryPage.limit" @pagination="onList" />

    </div>
</template>
<script>
import Pagination from '@/components/Pagination'

export default {
    name: "assetBuyInfo",
    components: { Pagination},
    data() {
        return {
            search: {
                projectNameS: ''
            },
            datas: [],
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
        this.onList()
    },
    methods: {
        onSearch() {
        this.queryPage.page = 1
        this.queryPage.projectNameS = this.search.projectNameS
        this.onList()
        },
        onReset() {
        this.search = {
            projectNoS: ''
        }
        },
        onList() {
        // this.listLoading = true
        // this.queryPage.isPage = 'true'
        // getProjectPacketList(this.queryPage).then(response => {
        //   const res=response.data
        //   this.datas = res.data.list
        //   this.total = res.data.total
        //   this.listLoading = false
        // })
        },
    }
}
</script>

<style scoped>
  .filter-container{
    margin-bottom: 10px;
  }
</style>
