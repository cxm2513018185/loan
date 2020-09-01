<template>
  <div class="app-container">
    <el-table :data="list" v-loading="loading" style="width: 100%">
      <el-table-column prop="loan_name" label="姓名"></el-table-column>
      <el-table-column prop="loan_card" label="身份证号码"></el-table-column>
      <el-table-column prop="file_path" label="合同状态">
        <template slot-scope="{row}">
          <el-tag
            :type="row.file_path |statusContractTypeFilter"
          >{{ row.file_path |statusContractFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="{row}">
          <el-button
            size="mini"
            type="primary"
            @click="handleCreate(row)"
            :disabled="row.file_path"
          >生成合同</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDownload(row)"
            :disabled="!row.file_path"
          >下载合同</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.pageNo"
      :page-sizes="[5, 8, 10, 15]"
      :page-size="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import {
  contractList,
  contractCreateFile,
  contractDownload,
} from "@/api/article";
import { getToken } from "@/utils/token";

export default {
  data() {
    return {
      loading: true,
      list: [],
      total: 0, //总数量
      pages: 1, //总页数
      listQuery: {
        pageNo: 1, //当前页码
        pageSize: 5, //条数
        name: "", //查询条件-姓名
      },
      dialogPassVisible: false, //通过弹层
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      contractList(this.listQuery).then((res) => {
        // console.log(res);
        if (res.data.code == "20000") {
          let { data, rows, pages } = res.data.data.data;
          this.list = data; //获取展示的数据
          this.total = rows; //获取总数量
          this.pages = pages; //获取总页数
          this.loading = false;
        }
      });
    },
    //当前条数变化
    handleSizeChange(val = this.listQuery.pageSize) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    //当前页变化
    handleCurrentChange(val = this.listQuery.pageNo) {
      this.listQuery.pageNo = val;
      this.getList();
    },
    //生成合同
    handleCreate(row) {
      contractCreateFile({ id: row.id }).then((res) => {
        if (res.data.code == "20000") {
          this.getList(); //调用查询接口
          this.$notify({
            title: "生成合同",
            message: "生成合同提交成功",
            type: "success",
            duration: 2000,
          });
        }
      });
    },
    //下载合同
    handleDownload(row) {
      contractDownload({ id: row.id }).then((res) => {
        // console.log(res);
        if (res.data.code == "20000") {
          this.$notify({
            title: "下载合同",
            message: "下载合同提交成功",
            type: "success",
            duration: 2000,
          });
          this.downloadUrlFile(this.url + res.data.data.url);
        }
      });
    },
    downloadUrlFile(url) {
      const xhr = new XMLHttpRequest(); //调用XHR  通过请求获取数据流
      xhr.open("GET", url, true);
      xhr.withCredentials = true; //允许携带cookie
      xhr.responseType = "blob"; //响应类型  blob字节流
      xhr.setRequestHeader("token", getToken()); //传入token
      xhr.onload = () => {
        if (xhr.status === 200) {
          // 获取图片blob数据并保存   responseURL
          var filename = xhr.responseURL.substring(
            xhr.responseURL.lastIndexOf("/") + 1
          );
          this.saveAs(filename, xhr.response);
        }
      };
      xhr.send(); //发送
    },
    saveAs(name, data) {
      var urlObject = window.URL; //window对象的URL对象是专门用来将blob或者file读取成一个url的。
      var export_blob = new Blob([data]); //代表二进制类型的大对象,就是Blob对象是二进制数据
      var save_link = document.createElement("a"); //创建a标签
      save_link.href = urlObject.createObjectURL(export_blob); //通过URL.createObjectURL(blob)可以获取当前文件的一个内存URL
      //download是 HTML5 中<a>标签新增的一个属性，此属性会强制触发下载操作，指示浏览器下载 URL 而不是导航到它，并提示用户将其保存为本地文件
      save_link.download = name;
      save_link.click(); //触发a标签单击
    },
  },
};
</script>
