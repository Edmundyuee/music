<template>
  <div>
      <el-carousel ref="carousel" :height="carHeight + 'px'" :interval="5000" arrow="always" :autoplay="autoplay">
        <el-carousel-item v-for="(item,index) in carouselList" :key="index">
            <v-touch :swipe-options="{direction: 'horizontal'}" v-on:swipeleft="swiperleft(index)" v-on:swiperight="swiperright(index)" class="wrapper">
                 <span><img class="images" :src="item.pic" alt="" @click="imgheight" ref="img"></span>
            </v-touch>
        </el-carousel-item>
      </el-carousel>
</div>
</template>

<script setup>
import {getCarousel} from "@/network/found"
    export default {
        name: "Carousel",
        data(){
            return{
                carouselList: [{
                    pic:"http://p1.music.126.net/EKXeFt2v02xnFnzJf3KI0Q==/109951166145048297.jpg"
                    
                }],
                autoplay: true,
                carHeight: 131
            }
        },
        created(){ 
            console.log("调用接口");
            getCarousel().then((result) => {
                console.log(result.banners);
                this.carouselList = result.banners;
                this.imgheight()
            }).catch((err) => {
            })
        },
        mounted(){
            window.onresize = () => {
                this.imgheight()
            }
        },
        methods:{
            imgheight(){
                this.carHeight = this.$refs.img[0].offsetHeight
            },
            //设置滑动切换轮播图
    swiperleft: function (index) {
      //上一页
      this.$refs.carousel.next();
      //设置幻灯片的索引
      this.$refs.carousel.setActiveItem(index + 1);
      this.autoplay = false;
      setTimeout(()=>{
          this.autoplay = true
      },100)
    },
    swiperright: function (index) {
      //下一页
      this.$refs.carousel.prev();
      this.$refs.carousel.setActiveItem(index - 1);
      this.autoplay = false;
      setTimeout(()=>{
          this.autoplay = true
      },100)
    },
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
    width: 100%;
    height: 100%;
}
.nav_button{
    width: 100%;
    padding: 20px 15px;
    text-align: center;
    box-sizing: border-box;
}
.nav_radius{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ccc;
    display: inline-block;
    margin-right: 10px;
}
.nav_radius:last-child{
    margin-right: 0;
}
.wrapper {
  touch-action: pan-y !important;
}
.wrapper>span{
    width: 100%;
}
</style>