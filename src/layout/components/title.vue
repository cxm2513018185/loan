<template>
  <div class="title">
    <img :src="logo" style="vertical-align:middle" />
    信贷审核管理平台
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <i class="el-icon-s-custom"></i>
        {{username}}
        <i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item class="clearfix">
          <span @click="logout">退出</span>
          <!-- <el-badge class="mark" :value="12" /> -->
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { logout } from "@/api/article";
import { removeToken, getUsername, removeUsername } from "@/utils/token";
export default {
  data() {
    return {
      logo: require("@/assets/logo.png"),
      username: "",
    };
  },
  methods: {
    getUser() {
      this.username = getUsername();
    },
    logout() {
      this.$store
        .dispatch("Logout")
        .then((d) => {
          this.$router.push("/login");
        })
        .catch((error) => {});
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>
<style lang="scss" scoped>
.title {
  position: fixed;
  padding-left: 60px;
  width: 100%;
  height: 80px;
  line-height: 80px;
  border-bottom: 1px solid #ccc;
  text-align: left;
  color: #409eff;
  font-size: 25px;
  font-weight: bold;
  background-color: #545c64;
}

.el-dropdown {
  margin-right: 80px;
  float: right;
  vertical-align: top;
  color: #fff;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-dropdown-link {
  font-size: 16px;
}
.el-dropdown-link:hover {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>