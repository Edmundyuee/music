<template>
  <div class="whole" ref="whole" @touchmove.stop>
    <ul class="selecteds">
      <li>
        <div class="area">地区：</div>
        <div class="select" ref="select">
          <div>
            <span
              ><span
                style="
                  background-color: rgb(155, 155, 155);
                  color: rgb(255, 255, 255);
                "
                >全部</span
              ></span
            >
          </div>
          <div>
            <span><span>内地</span></span>
          </div>
          <div>
            <span><span>港台</span></span>
          </div>
          <div>
            <span><span>欧美</span></span>
          </div>
          <div>
            <span><span>韩国</span></span>
          </div>
          <div>
            <span><span>日本</span></span>
          </div>
        </div>
      </li>
      <li>
        <div class="type">类型：</div>
        <div class="select" ref="type">
          <div>
            <span
              ><span
                style="
                  background-color: rgb(155, 155, 155);
                  color: rgb(255, 255, 255);
                "
                >全部</span
              ></span
            >
          </div>
          <div>
            <span><span>官方版</span></span>
          </div>
          <div>
            <span><span>原声</span></span>
          </div>
          <div>
            <span><span>现场版</span></span>
          </div>
          <div>
            <span><span>网易出品</span></span>
          </div>
        </div>
      </li>
      <li>
        <div class="order">排序：</div>
        <div class="select" ref="order">
          <div>
            <span
              ><span
                style="
                  background-color: rgb(155, 155, 155);
                  color: rgb(255, 255, 255);
                "
                >上升最快</span
              ></span
            >
          </div>
          <div>
            <span><span>最热</span></span>
          </div>
          <div>
            <span><span>最新</span></span>
          </div>
        </div>
      </li>
    </ul>
    <div class="mv_list">
      <span
        v-for="(item, index) in res"
        :key="index"
        @click="broadPlay(item.id)"
      >
        <div class="images">
          <img :src="item.cover" alt="" />
          <span class="title newtitle">
            {{ item.name }}
          </span>
          <span class="artist_name">
            {{ item.artistName }}
          </span>
          <div class="svg_img">
            <img src="@/assets/img/mv_write.svg" alt="" />
          </div>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
import { allMv } from "@/network/found";
export default {
  name: "whole",
  data() {
    return {
      selectedList: [
        { 地区: ["全部", "内地", "港台", "欧美", "韩国", "日本"] },
        { 类型: ["全部", "官方版", "原声", "现场版", "网易出品"] },
        { 排序: ["上升最快", "最热", "最新"] },
      ],
      searhList: ["全部", "全部", "上升最快"],
      res: {},
    };
  },
  methods: {
    broadPlay(id) {
      // this.$refs.whole.style.overflowY = 'none';
      //页面弹出限制滚动条
        //页面弹出限制滚动条
        let mo = function (e) {
          e.preventDefault();
        };
        document.body.style.overflow = "hidden";
        document.addEventListener("touchmove", mo, false);
      this.$store.commit("mvPlayID", id);
      console.log(id);
      this.$store.commit("isMvActiveChange", true);
    },
  },
  mounted() {
    let select = this.$refs.select.children;
    let type = this.$refs.type.children;
    let order = this.$refs.order.children;
    let el;
    let targets;
    //找到select
    select.forEach((element) => {
      el = element.children[0].children[0];
      //给当前元素添加data-touch来存储当前的点击状态
      el.dataset.touch = "false";
      el.addEventListener("click", (ev) => {
        targets = ev.target;
        //判断当前选项是否已经点击，防止用户重复点击导致重新加载页面
        if (targets.dataset.touch === "false") {
          select.forEach((element) => {
            //重置其他选项默认值
            element.children[0].children[0].style.backgroundColor = "";
            element.children[0].children[0].style.color = "";
            element.children[0].children[0].dataset.touch = "false";
          });
          //将当前选中的选项设置样式和状态
          targets.dataset.touch = "true";
          this.searhList[0] = ev.target.innerText;
          ev.target.style.backgroundColor = "rgb(155,155,155)";
          ev.target.style.color = "#fff";
          allMv(this.searhList[0], this.searhList[1], this.searhList[2])
            .then((result) => {
              this.res = result.data;
            })
            .catch((err) => {});
        } else {
        }
      });
    });
    type.forEach((element) => {
      el = element.children[0].children[0];
      //给当前元素添加data-touch来存储当前的点击状态
      el.dataset.touch = "false";
      el.addEventListener("click", (ev) => {
        targets = ev.target;
        //判断当前选项是否已经点击，防止用户重复点击导致重新加载页面
        if (targets.dataset.touch === "false") {
          type.forEach((element) => {
            //重置其他选项默认值
            element.children[0].children[0].style.backgroundColor = "";
            element.children[0].children[0].style.color = "";
            element.children[0].children[0].dataset.touch = "false";
          });
          //将当前选中的选项设置样式和状态
          targets.dataset.touch = "true";
          this.searhList[1] = ev.target.innerText;
          ev.target.style.backgroundColor = "rgb(155,155,155)";
          ev.target.style.color = "#fff";
          allMv(this.searhList[0], this.searhList[1], this.searhList[2])
            .then((result) => {
              this.res = result.data;
            })
            .catch((err) => {});
        } else {
        }
      });
    });
    order.forEach((element) => {
      el = element.children[0].children[0];
      //给当前元素添加data-touch来存储当前的点击状态
      el.dataset.touch = "false";
      el.addEventListener("click", (ev) => {
        targets = ev.target;
        //判断当前选项是否已经点击，防止用户重复点击导致重新加载页面
        if (targets.dataset.touch === "false") {
          order.forEach((element) => {
            //重置其他选项默认值
            element.children[0].children[0].style.backgroundColor = "";
            element.children[0].children[0].style.color = "";
            element.children[0].children[0].dataset.touch = "false";
          });
          //将当前选中的选项设置样式和状态
          targets.dataset.touch = "true";
          this.searhList[2] = ev.target.innerText;
          ev.target.style.backgroundColor = "rgb(155,155,155)";
          ev.target.style.color = "#fff";
          allMv(this.searhList[0], this.searhList[1], this.searhList[2])
            .then((result) => {
              this.res = result.data;
            })
            .catch((err) => {});
        } else {
        }
      });
    });
    allMv(this.searhList[0], this.searhList[1], this.searhList[2])
      .then((result) => {
        this.res = result.data;
      })
      .catch((err) => {});
  },
};
</script>

<style scoped>
.whole{
  margin-bottom: 120px;
}
.selecteds {
  width: 100%;
}
.selecteds > li {
  width: 100%;
  height: 80px;
  line-height: 40px;
  position: relative;
  margin-top: 10px;
}
.selecteds > li:last-of-type {
  height: 40px;
}
.selecteds > li > div:first-child {
  width: 50px;
  text-align: right;
  display: inline-block;
  position: absoluter;
  top: 0;
}
.select {
  position: absolute;
  left: 50px;
  display: inline-block;
}
.select > div {
  display: inline-block;
  text-align: center;
}
.select > div > span {
  padding: 0 15px 0;
  border-right: 1px solid rgb(155, 155, 155);
}
.select > div > span > span {
  padding: 2px 3px 2px;
}
.mv_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
.mv_list > span {
  position: relative;
  text-align: center;
  padding-top: 12.5px;
  margin-bottom: 10px;
}
.images {
  display: inline-block;
  position: relative;
  width: 150px;
  height: 143.2px;
}
.images > img {
  width: 150px;
  height: 84.3px;
  border-radius: 10px;
  overflow: hidden;
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
.newtitle {
  -webkit-line-clamp: 1; /* 这里是超出几行省略 */
}
.artist_name {
  display: block;
  text-align: left;
  margin-top: 5px;
  width: 150px;
  font-size: 10px;
  color: rgb(115, 115, 115);
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
</style>