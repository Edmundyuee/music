<template>
  <div>

  </div>
</template>


<script>
import { getLyirc } from '@/network/player'
export default{
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
      getLyirc(id).then((result) => {
        console.log(result);
        console.log(resutt.lyirc);
      }).catch((err) => {
        
      });
    }
  },
  watch: {
    playControls(newval) {
      console.log(newval);
      if (newval) {
        console.log(this.$refs.playcontrol.style);
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

</style>