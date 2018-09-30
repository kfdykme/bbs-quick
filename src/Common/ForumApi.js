import Api from "./Api"

import UserCache from './UserCache'


const Tag = {
  'todayHot' : "hot",
  'newReply' : "reply",
  'newPublish' : "publish"
}

function getPostByTag(tag,page,suc,fai){
  // const newReplyUrl = Api.BASE_URL + "app/web/index.php?r=forum/topiclist&pageSize=10"
  // const todayHotUrl = Api.BASE_URL + "app/web/index.php?r=portal/newslist&moduleId=2"
  // const newPublishUrl = Api.BASE_URL +"app/web/index.php?r=forum/topiclist&pageSize=10"
  //
  switch (tag) {
    case Tag.newReply:
      // url = newReplyUrl
      getNewReply(page,suc,fai)
      break;
    case Tag.todayHot:
      // url = todayHotUrl
      getTodayHot(page,suc,fai)
      break;
    case Tag.newPublish:
      // url = newPublishUrl
      getNewPublish(page,suc,fai)
      break;
    default:
      url = ""
      break;
  }


}



/**
 * getNewReply
 * @param <Integer> page
 * @param <funtciont> success
 */
function getNewReply(page,suc){
  let url = Api.BASE_URL + "app/web/index.php?r=forum/topiclist&pageSize=20"


  Api.fetch(
      url,
      {
        page : page,
        apphash :UserCache.appHash(),
        accessSecret : UserCache.secret(),
        accessToken : UserCache.token()
      },
      suc
  )

}

function getTodayHot(page,suc){
  let url = Api.BASE_URL + "app/web/index.php?r=portal/newslist&moduleId=2&pageSize=20"

    Api.fetch(
        url,
        {
          page : page,
          apphash :UserCache.appHash(),
          accessSecret : UserCache.secret(),
          accessToken : UserCache.token()
        },
        suc
    )

}


function getNewPublish(page,suc,fai){
  let url = Api.BASE_URL +"app/web/index.php?r=forum/topiclist&pageSize=20"


    Api.fetch(
        url,
        {
          sortby : "new",
          page : page,
          apphash :UserCache.appHash(),
          accessSecret : UserCache.secret(),
          accessToken : UserCache.token()
        },
        suc
    )
}

export default{
  getPostByTag,
  Tag
}
