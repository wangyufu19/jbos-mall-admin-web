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
            prop="eventType"
            label="事件类型"
            width="120"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.eventType">
                <span slot="content">{{row.eventType}}</span>
            </editable-cell>

            </el-table-column>
            <el-table-column
            prop="eventDate"
            label="事件日期"
            width="240"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.eventDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            editable-component="el-date-picker"
            >
                <span slot="content">{{row.eventDate}}</span>
            </editable-cell>
            </el-table-column>
            <el-table-column
            prop="eventDesc"
            label="备注"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.eventDesc"
            >
                <span slot="content">{{row.eventDesc}}</span>
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
