<template>
    <div>
    <el-card>
    <div slot="header" class="clearfix">
      <span>支付日</span>
    </div>
        <div v-if="editModeEnabled === true" class="filter-container">
            <el-button size="mini" type="primary" @click="onAddPayRow()">新增行</el-button>
            <el-button size="mini" type="primary" @click="onDeletePayRow()">删除行</el-button>
        </div>
        <el-table
            v-loading="listLoading"
            :data="payItems"
            border
            stripe
            fit
            highlight-current-row
            style="width: 100%"
            :row-class-name="tableRowClassName"
            @row-click="onRowClick"
        >
        <el-table-column
            prop="payDate"
            label="支付日"
            width="240"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.payDate"      
                            type="date"
                            value-format="yyyy-MM-dd"
                            editable-component="el-date-picker"
                            >
                <span slot="content">{{row.payDate}}</span>
            </editable-cell>
            </el-table-column>
        </el-table>

    </el-card>
    <el-card>
    <div slot="header" class="clearfix">
      <span>重要事件</span>
    </div>
 
        <div v-if="editModeEnabled === true" class="filter-container">
            <el-button size="mini" type="primary" @click="onAddRow()">新增行</el-button>
            <el-button size="mini" type="primary" @click="onDeleteRow()">删除行</el-button>
        </div>
        <el-table
            v-loading="listLoading"
            :data="eventItems"
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
    </el-card>
</div>
</template>
<script>
    import EditableCell from '@/components/EditableCell'

 
    export default {
        name: "eventItem",
        props: [
            'editModeEnabled',
            'payItems',
            'eventItems'
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
            onResetRowStatus(datas){
                datas.map(item => {
                    if (item.status) {
                        item.status = 0
                    }
                    return item
                })
            },
            onAddPayRow() {
                this.onResetRowStatus(this.payItems)
                const row = {
                    payDate: '',
                    status: 1
                }
                this.payItems.push(row)
            },
            onDeletePayRow() {
                if (this.currentRowIndex === undefined || this.currentRowIndex === '') {
                    this.$message({
                    message: '请选择操作的数据',
                    type: 'success'
                    })
                    return
                }
                this.payItems.splice(this.currentRowIndex, 1)
                this.currentRowIndex=this.currentRowIndex-1
            },
            onAddRow() {
                this.onResetRowStatus(this.eventItems)
                const row = {
                    costType: '',
                    eventDate: '',
                    eventDesc: '',
                    status: 1
                }
                this.eventItems.push(row)
            },
            onDeleteRow() {
                if (this.currentRowIndex === undefined || this.currentRowIndex === '') {
                    this.$message({
                    message: '请选择操作的数据',
                    type: 'success'
                    })
                    return
                }
                this.eventItems.splice(this.currentRowIndex, 1)
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
