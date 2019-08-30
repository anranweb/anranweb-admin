<template>
  <!-- 用户管理 -->
  <div class="app-container">
    <div style="margin-bottom: 15px">
      <el-button type="primary" icon="el-icon-plus" @click="addUser(1)">新增</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="addUser(2)">修改</el-button>
      <el-button type="primary" icon="el-icon-delete" @click="deleteUser">删除</el-button>
    </div>
    <el-table
      stripe
      size="medium"
      :data="tableData"
      header-cell-class-name="an-table-header"
      style="width: 100%; margin-bottom: 15px;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="id"
        label="用户ID"
      />
      <el-table-column
        prop="name"
        label="姓名"
      />
      <el-table-column
        label="权限"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.roles | rolesFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="注册时间"
      />
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="clickPage"
    />

    <add-user
      v-if="isValid"
      :is-valid.sync="isValid"
      :is-add="isAdd"
      :default-data="userData"
      @listClick="listClick"
    />

  </div>
</template>

<script>
import { getUserList, deleteUser } from '@/api/user'
import { rolesName } from '@/api/data'
import addUser from './components/addUser'
export default {
  name: 'SysUser',
  components: {
    addUser
  },
  filters: {
    rolesFilter(val) {
      const array = val.split(',')
      const rolesLable = rolesName()
      const nd = []
      array.forEach(item => {
        for (let i = 0; i < rolesLable.length; i++) {
          if (item === rolesLable[i].value) {
            nd.push(rolesLable[i].name)
          }
        }
      })
      return nd.toString()
    }
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [], // 表格选中
      getData: {
        page: 1,
        pageSize: 10
      },
      total: 0,
      isAdd: true,
      isValid: false,
      userData: {}
    }
  },
  mounted() {
    this.getList()
  },
  methods: {

    getList() {
      getUserList(this.getData).then(res => {
        this.tableData = res.list
        this.total = parseInt(res.total)
      })
    },

    addUser(n) {
      if (n === 1) { // 新增
        this.isAdd = true
      } else { // 修改
        if (this.multipleSelection.length !== 1) {
          return this.$message.error('请选择一条数据进行编辑')
        }
        this.userData = this.multipleSelection[0]
        this.isAdd = false
      }
      this.isValid = true
    },
    deleteUser() {
      const nd = []
      this.multipleSelection.forEach(item => {
        nd.push(item.id)
      })
      deleteUser(nd).then(res => {
        this.$message.success('操作成功！')
        this.getList()
      })
    },
    listClick() { // 子组件回调函数
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    clickPage(val) {
      this.getData.page = val
      this.getList()
    }

  }

}
</script>

<style scoped>

</style>
