<template>
    <div class="searchItem">
        <img class="return_img" src="@/assets/img/return.svg" alt="" v-show="flag" @click="returnPage">
        <input @focus="onfocus" ref="inputs" class="searchInput" v-model="input" type="text" @keyup.enter="searchSongs" placeholder="搜索">
        <img class="search_img" src="@/assets/img/search.svg" alt="" @click="searchMusics">
    </div>
</template>

<script>
import {getFoundSearch} from '@/network/found'
    export default {
        name: 'Search',
        data(){
            return{
                input: '',
                flag: false
            }
        },
        methods: {
            searchSongs(e){
                    getFoundSearch(this.input).then(result => {
                        console.log(result.result);
                        this.$emit('songsList',result.result.songs)
                    }).catch((err) => {
                        console.log(err);
                    });
            },
            onfocus(){
                this.flag = true;
                this.$store.commit('changeSearchPage',this.flag)
            },
            returnPage(){
                console.log("你好");
                this.flag = false;
                this.$store.commit('changeSearchPage',this.flag)
            },
            searchMusics(){
                console.log("111");
                this.searchSongs()
            }
        },
    }
</script>

<style scoped>
.searchItem{
    width: 100%;
    padding: 15px 0;
    background-color: #d81e06;
    box-sizing: border-box;
    position: sticky;
    text-align: center;
    top: 0;
    z-index: 10;
}
.searchInput{
    width: 75%;
    height: 35px;
    border-radius: 17.5px;
    box-sizing: border-box;
    padding: 10px 20px;
    font-size: 18px;
    background-color: #f6f6f6;
    border: none;
}
.searchInput:focus{
    outline: none;
}
.search_img{
    width: 25px;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translate(0,-50%);
}
.return_img{
    width: 25px;
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translate(0,-50%);
}
</style>