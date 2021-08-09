<template>
  <div id="app">
    <router-view />
    <tabbar></tabbar>
    <player></player>
    <div class="tanchu" v-if="tanchu">
      <span class="time_welcome">{{ i }}秒关闭</span>
      <span class="title_welcome">欢迎使用 </span>
    </div>
  </div>
</template>
<script>
import tabbar from "@/components/tabbar/Tabbar";
import player from "@/components/player/Player";
import PlayControl from "@/components/player/PlayControl";
import { getState } from "@/network/found";
export default {
  components: {
    tabbar,
    player,
    PlayControl,
  },
  data() {
    return {
      login_state: false,
      tanchu: true,
      interval: "",
      i: 3,
    };
  },
  methods: {
    playstates(state) {
      this.isActive = state;
    },
  },
  watch: {
    login_state(newVal) {
      this.$store.commit("changeLoginState", newVal);
    },
  },
  created() {
    // console.log(localStorage.getItem('tanchu'));
    getState()
      .then((result) => {
        console.log(result);
        if (result.data.account != null) {
          this.login_state = true;
        }
      })
      .catch((err) => {});
      // console.log(localStorage.getItem('tanchu'));
    if (!localStorage.getItem("tanchu")) {
      // console.log('执行');
      this.interval = setInterval(() => {
        if (this.i > 0) {
          this.i--;
        } else {
          this.tanchu = false;
          clearInterval(this.interval);
          localStorage.setItem("tanchu", true);
        }
      }, 1000);
    } else {
      // console.log('你好');
      this.tanchu = false;
      
    }
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  /* width: 100%; */
  list-style: none;
}
html body {
  width: 100%;
  height: 100%;
}
.time_welcome {
  display: block;
  position: absolute;
  right: 10px;
  top: 20px;
  color: #fff;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.5);
}
.tanchu {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #d81e06;
  z-index: 100;
}
.title_welcome {
  display: block;
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  letter-spacing: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  white-space: nowrap;
  transform: translate(-50%, -50%);
  /* width: 100%; */
  overflow: hidden;
  animation: mymove 1s linear;
}
@keyframes mymove {
  from {
    font-size: 100px;
    letter-spacing: 30px;
  }
  to {
    font-size: 30px;
    letter-spacing: 5px;
  }
}
body::-webkit-scrollbar {
  display: none;
}
.el-carousel__button {
  width: 5px !important;
  height: 5px !important;
  border-radius: 2.5px !important;
}
.el-carousel__container {
  border-radius: 8px;
  overflow: hidden;
  margin: 20px 0;
}
.el-carousel__indicators {
  bottom: 12% !important;
}
.el-carousel__arrow {
  display: none !important;
}
</style>
