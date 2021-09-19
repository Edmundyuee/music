<template>
  <div class="broadPlay">
    <div class="broad_title">
      <h2>独家放送</h2>
      <span class="more" @click="more_mvs">更多></span>
    </div>
    <div class="broad_list">
      <span
        v-for="(item, index) in res"
        :key="index"
        @click="broadPlay(item.id)"
      >
        <div class="images">
          <img v-lazy="item.sPicUrl" alt="" />
          <span class="title">
            {{ item.name }}
          </span>
          <div class="svg_img">
            <img src="@/assets/img/mv_write.svg" alt="" />
          </div>
        </div>
      </span>
      <i></i><i></i><i></i><i></i><i></i>
    </div>
  </div>
</template>

<script>
import { broadList } from "@/network/found";

export default {
  name: "Broadcast",
  data() {
    return {
      res: "",
      palyCount: "",
      isMvActive: false,
    };
  },
  components: {},
  methods: {
    broadPlay(id) {
      this.$store.commit("mvPlayID", id);
      console.log(id);
      this.$store.commit("isMvActiveChange", true);
    },
    more_mvs() {
      this.$router.replace("/mv/whole");
    },
  },
  created() {
    broadList(6)
      .then((result) => {
        console.log(result.result);
        this.res = result.result;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  filters: {
    filterCount(count) {
      if (count < 99999990) {
        return (count / 10000).toFixed(1) + "万";
      } else {
        return (count / 100000000).toFixed(1) + "亿";
      }
    },
  },
};
</script>

<style scoped>
h2 {
  display: inline-block;
}
.broadPlay {
  margin-bottom: 120px;
}
.broad_title {
  position: relative;
}
.more {
  position: absolute;
  top: 3px;
  right: 0;
}
.broad_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
.broad_list > span {
  position: relative;
  text-align: center;
  /* padding-top: 12.5px; */
  width: 150px;
  padding: 12.5px 5px 0px;
  margin-bottom: 20px;
 
}
.images {
  display: inline-block;
  position: relative;
  width: 150px;
}
.images > img {
  width: 150px;
  border-radius: 10px;
  overflow: hidden;
}
.images>img[lazy='loading']{
    width: 50px;
    height: 50px;
    display: block;
    margin: 25px auto 0;
    /* position: absolute;
    top: 50%; */
    /* transform: translate(0,-50%); */
}
.title {
  width: 150px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 这里是超出几行省略 */
  overflow: hidden;
  text-align: left;
  font-size: 14px;
}
.svg_img {
  padding: 0px 5px;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 3px;
  left: 3px;
}
.svg_img > img {
  width: 20px;
}
.broad_list > i {
  width: 160px;
  /* margin: 0 5px; */
  
}
</style>