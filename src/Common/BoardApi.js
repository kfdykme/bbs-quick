import Api from "./Api"
import fetch from "@system.fetch"
import UserCache from './UserCache'

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
    success :suc,
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
      success :suc,
      fail : function (data,code){
        console.log("error : "+ code);
      }
    })
}


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
//     "newTopicPanel": [
//         {
//             "type": "normal",
//             "action": "",
//             "title": "发表帖子"
//         }
//     ],
//     "classificationTop_list": [],
//     "classificationType_list": [
//         {
//             "classificationType_id": 315,
//             "classificationType_name": "灌水"
//         },
//         {
//             "classificationType_id": 318,
//             "classificationType_name": "寻人"
//         },
//         {
//             "classificationType_id": 319,
//             "classificationType_name": "求助"
//         },
//         {
//             "classificationType_id": 320,
//             "classificationType_name": "原创"
//         },
//         {
//             "classificationType_id": 321,
//             "classificationType_name": "转帖"
//         },
//         {
//             "classificationType_id": 322,
//             "classificationType_name": "版务"
//         },
//         {
//             "classificationType_id": 323,
//             "classificationType_name": "其他"
//         }
//     ],
//     "isOnlyTopicType": 0,
//     "anno_list": [],
//     "forumInfo": {
//         "id": 25,
//         "title": "水手之家",
//         "description": "",
//         "icon": "http://bbs.uestc.edu.cn/data/attachment/common/star/common_25_icon.png",
//         "td_posts_num": "327",
//         "topic_total_num": "610363",
//         "posts_total_num": "15885343",
//         "is_focus": 0
//     },
//     "topTopicList": [],
//     "list": [
//         {
//             "board_id": 25,
//             "board_name": "水手之家",
//             "topic_id": 1728125,
//             "type": "normal",
//             "title": "河畔上怎么拉黑和屏蔽不想看某个人的帖子",
//             "user_id": 214678,
//             "user_nick_name": "会溺水的鱼",
//             "userAvatar": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=214678&size=middle",
//             "last_reply_date": "1532696224000",
//             "vote": 0,
//             "hot": 0,
//             "hits": 202,
//             "replies": 7,
//             "essence": 0,
//             "top": 0,
//             "status": 32,
//             "subject": "最近，老是看到某些人怼天怼地对世界，上到国家大事，下到生",
//             "pic_path": "",
//             "ratio": "1",
//             "gender": 0,
//             "userTitle": "虾米 (Lv.2)",
//             "recommendAdd": 0,
//             "special": 0,
//             "isHasRecommendAdd": 0,
//             "imageList": [],
//             "sourceWebUrl": "http://bbs.uestc.edu.cn/forum.php?mod=viewthread&tid=1728125",
//             "verify": []
//         },
//         {
//             "board_id": 25,
//             "board_name": "水手之家",
//             "topic_id": 1728108,
//             "type": "normal",
//             "title": "[原创]在动车上穿鞋子把后帮踩下去的女的都是low货",
//             "user_id": 205496,
//             "user_nick_name": "泥巴",
//             "userAvatar": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=205496&size=middle",
//             "last_reply_date": "1532695401000",
//             "vote": 0,
//             "hot": 0,
//             "hits": 483,
//             "replies": 31,
//             "essence": 0,
//             "top": 0,
//             "status": 32800,
//             "subject": "现实中的这种女的就是兰春蚕。    猜测应该会有躺床上吃",
//             "pic_path": "",
//             "ratio": "1",
//             "gender": 0,
//             "userTitle": "鲤鱼 (Lv.7)",
//             "recommendAdd": 0,
//             "special": 0,
//             "isHasRecommendAdd": 0,
//             "imageList": [],
//             "sourceWebUrl": "http://bbs.uestc.edu.cn/forum.php?mod=viewthread&tid=1728108",
//             "verify": []
//         },
//         {
//             "board_id": 25,
//             "board_name": "水手之家",
//             "topic_id": 1728087,
//             "type": "normal",
//             "title": "[灌水]感觉遇到电话诈骗了",
//             "user_id": 206925,
//             "user_nick_name": "快乐的肥宅",
//             "userAvatar": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=206925&size=middle",
//             "last_reply_date": "1532694594000",
//             "vote": 0,
//             "hot": 0,
//             "hits": 270,
//             "replies": 10,
//             "essence": 0,
//             "top": 0,
//             "status": 32,
//             "subject": "刚才接了一个电话 本来以为是本肥宅的快递来了 就兴冲冲地",
//             "pic_path": "",
//             "ratio": "1",
//             "gender": 0,
//             "userTitle": "实习版主",
//             "recommendAdd": 0,
//             "special": 0,
//             "isHasRecommendAdd": 0,
//             "imageList": [],
//             "sourceWebUrl": "http://bbs.uestc.edu.cn/forum.php?mod=viewthread&tid=1728087",
//             "verify": []
//         },
//         {
//             "board_id": 25,
//             "board_name": "水手之家",
//             "topic_id": 1727612,
//             "type": "normal",
//             "title": "[灌水]【转】想男朋友出一部分钱买个ipad 过分吗？",
//             "user_id": 206925,
//             "user_nick_name": "快乐的肥宅",
//             "userAvatar": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=206925&size=middle",
//             "last_reply_date": "1532694533000",
//             "vote": 0,
//             "hot": 0,
//             "hits": 863,
//             "replies": 24,
//             "essence": 0,
//             "top": 0,
//             "status": 32800,
//             "subject": "由于本人刚毕业收入不高，想买个ipad.跟男朋友说，妈妈",
//             "pic_path": "",
//             "ratio": "1",
//             "gender": 0,
//             "userTitle": "实习版主",
//             "recommendAdd": 0,
//             "special": 0,
//             "isHasRecommendAdd": 0,
//             "imageList": [],
//             "sourceWebUrl": "http://bbs.uestc.edu.cn/forum.php?mod=viewthread&tid=1727612",
//             "verify": []
//         },
//         {
//             "board_id": 25,
//             "board_name": "水手之家",
//             "topic_id": 1728045,
//             "type": "normal",
//             "title": "[原创]和喜欢的人在一起",
//             "user_id": 205496,
//             "user_nick_name": "泥巴",
//             "userAvatar": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=205496&size=middle",
//             "last_reply_date": "1532693906000",
//             "vote": 0,
//             "hot": 0,
//             "hits": 351,
//             "replies": 10,
//             "essence": 0,
//             "top": 0,
//             "status": 32800,
//             "subject": "每一分一秒都过的那么快      坑爹的滴滴      ",
//             "pic_path": "",
//             "ratio": "1",
//             "gender": 0,
//             "userTitle": "鲤鱼 (Lv.7)",
//             "recommendAdd": 2,
//             "special": 0,
//             "isHasRecommendAdd": 0,
//             "imageList": [],
//             "sourceWebUrl": "http://bbs.uestc.edu.cn/forum.php?mod=viewthread&tid=1728045",
//             "verify": []
//         },
//         {
//             "board_id": 25,
//             "board_name": "水手之家",
//             "topic_id": 1727941,
//             "type": "normal",
//             "title": "[灌水]为什么我不能修改头像",
//             "user_id": 216820,
//             "user_nick_name": "黑天鹅",
//             "userAvatar": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=216820&size=middle",
//             "last_reply_date": "1532693849000",
//             "vote": 0,
//             "hot": 0,
//             "hits": 117,
//             "replies": 5,
//             "essence": 0,
//             "top": 0,
//             "status": 32800,
//             "subject": "真惨:(",
//             "pic_path": "",
//             "ratio": "1",
//             "gender": 0,
//             "userTitle": "蝌蚪 (Lv.1)",
//             "recommendAdd": 0,
//             "special": 0,
//             "isHasRecommendAdd": 0,
//             "imageList": [],
//             "sourceWebUrl": "http://bbs.uestc.edu.cn/forum.php?mod=viewthread&tid=1727941",
//             "verify": []
//         },
//         {
//             "board_id": 25,
//             "board_name": "水手之家",
//             "topic_id": 1728122,
//             "type": "normal",
//             "title": "找公安局的朋友查别人的开房记录犯法吗？",
//             "user_id": 205821,
//             "user_nick_name": "萌萌熊",
//             "userAvatar": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=205821&size=middle",
//             "last_reply_date": "1532693734000",
//             "vote": 0,
//             "hot": 0,
//             "hits": 443,
//             "replies": 19,
//             "essence": 0,
//             "top": 0,
//             "status": 0,
//             "subject": "求助",
//             "pic_path": "",
//             "ratio": "1",
//             "gender": 0,
//             "userTitle": "草鱼 (Lv.5)",
//             "recommendAdd": 0,
//             "special": 0,
//             "isHasRecommendAdd": 0,
//             "imageList": [],
//             "sourceWebUrl": "http://bbs.uestc.edu.cn/forum.php?mod=viewthread&tid=1728122",
//             "verify": []
//         },
//         {
//             "board_id": 25,
//             "board_name": "水手之家",
//             "topic_id": 1728130,
//             "type": "normal",
//             "title": "[灌水]光电 in my heart",
//             "user_id": 89735,
//             "user_nick_name": "夕阳那边",
//             "userAvatar": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=89735&size=middle",
//             "last_reply_date": "1532692422000",
//             "vote": 0,
//             "hot": 0,
//             "hits": 97,
//             "replies": 7,
//             "essence": 0,
//             "top": 0,
//             "status": 32768,
//             "subject": "据我所知，光电出了很多大神，去各种高大上行业的不在少数，",
//             "pic_path": "",
//             "ratio": "1",
//             "gender": 1,
//             "userTitle": "鳙鱼 (Lv.6)",
//             "recommendAdd": 0,
//             "special": 0,
//             "isHasRecommendAdd": 0,
//             "imageList": [],
//             "sourceWebUrl": "http://bbs.uestc.edu.cn/forum.php?mod=viewthread&tid=1728130",
//             "verify": []
//         },
//         {
//             "board_id": 25,
//             "board_name": "水手之家",
//             "topic_id": 1728127,
//             "type": "normal",
//             "title": "语录",
//             "user_id": 205821,
//             "user_nick_name": "萌萌熊",
//             "userAvatar": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=205821&size=middle",
//             "last_reply_date": "1532692394000",
//             "vote": 0,
//             "hot": 0,
//             "hits": 58,
//             "replies": 2,
//             "essence": 0,
//             "top": 0,
//             "status": 0,
//             "subject": "语录",
//             "pic_path": "",
//             "ratio": "1",
//             "gender": 0,
//             "userTitle": "草鱼 (Lv.5)",
//             "recommendAdd": 0,
//             "special": 0,
//             "isHasRecommendAdd": 0,
//             "imageList": [],
//             "sourceWebUrl": "http://bbs.uestc.edu.cn/forum.php?mod=viewthread&tid=1728127",
//             "verify": []
//         },
//         {
//             "board_id": 25,
//             "board_name": "水手之家",
//             "topic_id": 1728094,
//             "type": "normal",
//             "title": "[灌水]刚听说的烂尾",
//             "user_id": 98134,
//             "user_nick_name": "不曾北去",
//             "userAvatar": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=98134&size=middle",
//             "last_reply_date": "1532692348000",
//             "vote": 0,
//             "hot": 0,
//             "hits": 568,
//             "replies": 13,
//             "essence": 0,
//             "top": 0,
//             "status": 32,
//             "subject": "限价背景下，资金链强大的开发商都捂盘，或者停止开发。  ",
//             "pic_path": "",
//             "ratio": "1",
//             "gender": 0,
//             "userTitle": "版主",
//             "recommendAdd": 0,
//             "special": 0,
//             "isHasRecommendAdd": 0,
//             "imageList": [],
//             "sourceWebUrl": "http://bbs.uestc.edu.cn/forum.php?mod=viewthread&tid=1728094",
//             "verify": []
//         }
//     ],
//     "page": 1,
//     "has_next": 1,
//     "total_num": 610363
// }


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

         const re = JSON.parse(data.data)


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
