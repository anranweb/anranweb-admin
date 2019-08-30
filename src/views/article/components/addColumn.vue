<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="500px"
    :before-close="handleClose"
  >

    <el-form :model="ruleForm" ref="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="栏目名称：" prop="name">
        <el-input v-model="ruleForm.name" type="text" />
      </el-form-item>
      <el-form-item label="排序等级：" prop="level">
        <el-input v-model="ruleForm.level" type="text" />
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="resetForm('ruleForm')">重 置</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addColumn } from '@/api/article'
export default {
  name: 'AddColumn',
  props: {
    isValid: {
      type: Boolean,
      default: false
    },
    isAdd: { // 是否为新增
      type: Boolean,
      default: true
    },
    defaultData: {}
  },
  data() {
    return {
      dialogVisible: this.isValid,
      title: '新增用户',
      ruleForm: {
        name: '',
        level: '2'
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.anLoad()
  },
  methods: {
    anLoad() {
      if (this.isAdd) {
        this.title = '新增栏目'
      } else {
        this.title = '修改栏目'
        this.ruleForm = this.defaultData
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addColumn(this.ruleForm).then(res => {
            this.$message.success('操作成功！')
            this.handleClose()
            this.$emit('listClick', '')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) { // 表单重置
      this.$refs[formName].resetFields()
    },
    handleClose() {
      this.dialogVisible = false
      this.$emit('update:isValid', false)
      this.resetForm('ruleForm')
    }

  }
}
</script>

<style scoped>

</style>
