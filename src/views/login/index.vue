<template>
  <div class="login-container">
    <div class="container">
      <div class="wrapper">
        <h1 class="title">
          <img src="../../assets/logo.png" style="vertical-align:middle" />
          信贷审核管理平台
        </h1>
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label" @click="loginMethod=1">
              <i class="el-icon-s-promotion"></i> 账号密码登录
            </span>
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              class="demo-ruleForm"
              v-show="loginMethod==1"
            >
              <el-form-item prop="account">
                <el-input
                  type="text"
                  placeholder="请输入用户名"
                  v-model="ruleForm.account"
                  autocomplete="off"
                >
                  <el-button slot="prepend" icon="el-icon-s-custom" class="icon"></el-button>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  placeholder="请输入密码"
                  v-model="ruleForm.password"
                  autocomplete="off"
                  show-password
                >
                  <el-button slot="prepend" icon="el-icon-lock" class="icon"></el-button>
                </el-input>
              </el-form-item>
              <!-- <el-form-item>
                <el-input type="text" placeholder="请输入验证码" autocomplete="off">
                  <el-button slot="append" class="code">8888</el-button>
                </el-input>
              </el-form-item>
              <span class="forget-password">
                <a href="###">忘记密码</a>
              </span>-->
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" class="login-btn">登录</el-button>
                <!-- <br />
                <el-button class="register-btn">注册</el-button>-->
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- <el-tab-pane>
            <span slot="label" @click="loginMethod=2">
              <i class="el-icon-s-promotion"></i> 手机验证码登录
            </span>
            <div v-show="loginMethod==2">手机验证码登录</div>
          </el-tab-pane>-->
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from "@/api/article";
import { setToken } from "@/utils/token";

export default {
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (this.ruleForm.checkaccount !== "") {
          this.$refs.ruleForm.validateField("checkaccount");
        }
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPassword !== "") {
          this.$refs.ruleForm.validateField("checkPassword");
        }
        callback();
      }
    };
    return {
      loginMethod: 1,
      ruleForm: {
        account: "admin",
        password: "admin@123",
      },
      rules: {
        account: [{ validator: validateAccount, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // login(this.ruleForm).then((res) => {
          //   // console.log(res);
          //   let { code, data } = res.data;
          //   if (code && code == 20000) {
          //     // 登录成功获取token的值并存储
          //     setToken(data.token);
          //     // 存储用户名
          //     sessionStorage.setItem("username", this.ruleForm.account);
          //     // 跳转
          //     this.$router.push("/home");
          //   }
          // });
          this.$store
            .dispatch("Login", this.ruleForm)
            .then((d) => {
              this.$router.push("/home"); //跳转
            })
            .catch(() => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss">
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../assets/bg.png") repeat-x;
  background-size: 100% 100%;
  background-position-x: -220px;
  .container {
    position: absolute;
    right: 40px;
    top: 50%;
    transform: translateY(-60%);
    padding: 30px;
    border-radius: 8px;
    width: 450px;
    height: 348px;
    opacity: 0.75;
  }
  .wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
  .title {
    padding: 5px 0 20px;
    color: #409eff;
    // font-size: 24px;
  }
  .icon {
    font-size: 16px;
  }
  .login-btn,
  .register-btn {
    width: 100%;
  }
  .login-btn {
    margin-bottom: 8px;
  }
  .el-tabs {
    box-shadow: 8px 12px 16px rgba($color: #000000, $alpha: 0.65);
  }
  .el-tabs__item {
    cursor: inherit;
  }
  .el-tabs__item > span {
    cursor: pointer;
    font-size: 16px;
  }
  .el-tabs__header {
    margin-bottom: 30px;
  }
  .forget-password {
    float: left;
    padding: 0 5px 5px;
  }
  .code {
    width: 100px;
    span {
      color: #409eff;
      font-size: 20px;
    }
  }
}
</style>
