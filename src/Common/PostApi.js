import Api from "./Api"
import fetch from "@system.fetch"
import UserCache from './UserCache'


var app = null
function init(app){
  this.app = app
  UserCache.init(app)
}

/**
 * @method supportPost
 * @param tid
 * @param pid
 * @param type
 */
async function supportPost(tid,pid,type){

    return await fetch.fetch({
        url : Api.BASE_URL + "app/web/index.php?r=forum/support",
        method: "POST",
        data : {
            tid : tid,
            pid : pid,
            type : type,
            sdkVersion : Api.sdkVersion,
            apphash :UserCache.appHash(),
            accessSecret : UserCache.secret(),
            accessToken : UserCache.token()
        }
    })
}


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

function replyComment(commentContent,topicId,replyId,suc){

    var contentList = []
    var publishContent = {}
    publishContent.infor = commentContent
    publishContent.type = 0
    contentList.push(publishContent)

    var body = {}
    var info = {}

    info.content = JSON.stringify(contentList)
    info.replyId = replyId
    info.isQuote = 1
    info.tid = topicId
    body.json = info

    var publishJson = {
      'body' : body
    }


      //
      const url = Api.BASE_URL + "app/web/index.php?r=forum/topicadmin"

      const user = UserCache.user()

      fetch.fetch({
        url : url,
        method : "POST",
        data : {
          json : JSON.stringify(publishJson),
          act : 'reply',
          apphash :UserCache.appHash(),
          accessSecret : UserCache.secret(),
          accessToken : UserCache.token()
        },
        success: suc,
        fail: function(data,code){
            console.log(data);
        }
      })

}

function publish(publishJson,suc){


    //
    const url = Api.BASE_URL + "app/web/index.php?r=forum/topicadmin"

    fetch.fetch({
      url : url,
      method : "POST",
      data : {
        json : JSON.stringify(publishJson),
        act : 'new',
        apphash :UserCache.appHash(),
        accessSecret : UserCache.secret(),
        accessToken : UserCache.token()
      },
      success: suc,
      fail: function(data,code){

      }
    })

}


function comment(commentContent,topicId,suc){
  // build json Object

  var contentList = []
  var publishContent = {}
  publishContent.infor = commentContent
  publishContent.type = 0
  contentList.push(publishContent)

  var body = {}
  var info = {}

  info.content = JSON.stringify(contentList)
  info.tid = topicId
  body.json = info

  var publishJson = {
    'body' : body
  }




  //
  const url = Api.BASE_URL + "app/web/index.php?r=forum/topicadmin"

  fetch.fetch({
        url : url,
        method : "POST",
        data : {
            json : JSON.stringify(publishJson),
            act : 'reply',
            apphash :UserCache.appHash(),
            accessSecret : UserCache.secret(),
            accessToken : UserCache.token()
        },
        success: suc,
        fail: function(data,code){

        }
  })
}

export default{
  fetchPostDetail,
  supportPost,
  init,
  comment,
  replyComment,
  publish
}
