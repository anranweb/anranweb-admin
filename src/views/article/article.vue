<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="formInline.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="栏目">
        <el-select v-model="formInline.columnId" placeholder="请选择所属栏目">
          <el-option label="全部" value="" />
          <el-option v-for="item in articleColumn" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select v-model="formInline.status">
          <el-option label="全部" value="" />
          <el-option label="未发布" value="0" />
          <el-option label="已发布" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="tableData"
      size="medium"
      stripe
      tooltip-effect="dark"
      header-cell-class-name="an-table-header"
      style="width: 100%; margin-bottom: 15px;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        label="日期"
      >
        <template slot-scope="scope">{{ scope.row.updata_time }}</template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        show-overflow-tooltip
      />
      <el-table-column
        label="栏目"
      >
        <template slot-scope="scope">{{ filterType(scope.row.article_column_id) }}</template>
      </el-table-column>
      <el-table-column
        label="置顶"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_top"
            active-value="1"
            inactive-value="0"
            active-color="#13ce66"
            inactive-color="#eeeeee"
            @change="switchState(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="发布状态"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.release_status"
            active-value="1"
            inactive-value="0"
            active-color="#13ce66"
            inactive-color="#eeeeee"
            @change="switchState(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-if="checkPermission(['admin','articleAdd'])" type="text" icon="el-icon-edit" @click="editArticle(scope.row.article_id)">编辑</el-button>
          <el-button type="text" icon="el-icon-delete" @click="deleteArticle(scope.row.article_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="clickPage"
    />
  </div>
</template>

<script>
import { articleList, updateArticleState, deleteArticle } from '@/api/article'
import checkPermission from '@/utils/permission' // 权限判断函数
import store from '@/store'
export default {
  name: 'ArticleList',
  data() {
    return {
      loading: false,
      formInline: {
        title: '',
        status: '', // 文章状态 0 不显示 1显示
        columnId: '' // 栏目ID
      },
      getData: {
        page: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0,
      multipleSelection: [], // 表格选中
      articleColumn: []
    }
  },
  mounted() {
    this.getArticleType()
    this.getList()
  },
  methods: {
    onSubmit() { // 查询
      this.getData.page = 1
      this.getData = Object.assign(this.getData, this.formInline) // 对象合并
      this.getList()
    },
    editArticle(id) {
      const url = '/article/articleAdd?id=' + id
      this.$router.push(url)
    },
    deleteArticle(id) { // 删除
      deleteArticle(id).then(res => {
        this.$message.success('操作成功！')
        this.getList()
      })
    },
    switchState(val) { // 更新文章状态
      const nd = {
        article_id: val.article_id,
        status: val.release_status,
        isTop: val.is_top
      }
      updateArticleState(nd).then()
    },
    filterType(val) { // 栏目名称转换
      let nd
      this.articleColumn.forEach(item => {
        if (val === item.id) {
          nd = item.name
        }
      })
      return nd
    },
    getArticleType() {
      store.dispatch('article/getArticleType').then(res => {
        this.articleColumn = res
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getList() {
      this.loading = true
      articleList(this.getData).then(res => {
        this.loading = false
        this.tableData = res.list
        this.total = parseInt(res.total)
      })
    },
    clickPage(val) {
      this.getData.page = val
      this.getList()
    },
    checkPermission
  }
}
</script>

<style scoped>

</style>
