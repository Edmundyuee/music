<template>
  <div class="sole">
    <div class="mv_title">
      <h2>独家视频</h2>
      <span class="more" @click="more_mvs">更多></span>
    </div>
    <div class="mv_list">
      <span
        v-for="(item, index) in res"
        :key="index"
        @click="broadPlay(item.id)"
      >
        <div class="images">
          <img :src="item.sPicUrl" alt="" />
          <span class="title newtitle">
            {{ item.name }}
          </span>
          <span class="artist_name">
            {{ item.artistName }}
          </span>
          <div class="svg_img">
            <img src="@/assets/img/mv_write.svg" alt="" />
          </div>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
import { broadList } from "@/network/found";
export default {
  name: "sole",
  data() {
    return {
      res: "",
    };
  },
  methods: {
    more_mvs(){
      this.$router.replace('/mv/whole');
    },
    broadPlay(id) {
      this.$store.commit("mvPlayID", id);
      console.log(id);
      this.$store.commit("isMvActiveChange", true);
    },
  },
  created() {
    broadList(20)
      .then((result) => {
        console.log(result.result);
        this.res = result.result;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.sole{
  margin-bottom: 120px;
}
h2 {
  display: inline-block;
}
.selected {
  margin-bottom: 120px;
}
.mv_title {
  position: relative;
}
.mv_title:not(:first-of-type) {
  margin-top: 20px;
}
.more {
  position: absolute;
  top: 3px;
  right: 0;
}
.mv_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
.mv_list > span {
  position: relative;
  text-align: center;
  padding-top: 12.5px;
  margin-bottom: 10px;
}
.images {
  display: inline-block;
  position: relative;
  width: 150px;
}
.images > img {
  width: 150px;
  border-radius: 10px;
  overflow: hidden;
}
.title {
  width: 150px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 这里是超出几行省略 */
  overflow: hidden;
  text-align: left;
  font-size: 14px;
}
.newtitle {
  -webkit-line-clamp: 1; /* 这里是超出几行省略 */
}
.artist_name {
  display: block;
  text-align: left;
  margin-top: 5px;
  width: 150px;
  font-size: 10px;
  color: rgb(115, 115, 115);
}
.svg_img {
  padding: 0px 5px;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 3px;
  left: 3px;
}
.svg_img > img {
  width: 20px;
}
</style>