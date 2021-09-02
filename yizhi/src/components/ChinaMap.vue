<template>
  <div class="com-container">
    <div class="com-chart" id="map_ref" ref="map_ref"></div>
  </div>
</template>

<script>
import CMap from "../../public/static/map/json/china.json";
import { getProvinceMapInfo } from "../utils/map_utils";
export default {
  name: "chinamap",
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
    //初始化中国地图
    async initEchartMap() {
      let allData = await this.$axios.get("/chinamap");
      allData = JSON.parse(JSON.stringify(allData.data));
      this.echarts = require("echarts");
      this.myChart = this.echarts.init(this.$refs.map_ref, "chalk");
      this.echarts.registerMap("china", { geoJSON: CMap });
      allData.map(function (i) {
        i.name = i.upName;
        i.value = i.totalConfirm;
        return i;
      });
      const options = {
        title: {
          text: "全国现存确诊分布图",
          left: "center",
          top: 20,
        },
        visualMap: {
          show: true,
          left: "5%",
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
        tooltip: {
          formatter: function (params) {
            if (params.data) {
              return (
                params.name +
                "<br>" +
                "现存确诊:" +
                params.data.totalNowConfirm +
                "<br>" +
                "累计确诊:" +
                params.data.totalConfirm +
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
              return <p>暂无该省份数据</p>;
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
        series: [
          {
            type: "map",
            map: "china",
            selectedMode: "false", //是否允许选中多个区域
            zoom: 1,
            roam: true,
            scaleLimit: {
              min: 1,
              max: 3,
            },
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
      this.myChart.on("click", (arg) => {
        const provinceInfo = getProvinceMapInfo(arg.name);
        this.$emit("changeprName", provinceInfo.key);
        this.$emit("changeprPath", provinceInfo.path);
        this.$emit("changeprTitle", arg.name);
      });
    },

    //适配分辨率
    async screenAdapter() {
      const titleFontSize = (this.$refs.map_ref.offsetWidth / 100) * 2.4;
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
};
</script>

<style>
</style>