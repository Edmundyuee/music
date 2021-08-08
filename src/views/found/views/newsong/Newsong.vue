<template>
    <div class="newsong">
        <div class="select">
            <button :class="{'active':isActive}" @click="clickAlbum(true)">新碟速递</button>
            <button :class="{'active':!isActive}" @click="clickAlbum(false)">新碟上架</button>
        </div>
        <h2>新歌</h2>
    </div>
</template>

<script>
import { getAlbum } from '@/network/found'
    export default {
        name: 'Newsong',
        data(){
           return{
               isActive: true
           } 
        },
        methods:{
            clickAlbum(a){
                if(a){
                    this.isActive = true;
                }else{
                    this.isActive = false;
                }
            }
        },
        mounted(){
            getAlbum().then((result) => {
                console.log(result);
            }).catch((err) => {
                
            });
        }
    }
</script>

<style scoped>
.newsong{
    width: 90%;
    margin: 10px auto 120px;
}
.select{
    text-align: center;
}
.select>button{
    background-color: #fff;
    padding: 5px 10px;
    border: 1px solid #ccc;
}
.select>button:first-of-type{
    border-radius: 15px 0 0 15px;
    border-right: none;
}
.select>button:last-of-type{
    border-radius:  0 15px 15px 0;
    border-left: none;
}
.active{
    background-color: #d81e06 !important;
    color: #fff;
}
</style>