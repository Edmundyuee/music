import { request } from './request'

export function getMusic(id){
    return request({
        url: '/song/url?id=' + id
    })
}
export function getSongDetail(id){
    return request({
        url: '/song/detail?ids=' + id
    })
}
export function getAlbum(id){
    return request({
        url: '/album?id=' + id
    })
}
export function getLyirc(id){
    return request({
        url: '/lyric?id=' + id
    })
}