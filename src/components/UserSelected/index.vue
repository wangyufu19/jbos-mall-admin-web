<template>
     <el-select
        v-model="userName"
        filterable
        clearable
        remote
        reserve-keyword
        placeholder="请输入"
        :remote-method="onSearchEmp"
        :loading="loading"
        @change="onUserIdChange"
        >
        <el-option
            v-for="item in emps"
            :key="item.badge"
            :label="item.depEmpName"
            :value="item.badge"
        />
    </el-select>
</template>
<script>
    import { getEmpList } from '@/api/sm/emp'
    export default {
        name: 'userSelected',
        components: {},
        props: {
            userName: String
        },
        data () {
            return {
                emps: []
            }
        },
        methods: {
            onSearchEmp(query) {
                if (query !== '') {
                    this.loading = true
                    const formObj={}
                    formObj.empNameS = query
                    getEmpList(formObj).then(response => {
                        const res = response.data
                        this.emps = res.data.list
                        this.loading = false
                    })
                } else {
                    this.emps = []
                }
            },
            onUserIdChange(value) {
                this.emps = []
                this.$emit('setAssignee',value)
            },
        }
    }
</script>