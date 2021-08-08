
<template>
    <div class="ification">
        <classification-item path="/found/recommend">
            <template v-slot:class_item>
                推荐
            </template>
        </classification-item>
        <classification-item path="/found/songlist">
            <template v-slot:class_item>
                歌单
            </template>
        </classification-item>
        <classification-item path="/found/radio">
            <template v-slot:class_item>
                电台
            </template>
        </classification-item>
        <classification-item path="/found/top">
            <template v-slot:class_item>
                排行榜
            </template>
        </classification-item>
        <classification-item path="/found/newsong">
            <template v-slot:class_item>
                新歌
            </template>
        </classification-item>
    </div>
</template>

<script>
import classificationItem from './classificationItem.vue'
    export default {
        name: "Classification",
        components: {
            classificationItem
        }
    }
</script>

<style scoped>
.ification{
    display: flex;
    height: 50px;
    text-align: center;
    line-height: 50px;
    border-bottom: 1px solid #ddd;
    position: sticky;
    top: 65px;
    z-index: 2;
    background-color: #fff;
}
</style>