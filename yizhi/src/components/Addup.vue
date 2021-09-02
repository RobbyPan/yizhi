<template>
  <div class="com-container">
    <div class="com-chart" ref="newwava_ref"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      echarts: null,
      myChart: null,
      chartInstance: null,
      allData: [], // 服务器返回的数据
      xtime: [
        "2021-7-1",
        "2021-7-2",
        "2021-7-3",
        "2021-7-4",
        "2021-7-5",
        "2021-7-5",
        "2021-7-6",
        "2021-7-7",
        "2021-7-8",
        "2021-7-9",
        "2021-7-10",
        "2021-7-11",
        "2021-7-12",
        "2021-7-13",
        "2021-7-14",
        "2021-7-15",
        "2021-7-16",
        "2021-7-17",
        "2021-7-18",
        "2021-7-19",
        "2021-7-20",
        "2021-7-21",
        "2021-7-22",
        "2021-7-23",
        "2021-7-24",
        "2021-7-25",
        "2021-7-26",
        "2021-7-27",
        "2021-7-28",
        "2021-7-29",
        "2021-7-30",
        "2021-7-31",
        "2021-8-1",
        "2021-8-2",
        "2021-8-3",
        "2021-8-4",
        "2021-8-5",
        "2021-8-6",
        "2021-8-7",
        "2021-8-8",
        "2021-8-9",
        "2021-8-10",
        "2021-8-11",
        "2021-8-12",
        "2021-8-13",
        "2021-8-14",
        "2021-8-15",
        "2021-8-16",
        "2021-8-17",
        "2021-8-18",
        "2021-8-19",
        "2021-8-20",
        "2021-8-21",
      ],
      Confirm: [
        1423, 2714, 3554, 4586, 5806, 7153, 9043, 11177, 13522, 16678, 19665,
        22112, 26552, 29666, 33227, 38221, 52611, 53596, 63264, 63666, 64222,
        65222, 65355, 65366, 65897, 65999, 66152, 66523, 66555, 66666,
      ],
      Suspect: [
        1215, 151, 1212, 541, 212, 512, 51, 102, 452, 841, 861, 21, 6412, 641,
        120, 150, 122, 211, 620, 210, 12, 144, 134, 121, 2, 620, 12, 33,
      ],
      Cure: [
        14, 27, 35, 45, 58, 71, 90, 111, 135, 166, 196, 2211, 2655, 2966, 3322,
        5000, 6822, 7524, 8065, 10582, 15054, 26854, 36575, 48247, 58382, 62872,
        63999, 64824, 66111, 66222,
      ],
      Dead: [
        76, 88, 99, 100, 124, 134, 144, 154, 168, 170, 180, 200, 250, 300, 356,
        450, 590, 750, 900, 1240, 1600, 1750, 1870, 1899, 1910, 1950, 2051,
        2169, 2210, 2340, 2610, 2920, 3152,
      ],
    };
  },
  mounted() {
    this.innitChart();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    //初始化图表信息
    innitChart() {
      this.echarts = require("echarts");
      this.myChart = this.echarts.init(this.$refs.newwava_ref);
      var initoption = {
        backgroundColor: "#fff",
        title: {
          text: "全国累计病例趋势图",
          left: "center",
          textStyle: {
            fontSize: 50,
          },
          top: "2%",
          bottom: "2%",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            textStyle: {
              color: "#fff",
            },
          },
        },
        grid: {
          borderWidth: 0,
          top: "12%",
          left: "3%",
          right: "3%",
          bottom: "8%",
          textStyle: {
            color: "#fff",
          },
          containLabel: true,
        },
        legend: {
          x: "10%",
          top: "8%",
          textStyle: {
            color: "rgb(32, 38, 47)",
          },
          data: ["确诊", "疑似", "治愈", "死亡"],
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "rgba(32, 38, 47,0.8)",
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: true,
            },
            axisLine: {
              lineStyle: {
                color: "rgba(32, 38, 47,0.8)",
              },
            },
          },
        ],
        dataZoom: [
          {
            show: true,
            height: "3%",
            // xAxisIndex: [0],
            bottom: "3%",
            start: 40,
            end: 100,
            handleIcon:
              "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
            handleSize: "120%",
            handleStyle: {
              color: "#5B3AAE",
            },
            textStyle: {
              color: "rgba(204,187,225,0.5)",
            },
            fillerColor: "rgba(67,55,160,0.4)",
            borderColor: "rgba(204,187,225,0.5)",
          },
          {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35,
          },
        ],
        series: [
          {
            name: "确诊",
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              color: "rgb(255, 0, 0)",
            },
          },
          {
            name: "疑似",
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              color: "rgb(255, 181, 0)",
            },
            markPoint: {
              label: {
                color: "#fff",
              },
              symbolSize: 50,
              data: [
                {
                  type: "max",
                  name: "最大值",
                },
                {
                  type: "min",
                  name: "最小值",
                },
              ],
            },
          },
          {
            name: "治愈",
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              color: "rgb(78, 243, 9)",
            },
            markPoint: {
              label: {
                color: "#fff",
              },
              symbolSize: 60,
              data: [
                {
                  type: "max",
                  name: "最大值",
                },
              ],
            },
          },
          {
            name: "死亡",
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              color: "rgb(153, 153, 153)",
            },
          },
        ],
      };
      this.myChart.setOption(initoption);
      this.getData();
    },
    async getData() {
      const { data: allData } = await this.$axios.get("/china");
      this.allData = allData;
      this.updataChart();
    },
    //通过axios获取数据
    updataChart() {
      const xtime = this.allData.map((item) => {
        return item.LastUpdateTime.slice(0, 10);
      });
      this.xtime = xtime.reverse();
      const Confirm = this.allData.map((item) => {
        return item.totalConfirm;
      });
      this.Confirm = Confirm.reverse();
      const Suspect = this.allData.map((item) => {
        return item.totalSuspect;
      });
      this.Suspect = Suspect.reverse();
      const Cure = this.allData.map((item) => {
        return item.totalHeal;
      });
      this.Cure = Cure.reverse();
      const Dead = this.allData.map((item) => {
        return item.totalDead;
      });
      this.Dead = Dead.reverse();
      var dataOption = {
        xAxis: [
          {
            data: this.xtime,
          },
        ],
        series: [
          {
            data: this.Confirm,
          },
          {
            data: this.Suspect,
          },
          {
            data: this.Cure,
          },
          {
            data: this.Dead,
          },
        ],
      };
      this.myChart.setOption(dataOption);
    },
    screenAdapter() {
      const SIZE = (this.$refs.newwava_ref.offsetWidth / 100) * 1.8;
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: SIZE,
          },
        },
      };
      this.myChart.setOption(adapterOption);
      this.myChart.resize();
    },
  },
};
</script>
