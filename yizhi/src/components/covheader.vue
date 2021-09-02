<template>
  <div id="covheader">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#78b7b5"
      text-color="#fff"
      router
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/">疫情可视化分析</el-menu-item>
      <el-menu-item index="/mygroup">人员管理</el-menu-item>
      <el-submenu index="3">
        <template slot="title">个人中心</template>
        <el-menu-item index="/dailysign">每日打卡</el-menu-item>
        <el-menu-item index="/signhistory">打卡记录</el-menu-item>
      </el-submenu>
      <el-menu-item @click="login"><el-avatar> user </el-avatar></el-menu-item>
      <Login ref="Login" />
    </el-menu>
    <div class="right_head">
      <img src="../assets/logo2.png" style="object-fit: cover" />
    </div>
  </div>
</template>

<script>
import Login from "../components/Login.vue";
export default {
  components: {
    Login,
  },
  name: "covheader",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    login() {
      this.$refs.Login.Dshow();
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.right_head {
  position: absolute;
  right: 0;
  top: 0;
}
.right_head img {
  width: 70px;
  height: 60px;
}
</style>
