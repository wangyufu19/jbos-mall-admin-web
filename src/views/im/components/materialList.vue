<template>
    <el-card>
        <div slot="header" class="clearfix">
            <span>物品信息</span>
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
            prop="materialName"
            label="物品名称"
            width="120"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.materialName"
                            v-on:click.native="onSelectMaterialTree(row)">
                <span slot="content">{{row.materialName}}</span>
            </editable-cell>

            </el-table-column>
            <el-table-column
            prop="amount"
            label="数量"
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
            prop="price"
            label="单价"
            width="120"
            >
            <editable-cell slot-scope="{row,$index}"
                            :can-edit="editModeEnabled"
                            v-model="row.price"
                            @input="e => onPriceChange(row,$index,e)"
            >
                <span slot="content">{{row.price}}</span>
            </editable-cell>
            </el-table-column>
            <el-table-column
            prop="sumAmt"
            label="小计"
            >
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
    import SelectMaterialTree from '../basicData/materialInfo/selectMaterialTree.vue'

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
                this.currentRow.materialId=id
                this.currentRow.materialName=name
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
                    materialName: '',
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
            },
            caculateTotalAmt(){
                if(this.datas!=undefined){
                    let totalAmt=0.00
                    for(let i=0;i<this.datas.length;i++){
                    totalAmt+=this.datas[i].sumAmt
                    }
                    this.$emit('setTotalAmt',totalAmt)
                }
            },
            onAmountChange(row,index,value){
                if(row.amount && row.price){
                    row.sumAmt = row.amount*row.price
                }else{
                    row.sumAmt=0
                }
                this.caculateTotalAmt()
            },
            onPriceChange(row,index,value){
                if(row.amount && row.price){
                    row.sumAmt = row.amount*row.price
                }else{
                    row.sumAmt=0
                }
                this.caculateTotalAmt()
            },
        }
    }
</script>

<style scoped>
  .filter-container{
    margin-bottom: 10px;
  }
</style>
