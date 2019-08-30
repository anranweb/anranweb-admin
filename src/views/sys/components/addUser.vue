<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="500px"
    :before-close="handleClose"
  >

    <el-form :model="ruleForm" ref="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名：" prop="name">
        <el-input v-model="ruleForm.name" type="text" :disabled="!isAdd" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="ruleForm.password" type="password" />
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input v-model="ruleForm.email" type="text" />
      </el-form-item>
      <el-form-item label="权限：">
        <el-checkbox-group v-model="ruleForm.rolesCheckBox">
          <el-checkbox v-for="(item,index) in rolesName" :label="item.name" :key="index" name="type" />
        </el-checkbox-group>
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="resetForm('ruleForm')">重 置</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { rolesName } from '@/api/data'
import { editUser } from '@/api/user'
import md5 from 'js-md5'
export default {
  name: 'AddUser',
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
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请设置密码'))
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error('密码长度为6至20个字符之间'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: this.isValid,
      title: '新增用户',
      ruleForm: {
        name: '',
        password: '',
        email: '',
        roles: '',
        grade: 1,
        rolesCheckBox: []
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, validator: validatePass, trigger: 'blur' }]
      },
      rolesName: rolesName()
    }
  },
  mounted() {
    this.anLoad()
  },
  methods: {
    anLoad() {
      if (this.isAdd) {
        this.title = '新增用户'
      } else {
        this.title = '修改用户信息'
        this.ruleForm = this.defaultData
        this.changeDataVis()
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.changeData()
          const nd = Object.assign({}, this.ruleForm)
          nd.password = md5(this.ruleForm.password)
          editUser(nd).then(res => {
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
    },
    changeData() { // 数据提交前转换
      const od = this.rolesName
      const cd = this.ruleForm.rolesCheckBox
      const array = []
      cd.forEach(item => {
        for (let i = 0; i < od.length; i++) {
          if (item === od[i].name) {
            array.push(od[i].value)
          }
        }
      })
      this.ruleForm.roles = array.toString()
    },
    changeDataVis() { // 数据回显转换
      const od = this.rolesName
      const cd = this.ruleForm.roles.split(',')
      const array = []
      cd.forEach(item => {
        for (let i = 0; i < od.length; i++) {
          if (item === od[i].value) {
            array.push(od[i].name)
          }
        }
      })
      this.ruleForm.rolesCheckBox = array
    }
  }
}
</script>

<style scoped>

</style>
