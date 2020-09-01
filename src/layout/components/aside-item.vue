<template>
  <div v-if="item.path!='/' && item.path!='/login'">
    <!-- 没有子菜单 -->
    <el-menu-item :index="resolvePath(basePath)" v-if="hasChild(item.children,item)">
      <i :class="d && d.meta && d.meta.icon"></i>
      <span>{{d && d.meta && d.meta.title}}</span>
    </el-menu-item>
    <!-- 有子菜单 -->
    <el-submenu v-else :index="basePath">
      <template slot="title">
        <i :class="item.meta.icon"></i>
        <span>{{item.meta.title}}</span>
      </template>
      <aside-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      ></aside-item>
    </el-submenu>
  </div>
</template>

<script>
import path from "path";

export default {
  name: "AsideItem",
  props: ["item", "basePath"],
  data() {
    return {
      d: null,
    };
  },
  methods: {
    hasChild(children = [], item) {
      const showingChildren = children.filter((v) => {
        if (!v) {
          //判断v中是否存在
          return false; //过滤这条数据
        } else {
          this.d = v;
          return true; //添加这条数据
        }
      });
      if (showingChildren.length === 0) {
        this.d = { ...item };
        return true;
      } else if (showingChildren.length === 1) {
        //或者子级长度为1
        return true;
      } else {
        return false;
      }
    },
    resolvePath(routePath) {
      //path.resolve('/foo/bar', './baz')   // returns '/foo/bar/baz'
      return path.resolve(this.basePath, routePath);
    },
  },
};
</script>
