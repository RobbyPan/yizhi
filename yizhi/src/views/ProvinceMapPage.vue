<template>
  <div class="com-page">
    <ProvinceMap
      :provinceName="provinceName"
      :provincePath="provincePath"
      :provinceTitle="provinceTitle"
    ></ProvinceMap>
  </div>
</template>

<script>
import ProvinceMap from "../components/ProvinceMap.vue";
export default {
  props: ["provinceName", "provincePath", "provinceTitle"],
  components: { ProvinceMap },
};
</script>

<style lang="less" scoped>
</style>>
