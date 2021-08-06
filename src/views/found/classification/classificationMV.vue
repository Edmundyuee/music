
<template>
    <div class="ification">
        <classification-item path="/mv/selected">
            <template v-slot:class_item>
                MV精选
            </template>
        </classification-item>
        <classification-item path="/mv/sole">
            <template v-slot:class_item>
                网易独家
            </template>
        </classification-item>
        <classification-item path="/mv/whole">
            <template v-slot:class_item>
                全部MV
            </template>
        </classification-item>
    </div>
</template>

<script>
import classificationItem from './classificationItem.vue'
    export default {
        name: "ClassificatioMV",
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
    width: 100%;
    line-height: 50px;
    border-bottom: 1px solid #ddd;
    position: fixed;
    top: 0px;
    z-index: 1;
    background-color: #fff;
    margin-top: 50px;
}
</style>