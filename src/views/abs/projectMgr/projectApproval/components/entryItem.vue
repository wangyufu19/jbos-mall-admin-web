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
            prop="entrySte"
            label="状态"
            width="100"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.entryStats">
                <span slot="content">{{row.entryStats}}</span>
            </editable-cell>

            </el-table-column>
            <el-table-column
            prop="fieldCode"
            label="字段编码"
            width="160"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.fieldCode"
            >
                <span slot="content">{{row.fieldCode}}</span>
            </editable-cell>
            </el-table-column>

            <el-table-column
            prop="fieldName"
            label="字段名称"
            width="160"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.fieldName"
            >
                <span slot="content">{{row.fieldName}}</span>
            </editable-cell>
            </el-table-column>

            
            <el-table-column
            prop="fieldType"
            label="字段类型"
            width="120"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.fieldType"
            >
                <span slot="content">{{row.fieldType}}</span>
            </editable-cell>
            </el-table-column>

            
            <el-table-column
            prop="operatorOne"
            label="运算符1"
            width="100"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.operatorOne"
            >
                <span slot="content">{{row.operatorOne}}</span>
            </editable-cell>
            </el-table-column>

            
            <el-table-column
            prop="valueOne"
            label="值1"
            width="120"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.valueOne"
            >
                <span slot="content">{{row.valueOne}}</span>
            </editable-cell>
            </el-table-column>

            
            <el-table-column
            prop="operatorTow"
            label="运算符2"
            width="100"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.operatorTow"
            >
                <span slot="content">{{row.operatorTow}}</span>
            </editable-cell>
            </el-table-column>

            <el-table-column
            prop="valueTwo"
            label="值2"
            width="120"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.valueTwo"
            >
                <span slot="content">{{row.valueTwo}}</span>
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
