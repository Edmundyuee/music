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
export function newMv(){
    return request({
        url: '/mv/first?limit=6'
    })
}
export function personalizedMv(){
    return request({
        url: '/personalized/mv'
    })
}
export function likeMv(id){
    return request({
        url: '/simi/mv?mvid=' + id
    })
}
export function topMv(){
    return request({
        url: '/top/mv?limit=10'
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
export function getQrKey(timestamp){
    return request({
        url: `/login/qr/key?timestamp=${Date.now()}`
    })
}
export function getQrCreate(key){
    return request({
        url: `/login/qr/create?qrimg=true&timestamp=${Date.now()}&key=` + key
    })
}
export function getLoginState(key){
    return request({
        url: `/login/qr/check?timestamp=${Date.now()}&key=` + key
    })
}
export function getState(){
    return request({
        url: '/login/status'
    })
}
export function getUserDetail(id){
    return request({
        url: '/user/detail?uid=' + id
    })
}
export function loginOut(){
    return request({
        url: '/logout'
    })
}
export function userSubcount(){
    return request({
        url: '/user/subcount'
    })
}
export function userPlayList(id){
    return request({
        url: '/user/playlist?uid=' + id
    })
}
