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
        url: '/personalized/privatecontent/list?limit=4'
    })
}
export function getPlayList(id){
     return request({
         url: '/playlist/detail?id=' + id
     })
}