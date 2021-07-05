<template>
    <div>
        <div class="recom_title">
            <h2>推荐歌单</h2>
            <span class="more">更多></span>
        </div>
        <div class="recom_list">
            <span v-for="(item,index) in res" :key='index'>
                <div class="images" @click="recomClick(item.id)">
                    <img :src="item.picUrl" alt="">
                    <div class="play_count">
                        <img src="@/assets/img/headset.svg" alt="">
                        {{item.playCount | filterCount}}
                    </div>
                    <span class="title">
                        {{item.name}}
                    </span>
                </div>
            </span>
        </div>
            
    </div>
</template>

<script>
import {recomList} from '@/network/found'
    export default {
        components: { recomList },
        name: "RecommendList",
        data(){
            return{
                res: '',
                palyCount: ''
            }
        },
        created(){
            recomList(15).then((result) => {
                console.log(result.result);
                this.res = result.result
            }).catch((err) => {
                console.log(err);
            });
        },
        methods:{
            recomClick(item){
                console.log(item);
                this.$store.commit('recomListPage',true)
                this.$store.commit('recomListID',item)
            }
        },
        filters:{
            filterCount(count){
                if(count<99999999){
                    return (count/10000).toFixed(1) + "万"
                }else{
                    return (count/100000000).toFixed(1) + "亿"
                }
            }
        }
    }
</script>

<style scoped>
h2{
    display: inline-block;
}
.recom_title{
    position: relative;
}
.more{
    position: absolute;
    top: 3px;
    right: 0;
}
.recom_list{
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-content: flex-start;
    flex-direction: row;
    text-align: center;
}
.recom_list>span{
    position: relative;
    flex: 1;
    align-self: flex-start;
    /* text-align: center; */
    padding-top: 12.5px;
    margin-bottom: 20px;
}
.images{
    display: inline-block;
    position: relative;
    width: 100px
}
.images>img{
    width: 100px;
    border-radius: 10px;
    overflow: hidden;
}
.title{
    width: 100px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* 这里是超出几行省略 */
    overflow: hidden;
    text-align: left;
    font-size: 14px;
}
.play_count{
    height: 26px;
    padding: 0 5px;
    padding-left: 15px;
    font-size: 8px;
    background-color: rgba(0,0,0,.3);
    color: #fff;
    position: absolute;
    top: 0;
    line-height: 26px;
    right: 0;
    border-radius: 0 10px 0 5px;
}
.play_count>img{
    position: absolute;
    top: 7px;
    height: 12px;
    left: 2px;
}
.recomLists{
    display: none;
}
</style>