<template>
  <div class="app-container">
    <el-table :data="list" v-loading="loading" style="width: 100%">
      <el-table-column prop="account" label="用户名"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="reg_time" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.reg_time | getDate }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="creator" label="创建者"></el-table-column>
      <el-table-column prop="role_name" label="权限分配">
        <template slot-scope="scope">
          <span>{{ scope.row.role_name | getRole }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { permissionUserlist } from "@/api/article";

export default {
  data() {
    return {
      loading: true,
      list: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      permissionUserlist().then((res) => {
        // console.log(res);
        if (res.data.code == "20000") {
          this.list = res.data.data; //获取展示的数据
          this.loading = false;
        }
      });
    },
  },
};
</script>
