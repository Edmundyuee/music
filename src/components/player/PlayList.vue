<template>
  <div ref="playList" class="play_list" id="play_list">
    <div class="top">
      <div class="return">
        <img src="@/assets/img/return_b.svg" alt="" @click="changeisClick" />
      </div>
      <div class="title">播放歌单</div>
      <div class="empty">清空</div>
    </div>
    <div class="list" ref="list">
      <ul class="uls">
        <li
          v-for="(item, index) in list"
          :key="index"
          ref="lis"
          @click="playMusic(item.id,index)"
        >
          {{ index }}--{{ item.name }}
          <div class="lis_btns">
            <img
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
export default {
  name: "PlayList",
  props: {
    isClick: {
      type: Boolean,
      default: false,
    },
    loadOver:{
      type:Boolean,
      default: false
    }
  },
  data() {
    this.scrollDom = null;
    return {
      isClicks: false,
      list: this.playListChange,
      musicID: "",
      isActive: false,
      scroll: '',
      scrollBottoms: false
    };
  },
  created(){
      console.log("你好啊啊啊啊啊");
  },
  mounted(){
    console.log();
    document.getElementById('play_list').addEventListener('scroll',() => {
      this.scrollBottoms = (document.getElementById('play_list').scrollHeight-(document.getElementById('play_list').scrollTop + window.screen.height))<40
    })
  },
  methods: {
    changeisClick() {
      this.isClicks = !this.isClicks;
    },
    playMusic(id,index) {
        if(id == this.$store.state.musicId){
            this.$store.commit("isActives", {isActive:true,first:1});
            this.musicID = id
            console.log(index);
        }else{
            this.$store.commit("changeMusics", {id,index});
            console.log(index);
        }
        console.log();
    },
  },
  updated() {
    if(this.$refs.lis.length){
      console.log(this.$refs.lis.length);
    }else{
      console.log("不存在");
      for (let i = 0; i < this.$refs.lis.length; i++) {
      if (i % 2 == 0) {
        this.$refs.lis[i].style.backgroundColor = "#f9f9f9";
      }
    }
    }
  },
  computed: {
    changeMusicIds() {
      return this.$store.state.musicId;
    },
    isActives() {
      return this.$store.state.isActive;
    },
    playListChange(){
      return this.$store.state.play_list
    }
  },
  watch: {
    isClick(newVal) {
      this.isClicks = newVal;
      if (newVal) {
        this.$refs.playList.style.display = "block";
      } else {
        this.$refs.playList.style.display = "none";
      }
    },
   scrollBottoms(newVal){
     if(this.loadOver){
       console.log("加载完毕");
     }else{
       if(newVal){
       this.$emit('loadList')
     }
     }
   },
    isClicks(newVal) {
      if (this.isClicks !== newVal) {
      } else {
        this.$emit("changeIsClick", this.isClicks);
        console.log("发生改变" + this.isClicks);
      }
    },
    changeMusicIds(newVal) {
      console.log("playList坚挺到");
      this.musicID = newVal;
    },
    isActives(newVal) {
      this.isActive = newVal;
    },
    playListChange(newVal){
        this.list = newVal
    }
  },
};
</script>

<style scoped>
.play_list {
  display: none;
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255);
  z-index: 14;
  box-sizing: border-box;
  overflow-y: scroll;
}
.list {
  line-height: 40px;
}
.list > ul {
  width: 100%;
  padding: 10px 20px;
  position: relative;
  box-sizing: border-box;
  top: 60px;
}
.list > ul > li {
  width: 100%;
  height: 40px;
}
.top {
  width: 100%;
  height: 60px;
  padding: 10px 20px;
  box-sizing: border-box;
  text-align: center;
  position: fixed;
  top: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  z-index: 15;
}
.title {
  flex: 1;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
}
.return {
  position: absolute;
  left: 5%;
  top: 20px;
}
.empty {
  font-size: 16px;
  position: absolute;
  right: 5%;
  top: 20px;
}
.return > img {
  width: 25px;
}
.lis_btns {
  display: inline-block;
  width: 50px;
  position: absolute;
  right: 35px;
}
.lis_btns > img {
  width: 25px;
  display: inline-block;
  position: absolute;
  top: 7.5px;
  animation: round_animate 3s linear infinite;
}
@keyframes round_animate {
  to {
    transform: rotate(1turn);
  }
}
</style>