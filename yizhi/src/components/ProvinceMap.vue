<template>
  <div class="com-container">
    <div class="com-chart" id="map_ref" ref="promap_ref"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "provincemap",
  props: ["provinceName", "provincePath", "provinceTitle"],
  data() {
    return {
      map: "",
      myChart: "",
      echarts: "",
      mapData: "",
    };
  },
  mounted() {
    this.initEchartMap();
    window.addEventListener("resize", this.screenAdapter);
  },

  beforeUpdate() {
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    //获取地图矢量
    async getMap() {
      var PMap = await axios.get("http://localhost:8081" + this.provincePath);
      this.map = PMap.data;
    },
    async initEchartMap() {
      await this.getMap();
      let allData = await this.$axios.get("/p");
      allData = JSON.parse(JSON.stringify(allData.data));
      this.echarts = require("echarts");
      this.myChart = this.echarts.init(this.$refs.promap_ref, "chalk");
      //获取省份地图矢量数据
      this.echarts.registerMap(this.provinceName, this.map);
      allData.map(function (i) {
        i.name = i.uaName;
        i.value = i.totalConfirm;
        return i;
      });
      let options = {
        title: {
          text: `${this.provinceTitle}现存确诊分布图`,
          left: "center",
          top: 20,
        },
        tooltip: {
          formatter: function (params) {
            if (params.data) {
              return (
                params.name +
                "<br>" +
                "累计确诊:" +
                params.data.totalConfirm +
                "<br>" +
                "现存确诊:" +
                params.data.totalNowConfirm +
                "<br>" +
                "累计治愈:" +
                params.data.totalHeal +
                "<br>" +
                "累计死亡:" +
                params.data.totalDead +
                "<br>" +
                "今日新增:" +
                params.data.todayConfirm
              );
            } else {
              return <p>暂无该城市数据</p>;
            }
          },
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              pixelRatio: 4,
            },
          },
        },
        visualMap: {
          itemHight: 10,
          itemWidth: 15,
          textGap: 10,
          show: true,
          left: "75%",
          bottom: "5%",
          showLabel: true,
          pieces: [
            {
              gte: 1000,
              label: ">= 1000",
              color: "#3c57ce",
            },
            {
              gte: 500,
              lt: 999,
              label: "500 - 999",
              color: "#6f83db",
            },
            {
              gte: 100,
              lt: 499,
              label: "100 - 499",
              color: "#9face7",
            },
            {
              gte: 10,
              lt: 99,
              label: "10 - 99",
              color: "#b8c4f5",
            },
            {
              lt: 10,
              label: "<10",
              color: "#d2d8f0",
            },
          ],
        },
        series: [
          {
            type: "map",
            map: this.provinceName,
            label: {
              show: true,
              fontSize: "14",
              color: "rgba(0,0,0,0.7)",
            },
            emphasis: {
              borderColor: "rgba(0, 0, 0, 0.2)",
              itemStyle: {
                areaColor: "#f2d5ad",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                borderWidth: 0,
              },
            },
            data: allData,
          },
        ],
      };

      this.myChart.setOption(options);
    },
    //适配分辨率
    async screenAdapter() {
      const titleFontSize = (this.$refs.promap_ref.offsetWidth / 100) * 3.4;
      let adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
      };
      this.myChart.setOption(adapterOption);
      this.myChart.resize();
    },
  },
  watch: {
    provinceName() {
      this.initEchartMap();
    },
  },
};
</script>

<style>
</style>