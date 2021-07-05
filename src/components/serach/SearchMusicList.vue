<template>
  <div class="searchList">
    <ul>
      <li
        ref="lis"
        v-for="(item, index) in songs"
        :key="index"
        @click="lisClick(item.id)"
      >
        <div class="name">{{ item.name }}--{{ item.artists[0].name }}</div>
        <div class="lis_btn">
          <img v-if="item.mvid != 0" src="@/assets/img/mv_btn.svg" alt="" />
        </div>
        <div class="lis_btns">
          <img
            v-if="item.id == musicID && isActive"
            src="@/assets/img/music_img.svg"
            alt=""
          />
        </div>
      </li>
      <li class="load_li">
        <div class="load_div">
          <img class="load_img" src="@/assets/img/load.svg" alt="" />
          正在加载...
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SearchMusicList",
  props: {
    songs: {},
  },
  updated() {
    for (let i = 0; i < this.$refs.lis.length; i++) {
      if (i % 2 == 0) {
        this.$refs.lis[i].style.backgroundColor = "#f9f9f9";
      }
    }
  },
  methods: {
    lisClick(id) {
      this.$store.commit("changeMusic", id);
      this.$store.commit("isActives", {isActive:true,first:1});
      console.log(this.songs);
    },
  },
  computed: {
    musicID() {
      return this.$store.state.musicId;
    },
    isActive() {
      return this.$store.state.isActive;
    },
  }
};
</script>

<style scoped>
.searchList > ul > li {
  width: 100%;
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  position: relative;
  box-sizing: border-box;
}
.searchList {
  margin-bottom: 120px;
}
.name {
  width: 70%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
}
.lis_btn {
  display: inline-block;
  width: 50px;
  height: 100%;
  position: absolute;
  right: 0;
}
.lis_btn > img {
  width: 25px;
  display: inline-block;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}
.lis_btns {
  display: inline-block;
  width: 50px;
  height: 100%;
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
.load_li {
  display: inline-block;
  width: 100%;
  height: 100%;
  position: absolute;
}
.load_div {
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  display: table;
}
.load_img {
  width: 16px;
  vertical-align: middle;
  /* position: absolute; */
  /* top: 50%; */
  /* transform: translate(-130%,-50%); */
  animation: round_animate 1s linear infinite;
}
@keyframes round_animate {
  to {
    transform: rotate(1turn);
  }
}
</style>