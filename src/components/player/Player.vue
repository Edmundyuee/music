<template>
  <div class="play_music">
    <div class="player">
      <span class="play_img" @click="music_control">
        <img :src="minipicUrl" alt="" />
      </span>
      <span class="play_name">
        {{ newname }}
      </span>
      <div class="timer">
        {{ time | filterTime }}/{{ duration | filterTime }}
      </div>
      <span class="play_btn">
        <div class="play_btn_img">
          <img
            src="@/assets/img/pause.svg"
            @click="musicActive"
            v-show="isActive"
            alt=""
          />
          <img
            src="@/assets/img/play.svg"
            @click="musicActive"
            v-show="!isActive"

            alt=""
          />
        </div>
        <div class="play_btn_list">
          <img
            src="@/assets/img/music_list.svg"
            @click="playListAcitve"
            alt=""
          />
        </div>
      </span>
      <audio ref="audios" class="audio" :src="music.url"></audio>
    </div>
    <div class="progress">
      <div ref="progress" class="progress_bar"></div>
    </div>
      <play-control :musicinfo="musicinfo" :picUrl="picUrl" @nextMusic="nextMusic" @lastMusic="lastMusic" @playList="playList"></play-control>
      <play-list :isClick="isClick" @changeIsClick="changeIsClick" @loadList="loadList" :loadOver="loadOver"></play-list>
  </div>
</template>

<script>
import { getMusic } from "@/network/player";
import { getSongDetail } from "@/network/player";
import { getAlbum } from "@/network/player";
import playControl from "./PlayControl";
import playList from "./PlayList";
import { getPlayList } from "@/network/found"
export default {
  name: "Player",
  data() {
    return {
      music: {},
      songs: {},
      time: 0,
      setIntervalID1: "",
      setIntervalID2: "",
      duration: 0,
      isActive: false,
      newname: "",
      percentage: 0,
      flag: false,
      paused: true,
      picUrl: "",
      first: 1,
      name: "",
      musicinfo: {},
      minipicUrl: "",
      isClick: false,
      isClicks: false,
      playLists: [],
      playListss: [],
      loadOver: false
    };
  },
  components: {
    playControl,
    playList,
  },
  methods: {
    nextMusic(){
      console.log("下一首");
      this.$store.commit('nextMusic')
    },
    lastMusic(){
      console.log("上一首");
      this.$store.commit('lastMusic')
    },
    loadList(){
      console.log("loadList方法被执行");
      if(this.$store.state.play_list.length==0){
        console.log("第一次执行");
      }else{
        if(this.loadOver){
          alert("加载完了")
        }else{
          this.lazeload(this.playListss)
        }
      }
    },
    //懒加载
    lazeload(list){
      let arr = [];
      if(list.length>=50){
        this.playLists = list.slice(0,50)
        this.playListss = list.slice(50)
        getSongDetail(this.playLists.toString()).then((result) => {
        this.$store.commit('changePlayList',result.songs)
      }).catch((err) => {
        
      });
      }else{
        getSongDetail(list.toString()).then((result) => {
        this.$store.commit('changePlayList',result.songs)
        this.loadOver = true
      }).catch((err) => {
        
      });
      }
    },
    playListAcitve() {
      this.isClick = true;
    },
    playList() {
      console.log("走到");
      this.isClick = true;
      console.log(this.$refs.scrolls);
    },
    changeIsClick(isClicks){
      this.isClick = isClicks
      console.log(this.playLists);
    },
    music_control() {
      this.$store.commit("playController");
      // console.log(window.screen.availHeight+"--1");
      // console.log(window.screenTop+"--2");
      // console.log(window.screen.height+"--3");
      // console.log(document.body.offsetHeight+"--4");
      // console.log(document.body.clientHeight+"--5");
    },
    resetData() {
      this.isActive = false;
      this.time = 0;
      this.duration = 0;
      this.percentage = 0;
      clearInterval(this.setIntervalID1, this.setIntervalID2);
    },
    musicActive() {
      //   console.log("已经执行");
      let name = this.songs.name;
      let newname = "";
      let newnames = "";
      //   console.log(this.newname);
      let audio = this.$refs.audios;
      this.isActive = !this.isActive;
      if (audio.duration) {
        this.duration = audio.duration;
      }
      let flag = false;
      //   console.log(this.setIntervalID1);
      //歌曲播放改变时间与按钮图标
      //   console.log("isActive="+ this.isActive);
      this.musicinfo = {
        time: this.time,
        duration: this.duration,
        name: this.newname,
        percentage: this.percentage,
      };
      if (this.isActive) {
        audio.play();
        this.$store.commit('autoPlay',true)
        this.setIntervalID1 = setInterval(() => {
          this.time++;
          //进度条
          this.percentage = this.time / this.duration;
          this.$refs.progress.style.width = this.percentage * 100 + "%";
          // console.log(this.percentage);
          //判断是否播放完毕，播放完毕则清除定时器和播放图标
          if (audio.ended) {
            clearInterval(this.setIntervalID1);
            this.time = 0;
            this.isActive = !this.isActive;
            this.$store.commit("isActives", {
              isActive: this.isActive,
              first: 0,
            });
            this.$refs.progress.style.width = 0 + "%";
            if(this.$store.state.autoPlay){
              this.nextMusic()
            }
          }
          this.musicinfo = {
            time: this.time,
            duration: this.duration,
            name: name,
            percentage: this.percentage,
          };
        }, 1000);
      } else {
        audio.pause();
        clearInterval(this.setIntervalID1);
      }
      //   console.log(this.setIntervalID);
      //   console.log(this.duration / 60);
      //如果歌曲名字大于8个添加滚动效果
      if (name.length > 10) {
        clearInterval(this.setIntervalID2);
        if (this.isActive) {
          this.setIntervalID2 = setInterval(() => {
            newname = this.newname.substring(0, 1);
            newnames = this.newname.substring(1);
            this.newname = newnames + newname;
          }, 1000);
        }
      }
      this.flag = false;
      this.$store.commit("isActives", { isActive: this.isActive, first: 0 });
    },
    getMusics(id) {
      getMusic(id)
        .then((result) => {
          // console.log(result + "获取");
          this.flag = true;
          this.music = result.data[0];
        })
        .catch((err) => {
          console.log(err);
        });
      getSongDetail(id)
        .then((result) => {
          // console.log(result + "哈哈");
          this.songs = result.songs[0];
          this.newname = this.songs.name;
          getAlbum(result.songs[0].al.id)
            .then((result) => {
              console.log(result);
              this.picUrl = result.album.picUrl + "?param=200y200";
              this.minipicUrl = result.album.picUrl + "?param=50y50";
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    },
  },
  created() {
    getPlayList(3023256656).then((result) => {
      result.playlist.trackIds.forEach(element => { 
        this.playListss.push(element.id)
        });
        console.log(result);
        console.log(this.playListss);
        this.lazeload(this.playListss)
        // this.musicActive();
        }).catch((err) => {
      });
    getMusic(this.$store.state.musicId)
      .then((result) => {
        // console.log(result);
        this.music = result.data[0];
      })
      .catch((err) => {
        console.log(err);
      });
    getSongDetail(this.$store.state.musicId)
      .then((result) => {
        console.log(result.songs);
        getAlbum(result.songs[0].al.id)
          .then((result) => {
            // console.log(result);
            this.picUrl = result.album.picUrl + "?param=200y200";
            this.minipicUrl = result.album.picUrl + "?param=50y50";
          })
          .catch((err) => {});
        this.songs = result.songs[0];
        this.newname = this.songs.name;
        this.musicinfo = {
          time: this.time,
          duration: this.duration,
          name: this.newname,
          percentage: 0,
          picUrl: this.picUrl,
        };
      })
      .catch((err) => {});
  },
  filters: {
    filterTime(time) {
      if (time < 60) {
        if (time < 10) {
          return "0:0" + parseInt(time);
        } else {
          return "0:" + parseInt(time);
        }
      } else if (60 <= time < 3600) {
        if ((time / 60 - parseInt(time / 60)) * 60 < 10) {
          return (
            parseInt(time / 60) +
            ":0" +
            parseInt((time / 60 - parseInt(time / 60)) * 60)
          );
        } else {
          return (
            parseInt(time / 60) +
            ":" +
            parseInt((time / 60 - parseInt(time / 60)) * 60)
          );
        }
      }
    },
  },
  computed: {
    musicIdChange() {
      return this.$store.state.musicId;
    },
    isActiveChange() {
      return this.$store.state.isActive;
    },
    musicIndex(){
      return this.$store.state.musicIndex;
    },
    playListID(){
      return this.$store.state.playListID;
    }
  },
  watch: {
    playListID(newVal){
      this.$store.commit('resetList');
      //通过延迟1s来等待playlist列表加载执行播放第一首歌
      setTimeout(()=>{
        this.$store.commit('resetMusicIndex');
      },1000)
      getPlayList(newVal).then((result) => {
      result.playlist.trackIds.forEach(element => { 
        this.playListss.push(element.id)
        });
        console.log(result);
        console.log(this.playListss);
        this.lazeload(this.playListss)
        }).catch((err) => {
      });
    },
    musicIndex(newVal){
      this.$store.commit('changeMusic',this.$store.state.play_list[newVal].id)
      this.resetData()
    },
    paused(newval) {
      this.paused = newval;
      if (newval) {
        this.musicActive();
      }
    },
    musicIdChange(newval) {
      this.getMusics(newval);
      this.resetData();
    },
    flag(val) {
      setTimeout(() => {
        if (val) {
          // console.log(val + "哈哈");
          this.musicActive();
        }
      }, 300);
    },
    isActiveChange(newVal) {
      this.first = this.$store.state.first;
      if (this.isActive == this.$store.state.isActive) {
        this.first = 1;
      } else {
        if (this.first == 1) {
          this.musicActive();
        }
        this.first = 1;
      }
    },
  },
};
</script>

<style scoped>
.scrollss{
  position: relative;
  height: 100%;
}
.play_music {
  width: 100%;
  position: fixed;
  bottom: 60px;
  z-index: 10;
}
.player {
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  padding: 5px 20px;
  background-color: rgba(255, 255, 255, 0.95);
  display: flex;
}
.player > span {
  display: inline-block;
}
.play_img {
  flex: 1;
  margin-right: 10px;
}
.play_img > img {
  width: 50px;
  border-radius: 6px;
}
.play_name {
  flex: 4;
  height: 50px;
  line-height: 50px;
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.play_btn {
  flex: 2;
  text-align: center;
}
.play_btn > div {
  width: 50%;
  display: inline-block;
  height: 100%;
  line-height: 100%;
  position: relative;
}
.play_btn > div > img {
  position: absolute;
  width: 25px;
  top: 50%;
  transform: translate(0, -50%);
}
.audio {
  width: 100%;
  border-radius: 0;
}
.progress {
  width: 100%;
  height: 3px;
  background-color: #dddddd;
  position: absolute;
  bottom: 0;
}
.progress_bar {
  height: 3px;
  background-color: #d81e06;
  width: 0;
  position: relative;
}
.progress_bar::after {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #d81e06;
  position: absolute;
  right: 0;
  top: 1.5px;
  transform: translate(50%, -50%);
}
.timer {
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>