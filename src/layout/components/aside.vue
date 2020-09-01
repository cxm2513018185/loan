<template>
  <el-aside width="200px">
    <el-menu router>
      <AsideItem
        v-for="route in permission_routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-aside>
</template>
<script>
import { mapGetters } from "vuex";
import AsideItem from "./aside-item";
export default {
  components: { AsideItem },
  computed: {
    ...mapGetters(["permission_routes"]),
  },
};
</script>
<style lang="scss" scoped>
.el-aside {
  position: fixed;
  margin-top: 80px;
  border-right: 1px solid #ccc;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 634px;
  overflow: hidden;
}

.el-container .el-aside {
  line-height: 320px;
}

.el-menu-item,
.el-menu,
.el-submenu {
  text-align: left;
}
</style>