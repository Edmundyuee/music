<template>
  <div class="tabbar_item" @click="routeHop">
    <div class="tabbar_img">
      <div class="item_img" v-if="!isActive">
        <slot name="tab_img"></slot>
      </div>
      <div class="item_img_active" v-else>
        <slot name="tab_img_active"></slot>
      </div>
    </div>
    <div class="tabbar_title" :class="{ active: isActive }">
      <slot name="tab_title"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabbarItem",
  props: {
    path: String,
  },
  data() {
    return {};
  },
  methods: {
    routeHop() {
      this.$router.replace(this.path);
    },
  },
  computed: {
    isActive() {
      if (this.$route.matched.length != 0) {
        return this.$route.matched[0].path == this.path;
      }
    },
  },
};
</script>

<style scoped>
.tabbar_item {
  flex: 1;
  text-align: center;
}
.tabbar_img img {
  vertical-align: top;
  width: 24px;
  height: 24px;
}
.tabbar_title {
  font-size: 12px;
}
.active {
  color: #d81e06;
}
</style>