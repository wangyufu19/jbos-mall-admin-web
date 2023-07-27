<template>
    <el-card>
        <div slot="header" class="clearfix">
            <span>发票信息</span>
        </div>
        <div v-if="editModeEnabled === true" class="filter-container">
            <el-button size="mini" type="primary" @click="onAddRow()">新增行</el-button>
            <el-button size="mini" type="primary" @click="onDeleteRow()">删除行</el-button>
        </div>
        <el-table
            v-loading="listLoading"
            :data="datas"
            border
            stripe
            fit
            highlight-current-row
            style="width: 100%"
            :row-class-name="tableRowClassName"
            @row-click="onRowClick"
        >
            <el-table-column
            prop="invoiceCode"
            label="发票编码"
            width="120"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.invoiceCode">
                <span slot="content">{{row.invoiceCode}}</span>
            </editable-cell>

            </el-table-column>

            <el-table-column
            prop="invoiceNo"
            label="发票代码"
            width="120"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.invoiceNo"
            >
                <span slot="content">{{row.invoiceNo}}</span>
            </editable-cell>
            </el-table-column>

            <el-table-column
            prop="amount"
            label="金额"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.amount"
                            editable-component="el-input-number"
            >
                <span slot="content">{{row.amount}}</span>
            </editable-cell>
            </el-table-column>
           
        </el-table>

    </el-card>
    
</template>
<script>
    import EditableCell from '@/components/EditableCell'
 
    export default {
        name: "invoiceItems",
        props: [
            'editModeEnabled',
            'datas'
        ],
        components: {
            EditableCell
        },
        watch: {
            editModeEnabled(val) {

            },
        },
        data() {
            return {
                loading: false,
                currentRow:'',
                currentRowIndex: ''
            }
        },
        methods: {
            tableRowClassName({ row, rowIndex }) {
                // 把每一行的索引放进row
                row.index = rowIndex
            },
            onRowClick(row,column,event) {
                this.currentRowIndex = row.index
                row.status=1
            },
            onResetRowStatus(){
                this.datas.map(item => {
                    if (item.status) {
                    item.status = 0
                    }
                    return item
                })
            },
            onAddRow() {
                this.onResetRowStatus()
                const row = {
                    invoiceCode: '',
                    invoiceNo: '',
                    amount: '',           
                    status: 1
                }
                this.datas.push(row)
            },
            onDeleteRow() {
                if (this.currentRowIndex === undefined || this.currentRowIndex === '') {
                    this.$message({
                    message: '请选择操作的数据',
                    type: 'success'
                    })
                    return
                }
                this.datas.splice(this.currentRowIndex, 1)
                this.currentRowIndex=this.currentRowIndex-1
                this.caculateTotalAmt()
            }
        }
    }
</script>

<style scoped>
  .filter-container{
    margin-bottom: 10px;
  }
</style>
