<template>
  <div class="com-page">
    <ChinaMap
      :provinceName="provinceName"
      :provincePath="provincePath"
      @changeprName="changeprName"
      @changeprPath="changeprPath"
      @changeprTitle="changeprTitle"
    ></ChinaMap>
  </div>
</template>

<script>
import ChinaMap from "../components/ChinaMap.vue";
export default {
  props: [
    "provinceName",
    "provincePath",
    "changeprName",
    "changeprPath",
    "changeprTitle",
  ],
  components: { ChinaMap },
};
</script>

<style lang="less" scoped>
</style>>
