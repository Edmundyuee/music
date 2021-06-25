<template>
  <el-carousel height="131px" :interval="5000" arrow="always">
    <el-carousel-item v-for="(item,key) in carouselList" :key="key">
      <span><img class="images" :src="item.pic" alt=""></span>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import {getCarousel} from "@/network/found"
    export default {
        name: "Carousel",
        data(){
            return{
                carouselList: []
            }
        },
        created(){ 
            getCarousel().then((result) => {
                console.log(result.banners);
                this.carouselList = result.banners;
            }).catch((err) => {
            })
        }
    }
</script>

<style scoped>
span{
    display: inline-block;
    text-align: center;
}
.images{
    display: inline-block;
    width: 90%;
}
</style>