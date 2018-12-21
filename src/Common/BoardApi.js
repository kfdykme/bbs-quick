import Api from "./Api"
import fetch from "@system.fetch"
import UserCache from './UserCache'
import storage from '@system.storage'
import prompt from '@system.prompt'
import Strings from './Strings'

var app = null
function init(app){
  this.app = app
  UserCache.init(app)
}



/**
 * @method checkBoardCanFetch
 * @param {string} boardName  板块名称
 * @return {boolean} 返回是否可以 fetch 到
 */
function checkBoardCanFetch (boardName) {
  for (let x in Api.BOARD_CAN_NOT_FETCH) {
    if (Api.BOARD_CAN_NOT_FETCH[x] === boardName) {
      return false
    }
  }

  return true
}


function getForumList(suc,fai){

  const url = Api.BASE_URL + "app/web/index.php?r=forum/forumlist"

  fetch.fetch({
    url : url,
    mothod :Strings.POST,
    data :{
      apphash :UserCache.appHash(),
      accessToken : UserCache.token(),
      accessSecret : UserCache.secret(),
      sdkVersion : Api.sdkVersion
    },
    success :function(data){

      if (data.code != 200) {
        prompt.showToast({
          message: Strings.NET_ERROR_500
        })
        return
      }

      suc(data)
    },
    fail : fai
  })
}

function fetchChildBoardList(fid,suc){
  const url = Api.BASE_URL + "app/web/index.php?r=forum/forumlist"



  fetch.fetch({
    url : url,
    mothod :Strings.POST,
    data :{
      apphash :UserCache.appHash(),
      accessToken : UserCache.token(),
      accessSecret : UserCache.secret(),
      sdkVersion : Api.sdkVersion,
      fid : fid
    },
    success :function(data){
      if (data.code != 200) {
        prompt.showToast({
          message: Strings.NET_ERROR_500
        })
        return
      }
      const re = JSON.parse(data.data)

      suc(re)
    },
    fail : function (data,code){
      console.log("error : "+ code);
    }
  })
}


function fetchClassificationTypeList(boardId,suc){
  const url = Api.BASE_URL + "app/web/index.php?r=forum/topiclist"


    fetch.fetch({
      url : url,
      mothod :Strings.POST,
      data :{
        apphash :UserCache.appHash(),
        accessToken : UserCache.token(),
        accessSecret : UserCache.secret(),
        sdkVersion : Api.sdkVersion,
        boardId : boardId
      },
      success :function (data) {
        if (data.code != 200) {
          prompt.showToast({
            message: Strings.NET_ERROR_500
          })
          return
        }

        suc(data)
      },
      fail : function (data,code){
        console.log("error : "+ code);
      }
    })
}

function fetchBoardPostList(page,boardId,suc){
    const url = Api.BASE_URL + "app/web/index.php?r=forum/topiclist&pageSize=10"


    fetch.fetch({
      url : url,
      mothod :Strings.POST,
      data :{
        accessToken : UserCache.token(),
        apphash :UserCache.appHash(),
        accessSecret : UserCache.secret(),
        page : page,
        boardId : boardId
      },
      success :function(data){
        if (data.code != 200) {
          prompt.showToast({
            message: Strings.NET_ERROR_500
          })
          return
        }

        const re = JSON.parse(data.data)

        if (re.rs === 0) {
          prompt.showToast({
            message: re.errcode
          })
        }
        suc(re)
      },
      fail : function (data,code){
        console.log("error : "+ code);
      }
    })

}

export default{
  init,
  getForumList,
  fetchClassificationTypeList,
  fetchBoardPostList,
  fetchChildBoardList,
  checkBoardCanFetch
}
