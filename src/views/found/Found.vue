<template>
    <div>
        <!-- <el-row>
            <el-col :span='18'></el-col>
                <el-input class="serachInput" v-model="input" placeholder="请输入内容"></el-input>
            <el-col :span='6'>
                <el-button @click="serachMusic">搜索</el-button>
            </el-col>
        </el-row> -->
        <search @songsList="songsList"></search>
        <classification></classification>
        <ul>
            <li v-for='(item,index) in songs' :key='index'>{{item.name}}</li>
        </ul>
         <router-view></router-view>
    </div>
   
</template>

<script>
import {getFoundSearch} from '@/network/found'
import search from '@/components/serach/Search.vue'
import classification from './classification/Classification.vue'
    export default {
        name: "Found",
        data(){
            return{
                input: '',
                songs: ''
            }
        },components:{
                search,
                classification
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
        }
    }
</script>

<style scoped>
.serachInput{
    border-radius: 50% !important;
    text-align: center;
}
</style>