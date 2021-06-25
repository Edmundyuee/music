<template>
    <div class="searchItem">
        <input class="searchInput" v-model="input" type="text" @keyup.enter="searchSongs" placeholder="搜索">
    </div>
</template>

<script>
import {getFoundSearch} from '@/network/found'
    export default {
        name: 'Search',
        data(){
            return{
                input: ''
            }
        },
        methods: {
            searchSongs(e){
                    getFoundSearch(this.input).then(result => {
                        this.$emit('songsList',result.result.songs)
                    }).catch((err) => {
                        console.log(err);
                    });
            }
        }
    }
</script>

<style scoped>
.searchItem{
    width: 100%;
    padding-top: 30px;
    text-align: center;
}
.searchInput{
    width: 80%;
    height: 35px;
    border-radius: 17.5px;
    box-sizing: border-box;
    padding: 10px 20px;
    font-size: 18px;
    background-color: #f6f6f6;
    border: none;
}
.searchInput:focus{
    outline: none;
}

</style>