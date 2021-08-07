<template>
  <div ref="playcontrol" class="playControl" :style="{backgroundImage:'url(' + picUrl + ')'}">
    <div class="top_btn">
      <span class="img_return" @click="closeControl">
        <img src="@/assets/img/return.svg" alt="" />
      </span>
      <span class="music_name">{{musicinfo.name}}</span>
      <span class="img_share">
        <img src="@/assets/img/share.svg" alt="" />
      </span>
    </div>
    <div class="middle">
      <div class="album_map">
        <div>
          <img
            ref="imgs"
            :src="picUrl"
            alt=""
          />
        </div>
      </div>
      <div class="lyric"></div>
    </div>
    <div class="bottom_control">
      <div class="progress">
        <div class="playtime">
          {{musicinfo.time | filterTime}}
        </div>
        <div class="progress_music">
          <div class="progress_p">
            <div class="progress_s" :style="{width:musicinfo.percentage*100 + '%'}"></div>
          </div>
        </div>
        <div class="totaltime">
          {{musicinfo.duration | filterTime}}
        </div>
      </div>
      <div class="music_control">
        <span class="loop">
          <img src="@/assets/img/loop.svg" alt="" />
        </span>
        <span class="last_song">
          <img src="@/assets/img/Lastsong_w.svg" @click="lastMusic" alt="" />
        </span>
        <span class="play">
          <img
            @click="changeisActive"
            :class="{ play_img: !isActive, dis: isActive }"
            src="@/assets/img/play_w.svg"
            alt=""
          />
          <img
            @click="changeisActive"
            :class="{ play_img: isActive, dis: !isActive }"
            src="@/assets/img/pause_w.svg"
            alt=""
          />
        </span>
        <span class="next_song">
          <img src="@/assets/img/Nextsong_w.svg" @click="nextMusics" alt="" />
        </span>
        <span class="music_list">
          <img src="@/assets/img/music_list_w.svg" alt="" @click="clickPlaylist" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getLyirc } from '@/network/player'
export default{
  name: "PlayControl",
  data() {
    return {
      isActive: false
    }
  },
  props:{
      musicinfo:{
        type: Object,
        default: function(){
          return{
            time:0,
            duration:0,
            name: "name",
            percentage:0,
            id: 33894312
          }
        }
      },
      picUrl:String
  },
  computed: {
    playControls() {
      return this.$store.state.play_control;
    },
    isActives(){
        return this.$store.state.isActive;
    }
  },
  methods: {
    clickPlaylist(){
      this.$emit('playList')
      this.getLyircs()
    },
    nextMusics(){
      this.$emit('nextMusic')
    },
    lastMusic(){
      this.$emit('lastMusic')
    },
    closeControl() {
      this.$store.commit("playController");
    },
    changeisActive() {
      this.$store.commit("isActives", {isActive:!this.isActive,first:1});
    },
    getLyircs(){
      getLyirc(33894312).then((result) => {
        console.log(result);
        console.log(result.lrc.lyric);
        let str = result.lrc.lyric.split("\n")
        console.log(str);
        //   /\[([0-9]{2}:[0-9]{2}.[0-9]{3})\]/g
        // 
      }).catch((err) => {
        
      });
    }
  },
  watch: {
    playControls(newval) {
      console.log(newval);
      if (newval) {
        this.$refs.playcontrol.style.display = "block";
        //页面弹出限制滚动条
        let mo = function (e) {
          e.preventDefault();
        };
        document.body.style.overflow = "hidden";
        document.addEventListener("touchmove", mo, false);
      } else {
        //取消限制滚动条
        this.$refs.playcontrol.style.display = "none";
        var mo = function (e) {
          e.preventDefault();
        };
        document.body.style.overflow = ""; //出现滚动条
        document.removeEventListener("touchmove", mo, false);
      }
    },
    isActives(newVal) {
      // this.isActive = newVal;
    // console.log("newVal:" + newVal + "thisActive:"+this.isActive);
      if (this.isActive == newVal) {
          console.log("你好·");
      } else {
        if (newVal) {
        this.$refs.imgs.style.webkitAnimationPlayState = "running";
        this.$refs.imgs.style.animationPlayState = "running";
      } else {
        this.$refs.imgs.style.animationPlayState = "paused";
        this.$refs.imgs.style.webkitAnimationPlayState = "paused";
      }
      }
      this.isActive = newVal;
    }
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
}
</script>

<style scoped>
.playControl {
  display: none;
  width: 100%;
  position: fixed;
  color: #fff;
  top: 0;
  bottom: 0;
  z-index: 11;
  background: #fff url("https://p2.music.126.net/xym9KKwpTQqEe3hoWmIqmQ==/109951165058516594.jpg?param=250y250");
  background-size: 100% 100%;
  overflow: hidden;
}
.playControl::after{
  content: "";
  width: 200%;
  height: 200%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: inherit;
  filter: blur(25px);
  z-index: 12;
}
.playControl::before{
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,.5);
  z-index: 13;
}
h2 {
  display: inline-block;
  position: absolute;
  bottom: 0;
}
.top_btn {
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding: 10px 30px;
  position: absolute;
  top: 0;
  display: flex;
  box-sizing: border-box;
  text-align: center;
  z-index: 13;
}
.top_btn > span > img {
  width: 25px;
}
.img_return {
  flex: 1;
}
.img_return > img {
  transform: rotate(-90deg);
}
.music_name {
  flex: 4;
  line-height: 40px;
}
.img_share {
  flex: 1;
}
.middle {
  position: absolute;
  width: 100%;
  height: 50%;
  top: 60px;
  z-index: 13;
}
.album_map {
  position: absolute;
  width: 100%;
  height: 100%;
}
.album_map > div {
  position: absolute;
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  overflow: hidden;
}
.album_map > div > img {
  width: 200px;
  height: 200px;
  animation: round_animate 5s linear infinite;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}
.bottom_control {
  width: 100%;
  height: 35%;
  position: absolute;
  bottom: 0;
  z-index: 13;
}
@keyframes round_animate {
  to {
    transform: rotate(1turn);
  }
}
.progress{
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 100px;
  display: flex;
  padding: 10px 20px;
  box-sizing: border-box;
  line-height: 40px;
  text-align: center;
}
.progress_music{
  width: 100%;
  position: relative;
}
.progress_s{
  height: 3px;
  background-color: rgba(255,255,255,.8);
  position: relative;
}
.progress_s::after{
  content: "";
  width: 8px;
  height: 8px;
  background-color: rgb(255,255,255);
  position: absolute;
  border-radius: 4px;
  right: -2.5px;
  top: -2.5px;
  filter: blur(3px);
}
.progress_p{
  width: 100%;
  background-color: rgba(255,255,255,.4);
  position: absolute;
  top: 18px;
}
.playtime{
  flex: 1;
}
.progress_music{
  flex: 6;
}
.totaltime{
  flex: 1;
}
.music_control {
  width: 100%;
  height: 100px;
  padding: 15px 20px;
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  text-align: center;
}
.music_control > span {
  position: relative;
  flex: 1;
}
.music_control > span > img {
  width: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* .loop{
    
}
.last_song{
    flex: 1;
}
.play{
    flex: 1;
} */
.play_img {
  width: 45px !important;
}
.dis {
  display: none;
}
/* .next_song{
    flex: 1;
}
.music_list{
    flex: 1;
} */
</style>