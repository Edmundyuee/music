import { request } from './request'

export function getFoundSearch(value){
    return request({
        url: '/search?keywords=' + value
    })
}
export function getCarousel(){
    return request({
        url: '/banner?type=1'
    })
}
export function recomList(limit){
    return request({
        url: '/personalized?limit=' + limit
    })
}
export function broadList(){
    return request({
        url: '/personalized/privatecontent/list?limit=6'
    })
}
export function getPlayList(id){
     return request({
         url: '/playlist/detail?id=' + id
     })
}
export function mvPlay(id){
    return request({
        url: '/mv/detail?mvid=' + id
    })
}
export function userDetail(id){
    return request({
        url: '/user/detail?uid=' + id
    })
}
export function getMvUrl(id){
    return request({
        url: '/mv/url?id='+id+'&r=1080'
    })
}
export function getMvLike(id){
    return request({
        url: '/related/allvideo?id=' + id
    })
}
export function getMvFirst(){
    return request({
        url: '/mv/first?limit=10'
    })
}