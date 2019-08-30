<template>
  <div class="app-container">
    <div style="margin-bottom: 15px">
      <el-button type="primary" icon="el-icon-plus" @click="addClick(1)">新增</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="addClick(2)">修改</el-button>
      <el-button type="primary" icon="el-icon-delete" @click="deleteClick">删除</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      size="medium"
      header-cell-class-name="an-table-header"
      height="700"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="name"
        label="栏目名称"
      />
      <el-table-column
        prop="level"
        label="排序等级"
      />
    </el-table>
    <add-column
      v-if="isValid"
      :is-valid.sync="isValid"
      :is-add="isAdd"
      :default-data="columnData"
      @listClick="listClick"
    />
  </div>
</template>

<script>
import { getColumnList, deleteColumn } from '@/api/article'
import addColumn from './components/addColumn'
export default {
  name: 'ArticleColumn',
  components: {
    addColumn
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      isValid: false,
      isAdd: true,
      columnData: {}
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getColumnList().then(res => {
        this.tableData = res
      })
    },
    addClick(n) {
      this.isAdd = true
      if (n === 2) {
        if (this.multipleSelection.length !== 1) {
          return this.$message.error('请选择一条数据进行编辑！')
        }
        this.columnData = this.multipleSelection[0]
        this.isAdd = false
      }
      this.isValid = true
    },
    deleteClick() {
      if (this.multipleSelection.length !== 1) {
        return this.$message.error('请选择一条数据进行删除！')
      }
      const id = this.multipleSelection[0].id
      deleteColumn(id).then(res => {
        this.$message.success('操作成功！')
        this.getList()
      })
    },
    listClick() { // 组件回调
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped>

</style>
