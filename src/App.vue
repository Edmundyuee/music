<template>
  <div id="app">
        <router-view/>
      <tabbar></tabbar>
      <player></player>
  </div>
</template>
<script>
import tabbar from "@/components/tabbar/Tabbar"
import player from "@/components/player/Player"
import PlayControl from "@/components/player/PlayControl"
export default {
  components: {
    tabbar,
    player,
    PlayControl
  },
  methods:{
    playstates(state){
      this.isActive = state
    }
  }
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
  /* width: 100%; */
  list-style: none;
}
html body{
  width: 100%;
  height: 100%;
}
body::-webkit-scrollbar{
    display:none;
}
.el-carousel__button{
  width: 5px !important;
  height: 5px !important;
  border-radius: 2.5px !important;
}
.el-carousel__container{
  border-radius: 8px;
  overflow: hidden;
  margin: 20px 0;
}
.el-carousel__indicators{
  bottom: 12% !important;
}
.el-carousel__arrow{
  display: none !important;
}
</style>
