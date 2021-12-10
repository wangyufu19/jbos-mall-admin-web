<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>商品分类列表</span>
    </div>

  </el-card>
</template>

<script>

export default {
  name: 'TreeMain',
  props: ['getParentId'],

  data() {
    return {
      activeName: 'func'
    }
  },
  watch: {
    activeName(val) {
      this.activeName = val
    }
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

