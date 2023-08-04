<template>
    <div class="app-container">
        <el-card>
            <div slot="header" class="clearfix">
            <span>资产池信息</span>
            </div>
            <el-tabs v-model="activeName"  @tab-click="handleClick">
                <el-tab-pane  label="资产池余额" name="assetBalInfo">
                    <AssetBalInfo/>
                </el-tab-pane>
                <el-tab-pane  label="资金划付" name="assetAllocInfo">
                    <AssetAllocInfo/>
                </el-tab-pane>
                <el-tab-pane  label="购买清单" name="assetBuyInfo">
                    <AssetBuyInfo/>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import AssetBalInfo from './components/assetBalInfo.vue'
import AssetAllocInfo from './components/assetAllocInfo.vue'
import AssetBuyInfo from './components/assetBuyInfo.vue'

export default {
  name: 'TreeMain',
  props: ['getOrgId', 'getOrgName'],
  components: { AssetBalInfo,AssetAllocInfo,AssetBuyInfo },
  data() {
    return {
      activeName: 'assetBalInfo'
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
