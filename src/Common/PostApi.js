import Api from "./Api"
import fetch from "@system.fetch"
import UserCache from './UserCache'


const Constant = {
  FAVO : "favorite",
  DELFAVO : "delfavorite"
}

function init(app){
  this.app = app
  UserCache.init(app)
}

async function reverse(topic_id,number){


    return await fetch.fetch({
      url : Api.BASE_URL + "app/web/index.php?r=forum/postlist&pageSize="+number,
      method : "POST",
      data : {
        page : 1,
        topicId : topic_id,
        apphash :UserCache.appHash(),
        accessSecret : UserCache.secret(),
        accessToken : UserCache.token()
      }
    })
}
/**
 * @method score
 */
async function score(url,score,reason,sendreasonpm){
  const type = 'view'
  const modsubmit = '确定'


  return await fetch.fetch({
    url : url,
    method : "POST",
    data:{
      score2: score,
      reason : reason,
      sendreasonpm : sendreasonpm,
      modsubmit : modsubmit
    }
  })
}

/**
 * @method favorite
 * @param {string} action
 * @param {string} p id
 * @desc get this api from  https://github.com/Febers/UESTC_BBS/blob/master/app/src/main/java/com/febers/uestc_bbs/utils/ApiUtils.kt
 * 一直找不到这个收藏的api，还以为需要最后去模拟cookie
 */
async function favorite(action,pid){
  const url =  Api.BASE_URL + "app/web/index.php?r=user/userfavorite"+
  "&accessToken="+UserCache.token() +
  "&accessSecret="+ UserCache.secret()+
  "&apphash="+UserCache.appHash()

  const data = {
    action :action,
    id:pid,
    idType:"tid"
  }

  return await fetch.fetch({
    url : url,
    method :"POST",
    data:data
  })
}

/**
 * @method vote
 * @param {number} tid
 * @param {string} options
 * @desc 投票
 */
async function vote(tid,options){
    return await fetch.fetch({
        url : "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/vote",
        method:"POST",
        data :{
            tid	:tid,
            options:options,
            sdkVersion : Api.sdkVersion,
            apphash :UserCache.appHash(),
            accessSecret : UserCache.secret(),
            accessToken : UserCache.token()
        }
    })
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

function fetchPostDetail(page,topicId,suc,fai){
  const url = Api.BASE_URL + "app/web/index.php?r=forum/postlist&pageSize=25"


  fetch.fetch({
    url : url,
    method : "POST",
    data : {
      page : page,
      topicId : topicId,
      apphash :UserCache.appHash(),
      accessSecret : UserCache.secret(),
      accessToken : UserCache.token()
    },
    success: function (data) {
      if (data.code != 200) {
        prompt.showToast({
          message: '抱歉发生了错误：' + data.code
        })
        return
      }
      suc(data)
    },
    fail: fai
  })
}

function replyComment(commentContent,images,topicId,replyId,suc){

    var contentList = []
    var publishContent = {}
    publishContent.infor = commentContent
    publishContent.type = 0
    contentList.push(publishContent)
    //把上传的图片插到末尾
    for(var x in images){
        var content = {
            type:1,
            infor:images[x]
        }
        contentList.push(content)
    }
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
        success: function (data) {
          if (data.code != 200) {
            prompt.showToast({
              message: '抱歉发生了错误：' + data.code
            })
            return
          }
          suc(data)
        },
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
      success: function (data) {
        if (data.code != 200) {
          prompt.showToast({
            message: '抱歉发生了错误：' + data.code
          })
          return
        }
        suc(data)
      },
      fail: function(data,code){
        console.err("Error while publish post " + data)
      }
    })

}


function comment(commentContent,images,topicId,suc){
  // build json Object

  var contentList = []
  var publishContent = {}
  publishContent.infor = commentContent
  publishContent.type = 0
  contentList.push(publishContent)
  //把上传的图片插到末尾
  for(var x in images){
      var content = {
          type:1,
          infor:images[x]
      }
      contentList.push(content)
  }
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
    success: function (data) {
      if (data.code != 200) {
        prompt.showToast({
          message: '抱歉发生了错误：' + data.code
        })
        return
      }
      suc(data)
    },
    fail: function(data,code){
      console.error(data)
    }
  })
}


/**
 * @method search
 * @param {string} key
 * @param {number} page
 * @param {function} onSearchSuccess
 */
function search(key,page,onSearchSuccess,onSuccessError){
    Api.fetch(
        Api.BASE_URL+"/app/web/index.php?r=forum/search",
        {
            searchid:0,
            pageSize:10,
            accessToken :UserCache.token(),
            accessSecret :UserCache.secret(),
            sdkVersion : Api.sdkVersion,
            appHash :UserCache.appHash(),
            keyword:key,
            page:page
        },
        onSearchSuccess,
        onSuccessError
    )
}


export default{
  fetchPostDetail,
  supportPost,
  init,
  comment,
  replyComment,
  publish,
  reverse,
  search,
  score,
  vote,
  favorite,
  Constant
}
