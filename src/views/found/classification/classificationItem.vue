//顶部分类
<template>
    <div class="classf_item"  @click="routeHop">
        <span class="title" :class="{active:isActive}"><slot name="class_item"></slot></span>
    </div>
</template>

<script>
    export default {
        name: 'classificationItem',
        props: {
            path: {
                type: String
            }
        },
        methods: {
            routeHop(){
                console.log("hello");
                this.$router.replace(this.path)
            }
        },
        computed: {
            isActive(){
                return this.$route.path == this.path
            }
        }
    }
</script>

<style scoped>
.classf_item{
    flex: 1;
}
.title{
    position: relative;
    display: inline-block;
    height: 100%;
}
.active{
    color: #d81e06;
    text-align: center;
}
.active::after{
    content: "";
    width: 100%;
    height: 3px;
    border-radius: 1px;
    background-color: #d81e06;
    position: absolute;
    bottom: -1px;
    left: 50%;
    transform: translate(-50%,0);
}
</style>