<template>
    <div class="tabbar">
        <tabbar-items>
            <template v-slot:tabbar_item>
                <tabbar-item path = "/found">
                    <template v-slot:tab_img>
                        <img src="@/assets/img/found.svg" alt="">
                    </template>
                    <template v-slot:tab_img_active>
                        <img src="@/assets/img/foundActive.svg" alt="">
                    </template>
                    <template v-slot:tab_title>
                        发现
                    </template>
                </tabbar-item>
                <tabbar-item path = "/mv">
                    <template v-slot:tab_img>
                        <img src="@/assets/img/mv.svg" alt="">
                    </template>
                    <template v-slot:tab_img_active>
                        <img src="@/assets/img/mvActive.svg" alt="">
                    </template>
                    <template v-slot:tab_title>
                        视频
                    </template>
                </tabbar-item>
                <tabbar-item path = "/music">
                    <template v-slot:tab_img>
                        <img src="@/assets/img/music.svg" alt="">
                    </template>
                    <template v-slot:tab_img_active>
                        <img src="@/assets/img/musicActive.svg" alt="">
                    </template>
                    <template v-slot:tab_title>
                        音乐
                    </template>
                </tabbar-item>
                <tabbar-item path = "/friend">
                    <template v-slot:tab_img>
                        <img src="@/assets/img/friend.svg" alt="">
                    </template>
                    <template v-slot:tab_img_active>
                        <img src="@/assets/img/friendActive.svg" alt="">
                    </template>
                    <template v-slot:tab_title>
                        朋友
                    </template>
                </tabbar-item>
                <tabbar-item path = "/account">
                    <template v-slot:tab_img>
                        <img src="@/assets/img/account.svg" alt="">
                    </template>
                    <template v-slot:tab_img_active>
                        <img src="@/assets/img/accountActive.svg" alt="">
                    </template>
                    <template v-slot:tab_title>
                        账号
                    </template>
                </tabbar-item>
            </template>
        </tabbar-items>
    </div>
</template>

<script>
    import TabbarItems from "./TabbarItems.vue"
    import TabbarItem from "./TabbarItem.vue"
    export default {
        name: "Tabbar",
        components: {
            TabbarItems,
            TabbarItem
        }
    }
</script>

<style scoped>
.tabbar{
    position: fixed;
    bottom: 0;
}
</style>