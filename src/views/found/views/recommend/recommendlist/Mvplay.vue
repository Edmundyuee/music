<template>
  <div ref="div" class="mvplay">
    视频播放窗口
  </div>
</template>

<script>
  export default {
    name: "Mvplay",
    props:{
      isActive: {
        type: Boolean,
        default :false
      }
    },
    computed: {
      active(){
        return this.isActive
      }
    },
    watch: {
      active(newVal){
        if(newVal){
          this.$refs.div.style.display = 'block'
        }
      }
    }
  }
</script>

<style scoped>
.mvplay{
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 1000;
}
</style>