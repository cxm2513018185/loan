<template>
  <div>
    <!-- 展示框 -->
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col" v-for="(list,i) in lists" :key="i">
        <div class="card-panel" :style="{background:list.color}">
          <div class="card-panel-description">
            <div class="card-panel-text">
              {{list.name}}
              <br />
              <CountTo
                :start-val="0"
                :end-val="list.number"
                :duration="list.duration"
                class="card-panel-num"
              />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 图表 -->
    <el-row style="background:#c7e4db;margin-bottom:30px;">
      <div id="mychart" style="width:100%;height:300px;"></div>
    </el-row>
    <el-row style="background:#e2cacc;margin-bottom:30px;">
      <BarChart />
    </el-row>
  </div>
</template>

<script>
import BarChart from "./components/bar-chart";
import CountTo from "vue-count-to";
import echarts from "echarts";

export default {
  data() {
    return {
      lists: [
        {
          name: "最高可借金额",
          color: "#67ca3a",
          number: 99999,
          duration: 2000,
        },
        { name: "回报率", color: "#f60", number: 120327, duration: 3000 },
        { name: "业绩领跑", color: "#f56c6c", number: 643500, duration: 1500 },
        {
          name: "安稳底薪站队",
          color: "#409eff",
          number: 120000,
          duration: 3500,
        },
      ],
      chart: null,
      echartData: [820, 932, 901, 934, 1290, 1330, 1320],
    };
  },
  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById("mychart"));
      // 指定图表的配置项和数据
      var option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.echartData,
            type: "bar",
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(option);
    },
  },
  mounted() {
    //挂载完成
    this.initChart();
    window.onresize = () => {
      //根据窗口大小自适应
      this.chart.resize();
    };
  },
  components: {
    CountTo,
    BarChart,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
.panel-group {
  .card-panel-col {
    margin-bottom: 30px;
  }

  .card-panel {
    height: 100px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    .card-panel-description {
      font-weight: bold;
      text-align: center;
      margin-top: 20px;

      .card-panel-text {
        line-height: 26px;
        color: #333;
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        color: #fff;
        font-size: 20px;
      }
    }
  }
}
</style>
