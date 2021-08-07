<template>
  <div class="selected">
    <div class="mv_title">
      <h2>最新mv</h2>
      <span class="more" @click="more_mvs">更多></span>
    </div>
    <div class="mv_list">
      <span
        v-for="(item, index) in res"
        :key="index"
        @click="broadPlay(item.id)"
      >
        <div class="images">
          <img :src="item.cover" alt="" />
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

    <div class="mv_title">
      <h2>热播mv</h2>
      <span class="more" @click="more_mvs">更多></span>
    </div>
    <div class="mv_list">
      <span
        v-for="(item, index) in res2"
        :key="index"
        @click="broadPlay(item.id)"
      >
        <div class="images">
          <img :src="item.picUrl" alt="" />
          <span class="title">
            {{ item.name }}
          </span>
          <div class="svg_img">
            <img src="@/assets/img/mv_write.svg" alt="" />
          </div>
        </div>
      </span>
    </div>
    <div class="top_mv">
      <div class="mv_title">
        <h2>排行榜</h2>
        <span class="more" @click="more_mvs">更多></span>
      </div>
      <ul class="rankingList">
        <li
          ref="lis"
          v-for="(item, index) in rankingList"
          :key="index"
          @click="broadPlay(item.id)"
        >
          <div class="num">{{ index + 1 }}</div>
          <div class="mvImg">
            <img :src="item.cover" alt="" />
          </div>
          <div class="mvName">
            <div class="mv_name">
              {{ item.name }}
            </div>
            <div class="mv_artist_name">
              {{ item.artistName }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { newMv, personalizedMv, topMv } from "@/network/found";
export default {
  name: "selected",
  data() {
    return {
      res: {},
      res2: {},
      rankingList: [],
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
    newMv()
      .then((result) => {
        console.log(result);
        this.res = result.data;
      })
      .catch((err) => {});
    personalizedMv()
      .then((result) => {
        this.res2 = result.result;
      })
      .catch((err) => {});
    topMv()
      .then((result) => {
        this.rankingList = result.data;
        console.log(result);
        console.log(this.rankingList);
        setTimeout(() => {
          for (let i = 0; i < this.$refs.lis.length; i++) {
            if (i % 2 == 0) {
              this.$refs.lis[i].style.backgroundColor = "#f3f3f3";
            }
          }
        }, 500);
      })
      .catch((err) => {});
  },
};
</script>

<style scoped>
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
  height: 143.2px;
}
.images > img {
  width: 150px;
  height: 84.3px;
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
.rankingList {
  width: 100%;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin-top: 10px;
}
.rankingList > li {
  width: 100%;
  height: 120px;
  display: flex;
}
.num {
  flex: 1;
  text-align: center;
  font-size: 20px;
  height: 120px;
  line-height: 120px;
  font-weight: 1400;
  color: rgb(155, 155, 155);
  font-style: oblique;
}
.mvImg {
  flex: 3;
  position: relative;
}
.mvImg > img {
  height: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.mvName {
  flex: 2;
  width: 30%;
}
.mv_name {
  height: 60px;
  line-height: 80px;
  font-size: 14px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mv_artist_name {
  font-size: 10px;
  color: rgb(155, 155, 155);
}
</style>