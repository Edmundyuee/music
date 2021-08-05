<template>
  <div ref="mvplay" class="mvplay">
    <div class="title">
      <img src="@/assets/img/return.svg" alt="" @click="returns" />
      独家放送
    </div>
    <div class="play_mv" ref="playmv">
      <video height="100%" :src="mvUrl" autoplay controls></video>
    </div>
    <div class="mvinfo" ref="mvinfo">
      <div class="btns">
        <div class="collection">
          <img src="@/assets/img/fabulous.svg" alt="" />
          <span>{{ subCount | countFilter }}</span>
        </div>
        <div class="comment">
          <img src="@/assets/img/comment.svg" alt="" />
          <span>{{ commentCount | countFilter }}</span>
        </div>
        <div class="share">
          <img src="@/assets/img/share_g.svg" alt="" />
          <span>{{ shareCount | countFilter }}</span>
        </div>
      </div>
      <div class="mvname">
        {{ mvName }}
        <div class="time">
          {{ publishTime }}
        </div>
      </div>
    </div>
    <div class="beSimilarMv">
      <h3>最新MV</h3>
      <div class="mvlist">
        <ul class="uls">
          <li
            class="lis"
            v-for="(item, index) in newMvList"
            :key="index"
            @click="playMvs(item.id)"
          >
            <span class="images">
              <span>
                <img class="mvImage" :src="item.cover" alt="" />
              </span>
            </span>
            <span class="mvTitle">
              <span class="mv_titles">
                <span class="mvName_list">{{ item.name }}</span>
                {{ item.artistName }}
              </span>
              <span class="playCount">
                <img class="mvplays" src="@/assets/img/mvplay.svg" alt="" />
                {{ item.playCount | countFilter }}
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mvPlay } from "@/network/found";
import { getMvUrl } from "@/network/found";
import { getMvFirst } from "@/network/found";
export default {
  name: "Mvplay",
  data() {
    return {
      mvName: "",
      mvUrl: "",
      subCount: 0,
      commentCount: 0,
      shareCount: 0,
      newMvList: [],
      artistName: "",
      publishTime: ""
    };
  },
  methods: {
    resetData() {
      this.mvName = "";
      this.mvUrl = "";
      this.subCount = 0;
      this.commentCount = 0;
      this.shareCount = 0;
      this.newMvList = [];
      this.artistName = "";
      this.publishTime = "";
    },
    returns() {
      this.$store.commit("isMvActiveChange", false);
      this.resetData();
      window.onresize = null;
    },
    playMvs(id) {
      this.$store.commit("mvPlayID", id);
      console.log(id);
    },
    windowResizeChange() {
      this.$refs.playmv.style.height =
        (document.body.offsetWidth * 9) / 16 + "px";
      this.$refs.mvinfo.style.marginTop =
        60 + (document.body.offsetWidth * 9) / 16 + "px";
    },
  },
  computed: {
    isMvActiveChange() {
      return this.$store.state.isMvActive;
    },
    mvPlayID() {
      return this.$store.state.mvPlayId;
    },
  },
  watch: {
    isMvActiveChange(newVal) {
      if (newVal) {
        // 视频窗口变化改变视频高度始终都是16:9比例的
        window.onresize = () => {
          this.windowResizeChange();
        };
        this.windowResizeChange();
        this.$refs.mvplay.style.display = "block";
        this.$store.commit("isActives", { isActive: false, first: 1 });
      } else {
        this.$refs.mvplay.style.display = "none";
      }
    },
    mvPlayID(newVal) {
      console.log(newVal);
      mvPlay(newVal)
        .then((result) => {
          console.log("进入这一步");
          console.log(result);
          this.commentCount = result.data.commentCount;
          this.shareCount = result.data.shareCount;
          this.subCount = result.data.subCount;
          this.mvName = result.data.name;
          this.publishTime = result.data.publishTime;
        })
        .catch((err) => {});
      getMvUrl(newVal)
        .then((result) => {
          console.log(result);
          this.mvUrl = result.data.url;
        })
        .catch((err) => {});
      getMvFirst()
        .then((result) => {
          console.log(result);
          this.newMvList = result.data;
        })
        .catch((err) => {});
    },
  },
  filters: {
    countFilter(val) {
      if (val > 100000) {
        return (val / 10000).toFixed(1) + "万";
      } else {
        return val;
      }
    },
  },
};
</script>

<style scoped>
.mvplay {
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 1000;
  overflow-y: scroll;
  box-sizing: border-box;
}
.title {
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  background-color: #d81e06;
  text-align: center;
  line-height: 60px;
  color: #fff;
  z-index: 14;
}
.title > img {
  width: 25px;
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translate(0, -50%);
}
.play_mv {
  width: 100%;
  margin-top: 60px;
  background-color: black;
  position: fixed;
  z-index: 10;
}
.play_mv > video {
  width: 100%;
  background-color: black;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.mvinfo {
  width: 100%;
}
.mvname {
  width: 100%;
  height: 80px;
  padding: 15px 20px 5px;
  position: relative;
  /* word-break: break-all;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; 这里是超出几行省略 */

  /* line-height:70px; */
  font-weight: 800;
  box-sizing: border-box;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 这里是超出几行省略 */
  overflow: hidden;
  text-align: left;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.btns {
  width: 100%;
  height: 40px;
  position: relative;
  background-color: #fff;
  left: 50%;
  transform: translate(-50%, 0%);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  display: flex;
  padding: 10px 15px;
  box-sizing: border-box;
}
.btns > div {
  flex: 1;
  border-right: 1px solid #bfbfbf;
  line-height: 20px;
  position: relative;
}
.btns > div > span {
  width: 80%;
  text-align: center;
  box-sizing: border-box;
  display: inline-block;
  font-size: 10px;
  margin-left: 20px;
}
.btns > div:last-child {
  border-right: none;
}
.btns img {
  width: 18px;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.beSimilarMv {
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
}
.lis {
  padding: 15px 0px 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: flex;
}
.lis:last-child {
  border-bottom: none;
}
.images {
  flex: 2;
  height: 80px;
  display: inline-block;
}
.images > span {
  display: inline-block;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
}
.mvImage {
  width: 150px;
}

.mvTitle {
  flex: 3;
  display: inline-block;
  box-sizing: border-box;
}
.mv_titles {
  width: 100%;
  display: block;
  padding-left: 10px;
  box-sizing: border-box;
}

.playCount {
  display: block;
  width: 100%;
  height: 30px;
  padding-left: 40px;
  position: relative;
  line-height: 30px;
  padding-top: 8px;
  box-sizing: border-box;
  vertical-align: bottom;
}
.mvplays {
  width: 20px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(50%, -10%);
}
.mvName_list {
  display: block;
  margin-bottom: 10px;
  width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; 
  box-sizing: border-box;
}
.time{
  position: absolute;
  bottom: 0;
  left: 20px;
  font-size: 12px;
  color: #bfbfbf;
}
</style>