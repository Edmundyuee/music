<template>
    <div>
        <carousel></carousel>
        <recommend-list></recommend-list>
    </div>
</template>

<script>
import Carousel from '../../carousel/Carousel'
import RecommendList from '../../recommendlist/RecommendList'
    export default {
        name: 'Recommend',
        components: {
            Carousel,
            RecommendList
        }
    }
</script>

<style scoped>

</style>