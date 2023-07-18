<template>
    <materialTree @setId="setId" />
</template>

<script>
import { materialTree} from './components'
export default {
  name: 'SelectMaterialTree',
  components: {
    materialTree
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
      this.$emit('selectMaterial', this.id,this.name)
    }
  }
}
</script>
  