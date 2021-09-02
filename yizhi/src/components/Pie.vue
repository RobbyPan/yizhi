<template>
  <div class="com-container">
    <div class="com-chart" id="bar_ref" ref="bar_ref"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // { value: 2000, name: "累计确诊", increase: "15" },
      // { value: 300, name: "现存确诊", increase: "15" },
      // { value: 1500, name: "累计治愈", increase: "15" },
      // { value: 200, name: "累计死亡", increase: "15" },
      allData: [],
      allValue: [],
      allName: ["累计确诊", "现存确诊", "累计治愈", "累计死亡"],
      allIncrease: [],
    };
  },
  mounted() {
    this.inithelinfo();
    this.getData();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    inithelinfo() {
      //初始化echart对象
      this.echarts = require("echarts");
      this.chartInstance = this.echarts.init(this.$refs.bar_ref, "chalk");
      let option = {};
      this.chartInstance.setOption(option);
    },
    async getData() {
      const { data: allData } = await this.$axios.get("/china");
      this.allData = allData[0];
      this.allValue = [
        +this.allData.totalConfirm,
        +this.allData.totalNowConfirm,
        +this.allData.totalHeal,
        +this.allData.totalDead,
      ];
      this.allIncrease = [
        +this.allData.addConfirm,
        +this.allData.addNowConfirm,
        +this.allData.addHeal,
        +this.allData.addDead,
      ];
      this.screenAdapter();
    },
    //适配分辨率
    screenAdapter() {
      // this.getData();
      const titleFontSize = (this.$refs.bar_ref.offsetWidth / 100) * 3.5;
      const dataFontSize = (this.$refs.bar_ref.offsetWidth / 100) * 2.4;
      const adapterOption = {
        title: {
          text: "全国疫情人数汇总",
          left: "center",
          top: 20,
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        tooltip: {},
        hoverAnimation: false,
        dataset: {
          source: [["product", "累计确诊", "现存确诊", "累计治愈", "累计死亡"]],
        },
        series: [
          {
            type: "pie",
            radius: ["25%", "35%"],
            center: ["30%", "30%"],
            color: {
              type: "linear", // 线性渐变
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgb(245, 126, 132)",
                },
                {
                  offset: 1,
                  color: "rgb(214, 60, 68)",
                },
              ],
            },
            label: {
              show: true,
              position: "center",
              color: "rgb(214, 60, 68)",
              formatter: "{a|{c}}\n\n{b|{b}}\n\n昨日" + this.allIncrease[0],
              fontWeight: "bold",
              fontSize: dataFontSize,
              rich: {
                a: {
                  fontSize: dataFontSize * 1.2,
                  fontWeight: "bold",
                },
                b: {
                  fontSize: dataFontSize * 1.4,
                  fontWeight: "bold",
                },
              },
            },
            data: [
              {
                value: this.allValue[0],
                name: this.allName[0],
              },
            ],
          },
          {
            type: "pie",
            radius: ["25%", "35%"],
            center: ["70%", "30%"],
            encode: {
              itemName: "product",
              value: "现存确诊",
            },
            color: {
              type: "linear", // 线性渐变
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgb(99, 213, 241)",
                },
                {
                  offset: 1,
                  color: "rgb(125, 140, 224)",
                },
              ],
            },
            label: {
              show: true,
              position: "center",
              color: "rgb(125, 140, 224)",
              formatter: "{a|{c}}\n\n{b|{b}}\n\n昨日" + this.allIncrease[1],
              fontWeight: "bold",
              fontSize: dataFontSize,
              rich: {
                a: {
                  fontSize: dataFontSize * 1.2,
                  fontWeight: "bold",
                },
                b: {
                  fontSize: dataFontSize * 1.4,
                  fontWeight: "bold",
                },
              },
            },
            data: [
              {
                value: this.allValue[1],
                name: this.allName[1],
              },
            ],
          },
          {
            type: "pie",
            radius: ["25%", "35%"],
            center: ["30%", "75%"],
            encode: {
              itemName: "product",
              value: "累计治愈",
            },
            color: {
              type: "linear", // 线性渐变
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgb(140, 235, 206)",
                },
                {
                  offset: 1,
                  color: "rgb(47, 202, 33)",
                },
              ],
            },
            label: {
              show: true,
              position: "center",
              color: "rgb(47, 202, 33)",
              formatter: "{a|{c}}\n\n{b|{b}}\n\n昨日" + this.allIncrease[2],
              fontWeight: "bold",
              fontSize: dataFontSize,
              rich: {
                a: {
                  fontSize: dataFontSize * 1.2,
                  fontWeight: "bold",
                },
                b: {
                  fontSize: dataFontSize * 1.4,
                  fontWeight: "bold",
                },
              },
            },
            data: [
              {
                value: this.allValue[2],
                name: this.allName[2],
              },
            ],
          },
          {
            type: "pie",
            radius: ["25%", "35%"],
            center: ["70%", "75%"],
            encode: {
              itemName: "product",
              value: "累计死亡",
            },
            color: {
              type: "linear", // 线性渐变
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgb(201, 189, 191)",
                },
                {
                  offset: 1,
                  color: "rgb(110, 104, 105)",
                },
              ],
            },
            label: {
              show: true,
              position: "center",
              color: "rgb(110, 104, 105)",
              formatter: "{a|{c}}\n\n{b|{b}}\n\n昨日" + this.allIncrease[3],
              fontWeight: "bold",
              fontSize: dataFontSize,
              rich: {
                a: {
                  fontSize: dataFontSize * 1.2,
                  fontWeight: "bold",
                },
                b: {
                  fontSize: dataFontSize * 1.4,
                  fontWeight: "bold",
                },
              },
            },
            data: [
              {
                value: this.allValue[3],
                name: this.allName[3],
              },
            ],
          },
        ],
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
  },
};
</script>

<style lang="less" scoped>
</style>
