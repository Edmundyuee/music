<template>
  <div id="app">
      <router-view/>
      <tabbar></tabbar>
  </div>
</template>
<script>
import tabbar from "@/components/tabbar/Tabbar"
export default {
  components: {
    tabbar
  }
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
  /* width: 100%; */
  list-style: none;
}
html body{
  width: 100%;
  height: 100%;
}
</style>
