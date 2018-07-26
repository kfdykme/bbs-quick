import Api from "./Api"
import fetch from "@system.fetch"
import storage from "@system.storage"
import UserCache from './UserCache'


function fetchPostDetail(page,topic_id,suc,fai){
  const url = Api.BASE_URL + "app/web/index.php?r=forum/postlist&pageSize=25"
 

  fetch.fetch({
    url : url,
    method : "POST",
    data : {
      page : page,
      topicId : topic_id,
      apphash :UserCache.appHash(),
      accessSecret : UserCache.secret(),
      accessToken : UserCache.token()
    },
    success: suc,
    fail: fai
  })
}


export default{
  fetchPostDetail
}
