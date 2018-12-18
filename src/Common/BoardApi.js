import Api from "./Api"
import fetch from "@system.fetch"
import UserCache from './UserCache'
import storage from '@system.storage'
import prompt from '@system.prompt'

var app = null
function init(app){
  this.app = app
  UserCache.init(app)
}

/**
 * 由于服务器原因,以下部分板块无法显示
 * 需要在板块页面以及发帖的时候将这部分隐藏
 */
const BOARD_CAN_NOT_FETCH = [
  '学术交流',
  '出国留学',
  '考试专区',
  '新生专区',
  '自然科学',
  '前段之美',
  '科技资讯',
  '站务公告',
  '站务综合'
]


/**
 * @method checkBoardCanFetch
 * @param {string} boardName  板块名称
 * @return {boolean} 返回是否可以 fetch 到
 */
function checkBoardCanFetch (boardName) {
  for (let x in BOARD_CAN_NOT_FETCH) {
    if (BOARD_CAN_NOT_FETCH[x] === boardName) {
      return false
    }
  }

  return true
}


function getForumList(suc,fai){

  const url = Api.BASE_URL + "app/web/index.php?r=forum/forumlist"

  fetch.fetch({
    url : url,
    mothod :"POST",
    data :{
      apphash :UserCache.appHash(),
      accessToken : UserCache.token(),
      accessSecret : UserCache.secret(),
      sdkVersion : Api.sdkVersion
    },
    success :function(data){

      if (data.code != 200) {
        prompt.showToast({
          message: '抱歉发生了错误：' + data.code
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
    mothod :"POST",
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
          message: '抱歉发生了错误：' + data.code
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
      mothod :"POST",
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
            message: '抱歉发生了错误：' + data.code
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
      mothod :"POST",
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
            message: '抱歉发生了错误：' + data.code
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
