<template>
  <div class="main">
    <Nav></Nav>
    <div class="map">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="6"
          ><div class="F box"><PiePage></PiePage></div
        ></el-col>
        <el-col :xs="24" :sm="24" :md="12"
          ><div class="S box">
            <ChinaMapPage
              :provinceName="provinceName"
              :provincePath="provincePath"
              :changeprName="changeprName"
              :changeprPath="changeprPath"
              :changeprTitle="changeprTitle"
            ></ChinaMapPage></div
        ></el-col>
        <el-col :xs="24" :sm="24" :md="6"
          ><div class="T box">
            <ProvinceMapPage
              :provinceName="provinceName"
              :provincePath="provincePath"
              :provinceTitle="provinceTitle"
            ></ProvinceMapPage></div
        ></el-col>
      </el-row>
    </div>
    <div class="trend">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12"
          ><div class="FF box"><AddupPage></AddupPage></div
        ></el-col>
        <el-col :xs="24" :sm="24" :md="12"
          ><div class="SS box"><NewwavePage></NewwavePage></div
        ></el-col>
      </el-row>
    </div>
    <div class="news">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="{ span: 12, offset: 6 }"
          ><div class="Nbox"><News></News></div
        ></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Nav from "../components/covheader.vue";
import AddupPage from "../views/AddupPage.vue";
import NewwavePage from "../views/NewwavePage.vue";
import PiePage from "../views/PiePage.vue";
import ProvinceMapPage from "../views/ProvinceMapPage.vue";
import ChinaMapPage from "../views/ChinaMapPage.vue";
import News from "../views/NewsPage.vue";
import "element-ui/lib/theme-chalk/display.css";
export default {
  components: {
    Nav,
    AddupPage,
    NewwavePage,
    PiePage,
    ProvinceMapPage,
    ChinaMapPage,
    News,
  },
  data() {
    return {
      provinceName: "hubei",
      provincePath: "/static/map/json/province/hubei.json",
      provinceTitle: "湖北",
    };
  },
  methods: {
    changeprName(name) {
      this.provinceName = name;
    },
    changeprPath(path) {
      this.provincePath = path;
    },
    changeprTitle(Title) {
      this.provinceTitle = Title;
    },
  },
};
</script>

<style lang="less" >
.main {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.box {
  border: 1px solid #e5e9ef;
  border-radius: 3px;
}
.F {
  height: 550px;
  margin: 10px 0 0 1px;
  background-color: #fff;
}
.S {
  height: 550px;
  margin: 10px 0 0 0;
  background-color: #fff;
}
.T {
  height: 550px;
  margin: 10px 1px 0 0;
  background-color: #fff;
}
.FF {
  height: 390px;
  margin: 10px 0 0 1px;
  background-color: #fff;
}
.SS {
  height: 390px;
  margin: 10px 1px 0 0;
  background-color: #fff;
}
.news {
  margin: 20px 0 0 0;
}
</style>