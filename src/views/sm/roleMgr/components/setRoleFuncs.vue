<template>
  <el-card>
    <el-tree
      ref="tree"
      :data="items"
      show-checkbox
      node-key="id"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
    />

    <el-button type="primary" size="mini" @click="onSaveRoleFuncs()">确定 </el-button>
  </el-card>
</template>

<script>
import { getFuncTree } from '@/api/sm/func'
import { getRoleFuncs,saveRoleFuncs } from '@/api/sm/role'
export default {
  name: 'SetRoleFuncs',
  props: ['getRoleId', 'getRoleName'],
  data() {
    return {
      filterText: '',
      items: [],
      hasCheckedKeyIds: [],
      defaultProps: {
        label: 'text',
        children: 'children'
      }
    }
  },
  created() {
    this.loadTreeData('0')
  },
  watch: {
    getRoleId(val) {
      this.loadTreeData('0')
    }
  },
  methods: {

    async loadTreeData(parentId) {
      await getFuncTree({ parentId: parentId }).then(response => {
        const res=response.data
        this.items = res.data
      })
      await getRoleFuncs({ roleId: this.getRoleId}).then(response => {
        const res=response.data
        this.hasCheckedKeyIds = res.data
        //this.$refs.tree.setCheckedKeys(this.hasCheckedKeyIds,false)
        let _this = this;
        _this.$data.thisRefTree = setInterval(() =>{
          this.hasCheckedKeyIds.forEach((i) => {
            let node = _this.$refs.tree.getNode(i);
            if(node.isLeaf){
              _this.$refs.tree.setChecked(node, true);
            }
          });
          clearInterval(_this.$data.thisRefTree)
        },200)

      })
    },
    onSaveRoleFuncs() {
      //const checkedIds = this.$refs.tree.getCheckedKeys()
      const checkedIds = this.$refs.tree.getCheckedNodes(false,true).map(i => i.id)
      saveRoleFuncs({roleId: this.getRoleId,checkedIds: checkedIds}).then(response => {
        this.dialogFormVisible = false
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
