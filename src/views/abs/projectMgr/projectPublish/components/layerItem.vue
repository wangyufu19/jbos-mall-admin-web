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
            prop="layerCode"
            label="分层档"
            width="100"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.layerCode">
                <span slot="content">{{row.layerCode}}</span>
            </editable-cell>
            </el-table-column>

            <el-table-column
            prop="layerScale"
            label="比例"
            width="120"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.layerScale"
                            editable-component="el-input"
            >
                <span slot="content">{{row.layerScale}}</span>
            </editable-cell>
            </el-table-column>

            <el-table-column
            prop="rating"
            label="评级"
            width="100"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.rating"
            >
                <span slot="content">{{row.rating}}</span>
            </editable-cell>
            </el-table-column>

            <el-table-column
            prop="layerAmt"
            label="金额"
            width="120"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.layerAmt"
                            editable-component="el-input"
            >
                <span slot="content">{{row.layerAmt}}</span>
            </editable-cell>
            </el-table-column>

            <el-table-column
            prop="price"
            label="价格"
            width="120"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.price"
                            editable-component="el-input"
            >
                <span slot="content">{{row.price}}</span>
            </editable-cell>
            </el-table-column>

            <el-table-column
            prop="irr"
            label="IRR收益率"
            width="120"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.irr"
                            editable-component="el-input"
            >
                <span slot="content">{{row.irr}}</span>
            </editable-cell>
            </el-table-column>

            <el-table-column
            prop="epdEdate"
            label="预期到期日"
            width="230"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.epdEdate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            editable-component="el-date-picker"
            >
                <span slot="content">{{row.epdEdate}}</span>
            </editable-cell>
            </el-table-column>

            <el-table-column
            prop="orderNo"
            label="排序"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.orderNo"
            >
                <span slot="content">{{row.orderNo}}</span>
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
                    assetType: '',
                    assetScale: '',
                    orderNo: '',
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
