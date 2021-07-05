<template>
    <div class="tabbar">
            <slot name="tabbar_item"></slot>
    </div>
    
</template>

<script>
    export default {
        name: 'TabbarItems'
    }
</script>

<style scoped>
.tabbar{
    position: absolute;
    width: 100%;
    height: 60px;
    bottom: 0px;
    display: flex;
    background-color: #fff;
    padding-top: 5px;
    box-sizing: border-box;
}
.tabbar_itme{
    flex: 1;
    width: 100%;
    text-align: center;
    background-color: #ccc;
}
</style>