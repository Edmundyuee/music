<template>
  <div class="songList">
    <div class="top_titles">
      <h2>{{ tagsName }}</h2>
      <button @click="more_playList" class="fenlei">分类</button>
    </div>
    <div class="top_list">
      <span v-for="(item, index) in playList" :key="index">
        <div class="images" @click="topClick(item.id)">
          <img :src="item.coverImgUrl" alt="" />
          <span class="title">
            {{ item.name }}
          </span>
        </div>
      </span>
    </div>

    <div class="tags_page" v-show="isActive" @click.self="closePage">
      <div class="tags_classification">
        <div class="tags_p">
          <span class="all" @click="tagsClick('全部')">全部</span>
          <span
            class="tags"
            v-for="(item, index) in tags"
            :key="index"
            @click="tagsClick(item.name)"
          >
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>
    <div class="showList" v-if="showListActive">
      <div class="re_title">
        <img src="@/assets/img/return_b.svg" alt="" @click="closeList" />
        <h2 class="title_h2">歌单</h2>
      </div>
      <div class="title_info">
        <div
          class="listInfo"
          :style="{
            backgroundImage: 'url(' + playListDetail.coverImgUrl + ')',
          }"
        >
          <div class="left">
            <div class="image">
              <img
                :src="playListDetail.coverImgUrl + '?param=120y120'"
                alt=""
              />
            </div>
          </div>
          <div class="right">
            <div class="textTitle">
              {{ playListDetail.name }}
            </div>
            <div class="bottomTitle">
              <div class="botTitle">
                {{ playListDetail.description }}
              </div>
              <img src="@/assets/img/nav_right_w.svg" alt="" />
            </div>
          </div>
          <div class="bottoms">
            <div class="collection_w">
              <img src="@/assets/img/collection_w.svg" alt="" /><br />
              {{ playListDetail.subscribedCount | countFilter }}
            </div>
            <div class="comment_w">
              <img src="@/assets/img/comment_w.svg" alt="" /><br />
              {{ playListDetail.commentCount | countFilter }}
            </div>
            <div class="share_w">
              <img src="@/assets/img/share_w.svg" alt="" /><br />
              {{ playListDetail.shareCount | countFilter }}
            </div>
            <div class="download_w">
              <img src="@/assets/img/download_w.svg" alt="" /><br />
              下载
            </div>
          </div>
        </div>
      </div>
      <div class="lists">
        <ul class="uls">
          <li class="play_all">
            <img src="@/assets/img/play_red.svg" alt="" @click="play_all" />
            <div class="playAll_btn" @click="play_all">播放全部</div>
          </li>
          <li
            class="lis"
            v-for="(item, index) in songsList"
            :key="item.id"
            @click.prevent="playMusic(item.id)"
          >
            <div class="num" v-if="!(item.id == musicID)">
              {{ index + 1 }}
            </div>
            <div v-else class="horn">
              <img src="@/assets/img/horn.svg" alt="" />
            </div>
            <div class="info">
              <img :src="item.al.picUrl + '?param=40y40'" alt="" />
              <div class="name">
                <div class="music_name">
                  {{ item.name }}
                </div>
                <div class="music_info">
                  {{ item.ar[0].name }}-{{ item.al.name }}
                </div>
              </div>
            </div>
            <div class="option">
              <img
                class="add"
                src="@/assets/img/mores.svg"
                @click.stop="more_page(item.id)"
                alt=""
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getTags, getTopList,getPlayList } from "@/network/found";
import { getSongDetail } from "@/network/player";
export default {
  name: "Songlist",
  data() {
    return {
      tags: [],
      isActive: false,
      tagsName: "全部",
      playList: [],
      list: [],
      toplist: [],
      showListActive: false,
      listId: "",
      newMyListId: [],
      oldMyListId: [],
      songsList: [],
      playListDetail: {},
      myListId: [],
    };
  },
  computed:{
    musicID(){
      return this.$store.state.musicId
    },
  },
  methods: {
      play_all() {
      this.$store.commit("changePlayListID", this.listId);
    },
    playMusic(id) {
      this.$store.commit("changeMusic", id);
    },
    more_page(){
        alert("功能待开发")
    },
    more_playList() {
      this.isActive = true;
    },
    closePage() {
      this.isActive = false;
    },
    closeList() {
      this.showListActive = false;
      this.myListId = [];
      this.newMyListId = [];
      this.oldMyListId = [];
      this.songsList = [];
      this.playListDetail = {};
    },
    tagsClick(tagName) {
      this.closePage();
      this.tagsName = tagName;
      getTopList(tagName)
        .then((result) => {
          console.log(result);
          this.playList = result.playlists;
        })
        .catch((err) => {});
    },
    topClick(id) {
      this.listId = id;
      getPlayList(id, this.$store.state.cookie)
        .then((result) => {
          this.showListActive = true;
          this.playListDetail = result.playlist;
          result.privileges.forEach((element) => {
            this.myListId.push(element.id);
          });
          this.loadList(this.myListId);
        })
        .catch((err) => {
        });
    },
    loadList() {
      if (this.myListId.length > 50) {
        this.newMyListId = this.myListId.slice(0, 50);
        this.myListId = this.myListId.slice(50);
        getSongDetail(this.newMyListId.toString())
          .then((result) => {
            result.songs.forEach((item) => {
              this.songsList.push(item);
            });
            console.log(this.songsList);
            this.loadList();
          })
          .catch((err) => {
            console.log("你好啊");
          });
      } else {
        getSongDetail(this.myListId.toString())
          .then((result) => {
            console.log(result);
            result.songs.forEach((item) => {
              this.songsList.push(item);
            });
            console.log(this.songsList);
          })
          .catch((err) => {});
      }
    },
  },
  mounted() {
    getTopList(this.tagsName)
      .then((result) => {
        console.log(result);
        this.playList = result.playlists;
      })
      .catch((err) => {});
    getTags()
      .then((result) => {
        this.tags = result.tags;
        console.log(this.tags);
      })
      .catch((err) => {});
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
.songList {
  width: 90%;
  margin: 10px auto 120px;
}
.top_titles {
  width: 100%;
  position: relative;
}
.top_titles > h2 {
  width: 60%;
  display: inline-block;
}
.fenlei {
  position: absolute;
  right: 0;
  height: 100%;
  width: 60px;
  background-color: #fff;
  border: 1px solid #ccc;
}
.tags_page {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 11;
}
.tags_classification {
  width: 90%;
  height: 70%;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  overflow-y: scroll;
}
.tags_p {
  width: 90%;
  margin: 10px auto;
}
.all {
  width: 100%;
  padding: 5px 10px;
  box-sizing: border-box;
  background-color: #fff;
  display: inline-block;
  border: 1px solid #ccc;
  text-align: center;
}
.tags {
  padding: 5px 10px;
  background-color: #fff;
  margin: 10px 10px;
  display: inline-block;
  border: 1px solid #ccc;
}
.top_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  flex-direction: row;
  text-align: center;
  margin-top: 10px;
}
.top_list > span {
  position: relative;
  flex: 1;
  align-self: flex-start;
  /* text-align: center; */
  padding-top: 12.5px 5px 0px;
  margin-bottom: 20px;
}
.top_list > span:last-child {
  margin-right: auto;
}
.images {
  display: inline-block;
  position: relative;
  width: 100px;
}
.title_h2 {
  height: 50px;
  line-height: 50px;
  width: 100%;
  text-align: center;
  font-weight: 500;
  position: fixed;
  top: 0;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
}
.images > img {
  width: 100px;
  border-radius: 10px;
  overflow: hidden;
}
.title {
  width: 100px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 这里是超出几行省略 */
  overflow: hidden;
  text-align: left;
  font-size: 14px;
}
.showList {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 10;
  overflow-y: scroll;
  margin-bottom: 120px;
}
.re_title {
  position: fixed;
  top: 0;
  z-index: 6;
}
.re_title > img {
  width: 25px;
  height: 25px;
  position: absolute;
  z-index: 12;
  top: 12.5px;
  left: 20px;
}
.listInfo {
  width: 100%;
  height: 200px;
  position: relative;
  top: 50px;
  background-color: #eee;
  display: flex;
  overflow: hidden;
  color: #fff;
  z-index: 5;
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
  height: 70%;
  box-sizing: border-box;
}
.right {
  flex: 3;
  /* background-color: green; */
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  z-index: 1;
  height: 70%;
}
.bottoms {
  height: 30%;
  width: 100%;
  position: absolute;
  bottom: 6px;
  display: flex;
  z-index: 6;
  padding-top: 10px;
  box-sizing: border-box;
}
.bottoms > div {
  flex: 1;
  text-align: center;
  font-size: 10px;
}
.bottoms > div > img {
  width: 25px;
  height: 25px;
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
  top: 20px;
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

.lists {
  width: 100%;
  position: absolute;
  top: 250px;
}
.uls {
  margin-top: 10px;
}
.lis {
  height: 60px;
  line-height: 60px;
  display: flex;
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px; */
}
.play_all {
  padding-left: 50px;
  box-sizing: border-box;
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  position: relative;
}
.playAll_btn {
  height: 25px;
  display: inline-block;
}
.play_all > img {
  width: 25px;
  height: 25px;
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translate(0, -50%);
}
.lis:not(:last-of-type) {
  border-bottom: 1px solid #f2f2f2;
}
.num {
  flex: 1;
  text-align: center;
  color: #bbb;
}
.horn {
  flex: 1;
  position: relative;
}
.horn > img {
  position: absolute;
  width: 25px;
  height: 25px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.info {
  flex: 5;
  height: 60px;
  overflow: hidden;
  position: relative;
}
.name {
  width: 80%;
  height: 60px;
  position: absolute;
  left: 45px;
  font-size: 14px;
}
.music_name {
  height: 35px;
  font-size: 14px;
  line-height: 40px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.music_info {
  height: 20px;
  font-size: 8px;
  line-height: 12px;
  color: rgb(155, 155, 155);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
.playState {
  width: 20px;
  position: absolute;
  top: 20px;
  right: 60px;
  animation: round_animate 3s linear infinite;
}
</style>