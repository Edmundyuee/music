<template>
    <div class="recommend">
        <carousel></carousel>
        <recommend-list></recommend-list>
        <broadcast></broadcast>
    </div>
</template>

<script>
import Carousel from './carousel/Carousel'
import RecommendList from './recommendlist/RecommendList'
import Broadcast from './recommendlist/Broadcast'
    export default {
        name: 'Recommend',
        components: {
            Carousel,
            RecommendList,
            Broadcast
        }
    }
</script>

<style scoped>
.recommend{
    width: 90%;
    position: relative;
    left: 50%;
    transform: translate(-50%,0);
    margin-bottom: 60px;
}
</style>