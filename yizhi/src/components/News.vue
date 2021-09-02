<template>
  <div class="newsbox">
    <h1>疫情资讯</h1>
    <div class="block">
      <el-timeline class="timeline">
        <el-timeline-item
          :timestamp="newsitem.time"
          placement="top"
          color="rgb(108, 190, 236)"
          v-for="(newsitem, index) of news"
          :key="index"
        >
          <a :href="newsitem.link" target="_blank" class="title">
            <el-card>
              <h2>
                {{ newsitem.title }}
              </h2>
              <p class="author">新闻来源:{{ newsitem.author }}</p>
            </el-card>
          </a>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      news: [],
    };
  },
  methods: {
    async getnews() {
      const { data: news } = await this.$axios.get("/news");
      this.news = news;
    },
  },
  mounted() {
    this.getnews();
  },
};
</script>

<style lang="less" scoped>
.newsbox {
  margin: 0 0 0 2px;
}
.block {
  margin: 10px 0 0 0;
}
.title {
  text-decoration: none;
  color: black;
}
.author {
  font-size: 14px;
  margin: 10px 0 0 0;
  color: gray;
}
.timeline {
  padding: 0;
}
/deep/.el-card {
  background-color: rgb(245, 246, 247);
}
/deep/.el-card__body {
  padding: 10px 20px 20px 20px;
}
</style>