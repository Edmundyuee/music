<template>
    <div class="mv">
        <h2 class="title">视频</h2>
        <classification-mv></classification-mv>
        <div class="views">
            <router-view></router-view>
        </div>
        <mvplay></mvplay>
    </div>
</template>

<script>
import classificationMv from '@/views/found/classification/classificationMV.vue'
import mvplay from '@/views/found/views/recommend/recommendlist/Mvplay'
    export default {
        name: "Mv",
        components: {
            classificationMv,
            mvplay
        }
    }
</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
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
.views{
    position: absolute;
    margin-top: 110px;
    width: 90%;
    left: 50%;
    transform: translate(-50%);
}
</style>