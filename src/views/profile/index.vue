<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user :base="base" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="基本信息" name="base">
                <Base :base="base" />
              </el-tab-pane>
              <el-tab-pane label="版本信息" name="version">
                <Version />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import User from './components/User'
import Base from './components/Base'
import Version from './components/Version'


export default {
  name: 'Profile',
  components: { User,Base,Version },
  data() {
    return {
      base: {},
      activeTab: 'base'
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created() {
    this.getBase()
  },
  methods: {
    getBase() {
      const email=this.user.LOGINNAME+'@nbcb.com'
      this.base = {
        account:this.user.LOGINNAME,
        username: this.user.USERNAME,
        email: email
      }
    }
  }
}
</script>
