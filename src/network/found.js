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