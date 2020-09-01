<template>
  <div class="layout-container">
    <Title />
    <el-container class="wrapper">
      <!-- 左侧导航 -->
      <Aside />
      <el-container class="right-container">
        <!-- 头部面包屑 -->
        <Header />
        <!-- 主体展示内容 -->
        <div class="main">
          <Main />
        </div>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { Title, Aside, Header, Main } from "./components";
export default {
  data() {
    return {};
  },
  components: {
    Title,
    Aside,
    Header,
    Main,
  },
};
</script>
<style lang="scss">
.el-container .el-aside {
  line-height: 320px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container.right-container {
  margin-top: 80px;
  margin-left: 200px;
  flex-direction: column;
}
</style>