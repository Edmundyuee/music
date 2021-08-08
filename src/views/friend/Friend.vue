<template>
  <div class="friend">
    <h2 class="title">朋友</h2>
    <div class="mymusic" v-if="loginState">wd</div>
    <div class="login_info" v-else>
      <div class="login_prompt">
        <span>您还没有登录，请先登录后再试！！！</span>
        <button class="login_btn" @click="replace_login">点击登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { userPlayList, getState } from "@/network/found";
export default {
  name: "Friend",
  data() {
    return {
      loginState: false,
    };
  },
  mounted() {
    this.loginStates();
  },
  methods: {
    replace_login() {
      this.$router.replace("/account");
    },
    loginStates() {
      //用于判断用户当前是否登录
      getState()
        .then((result) => {
          if (result.data.account != null) {
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
          } else {
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style scoped>
.friend {
  widows: 90%;
  margin: 10px auto 120px;
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
.login_prompt {
  width: 200px;
  height: 150px;
  margin: 0 auto;
  text-align: center;
  position: relative;
}
.login_btn {
  width: 100px;
  height: 40px;
  background-color: #d81e06;
  color: #fff;
  border: none;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>