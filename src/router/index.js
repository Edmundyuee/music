import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
      path: "/",
      redirect: "/found"
    },
    {
      path: "/found",
      component: () => import("@/views/found/Found"),
      children:[
        {
          path: "",
          redirect: "recommend"
        },
        {
          path: "recommend",
          component: () => import("@/views/found/views/recommend/Recommend")
        },
        {
          path: "songlist",
          component: () => import("@/views/found/views/songlist/Songlist")
        },
        {
          path: "radio",
          component: () => import("@/views/found/views/radio/Radio")
        },
        {
          path: "top",
          component: () => import("@/views/found/views/top/Top")
        },
        {
          path: "newsong",
          component: () => import("@/views/found/views/newsong/Newsong")
        }
      ]
    },
    {
      path: "/friend",
      component: () => import("@/views/friend/Friend")
    },
    {
      path: "/music",
      component: () => import("@/views/music/Music")
    },
    {
      path: "/mv",
      component: () => import("@/views/mv/Mv")
    },
    {
      path: "/account",
      component: () => import("@/views/account/Account")
    }
    
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
