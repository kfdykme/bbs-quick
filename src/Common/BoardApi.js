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
  fetchChildBoardList
}

//
// {
//     "rs": 1,
//     "errcode": "",
//     "head": {
//         "errCode": "00000000",
//         "errInfo": "调用成功,没有任何错误",
//         "version": "2.6.1.7",
//         "alert": 0
//     },
//     "body": {
//         "externInfo": {
//             "padding": ""
//         }
//     },
//     "list": [
//         {
//             "board_category_id": 273,
//             "board_category_name": "成电校园",
//             "board_category_type": 2,
//             "board_list": [
//                 {
//                     "board_id": 174,
//                     "board_name": "就业创业",
//                     "description": "",
//                     "board_child": 1,
//                     "board_img": "http://bbs.uestc.edu.cn/data/attachment/common/star/common_174_icon.png",
//                     "last_posts_date": "1532678529000",
//                     "board_content": 1,
//                     "forumRedirect": "",
//                     "favNum": 620,
//                     "td_posts_num": 100,
//                     "topic_total_num": 87668,
//                     "posts_total_num": 933661,
//                     "is_focus": 0
//                 },
//                 {
//                     "board_id": 20,
//                     "board_name": "学术交流",
//                     "description": "",
//                     "board_child": 1,
//                     "board_img": "http://bbs.uestc.edu.cn/data/attachment/common/star/common_20_icon.png",
//                     "last_posts_date": "1532678788000",
//                     "board_content": 1,
//                     "forumRedirect": "",
//                     "favNum": 81,
//                     "td_posts_num": 39,
//                     "topic_total_num": 107284,
//                     "posts_total_num": 946905,
//                     "is_focus": 0
//                 },
//                 {
//                     "board_id": 219,
//                     "board_name": "出国留学",
//                     "description": "",
//                     "board_child": 1,
//                     "board_img": "http://bbs.uestc.edu.cn/data/attachment/common/star/common_219_icon.png",
//                     "last_posts_date": "1532619682000",
//                     "board_content": 1,
//                     "forumRedirect": "",
//                     "favNum": 127,
//                     "td_posts_num": 0,
//                     "topic_total_num": 9139,
//                     "posts_total_num": 105283,
//                     "is_focus": 0
//                 },
//                 {
//                     "board_id": 382,
//                     "board_name": "考试专区",
//                     "description": "",
//                     "board_child": 1,
//                     "board_img": "http://bbs.uestc.edu.cn/data/attachment/common/star/common_382_icon.png",
//                     "last_posts_date": "1532669796000",
//                     "board_content": 1,
//                     "forumRedirect": "",
//                     "favNum": 35,
//                     "td_posts_num": 1,
//                     "topic_total_num": 4070,
//                     "posts_total_num": 53110,
//                     "is_focus": 0
//                 },
//                 {
//                     "board_id": 326,
//                     "board_name": "新生专区",
//                     "description": "清水河畔欢迎 2016 级新生！",
//                     "board_child": 1,
//                     "board_img": "http://bbs.uestc.edu.cn/data/attachment/common/star/common_326_icon.png",
//                     "last_posts_date": "1532589109000",
//                     "board_content": 1,
//                     "forumRedirect": "",
//                     "favNum": 26,
//                     "td_posts_num": 0,
//                     "topic_total_num": 1867,
//                     "posts_total_num": 21827,
//                     "is_focus": 0
//                 }
//             ]
//         },
//         {
//             "board_category_id": 95,
//             "board_category_name": "科技交流",
//             "board_category_type": 2,
//             "board_list": [
//                 {
//                     "board_id": 316,
//                     "board_name": "自然科学",
//                     "description": "",
//                     "board_child": 1,
//                     "board_img": "http://bbs.uestc.edu.cn/data/attachment/common/star/common_316_icon.png",
//                     "last_posts_date": "1532485927000",
//                     "board_content": 1,
//                     "forumRedirect": "",
//                     "favNum": 8,
//                     "td_posts_num": 0,
//                     "topic_total_num": 514,
//                     "posts_total_num": 7406,
//                     "is_focus": 0
//                 },
//                 {
//                     "board_id": 258,
//                     "board_name": "前端之美",
//                     "description": "",
//                     "board_child": 0,
//                     "board_img": "http://bbs.uestc.edu.cn/data/attachment/common/star/common_258_icon.png",
//                     "last_posts_date": "1532664315000",
//                     "board_content": 1,
//                     "forumRedirect": "",
//                     "favNum": 39,
//                     "td_posts_num": 2,
//                     "topic_total_num": 494,
//                     "posts_total_num": 4955,
//                     "is_focus": 0
//                 },
//                 {
//                     "board_id": 211,
//                     "board_name": "科技资讯",
//                     "description": "",
//                     "board_child": 0,
//                     "board_img": "http://bbs.uestc.edu.cn/data/attachment/common/star/common_211_icon.png",
//                     "last_posts_date": "1531999745000",
//                     "board_content": 1,
//                     "forumRedirect": "",
//                     "favNum": 9,
//                     "td_posts_num": 0,
//                     "topic_total_num": 9564,
//                     "posts_total_num": 66889,
//                     "is_focus": 0
//                 }
//             ]
//         },
//         {
//             "board_category_id": 203,
//             "board_category_name": "休闲娱乐",
//             "board_category_type": 2,
//             "board_list": [
//                 {
//                     "board_id": 244,
//                     "board_name": "成电骑迹",
//                     "description": "",
//                     "board_child": 0,
//                     "board_img": "http://bbs.uestc.edu.cn/data/attachment/common/star/common_244_icon.png",
//                     "last_posts_date": "1532627932000",
//                     "board_content": 1,
//                     "forumRedirect": "",
//                     "favNum": 65,
//                     "td_posts_num": 1,
//                     "topic_total_num": 8948,
//                     "posts_total_num": 157605,
//                     "is_focus": 0
//                 },
//                 {
//                     "board_id": 334,
//                     "board_name": "情系舞缘",
//                     "description": "",
//                     "board_child": 0,
//                     "board_img": "http://bbs.uestc.edu.cn/data/attachment/common/star/common_334_icon.png",
//                     "last_posts_date": "1532672288000",
//                     "board_content": 1,
//                     "forumRedirect": "",
//                     "favNum": 36,
//                     "td_posts_num": 2,
//                     "topic_total_num": 10521,
//                     "posts_total_num": 424599,
//                     "is_focus": 0
//                 },
//                 {
//                     "board_id": 312,
//                     "board_name": "跑步公园",
//                     "description": "",
//                     "board_child": 0,
//                     "board_img": "http://bbs.uestc.edu.cn/data/attachment/common/star/common_312_icon.png",
//                     "last_posts_date": "1532402267000",
//                     "board_content": 1,
//                     "forumRedirect": "",
//                     "favNum": 61,
//                     "td_posts_num": 0,
//                     "topic_total_num": 995,
//                     "posts_total_num": 28993,
//                     "is_focus": 0
//                 }
//             ]
//         },
//         {
//             "board_category_id": 1,
//             "board_category_name": "站务管理",
//             "board_category_type": 2,
//             "board_list": [
//                 {
//                     "board_id": 2,
//                     "board_name": "站务公告",
//                     "description": "",
//                     "board_child": 1,
//                     "board_img": "http://bbs.uestc.edu.cn/data/attachment/common/star/common_2_icon.png",
//                     "last_posts_date": "1532576481000",
//                     "board_content": 1,
//                     "forumRedirect": "",
//                     "favNum": 6,
//                     "td_posts_num": 0,
//                     "topic_total_num": 1766,
//                     "posts_total_num": 319703,
//                     "is_focus": 0
//                 },
//                 {
//                     "board_id": 46,
//                     "board_name": "站务综合",
//                     "description": "",
//                     "board_child": 1,
//                     "board_img": "http://bbs.uestc.edu.cn/data/attachment/common/star/common_46_icon.png",
//                     "last_posts_date": "1532014647000",
//                     "board_content": 1,
//                     "forumRedirect": "",
//                     "favNum": 16,
//                     "td_posts_num": 0,
//                     "topic_total_num": 9215,
//                     "posts_total_num": 119016,
//                     "is_focus": 0
//                 }
//             ]
//         }
//     ],
//     "online_user_num": 0,
//     "td_visitors": 0
// }
