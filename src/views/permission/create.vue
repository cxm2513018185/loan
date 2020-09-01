<template>
  <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="account">
        <el-input v-model="ruleForm.account" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model.trim="ruleForm.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input type="password" v-model.trim="ruleForm.password2" placeholder="确认密码"></el-input>
      </el-form-item>
      
      <el-form-item label="权限分配" prop="type">
        <el-radio-group v-model="ruleForm.role_id">
          <el-radio label="2">销售人员</el-radio>
          <el-radio label="3">初审人员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">创建管理员</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {permissionCreateUser} from '@/api/article'

export default {
  name: 'Theme',
  data() {
    var validatePass = (rule, value, callback) => {            
          if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.password) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
    };
    return {
      ruleForm: {
          account: '',
          password: '',
          password2: '',
          role_id: '2',
        },
        rules: {
          account: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18个字符', trigger: 'blur' }
          ], 
          password2: [
            {required: true,validator: validatePass, trigger: 'blur' }
          ],
          role_id: [
            { required: true, message: '请选择权限', trigger: 'change' }
          ],
        }
    }
  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          let {account,password,role_id} = this.ruleForm;
          if (valid) {
            var temp = {
                account: this.ruleForm.account,
                password: this.ruleForm.password,
                role_id: this.ruleForm.role_id
              };
            permissionCreateUser(temp).then((data) => {
              this.$router.push('/permission/list'); //跳转到申请管理
              this.$notify({
                title: '创建成功',
                message: 'Created Successfully',
                type: 'success',
                duration: 2000
              })
            })
          } else {
              console.log('error submit!!');
              return false;
            }
        });
    },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

