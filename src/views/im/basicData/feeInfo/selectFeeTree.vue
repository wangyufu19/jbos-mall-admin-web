<template>
    <feeTree @setId="setId" />
</template>

<script>
import { feeTree } from './components'
export default {
  name: 'SelectFeeTree',
  components: {
    feeTree
  },
  data() {
    return {
      id: '',
      text:''
    }
  },
  methods: {
    setId(id,name) {
      this.id = id
      this.name = name
      this.$emit('selectFee', this.id,this.name)
    }
  }
}
</script>
  