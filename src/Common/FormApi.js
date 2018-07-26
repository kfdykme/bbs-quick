import Api from "./Api"
import fetch from "@system.fetch"
import storage from "@system.storage"
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


// {
// 	"board_id": 61,
// 	"board_name": "二手专区",
// 	"topic_id": 1727663, // 查看帖子用
// 	"type": "normal",
// 	"title": "出一些书",
// 	"user_id": 214059,
// 	"user_nick_name": "mxtxuaoqiqi",
// 	"userAvatar": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=214059&size=middle",
// 	"last_reply_date": "1532521415000",
// 	"vote": 0,
// 	"hot": 0,
// 	"hits": 201,
// 	"replies": 4,
// 	"essence": 0,
// 	"top": 0,
// 	"status": 32768,
// 	"subject": "QQ1062816092  Java面向对象编程  10",
// 	"pic_path": "",
// 	"ratio": "1",
// 	"gender": 0,
// 	"userTitle": "河蟹 (Lv.3)",
// 	"recommendAdd": 0,
// 	"special": 0,
// 	"isHasRecommendAdd": 0,
// 	"imageList": [],
// 	"sourceWebUrl": "http://bbs.uestc.edu.cn/forum.php?mod=viewthread&tid=1727663",
// 	"verify": []
// }
function getNewReply(page,suc,fai){
  let url = Api.BASE_URL + "app/web/index.php?r=forum/topiclist&pageSize=10"


  fetch.fetch({
    url : url,
    method : "POST",
    data : {
      page : page,
      apphash :UserCache.appHash(),
      accessSecret : UserCache.secret(),
      accessToken : UserCache.token()
    },
    success: suc,
    fail: fai
  })



}

function getTodayHot(page,suc,fai){
  let url = Api.BASE_URL + "app/web/index.php?r=portal/newslist&moduleId=2"


  fetch.fetch({
    url : url,
    method : "POST",
    data : {
      page : page,
      apphash :UserCache.appHash(),
      accessSecret : UserCache.secret(),
      accessToken : UserCache.token()
    },
    success: suc,
    fail: fai
  })

}


function getNewPublish(page,suc,fai){
  let url = Api.BASE_URL +"app/web/index.php?r=forum/topiclist&pageSize=10"


  fetch.fetch({
    url : url,
    method : "POST",
    data : {
      page : page,
      apphash :UserCache.appHash(),
      accessSecret : UserCache.secret(),
      accessToken : UserCache.token(),
      sortby : "new"
    },
    success: suc,
    fail: fai
  })

}

export default{
  getPostByTag,
  Tag
}
