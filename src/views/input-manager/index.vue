<template>
  <div>
    <!-- 模糊查询 -->
    <!-- <div>
      <el-input v-model="query.name" placeholder="请输入查询姓名" @input="getList()">
        <el-button slot="prepend">姓名：</el-button>
      </el-input>
    </div>-->
    <div class="filter-container">
      <el-input
        size="small"
        v-model="query.name"
        placeholder="请输入姓名"
        style="width: 200px;"
        class="filter-item"
        @input="getList"
      />
      <el-button
        class="filter-item"
        size="small"
        type="primary"
        icon="el-icon-search"
        @click="getList"
      >搜索</el-button>
    </div>
    <el-table :data="lists" v-loading="loading" style="width: 100%">
      <el-table-column prop="name" label="姓名" fixed width="100"></el-table-column>
      <el-table-column prop="birthday" label="出生日期" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.birthday |getDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="education" label="学历">
        <template slot-scope="scope">
          <span>{{scope.row.education |getEducation}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">
          <span>{{scope.row.sex |getSex}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="申请状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status |statusTypeFilter">{{scope.row.status |statusFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="{row}">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="edit(row)"
            :disabled="row.status!=0&&row.status!=3&&row.status!=6"
          >编辑</el-button>
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="del(row)"
            :disabled="row.status!=0&&row.status!=3&&row.status!=6"
          >删除</el-button>
          <el-button
            type="success"
            size="small"
            icon="el-icon-s-promotion"
            @click="submitToApprove(row)"
          >提交审核</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑弹层 -->
    <el-dialog title="申请管理-编辑" v-dialogDrag :visible.sync="dialogEditVisible">
      <el-form :model="form">
        <el-form-item label="id" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="form.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" :label-width="formLabelWidth">
          <el-date-picker type="datetime" v-model="form.birthday" />
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-select v-model="form.sex" class="filter-item" placeholder="Please select">
            <el-option
              v-for="item in sexOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancelEdit()">取 消</el-button>
        <el-button type="primary" size="small" @click="update()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.pageNo"
      :page-sizes="[5, 8, 10, 15]"
      :page-size="query.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="rows"
    ></el-pagination>
  </div>
</template>

<script>
import {
  loanList,
  loanUpdate,
  loanDelete,
  loanSubmitToApprove,
} from "@/api/article";
import { sexOptions } from "@/utils/select-data";

export default {
  data() {
    return {
      lists: [], //数据
      rows: 1, //总数量
      pages: 1, //总页数
      query: {
        pageNo: 1, //页码
        pageSize: 5, //条数
        name: "", //查询字段
      },
      form: {
        id: "",
        name: "",
        sex: "",
      },
      formLabelWidth: "120px",
      sexOptions,
      dialogEditVisible: false, //编辑弹层
      loading: true,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      loanList(this.query).then((res) => {
        let { data, pages, rows } = res.data.data.data;
        if (res.data.code == "20000") {
          this.lists = data; //展示数据
          this.pages = pages; //总页数
          this.rows = rows; //总的数量
          this.loading = false;
        }
      });
    },
    //编辑数据的获取
    edit(row) {
      this.dialogEditVisible = true; //弹层显示
      this.form = Object.assign({}, row);
    },
    // 取消编辑
    cancelEdit() {
      this.dialogEditVisible = false;
      this.$message({
        type: "info",
        message: "已取消编辑",
      });
    },
    //编辑提交数据
    update() {
      loanUpdate(this.form).then((res) => {
        if (res.data.code == "20000") {
          this.getList(); //重新调用查询接口
          this.dialogEditVisible = false; //弹层隐藏
          this.$notify({
            title: "编辑成功",
            message: "编辑成功",
            type: "success",
            duration: 2000,
          });
        }
      });
    },
    //删除提示信息
    del(row) {
      this.$confirm(`此操作将永久删除 ${row.name}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.form = Object.assign({}, row);
          this.delData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //删除数据
    delData() {
      loanDelete({ id: this.form.id }).then((res) => {
        if (res.data.code == "20000") {
          this.getList(); //重新调用查询接口
          this.$notify({
            title: "删除成功",
            message: "删除成功",
            type: "success",
            duration: 2000,
          });
        }
      });
    },
    //提交审核
    submitToApprove(row) {
      loanSubmitToApprove({ id: row.id }).then((res) => {
        // console.log(res);
        if (res.code == "20000") {
          this.getList(); //重新调用查询接口
          this.$notify({
            title: "提交成功",
            message: "提交成功",
            type: "success",
            duration: 2000,
          });
        }
      });
    },
    // 条数改变
    handleSizeChange(val = this.query.pageSize) {
      this.query.pageSize = val;
      this.getList(); //重新调用查询接口
    },
    // 页数改变
    handleCurrentChange(val = this.query.pageNo) {
      this.query.pageNo = val;
      this.getList(); //重新调用查询接口
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
.filter-container {
  float: left;
}
.el-dialog {
  border-radius: 8px;
  text-align: left;
  width: 32%;
  height: 368px;
  // overflow-y: scroll;
  .el-dialog__header {
    .el-dialog__title {
      vertical-align: top;
    }
  }
  .el-dialog__body {
    padding: 10px 20px;
    height: 188px;
    overflow-y: scroll;
  }
}
</style>
