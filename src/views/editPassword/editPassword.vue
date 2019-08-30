<template>
  <!-- 修改密码 -->
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :md="12">
        <el-form ref="ruleForm" :model="ruleForm" status-icon v-loading="loading" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="原密码" prop="oldPass">
            <el-input v-model="ruleForm.oldPass" type="password" />
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { editPassword } from '@/api/user'
import { removeToken } from '@/utils/auth'
import md5 from 'js-md5'
export default {
  name: 'EditPassword',
  data() {
    var checkOldPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('原密码不能为空'))
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      ruleForm: {
        oldPass: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        oldPass: [
          { validator: checkOldPass, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const nd = {
            userId: this.$store.state.user.userInfo.id,
            oldPass: md5(this.ruleForm.oldPass),
            pass: md5(this.ruleForm.pass)
          }
          this.loading = true
          editPassword(nd).then(res => {
            this.loading = false
            this.$message.success('密码修改成功,请重新登录！')
            this.resetForm('ruleForm')
            setTimeout(res => {
              removeToken()
              this.$router.push('/login')
            }, 1000)
          }).catch(e => {
            console.log(e)
            this.loading = false
            this.ruleForm.oldPass = ''
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
