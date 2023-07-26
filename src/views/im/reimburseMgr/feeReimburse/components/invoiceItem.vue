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
            prop="feeName"
            label="费用名称"
            width="120"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.feeName"
                            v-on:click.native="onSelectMaterialTree(row)">
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
      title="选择物品"
      :visible.sync="materialTreeVisible"
      append-to-body>
      <SelectMaterialTree @selectMaterial="onSelectMaterial"/>
    </el-dialog>
    </el-card>
    
</template>
<script>
    import EditableCell from '@/components/EditableCell'
    import SelectMaterialTree from '../../../basicData/materialInfo/selectMaterialTree.vue'
 
    export default {
        name: "materialList",
        components: {
            SelectMaterialTree
        },
        props: [
            'editModeEnabled',
            'datas'
        ],
        components: {
            EditableCell,
            SelectMaterialTree
        },
        watch: {
            editModeEnabled(val) {

            },
        },
        data() {
            return {
                loading: false,
                materialTreeVisible: false,
                currentRow:'',
                currentRowIndex: ''
            }
        },
        methods: {
            onSelectMaterialTree(row){
                if(this.editModeEnabled){
                    this.materialTreeVisible=true
                }else{
                    this.materialTreeVisible=false
                }
                this.currentRow = row
                row.status=1
            },
            onSelectMaterial(id,name){
                this.currentRow.feeId=id
                this.currentRow.feeName=name
                this.materialTreeVisible=false
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
                    price: '',
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
