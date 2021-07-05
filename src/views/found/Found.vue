<template>
    <div>
        <search @songsList="songsList"></search>
        <classification></classification>
        <div v-show="!flag">
            <router-view></router-view>
        </div>
        <div v-if="flag">
            <search-music-list :songs="songs"></search-music-list>
        </div>
        <recom-lists></recom-lists>
        <mvplay></mvplay>
    </div>
</template>

<script>
import {getFoundSearch} from '@/network/found'
import search from '@/components/serach/Search.vue'
import classification from './classification/Classification.vue'
import SearchMusicList from '../../components/serach/SearchMusicList.vue'
import recomLists from './views/recommend/recommendlist/recomList'
import mvplay from './views/recommend/recommendlist/Mvplay'
    export default {
        name: "Found",
        data(){
            return{
                input: '',
                songs: '',
                flag: false
            }
        },components:{
                search,
                classification,
                SearchMusicList,
                recomLists,
                mvplay
                
        },
        methods: {
            serachMusic(){
                getFoundSearch(this.input).then((result) => {
                    this.songs = result.result.songs;
                }).catch((err) => {
                    console.log(result);
                });
            },
            songsList(data){
                this.songs = data;
            }
        },
        computed: {
            searchPages(){
                return this.$store.state.searchPage;
            }
        },
        watch: {
            searchPages(newVal){
                console.log(this.flag);
                this.flag = newVal
            }
        }
    }
</script>

<style scoped>
.serachInput{
    border-radius: 50% !important;
    text-align: center;
}
</style>