<template>
    <div>
        <div class="broad_title">
            <h2>独家放送</h2>
            <span class="more">更多></span>
        </div>
        <div class="broad_list">
            <span v-for="(item,index) in res" :key='index' @click="broadPlay(id)">
                <div class="images">
                    <img :src="item.sPicUrl" alt="">
                    <span class="title">
                        {{item.name}}
                    </span>
                    <div class="svg_img">
                        <img src="@/assets/img/mv_write.svg" alt="">
                    </div>
                </div>
            </span>
        </div>
        
    </div>
</template>

<script>
import {broadList} from '@/network/found'

    export default {
        name: "Broadcast",
        data(){
            return{
                res: '',
                palyCount: '',
                isActive: false
            }
        },
        components:{
            mvplay
        },
        methods: {
            broadPlay(id){
                this.isActive = true
            }
        },
        created(){
            broadList().then((result) => {
                console.log(result.result);
                this.res = result.result
            }).catch((err) => {
                console.log(err);
            });
        },
        filters:{
            filterCount(count){
                if(count<99999990){
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
.broad_title{
    position: relative;
}
.more{
    position: absolute;
    top: 3px;
    right: 0;
}
.broad_list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
}
.broad_list>span{
    position: relative;
    text-align: center;
    padding-top: 12.5px;
    margin-bottom: 20px;
}
.images{
    display: inline-block;
    position: relative;
    width: 150px
}
.images>img{
    width: 150px;
}
.title{
    width: 150px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* 这里是超出几行省略 */
    overflow: hidden;
    text-align: left;
    font-size: 14px;
}
.svg_img{
    padding: 0px 5px;
    background-color: rgba(0,0,0,.3);
    position: absolute;
    top: 3px;
    left: 3px;
}
.svg_img>img{
    width: 20px;
}

</style>