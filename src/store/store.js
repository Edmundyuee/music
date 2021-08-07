import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        musicId: 1308818967,
        searchPage: false,
        play_control: false,
        isActive: false,
        first: 0,
        play_list: [],
        musicIndex: -1,
        autoPlay: false,
        recomListPage: false,
        recomListID: 0,
        isMvActive: false,
        mvPlayId: 0,
        loginState: false,
        playListID: '',
        cookie: ''
    },
    mutations:{
      changeCookie(state,cookie){
        state.cookie = cookie;
      },
      resetMusicIndex(state){
        state.musicIndex = 0;
      },
      resetList(state){
        state.play_list = []
      },
      changePlayListID(state,id){
        state.playListID = id;
      },
      mvPlayID(state,id){
        state.mvPlayId = id;
      },
      isMvActiveChange(state,flag){
        state.isMvActive = flag
      },
      autoPlay(state,auto){
        state.autoPlay = auto
      },
      //存储当前播放音乐id
      changeMusic(state,id){
        state.musicId = id
      },
      changeMusics(state,payload){
        state.musicId = payload.id
        state.musicIndex = payload.index
      },
      nextMusic(state){
        if(state.musicIndex==state.play_list.length-1){
          state.musicIndex = 0
        }else{
          console.log(state.musicIndex);
          state.musicIndex++
        }
      },
      lastMusic(state){
        if(state.musicIndex==0){
          state.musicIndex = state.play_list.length-1
        }else{
          state.musicIndex--
        }
      },
      //设置搜索页面是否显示
      changeSearchPage(state,flag){
        state.searchPage = flag
      },
      //设置弹出层状态
      playController(state){
        state.play_control = !state.play_control;
      },
      //保存当前播放状态
      isActives(state,payload){
        state.isActive = payload.isActive
        state.first = payload.first
      },
      changePlayList(state,result){
        result.forEach(element => {
          state.play_list.push(element)
        });
        // state.play_list.push(result)
      },
      addPlayList(state,id){
        state.play_list.unshift(id)
      },
      recomListPage(state,val){
        state.recomListPage = val
      },
      recomListID(state,id){
        state.recomListID = id
      },
      changeLoginState(state,loginState){
        console.log("执行loginstate:"+ loginState);
        state.loginState = loginState;
      }
    },
    actions:{
      changeLoginS({commit}, loginState){
        console.log("执行active:" + loginState);
        console.log(commit);
        commit('changeLoginState',loginState)
      }
    }
})