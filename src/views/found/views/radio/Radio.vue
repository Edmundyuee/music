<template>
  <div class="radio">
    <carousel></carousel>
    <h2>精彩节目推荐</h2>
    <div class="list">
      <div
        class="music_top"
        v-for="(item, index) in radioList"
        :key="index"
        @click="playMusic(item.id)"
      >
        <div class="list_img">
          <img :src="item.picUrl" alt="" />
        </div>
        <div class="music_name_wai">
          <span>{{ item.rcmdText }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from "./carousel/Carousel";
import { getRadioRecommend } from "@/network/found";
export default {
  name: "Radio",
  data() {
    return {
      radioList: [],
    };
  },
  components: {
    Carousel,
  },
  methods: {
    playMusic(id) {
      this.$store.commit("changeMusic", id);
    },
  },
  mounted() {
    getRadioRecommend(4)
      .then((result) => {
        console.log(result);
        this.radioList = result.data;
      })
      .catch((err) => {});
  },
};
</script>

<style scoped>
.radio {
  width: 90%;
  margin: 0px auto 120px;
  z-index: 0;
  position: relative;
}
.music_top {
  width: 100%;
  padding: 5px 0px;
}
.list_img {
  display: inline-block;
  flex: 2;
  padding: 0px 20px 0px 0px;
}
.music_name_wai {
  display: inline-block;
  flex: 3;
  width: 50%;
  height: 120px;
  padding: 10px 0px;
  box-sizing: border-box;
  vertical-align: top;
}
.music_name_wai > span {
  display: block;
  margin-top: 20px;
  line-height: 33px;
  font-size: 14px;
  color: rgb(155, 155, 155);
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 这里是超出几行省略 */
  overflow: hidden;
}
.list_img > img {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  border: 1px solid #ccc;
}
</style>