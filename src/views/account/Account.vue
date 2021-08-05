<template>
  <div class="account">
    <h2 class="title">账号</h2>
    <ul class="login_btn">
      <li v-if="!loginState">
                <span class="title_explain">
                    登录网易云音乐，<br>
                    手机电脑多端同步，320k高音质无限下载
                </span>
                <button @click="login_page" class="loginBtn">立即登录</button>
            </li>
      
      <li class="account_info" v-else-if="loginState">
        <div class="info">
          <img :src="avatarUrl" class="headPortrait" alt="" />
          <span class="name">{{nickname}}</span>
          <span class="edit_info">
              <img class="edit" src="@/assets/img/edit.svg" alt="">
              编辑
          </span>
        </div>
        <div class="self_info">
            <div class="fans">
                粉丝<br>
                {{followeds}}
            </div>
            <div class="follow">
                关注<br>
                {{follows}}
            </div>
            <div class="grade">
                等级<br>
                lv{{level}}
            </div>
        </div>
      </li>
    </ul>
    <ul>
      <li>
        我的消息
        <img src="@/assets/img/right.svg" alt="" />
      </li>
    </ul>
    <ul>
      <li>
        会员中心
        <img src="@/assets/img/right.svg" alt="" />
      </li>
    </ul>
    <ul>
      <li>
        定时关闭
        <img src="@/assets/img/right.svg" alt="" />
      </li>
      <li>
        音质选择
        <img src="@/assets/img/right.svg" alt="" />
      </li>
      <li>
        清除缓存
        <img src="@/assets/img/right.svg" alt="" />
      </li>
      <li>
        音乐黑名单
        <img src="@/assets/img/right.svg" alt="" />
      </li>
      <li>
        心动模式
        <img src="@/assets/img/right.svg" alt="" />
      </li>
      <li>
        控制中心菜单显示喜欢
        <img src="@/assets/img/right.svg" alt="" />
      </li>
      <li>
        锁屏歌词
        <img src="@/assets/img/right.svg" alt="" />
      </li>
      <li>
        歌词翻译
        <img src="@/assets/img/right.svg" alt="" />
      </li>
    </ul>
    <ul>
      <li>
        使用2G/3G/4G网络播放
        <img src="@/assets/img/right.svg" alt="" />
      </li>
      <li>
        使用2G/3G/4G网络下载
        <img src="@/assets/img/right.svg" alt="" />
      </li>
    </ul>
    <ul>
      <li>
        关于网易云音乐
        <img src="@/assets/img/right.svg" alt="" />
      </li>
    </ul>
    <ul v-if="loginState">
      <li>
        <button @click="loginOut" class="loginOut">退出账号登录</button>
      </li>
    </ul>
    <div class="logins" v-if="loginActive">
      <div class="login_page">
        <button class="return_btn" @click="close_page">取消</button>
        <h3>扫码登录</h3>
        <span class="qr_code">
          <img ref="qr_img" src="" alt="" />
          <div class="code_800" v-if="qrstate === 800">
            二维码已过期
            <button @click="refresh">点击刷新</button>
          </div>
          <div class="code_802" v-else-if="qrstate === 802">
            扫码成功<br />
            等待授权
          </div>
        </span>
        <button class="more_login">使用更多方式登录</button>
      </div>
    </div>
    <div class="loginOuts" v-if="loginOutActive">
      <div class="loginOutPage">
        <span>是否退出账号</span>
        <div class="out_btn">
          <button @click="yes_out">是</button>
          <button @click="no_out">否</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getQrKey } from "@/network/found";
import { getQrCreate } from "@/network/found";
import { getLoginState } from "@/network/found";
import { getState } from "@/network/found";
import { getUserDetail } from "@/network/found"
import { loginOut } from "@/network/found"
// import { getMvFirst } from '@network/found';
export default {
  name: "Account",
  data() {
    return {
      loginActive: false,
      qrstate: 801,
      timer: "",
      loginState: true,
      level: '',
      followeds: '',
      follows: '',
      avatarUrl: '',
      nickname: '',
      loginOutActive: false
    };
  },
  mounted(){
    // this.loginState = this.$store.state.loginState;
    this.getStates();
  },
  watch:{
    loginState(newVal){
      this.$store.commit('changeLoginState',newVal)
    }
  },
  methods: {
    login_page() {
      this.loginActive = true;
      this.getLogin();
    },
    close_page() {
      this.loginActive = false;
    },
    refresh() {
      this.getLogin();
    },
    getLogin() {
      let timestamp = Date.now();
      let code;
      //1.获取登录的key
      getQrKey(timestamp)
        .then((result) => {
          const key = result.data.unikey;
          console.log(result);
          console.log(key);
          //2.获取当前登录的二维码信息
          getQrCreate(key)
            .then((result) => {
              console.log(result);
              clearInterval(this.timer);
              this.$refs.qr_img.src = result.data.qrimg;
              //获取到key之后设置interval来循环检测当前登录状态指令
              this.timer = setInterval(() => {
                //通过登录的key来获取当前登录状态
                getLoginState(key)
                  .then((result) => {
                    console.log(result);
                    code = result.code;
                    //判断当前处在登录的那个阶段
                    if (code === 800) {
                      this.qrstate = 800;
                      clearInterval(this.timer);
                    } else if (code === 801) {
                      this.qrstate = 801;
                      console.log("等待扫码");
                    } else if (code === 802) {
                      console.log("等待授权");
                      this.qrstate = 802;
                    } else if (code === 803) {
                      console.log("登录授权成功");
                      this.close_page();
                      clearInterval(this.timer);
                      this.loginState = true;
                      //当登录指令变为803时说明用户授权成功，获取用户的详细信息
                      this.getStates();
                    }
                  })
                  .catch((err) => {});
              }, 3000);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    },
    getStates(){
      getState().then((result) => {
                          console.log(result);
                          //将获取到的用户信息逐个赋值给已设置的参数，从而渲染到页面中
                          this.avatarUrl = result.data.profile.avatarUrl
                          this.nickname = result.data.profile.nickname
                          getUserDetail(result.data.profile.userId).then((result) => {
                                console.log(result);
                                this.level = result.level;
                                this.followeds = result.profile.followeds;
                                this.follows = result.profile.follows;
                                tihs.loginState = true
                                this.$store.dispatch('changeLoginS',true)
                          }).catch((err) => {
                              
                          });
                      }).catch((err) => {
                          
                    });
    },
    loginOut(){
      this.loginOutActive = true;
    },
    yes_out(){
      //退出登录确定，执行退出登录指令
      loginOut().then((result) => {
        console.log(result);
        if(result.code===200){
          this.loginOutActive = false;
          this.resetAccount();
          //用户退出登录更改在store中存储的登录数据
          this.$store.commit('changeLoginState',false)
      }
        
      }).catch((err) => {
        
      });
    },
    no_out(){
      this.loginOutActive = false;
    },
    resetAccount(){
      this.loginState = false;
      this.loginActive = false;
      this.level =  '';
      this.followeds = '';
      this.follows = '';
      this.avatarUrl = '';
      this.nickname = '';
    }
  },
};
</script>

<style scoped>
.title {
  height: 50px;
  line-height: 50px;
  width: 100%;
  text-align: center;
  font-weight: 500;
  position: fixed;
  top: 0;
  z-index: 10;
  background-color: #fff;
}
.account {
  background-color: #f2f2f2;
  height: 100%;
  width: 100%;
  margin-bottom: 120px;
}
.info {
  height: 50px;
  line-height: 50px;
  position: relative;
}
.self_info{
    width: 100%;
    display: flex;
    margin-top: 20px;
    border-top: 1px solid #f2f2f2;
    padding-top: 5px;
}
.self_info>div{
    flex: 1;
    text-align: center;
}
.self_info>div:not(:last-of-type){
    border-right: 1px solid #f2f2f2;
}
.edit_info{
    display: inline-block;
    width: 40px;
    padding-left: 30px;
    position: absolute;
    right: 0px;
}
.edit{
    width: 25px;
    height: 25px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0,-50%);
}
.account_info {
  width: 100%;
  padding-top: 20px;
  position: relative;
  /* height: 150px; */
  padding-bottom: 20px;
  text-align: left !important;
}
.name {
  margin-left: 65px;
  font-size: 20px;
}
.headPortrait {
  width: 50px;
  height: 50px;
  background-color: #ccc;
  border-radius: 25px;
  position: absolute;
  left: 0;
}
ul {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #fff;
  margin-top: 20px;
  position: relative;
}
ul:not(:first-of-type) > li {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  position: relative;
}
ul > li:not(:last-of-type) {
  border-bottom: 1px solid #f2f2f2;
}
ul:not(:first-of-type) > li > img {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 0;
  top: 10px;
}
.login_btn {
  margin-top: 50px;
}
.login_btn > li {
  width: 100%;
  text-align: center;
}
.title_explain {
  /* margin-top: 20px; */
  width: 100%;
  text-align: center;
}
.loginBtn {
  width: 100%;
  height: 50px;
  background-color: #fff;
  border-radius: 25px;
  margin-top: 25px;
  margin-bottom: 25px;
  font-size: 20px;
  border: 1px solid #ccc;
}
.logins {
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 11;
  box-sizing: border-box;
}
.login_page {
  width: 300px;
  height: 400px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.return_btn {
  width: 50px;
  margin: 20px 10px;
  background-color: #fff;
  border: none;
  color: #6b6b6b;
}
.login_page > h3 {
  text-align: center;
  margin-top: 20px;
}
.qr_code {
  display: block;
  width: 150px;
  height: 150px;
  margin-top: 10px;
  background-color: #ccc;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
.more_login {
  width: 150px;
  height: 35px;
  position: absolute;
  bottom: 50px;
  border-radius: 17.5px;
  border: 1px solid #ccc;
  background-color: #fff;
  left: 50%;
  transform: translate(-50%);
}
.qr_code > img {
  width: 100%;
  height: 100%;
}
.code_800 {
  width: 100%;
  height: 150px;
  position: absolute;
  top: 50%;
  text-align: center;
  transform: translate(0, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  padding-top: 45px;
  box-sizing: border-box;
}
.code_800 > button {
  color: #fff;
  margin-top: 10px;
  height: 25px;
  width: 80px;
  background-color: #d81e06;
  border-radius: 12.5px;
  border: none;
}
.code_802 {
  width: 150px;
  height: 150px;
  position: absolute;
  top: 50%;
  text-align: center;
  transform: translate(0, -50%);
  background-color: rgba(255, 255, 255, 1);
  padding-top: 45px;
  box-sizing: border-box;
}
.loginOut{
  width: 80%;
  height: 50px;
  border-radius: 25px;
  color: #fff;
  background-color: #d81e06;
  border: none;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
.loginOuts{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,.3);
  z-index: 11;
}
.loginOutPage{
  width: 300px;
  height: 200px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%,-50%);
  overflow: hidden;
}
.loginOutPage>span{
  width: 100%;
  display: block;
  text-align: center;
  margin-top: 30px;
  font-size: 20px;
}
.out_btn{
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;

}
.out_btn>button{
  flex: 1;
  height: 40px;
  border: 1px solid #f2f2f2;
  background-color: #fff;
}
</style>