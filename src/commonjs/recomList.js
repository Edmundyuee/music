import { getSongDetail } from "@/network/player";
import { getPlayList } from "@/network/found"

export function recomLists(id){
  let a = getPlayList(id).then((result) => {
    return result.playlist
  }).catch((err) => {
    
  });
  return a
}
export function recomSongDetail(){
  let a = getSongDetail(id).then((result) => {
    return result
  }).catch((err) => {
    
  });
  return a 
}