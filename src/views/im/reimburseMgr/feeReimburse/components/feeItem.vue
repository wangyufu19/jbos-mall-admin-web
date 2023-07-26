<template>
    <el-card>
        <div slot="header" class="clearfix">
            <span>费用信息</span>
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
            prop="feeName"
            label="费用名称"
            width="120"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.feeName"
                            v-on:click.native="onSelectFeeTree(row)">
                <span slot="content">{{row.feeName}}</span>
            </editable-cell>

            </el-table-column>
            <el-table-column
            prop="amount"
            label="金额"
            width="120"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.amount"
                            @input="e => onAmountChange(row,$index,e)"
            >
                <span slot="content">{{row.amount}}</span>
            </editable-cell>
            </el-table-column>
            <el-table-column
            prop="feeDesc"
            label="备注"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.feeDesc"
            >
                <span slot="content">{{row.feeDesc}}</span>
            </editable-cell>
            </el-table-column>
        </el-table>
        <el-dialog
            width="35%"
            title="选择费用"
            :visible.sync="feeTreeVisible"
            append-to-body>
            <SelectFeeTree @selectFee="onSelectFee"/>
        </el-dialog>
    </el-card>
    
</template>
<script>
    import EditableCell from '@/components/EditableCell'
    import SelectFeeTree from '../../../basicData/feeInfo/selectFeeTree.vue'
 
    export default {
        name: "materialList",
        props: [
            'editModeEnabled',
            'datas'
        ],
        components: {
            EditableCell,
            SelectFeeTree
        },
        watch: {
            editModeEnabled(val) {

            },
        },
        data() {
            return {
                listLoading: false,
                loading: false,
                feeTreeVisible: false,
                currentRow:'',
                currentRowIndex: ''
            }
        },
        methods: {
            onSelectFeeTree(row){
                if(this.editModeEnabled){
                    this.feeTreeVisible=true
                }else{
                    this.feeTreeVisible=false
                }
                this.currentRow = row
                row.status=1
            },
            onSelectFee(id,name){
                this.currentRow.feeId=id
                this.currentRow.feeName=name
                this.feeTreeVisible=false
            },
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
                    feeName: '',
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
            },
            caculateTotalAmt(){
                if(this.datas!=undefined){
                    let totalAmt=0.00
                    for(let i=0;i<this.datas.length;i++){
                        totalAmt+=this.datas[i].amount
                    }
                    this.$emit('setTotalAmt',totalAmt)
                }
            },
            onAmountChange(row,index,value){
                this.caculateTotalAmt()
            },
        }
    }
</script>

<style scoped>
  .filter-container{
    margin-bottom: 10px;
  }
  /deep/ .el-dialog__title {
      color: #303133;
  }
  /deep/ .el-dialog__header {
    border-bottom: 1px solid #e3e8ee;
  }
</style>
