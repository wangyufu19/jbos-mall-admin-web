<template>
  <el-dialog
    :title="textMap[dialogStatus]"
    :visible.sync="dialogFormVisible"
    @close="onCloseAddOrUpdate"
    width="80%"
    :append-to-body="true">
    <el-form ref="formObj" :model="formObj" :rules="rules" label-width="100px" class="demo-ruleForm" >
      <el-card>
        <div slot="header" class="clearfix">
          <span>商品基本信息</span>
        </div>
        <el-row>
          <el-col span="24">
            <el-form-item label="商品分类" prop="categoryCode">
              <treeselect
                v-model="formObj.categoryCode"
                placeholder="请选择"
                :multiple="false"
                :options="category.options"
                :auto-load-root-options="false"
                :load-options="loadCategoryOptions"
                @open="loadRootOptions"
                @close="clearRootOptions"
              >
              </treeselect>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="商品编号" prop="productCode">
              <el-input v-model="formObj.productCode" :disabled="true"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="商品标题" prop="title">
              <el-input v-model="formObj.title"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card>
        <div slot="header" class="clearfix">
          <span>商品主图</span>
        </div>
        <el-row>
          <el-upload
            multiple
            :action="mainPic.actionUrl"
            :headers="mainPic.headers"
            :data="mainPic.data"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadError"
            :on-remove="handleRemove"
            :file-list="mainPic.photoList"
            :class="{hide: mainPic.hideUpload}">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="mainPic.dialogVisible">
            <img width="100%" :src="mainPic.dialogImageUrl" alt="">
          </el-dialog>
        </el-row>
      </el-card>
      <el-card>
        <div slot="header" class="clearfix">
          <span>规格和库存</span>
        </div>
        <div class="filter-container">
          <el-button size="medium" type="primary" @click="onAddRow()">新增行</el-button>
          <el-button size="medium" type="primary" @click="onDeleteRow()">删除行</el-button>
        </div>
        <el-table
          v-loading="listLoading"
          :data="sku"
          border
          stripe
          fit
          highlight-current-row
          style="width: 100%"
          :row-class-name="tableRowClassName"
          @row-click="onRowClick"
        >
          <el-table-column
            prop="specsName"
            label="规格名称"
            width="200"
          >
            <editable-cell slot-scope="{row}"
                           :can-edit="editModeEnabled"
                           v-model="row.specsName">
              <span slot="content">{{row.specsName}}</span>
            </editable-cell>
          </el-table-column>
          <el-table-column
            prop="inventoryAmount"
            label="库存数量"
            width="120"
          >
            <editable-cell slot-scope="{row}"
                           :can-edit="editModeEnabled"
                           v-model="row.inventoryAmount">
              <span slot="content">{{row.inventoryAmount}}</span>
            </editable-cell>
          </el-table-column>
          <el-table-column
            prop="sellPrice"
            label="销售价格"
            width="120"
          >
            <editable-cell slot-scope="{row}"
                           :can-edit="editModeEnabled"
                           v-model="row.sellPrice">
              <span slot="content">¥{{row.sellPrice}}</span>
            </editable-cell>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card>
        <div slot="header" class="clearfix">
          <span>服务和承诺</span>
        </div>
      </el-card>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="dialogStatus==='create'?onAdd():onUpdate()">发布 </el-button>
      <el-button type="primary" @click="onSave()">保存草稿</el-button>
    </div>
  </el-dialog>

</template>

<script>
  import { getToken } from "@/utils/auth";
  import { getNo,get,add,update,save } from '@/api/pm/product'
  import { deletePic } from '@/api/pm/pic'
  import { tree } from '@/api/pm/category'
  import Treeselect,{ LOAD_ROOT_OPTIONS,LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import EditableCell from '@/components/EditableCell'


  export default {
    name: "addOrUpdate",
    components: {
      Treeselect,
      EditableCell
    },
    data() {
      return {
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          create: '商品列表-发布商品',
          update: '商品列表-修改商品'
        },
        formObj: {
          seqId: undefined,
          categoryCode:null,
          categoryName:'',
          productCode: '',
          productName: '',
          title: '',
          status:'10'
        },
        category:{
          options: [],
        },
        mainPic:{
          actionUrl:process.env.VUE_APP_BASE_API+'/business/io/upload',
          headers:{'accessToken':getToken()},
          data:{},
          hideUpload: false,
          photoList:[],
          dialogImageUrl: '',
          dialogVisible: false
        },
        rules: {
          categoryCode: [{ required: true, message: '商品分类必须填写', trigger: 'change' }],
          productCode: [{ required: true, message: '商品编号必须填写', trigger: 'change' }],
          productName: [{ required: true, message: '商品名称必须填写', trigger: 'change' }],
          title: [{ required: true, message: '商品标题必须填写', trigger: 'change' }]
        },
        sku: [],
        loading: false,
        editModeEnabled: true,
        currentRow: ''
      }
    },
    methods:{
      init(formObj, dialogStatus) {
        if (dialogStatus === 'create') {
          this.dialogStatus = dialogStatus
          this.dialogFormVisible = true
          this.formObj = {
            seqId: undefined,
            categoryCode:null,
            categoryName:'',
            productCode: '',
            productName: '',
            title: '',
            status:'10'
          }
          this.$nextTick(() => {
            this.$refs['formObj'].clearValidate()
          })
          this.options=[]
          this.mainPic.photoList=[]
          this.sku=[]
          this.getNo()
        }else {
          this.dialogStatus = dialogStatus
          this.dialogFormVisible = true
          this.mainPic.photoList=[]
          this.getById(formObj.productSeqId)
        }
      },
      onCloseAddOrUpdate(){
        this.options=[]
        this.mainPic.photoList=[]
        this.sku=[]
      },
      getNo(){
        this.loading = true
        getNo().then(response => {
          const res = response.data
          this.formObj.seqId = res.data.seqId
          this.mainPic.data={productSeqId:this.formObj.seqId}
          this.formObj.productCode = res.data.productCode
          this.loading = false
        })
      },
      getById(productSeqId){
        this.loading = true
        get({seqId:productSeqId}).then(response => {
          const res = response.data
          this.formObj = res.data.base
          this.category.options=[{
            id: this.formObj.categoryCode,
            label: this.formObj.categoryName,
            children: null
          }]
          this.mainPic.data={productSeqId:this.formObj.seqId}
          this.mainPic.photoList=res.data.mainPics
          this.sku= res.data.skuList
          this.loading = false
        })
      },
      loadRootOptions(){
        this.category.options=[]
        tree().then(response => {
          const res = response.data
          res.data.forEach((item, index, arr) => {
            this.category.options.push({
              id: item.code,
              label: item.text,
              children: null
            })
          })
        })
      },
      clearRootOptions(){
        this.category.options=[]
      },
      loadCategoryOptions({ action, parentNode, callback }){
        this.loading = true
        if(action === LOAD_CHILDREN_OPTIONS){
          tree({parentId:parentNode.id}).then(response => {
            const res = response.data
            const options = []
            res.data.forEach((item, index, arr) => {
              options.push({
                id: item.code,
                label: item.text,
                children: item.children
              })
            })
            parentNode.children=options
            callback()
          })
        }
      },
      handleRemove(file, fileList) {
        deletePic(file).then(response => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      },
      handlePictureCardPreview(file) {
        this.mainPic.dialogImageUrl = file.url
        this.mainPic.dialogVisible = true
      },
      handleUploadSuccess(response,file){
        console.log(response)
      },
      tableRowClassName({ row, rowIndex }) {
        // 把每一行的索引放进row
        row.index = rowIndex
      },
      onRowClick(row,column,event) {
        this.currentRow = row.index
        row.status=1
      },
      onResetRowStatus(){
        this.sku.map(item => {
          if (item.status) {
            item.status = 0
          }
          return item
        })
      },
      onAddRow() {
        this.onResetRowStatus()
        const row = {
          specsName: '',
          sellPrice: '',
          inventoryAmount: ''
        }
        this.sku.push(row)
      },
      onDeleteRow() {
        if (this.currentRow === undefined || this.currentRow === '') {
          this.$message({
            message: '请选择操作的数据',
            type: 'success'
          })
          return
        }
        this.sku.splice(this.currentRow, 1)
        this.currentRow=this.currentRow-1
      },
      onAdd() {
        this.$refs['formObj'].validate((valid) => {
          if (valid) {
            const data={formObj:this.formObj,sku:this.sku}
            add(data).then(response => {
              this.dialogFormVisible = false
              this.$emit('refreshDataList')
              this.$message({
                message: '操作成功',
                type: 'success'
              })
            })
          }
        })
      },
      onUpdate() {
        this.$refs['formObj'].validate((valid) => {
          if (valid) {
            this.formObj.status='20'
            const data={formObj:this.formObj,sku:this.sku}
            update(data).then(response => {
              this.dialogFormVisible = false
              this.$emit('refreshDataList')
              this.$message({
                message: '操作成功',
                type: 'success'
              })
            })
          }
        })
      }
    }
  }

</script>

<style scoped>

</style>
