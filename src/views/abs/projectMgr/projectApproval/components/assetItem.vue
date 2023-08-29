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
            prop="assetType"
            label="资产品种"
            width="120"
            >
            <editable-cell 
         slot-scope="{row}" 
         editable-component="el-select"
         :can-edit="editModeEnabled"
         close-event="change"
         v-model="row.assetType">
         
          <el-tag size="medium" 
                  slot="content">
                  {{row.assetType}}
      
          </el-tag>

          <template slot="edit-component-slot">

            <el-option v-for="item in assetTypeItems " :key="item.DICTID" :label="item.DICTNAME" :value="item.DICTID">
			</el-option>

          </template>
        </editable-cell>

            </el-table-column>
            <el-table-column
            prop="assetScale"
            label="资产比例"
            width="200"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.amount"
                            editable-component="el-input-number"
            >
                <span slot="content">{{row.amount}}</span>
            </editable-cell>
            </el-table-column>
            <el-table-column
            prop="assetArea"
            label="资产区域"
            width="650"
            >
            <editable-cell slot-scope="{row}"
                            :can-edit="editModeEnabled"
                            v-model="row.assetArea"
            >
                <span slot="content">{{row.assetArea}}</span>
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
    import { getCacheDictCodeList } from '@/api/sm/dict'

 
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
                currentRowIndex: '',
                assetTypeItems: [],
            }
        },
        created() {
            this.initBusinessDict('ABS_ASSETTYPE')

        },
        methods: {
            initBusinessDict(typeId){
                this.loading = true
                getCacheDictCodeList({typeId: typeId}).then(response => {
                    const res = response.data
                    if(typeId==='ABS_ASSETTYPE'){
                        this.assetTypeItems = res.data
                    }
                    this.loading = false
                })
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
                    assetType: '',
                    assetScale: '',
                    assetArea:'',
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
