<template>
  <div class="app-container">
    <!--创建文章-->
    <div v-loading="loading">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="ruleForm.title" maxlength="50" style="width: 100%" />
        </el-form-item>
        <el-form-item label="">
          <el-checkbox-group v-model="ruleForm.checkbox">
            <el-checkbox label="立即发布" name="type" />
            <el-checkbox label="置顶" name="type" />
          </el-checkbox-group>
        </el-form-item>

        <div class="an-inline-form">
          <el-form-item label="所属栏目" prop="author">
            <el-select v-model="ruleForm.columnId" placeholder="请选择所属栏目">
              <el-option v-for="item in articleColumn" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="ruleForm.author" maxlength="20" />
          </el-form-item>
        </div>

        <el-form-item label="文章摘要" prop="article_abstract">
          <el-input v-model="ruleForm.article_abstract" type="textarea" maxlength="500" />
        </el-form-item>

        <el-form-item label="正文">
          <tinymce v-model="ruleForm.article_content" :height="400" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button @click="reLoad">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import tinymce from '@/components/Tinymce'
import { addArticle, articleInfo } from '@/api/article'
import store from '@/store'
export default {
  name: 'ArticleAdd',
  components: {
    tinymce
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    const newForm = {
      article_id: '',
      title: '',
      author: '佚名',
      article_abstract: '',
      article_content: '',
      columnId: '',
      checkbox: ['立即发布']
    }
    return {
      loading: false,
      ruleForm: newForm,
      articleColumn: [], // 栏目类型
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        author: [],
        article_abstract: [
          { required: true, message: '请输入摘要', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.anLoad()
  },
  methods: {

    anLoad() {
      this.getTypeArticle()
      if (this.id !== '') {
        this.ruleForm.article_id = this.id
        this.getData()
      }
    },

    getTypeArticle() { // 获取栏目
      store.dispatch('article/getArticleType').then(res => {
        this.articleColumn = res
        this.ruleForm.columnId = res[0].id // 默认选中第一个
      })
    },

    getData() {
      this.loading = true
      articleInfo(this.id).then(res => {
        this.loading = false
        const nd = res
        nd.columnId = res.article_column_id
        nd.checkbox = []
        try {
          if (res.is_top === 1) {
            nd.checkbox.push('置顶')
          }
          if (res.release_status === 1) {
            nd.checkbox.push('立即发布')
          }
        } catch (e) { console.log(e) }
        this.ruleForm = nd
      })
    },

    submitForm(formName) {
      const successFun = res => {
        this.resetForm('ruleForm')
        this.$message.success('操作成功！')
        setTimeout(() => {
          this.$router.push({ path: '/article/index' })
        }, 300)
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const nd = this.ruleForm
          nd.status = 0
          nd.isTop = 0
          if (nd.checkbox.indexOf('立即发布') >= 0) nd.status = 1
          if (nd.checkbox.indexOf('置顶') >= 0) nd.isTop = 1
          delete nd.checkbox
          addArticle(nd).then(res => {
            successFun()
          })
        } else {
          return false
        }
      })
    },

    resetForm(formName) { // 表单重置
      this.$refs[formName].resetFields()
    },

    reLoad() { // 取消
      this.resetForm('ruleForm')
      // this.$router.push({ path: '/article/index' })
    }

  }
}
</script>

<style lang="scss">
.an-from-hang{
  width: 100%;
  .el-form-item__label{
    display: block;
    float: left;
  }
  .el-form-item__content{
    display: block;
    margin-left: 100px;
  }
}
  .an-inline-form{
    .el-form-item{
      display: inline-block;
      vertical-align: top;
    }
  }
</style>
