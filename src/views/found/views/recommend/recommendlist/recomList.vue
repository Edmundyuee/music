<template>
  <div class="recom_lists" ref="recom_list" @scroll="recom_scroll">
    <div class="title">
      <img src="@/assets/img/return.svg" alt="" @click="returns" />
      推荐歌单({{lengths}})
    </div>
    <div
      class="listInfo"
      :style="{ backgroundImage: 'url(' + coverImgUrl + ')' }"
    >
      <div class="left">
        <div class="image">
          <img :src="coverImgUrl + '?param=120y120'" alt="" />
        </div>
      </div>
      <div class="right">
        <div class="textTitle">
          {{ name }}
        </div>
        <div class="bottomTitle">
          <div class="botTitle">
            {{ description }}
          </div>
          <img src="@/assets/img/nav_right_w.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="list">
      <div class="btns">
        <div class="collection">
          <img src="@/assets/img/collection.svg" alt="" />
          <span>{{ subscribedCount | countFilter }}</span>
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
      <ul class="uls">
        <li
          class="lis"
          v-for="(item, index) in recomList"
          :key="index"
          @click.prevent="playMusic(item.id)"
        >
          <div class="num">
            {{ index + 1 }}
          </div>
          <div class="info">
            <img :src="item.al.picUrl + '?param=40y40'" alt="" />
            <div class="name">
              {{ item.name }}
            </div>
          </div>
          <div class="option">
            <img class="add" src="@/assets/img/add.svg" alt="" @click.stop="addMusic(item.id)" />
            <img class="playState"
              v-if="item.id == musicID && isActive"
              src="@/assets/img/music_img.svg"
              alt=""
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { recomLists } from "@/commonjs/recomList";
import { getSongDetail } from "@/network/player";
export default {
  name: "recomList",
  data() {
    return {
      commentCount: 0,
      plyCount: 0,
      shareCount: 0,
      subscribedCount: 0,
      recomListOld: [],
      recomListNew: [],
      loadOver: false,
      recomList: [],
      coverImgUrl: "",
      name: "",
      description: "",
      lengths: 0
    };
  },
  methods: {
    resetData(){
      this.commentCount = 0;
      this.plyCount = 0;
      this.shareCount = 0;
      this.recomListOld = [];
      this.recomListNew = [];
      this.recomList = [];
      this.coverImgUrl = [];
      this.lengths = 0;
      this.name = "";
      this.description = "";
      this.$store.commit('recomListID',0)
    },
    addMusic(id){
      this.$store.commit('addPlayList',id)
    },
    playMusic(id) {
      this.$store.commit("changeMusic", id);
    },
    returns() {
      this.$store.commit("recomListPage", false);
      this.resetData();
    },
    recom_scroll() {
      if (!this.loadOver) {
        if (this.recomListNew.length == 0) {
        } else {
          if (
            this.$refs.recom_list.scrollHeight -
              (this.$refs.recom_list.scrollTop + window.screen.height) <
            60
          ) {
            
            this.lazeload(this.recomListNew);
          }
        }
      }
    },
    lazeload(list) {
      let arr = [];
      if (list.length >= 50) {
        this.recomListOld = list.slice(0, 50);
        this.recomListNew = list.slice(50);
        //限制多次加载
        this.loadOver = true;
        getSongDetail(this.recomListOld.toString())
          .then((result) => {
            result.songs.forEach((element) => {
              this.recomList.push(element);
              this.loadOver = false;
            });
          })
          .catch((err) => {});
      } else {
        this.loadOver = true;
        getSongDetail(list.toString())
          .then((result) => {
            result.songs.forEach((element) => {
              this.recomList.push(element);
            });
            this.recomListNew = [];
          })
          .catch((err) => {});
      }
    },
    changeRecomList(list) {
      list.forEach((element) => {
        this.recomList.push(element);
      });
    },
  },
  computed: {
    recomListPage() {
      return this.$store.state.recomListPage;
    },
    recomListId() {
      return this.$store.state.recomListID;
    },
    musicID(){
      return this.$store.state.musicId
    },
    isActive(){
      return this.$store.state.isActive
    }
  },
  watch: {
    recomListPage(newVal) {
      if (newVal) {
        this.$refs.recom_list.style.display = "block";
      } else {
        this.$refs.recom_list.style.display = "none";
      }
    },
    recomListId(newVal) {
      if(newVal != 0){
        recomLists(newVal)
        .then((result) => {
          this.lengths = result.trackIds.length;
          this.subscribedCount = result.subscribedCount;
          this.commentCount = result.commentCount;
          this.shareCount = result.shareCount;
          this.playCount = result.playCount;
          this.coverImgUrl = result.coverImgUrl;
          this.name = result.name;
          this.description = result.description;
          result.trackIds.forEach((element) => {
            this.recomListNew.push(element.id);
          });
          this.lazeload(this.recomListNew);
        })
        .catch((err) => {});
      }
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
.recom_lists {
  position: fixed;
  display: none;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 16;
  overflow-y: scroll;
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
.listInfo {
  width: 100%;
  height: 200px;
  position: fixed;
  top: 60px;
  background-color: #eee;
  display: flex;
  overflow: hidden;
  color: #fff;
  z-index: 14;
}
.listInfo::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: inherit;
  background-size: 120% 120%;
  transform: scale(1.4);
  filter: blur(20px);
  z-index: 0;
  overflow: hidden;
}
.listInfo::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.left {
  flex: 2;
  /* background-color: red; */
  position: relative;
  z-index: 1;
}
.right {
  flex: 3;
  /* background-color: green; */
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  z-index: 1;
}
.image {
  width: 120px;
  height: 120px;
  border-radius: 15px;
  background-color: #ddd;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}
.image > img {
  width: 120px;
}
.textTitle {
  position: absolute;
  top: 40px;
}
.bottomTitle {
  position: absolute;
  bottom: 40px;
  width: 180px;
}
.botTitle {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
.bottomTitle > img {
  width: 20px;
  position: absolute;
  right: 0;
  transform: translateX(50%);
}
.list {
  width: 100%;
  position: absolute;
  top: 260px;
}
.btns {
  width: 80%;
  height: 40px;
  position: fixed;
  background-color: #fff;
  border-radius: 20px;
  left: 50%;
  top: 260px;
  transform: translate(-50%, -50%);
  z-index: 2;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  display: flex;
  padding: 10px 15px;
  box-sizing: border-box;
  z-index: 15;
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
.uls {
  margin-top: 20px;
}
.lis {
  height: 60px;
  line-height: 60px;
  display: flex;
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px; */
}
.num {
  flex: 1;
  text-align: center;
  color: #bbb;
}
.info {
  flex: 5;
  overflow: hidden;
  position: relative;
}
.name {
  width: 80%;
  height: 100%;
  position: absolute;
  left: 45px;
  font-size: 14px;
}
.info > img {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 5px;
}
.option {
  flex: 2;
  position: relative;
}
.add {
  width: 20px;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}
.playState{
  width: 20px;
  position: absolute;
  top: 20px;
  right: 60px;
  animation: round_animate 3s linear infinite;
}
@keyframes round_animate {
  to {
    transform: rotate(1turn);
  }
}

</style>