<template>
  <!-- 头部面包屑 -->
  <el-header>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, i) in items" :key="i" :to="item.path">
        <i :class="item.meta.icon"></i>
        {{item.meta.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </el-header>
</template>
<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    getBreadcrumb() {
      this.items = this.$route.matched.filter((item) => {
        return item.meta && item.meta.title;
      });
    },
  },
  created() {
    this.getBreadcrumb();
  },
  watch: {
    $route(to, from) {
      this.getBreadcrumb();
    },
  },
};
</script>
<style lang="scss" scoped>
.el-header {
  position: fixed;
  width: 100%;
  // background-color: #d9ecff;
  border-bottom: 1px solid #eee;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-breadcrumb {
  line-height: 60px;
}
</style>