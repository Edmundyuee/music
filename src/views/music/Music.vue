<template>
  <div class="music">
    <h2 class="title">我的音乐</h2>
    <div class="mymusic" v-if="loginState">
      <ul class="musicList">
        <li class="listTitle">
          <h3>我创建的歌单</h3>
          <img class="add_playList" src="@/assets/img/add.svg" alt="" />
        </li>
        <li
          v-for="item in establish"
          :key="item.id"
          class="list"
          @click="showList(item.id)"
        >
          <img :src="item.coverImgUrl" alt="" />
          <span class="listName">{{ item.name }}</span>
          <span class="listCount">{{ item.trackCount + item.cloudTrackCount}}首</span>
        </li>
        <li class="listTitle">
          <h3>我收藏的歌单</h3>
          <img class="add_playList" src="@/assets/img/add.svg" alt="" />
        </li>
        <li
          v-for="item in collection"
          :key="item.id"
          class="list"
          @click="showList(item.id)"
        >
          <img :src="item.coverImgUrl" alt="" />
          <span class="listName">{{ item.name }}</span>
          <span class="listCount">{{ item.trackCount }}首</span>
        </li>
      </ul>
    </div>
    <div class="login_info" v-else>
      <div class="login_prompt">
        <span>您还没有登录，请先登录后再试！！！</span>
        <button class="login_btn" @click="replace_login">点击登录</button>
      </div>
    </div>
    <div class="showList" v-if="showListActive">
      <div class="re_title">
          <img src="@/assets/img/return_b.svg" alt="" @click="closeList" />
          <h2 class="title">歌单</h2>
      </div>
      <div class="title_info">
        <div
          class="listInfo"
          :style="{ backgroundImage: 'url(' + playListDetail.coverImgUrl + ')' }"
        >
          <div class="left">
            <div class="image">
              <img :src="playListDetail.coverImgUrl + '?param=120y120'" alt="" />
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
                <img src="@/assets/img/collection_w.svg" alt=""><br>
                {{playListDetail.subscribedCount | countFilter}}
            </div>
            <div class="comment_w">
                <img src="@/assets/img/comment_w.svg" alt=""><br>
                {{playListDetail.commentCount | countFilter}}
            </div>
            <div class="share_w">
                <img src="@/assets/img/share_w.svg" alt=""><br>
                {{playListDetail.shareCount | countFilter}}
            </div>
            <div class="download_w">
                <img src="@/assets/img/download_w.svg" alt=""><br>
                下载
            </div>
          </div>
        </div>
      </div>
      <div class="lists">
      <ul class="uls">
        <li class="play_all">
            <img src="@/assets/img/play_red.svg" alt="" @click="play_all">
            <div class="playAll_btn" @click="play_all">
                播放全部
            </div>
        </li>
        <li
          class="lis"
          v-for="(item,index) in songsList"
          :key="item.id"
          @click.prevent="playMusic(item.id)"
        >
          <div class="num" v-if="!(item.id == musicID)">
            {{ index + 1 }}
          </div>
          <div v-else class="horn">
              <img src="@/assets/img/horn.svg" alt="">
          </div>
          <div class="info">
            <img :src="item.al.picUrl + '?param=40y40'" alt="" />
            <div class="name">
              <div class="music_name">
                  {{ item.name }}
              </div>
              <div class="music_info">
                  {{ item.ar[0].name }}-{{item.al.name}}
              </div>
            </div>
          </div>
          <div class="option">
            <img class="add" src="@/assets/img/mores.svg" @click.stop="more_page(item.id)" alt="" />
          </div>
        </li>
      </ul>
    </div>
    </div>
  </div>
</template>

<script>
import { userPlayList, getState,getPlayList } from "@/network/found";
import { getSongDetail } from "@/network/player";
export default {
  name: "Music",
  data() {
    return {
      loginState: false,
      establish: [],
      collection: [],
      showListActive: false,
      myListId: [],
      newMyListId: [],
      oldMyListId: [],
      songsList: [],
      playListDetail: {},
      listId: ''
    };
  },
  computed:{
    musicID(){
      return this.$store.state.musicId
    },
  },
  mounted() {
    this.loginStates();
  },
  methods: {
    replace_login(){
      this.$router.replace('/account')
    },
    play_all(){
      this.$store.commit('changePlayListID',this.listId);
      console.log('执行成功');
    },
    more_page(){
        alert("功能待开发")
    },
    playMusic(id) {
      this.$store.commit("changeMusic", id);
    },
    showList(id) {
        this.listId = id;
        this.showListActive = true;
      getPlayList(id,this.$store.state.cookie).then((result) => {
          console.log(result);
          this.playListDetail = result.playlist;
          result.playlist.trackIds.forEach((element) => {
                  this.myListId.push(element.id);
                });
                this.loadList(this.myListId)
                console.log(this.myListId);
      }).catch((err) => {
          console.log(err);
        
      });
    },
    loadList(){
        if(this.myListId.length>50){
            this.newMyListId = this.myListId.slice(0,50);
            this.myListId = this.myListId.slice(50)
            console.log(this.newMyListId.toString());
            getSongDetail(this.newMyListId.toString()).then((result) => {
                // console.log(result);
                result.songs.forEach(item => {
                    this.songsList.push(item)
                })
                console.log(this.songsList);
                this.loadList()
            }).catch((err) => {
                
            });
        }else{
            getSongDetail(this.myListId.toString()).then((result) => {
                // console.log(result);
                result.songs.forEach(item => {
                    this.songsList.push(item)
                })
                console.log(this.songsList)
            }).catch((err) => {
                
            });
        }
    },
    closeList(){
        this.showListActive = false;
        this.myListId = [];
        this.newMyListId = [];
        this.oldMyListId = [];
        this.songsList = [];
        this.playListDetail = {};
    },
    loginStates() {
      //用于判断用户当前是否登录
        getState()
          .then((result) => {
            if(result.data.account != null){
              this.loginState = true;
              userPlayList(result.data.profile.userId)
              .then((result) => {
                console.log(result.playlist);
                result.playlist.forEach((element) => {
                  if (!element.subscribed) {
                    this.establish.push(element);
                  } else {
                    this.collection.push(element);
                  }
                });
                console.log(this.establish, this.collection);
              })
              .catch((err) => {});
            }else{

            }


            
          })
          .catch((err) => {});
      }
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
.acitve{
  opacity: 1;
}
.notactive{
  opacity: 0.5;
}
.title {
  height: 50px;
  line-height: 50px;
  width: 100%;
  text-align: center;
  font-weight: 500;
  position: fixed;
  top: 0;
  z-index: 3;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
}
.mymusic {
  margin-top: 50px;
  margin-bottom: 120px;
}
.musicList {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.listTitle {
  position: relative;
}
.add_playList {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
}
.musicList > li > h3 {
  width: 200px;
  display: inline-block;
}
.login_info {
  margin-top: 100px;
}
.login_prompt{
  width: 200px;
  height: 150px;
  margin: 0 auto;
  text-align: center;
  position: relative;
}
.login_btn{
  width: 100px;
  height: 40px;
  background-color: #d81e06;
  color: #fff;
  border: none;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%,0);
}
.list {
  margin: 10px 0;
  position: relative;
}
.list > img {
  width: 50px;
  height: 50px;
}
.list > span {
  display: inline-block;
  position: absolute;
  left: 70px;
}
.re_title{
    position: fixed;
    top: 0;
    z-index: 6;
}
.listName {
  top: 5px;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.listCount {
  bottom: 5px;
  font-size: 15px;
  color: rgb(124, 124, 124);
}
.showList {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 4;
  overflow-y: scroll;
  margin-bottom: 120px;
}
.re_title > img {
  width: 25px;
  height: 25px;
  position: absolute;
  z-index: 5;
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
.bottoms{
    height: 30%;
    width: 100%;
    position: absolute;
    bottom: 6px;
    display: flex;
    z-index: 6;
    padding-top: 10px;
    box-sizing: border-box;
}
.bottoms>div{
    flex: 1;
    text-align: center;
    font-size: 10px;
}
.bottoms>div>img{
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
.play_all{
    padding-left: 50px;
    box-sizing: border-box;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    position: relative;
}
.playAll_btn{
    height: 25px;
    display: inline-block;
}
.play_all>img{
    width: 25px;
    height: 25px;
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translate(0,-50%);
}
.lis:not(:last-of-type){
    border-bottom: 1px solid #f2f2f2;
}
.num {
  flex: 1;
  text-align: center;
  color: #bbb;
}
.horn{
    flex: 1;
    position: relative;
}
.horn>img{
    position: absolute;
    width: 25px;
    height: 25px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
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
.music_name{
    height: 35px;
    font-size: 14px;
    line-height: 40px !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.music_info{
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
.playState{
  width: 20px;
  position: absolute;
  top: 20px;
  right: 60px;
  animation: round_animate 3s linear infinite;
}
</style>