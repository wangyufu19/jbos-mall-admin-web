<template>
    <div>
 
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
            prop="costType"
            label="费用类型"
            width="120"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.costType">
                <span slot="content">{{row.costType}}</span>
            </editable-cell>

            </el-table-column>
            <el-table-column
            prop="costAmt"
            label="费用金额"
            width="200"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.costAmt"
                            editable-component="el-input-number"
            >
                <span slot="content">{{row.costAmt}}</span>
            </editable-cell>
            </el-table-column>
            <el-table-column
            prop="costDesc"
            label="备注"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.costDesc"
            >
                <span slot="content">{{row.costDesc}}</span>
            </editable-cell>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import EditableCell from '@/components/EditableCell'

 
    export default {
        name: "materialList",
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
                listLoading: false,
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
                    costType: '',
                    costAmt: '',
                    costDesc: '',
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
            }
        }
    }
</script>

<style scoped>
  .filter-container{
    margin-bottom: 10px;
  }

</style>
