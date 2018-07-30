import Api from "./Api"
import fetch from "@system.fetch"
import UserCache from './UserCache'


var app = null
function init(app){
  this.app = app
  UserCache.init(app)
}




function fetchPostDetail(page,topic_id,suc,fai){
  const url = Api.BASE_URL + "app/web/index.php?r=forum/postlist&pageSize=25"

  const user = UserCache.getUserFromApp(this.app)

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

    }
  })
}

export default{
  fetchPostDetail,
  init,
  comment,
  replyComment
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
//     "topic": {
//         "topic_id": 1722345,
//         "title": "清水河校区接驳地铁公交专线开行",
//         "type": "normal_complex",
//         "special": 0,
//         "sortId": 0,
//         "user_id": 158868,
//         "user_nick_name": "xyn0",
//         "replies": 272,
//         "hits": 21438,
//         "essence": 0,
//         "vote": 0,
//         "hot": 0,
//         "top": 0,
//         "is_favor": 0,
//         "create_date": "1529413744000",
//         "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=158868&size=middle",
//         "level": 0,
//         "userTitle": "超级版主",
//         "userColor": "",
//         "isFollow": 0,
//         "zanList": [
//             {
//                 "tid": "1722345",
//                 "recommenduid": "17667",
//                 "dateline": "1532436085",
//                 "username": "desert-water",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "199789",
//                 "dateline": "1532346693",
//                 "username": "枫叶林",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "216543",
//                 "dateline": "1532326876",
//                 "username": "小僧爱科研",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "206841",
//                 "dateline": "1532307919",
//                 "username": "MOLMOL",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "183328",
//                 "dateline": "1531905219",
//                 "username": "迷你无敌猪",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "216478",
//                 "dateline": "1531882875",
//                 "username": "Jerome",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "216817",
//                 "dateline": "1531789618",
//                 "username": "精一执中",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "180178",
//                 "dateline": "1531235141",
//                 "username": "553706833",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "6348",
//                 "dateline": "1531189340",
//                 "username": "youngfq",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "215060",
//                 "dateline": "1530319340",
//                 "username": "嘻嘻嘻嘻嘻嘻",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "197855",
//                 "dateline": "1530272613",
//                 "username": "cloudfl",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "214498",
//                 "dateline": "1530264589",
//                 "username": "良言2333",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "204106",
//                 "dateline": "1530243246",
//                 "username": "joinus",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "206144",
//                 "dateline": "1530068591",
//                 "username": "啨風飛雨",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "203767",
//                 "dateline": "1529896946",
//                 "username": "zz927201",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "187151",
//                 "dateline": "1529888450",
//                 "username": "小情绪",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "188504",
//                 "dateline": "1529834769",
//                 "username": "智辰",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "27116",
//                 "dateline": "1529658430",
//                 "username": "忆音",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "188988",
//                 "dateline": "1529588440",
//                 "username": "哥凯凯徐",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "138838",
//                 "dateline": "1529581269",
//                 "username": "一沫sunlight",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "184171",
//                 "dateline": "1529580333",
//                 "username": "LOMOLOMO",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "60528",
//                 "dateline": "1529575672",
//                 "username": "charlene",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "187567",
//                 "dateline": "1529569673",
//                 "username": "张广平",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "118687",
//                 "dateline": "1529544382",
//                 "username": "木杉浅唱",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "203108",
//                 "dateline": "1529541675",
//                 "username": "Jacken",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "59674",
//                 "dateline": "1529514380",
//                 "username": "zhongjjk",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "207507",
//                 "dateline": "1529504081",
//                 "username": "bb13825",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "134211",
//                 "dateline": "1529500266",
//                 "username": "惯性年华",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "102437",
//                 "dateline": "1529494701",
//                 "username": "leo_prince",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "57285",
//                 "dateline": "1529489877",
//                 "username": "demoncat",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "193901",
//                 "dateline": "1529484251",
//                 "username": "慎独思诚",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "173250",
//                 "dateline": "1529477479",
//                 "username": "encounteryou",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "197717",
//                 "dateline": "1529471181",
//                 "username": "冷露琉璃",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "175827",
//                 "dateline": "1529470848",
//                 "username": "tsyj8",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "178985",
//                 "dateline": "1529469476",
//                 "username": "V爱你",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "141845",
//                 "dateline": "1529465591",
//                 "username": "噬天",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "159641",
//                 "dateline": "1529462955",
//                 "username": "xiesansi",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "211432",
//                 "dateline": "1529462811",
//                 "username": "奇异果++",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "101457",
//                 "dateline": "1529462583",
//                 "username": "201008008002",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "156556",
//                 "dateline": "1529461683",
//                 "username": "daisycome",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "185186",
//                 "dateline": "1529461155",
//                 "username": "天线小徒",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "30663",
//                 "dateline": "1529459849",
//                 "username": "2703302016",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "203292",
//                 "dateline": "1529425960",
//                 "username": "201622080422",
//                 "count(distinct recommenduid)": "1"
//             },
//             {
//                 "tid": "1722345",
//                 "recommenduid": "197254",
//                 "dateline": "1529424699",
//                 "username": "枫叶雨云",
//                 "count(distinct recommenduid)": "1"
//             }
//         ],
//         "content": [
//             {
//                 "infor": " 本帖最后由 xyn0 于 2018-7-21 21:18 编辑 \r\n\r\n\r\n感谢大家对试运行初期种种问题的容忍，我们将争取不断完善。如有问题，欢迎继续在此反馈，谢谢！也可拨打B120所属车队苏队长电话：18030455234咨询、投诉。-\r\n------------------------------------------------------------------------------------------------------------------------\r\n\r\n       为方便清水河校区师生出行，学校联系成都市公交集团开通B120接驳地铁公交专线，路径为：清水河校区体育馆停车场-南二门外顺江小区站台（736路站台处）-电子科大清水河校区南校门公交站台（736路站台处）-成都合院天润路口-西二门外天润路水杉路口站台（116路站台处）-电子科大清水河校区西校门公交站台（116路站台处）-地铁2号线天河路站C口（往返站点一致）。其中顺江小区、西二门暂采取招手停车方式，如需上车请招手，如需下车请提前向司机说明。\r\n\r\n        B120从6月21日开始试运行。7月20日起执行新时刻，从清水河校区体育馆停车场始发时间暂定为：\r\n        7:40、8:20、8:40、9:05、9:30、9:55、10:20、10:50、11:15、11:40、12:10、12:35、13:00、13:30、14:00、14:30、15:00、15:25、15:55、16:20、16:40、17:00、17:25、17:45、18:05、18:25、18:50、19:20\r\n\r\n        因天河路站停车条件问题，除早上7:40、7:55、8:10、8:25和20:00的末班外，其他班次由清水河校区发出到天河路后（约22-27分钟）马上折返。大家可参考清水河校区发车时间计算。停车的问题将进一步沟通，设法解决，争取做到天河路站也能准点发车。\r\n\r\n说明：\r\n1.  B120试运行期间，发车时刻和站点将根据客流情况适当调整，可在本页面获取最新时刻和站点信息，我们将第一时间持续更新。如有意见和建议，可在下面反馈。\r\n2.  近期还将增加周六、周日20:00~22:00从地铁2号线天河路站C口至电子科技大学清水河校区班次，具体信息请关注本页面。\r\n\r\n小贴士：\r\n1.  对从清水河校区出发，乘地铁想坐到座位的师生，建议采用从天河路站进站，反向坐至犀浦再折回的方式。\r\n2.  B120从体育馆停车场发出后，正常情况约6-10分钟可到达西校门站。从西校门站到达地铁天河路站，正常情况约15分钟。\r\n3.  如借助本线路换乘地铁往返两校区，正常情况下，地铁加本线路用时约1小时左右。如从沙河校区出发，建议在本线路发车前45分钟，从地铁前锋路站或红星桥站上地铁3号线，在春熙路站换乘2号线，至天河路站；如从八里小区出发，建议在本线路发车前40分钟，从地铁八里庄站上地铁7号线，在一品天下站换乘2号线，至天河路站。\r\n\r\n请大家多多支持本线路，尽量转到各群或转告身边的人！只有试运行期间充足的客流，才能支持该线路长期运行下去并增加更多班次、覆盖更多时间段。对于前期调查中及后续反馈集中的问题，将在二楼集中回复。为了尽快开通、尽早为大家服务，本线路不少细节有待进一步完善，也欢迎大家继续提出意见和建议，我们将汇总后转给相关部门和公交集团。\r\n\r\n附线路地图：",
//                 "type": 0
//             },
//             {
//                 "infor": "http://bbs.uestc.edu.cn/data/attachment/forum/201806/20/102833ef3nmnuf9ewdn3ef.jpg",
//                 "type": 1,
//                 "originalInfo": "http://bbs.uestc.edu.cn/data/attachment/forum/201806/20/102833ef3nmnuf9ewdn3ef.jpg",
//                 "aid": 1889116
//             },
//             {
//                 "infor": "车辆照片，来自87楼：",
//                 "type": 0,
//                 "originalInfo": "http://bbs.uestc.edu.cn/data/attachment/forum/201806/20/102833ef3nmnuf9ewdn3ef.jpg",
//                 "aid": 1889116
//             },
//             {
//                 "infor": "http://bbs.uestc.edu.cn/data/attachment/forum/201806/21/082037ljgjr69l44nl9zrx.jpg",
//                 "type": 1,
//                 "originalInfo": "http://bbs.uestc.edu.cn/data/attachment/forum/201806/21/082037ljgjr69l44nl9zrx.jpg",
//                 "aid": 0
//             },
//             {
//                 "infor": "http://bbs.uestc.edu.cn/data/attachment/forum/201806/21/082024pnnnp9aqz4j1mngu.jpg",
//                 "type": 1,
//                 "originalInfo": "http://bbs.uestc.edu.cn/data/attachment/forum/201806/21/082024pnnnp9aqz4j1mngu.jpg",
//                 "aid": 0
//             }
//         ],
//         "poll_info": null,
//         "activityInfo": null,
//         "location": "",
//         "delThread": false,
//         "managePanel": [],
//         "extraPanel": [
//             {
//                 "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/topicrate&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30812608&type=view",
//                 "title": "评分",
//                 "extParams": {
//                     "beforeAction": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/topicrate&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30812608&type=check"
//                 },
//                 "type": "rate"
//             },
//             {
//                 "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30812608&type=thread",
//                 "title": "支持",
//                 "extParams": {
//                     "beforeAction": "",
//                     "recommendAdd": 48,
//                     "isHasRecommendAdd": 0
//                 },
//                 "type": "support"
//             }
//         ],
//         "mobileSign": "",
//         "status": 1,
//         "reply_status": 1,
//         "flag": 0,
//         "gender": 1,
//         "reply_posts_id": 30812608,
//         "rateList": {
//             "head": {
//                 "field1": "参与人数",
//                 "field2": "水滴",
//                 "field3": ""
//             },
//             "total": {
//                 "field1": "1",
//                 "field2": "5",
//                 "field3": ""
//             },
//             "body": [
//                 {
//                     "field1": "zhongjjk",
//                     "field2": "+5",
//                     "field3": ""
//                 }
//             ],
//             "showAllUrl": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/ratelistview&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=&pid=30812608"
//         },
//         "reward": {
//             "score": [
//                 {
//                     "info": "水滴",
//                     "value": 5
//                 }
//             ],
//             "userList": [
//                 {
//                     "uid": 59674,
//                     "userName": "zhongjjk",
//                     "userIcon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=59674&size=middle"
//                 }
//             ],
//             "userNumber": 1,
//             "showAllUrl": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/ratelistview&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=&pid=30812608"
//         },
//         "relateItem": []
//     },
//     "page": 1,
//     "has_next": 1,
//     "total_num": 272,
//     "list": [
//         {
//             "reply_id": 158868,
//             "reply_content": [
//                 {
//                     "infor": " 本帖最后由 xyn0 于 2018-6-21 13:03 编辑 \r\n\r\n非常感谢各位师生在前期调查中的热情和参与度，在此，也对大家在回帖和问卷中关心的一些问题进行回复。后续如有较为集中的问题，会继续在此更新。\r\n1.为什么不去犀浦？天河路上地铁坐不到座位\r\n因犀浦周边交通拥堵且人多拥挤混乱，而清水河校区到犀浦、天河路、百草路三个地铁站的距离大体差不多，为了保证快速接驳地铁，也保证车辆快速周转、提供良好的发车频率，综合考虑之下，去天河路或者百草路更加合适。\r\n如果非常在意有座位，天河路或者百草路上了地铁，也可反方向坐到犀浦再坐回来。天河路坐回犀浦用时仅2分钟，加上学校去天河路18分钟，总共也就20分钟。如学校直接去犀浦，因交通拥堵很多时候用时都在20分钟以上，更不要说进站排队人多耽误的时间了，相比之下去天河路或百草路上地铁再反坐到犀浦仍是更优选择。何况大多数非高峰时间天河路仍有座位，并不是都有必要反坐到犀浦，总体来说天河路或百草路仍是更佳选择。\r\n百草路站附近每周五、周日下午成都外国语学校上学放学期间交通管制，车辆无法通行，临时绕行容易增加乘车麻烦引起误解，因此最终选定天河路站作为接驳点。\r\n2.关于校外人员乘坐和刷校园卡的问题\r\n该线路刷公交卡或投币，票价公交卡次数1元，电子钱包1.8元，投币2元（公交卡次数可在南门红旗充值，相关问题详见 ",
//                     "type": 0
//                 },
//                 {
//                     "infor": "http://bbs.uestc.edu.cn/data/att ... 6qyt44qay2r8ej4.png",
//                     "type": 4,
//                     "url": "http://bbs.uestc.edu.cn/data/attachment/forum/201801/05/180728c6qyt44qay2r8ej4.png"
//                 },
//                 {
//                     "infor": " ），不刷校园卡。为吸引足够的客流以便进一步增加班次方便师生，该线路不设限制，允许校外人员乘坐。开通初期会持续保持对该线路客流的关注，如客流较大将及时采取增加更多班次、换用更大车型等措施解决，大家无需过度担心。\r\n一方面，与396的模式不同，此线路试运行期间如客流充足，以后有望转为常规公交线路运营，刷公交卡也便于该线路获得市政补贴；相反，如客流不足，则可能面临停运，因此允许校外人员乘坐、增加客流是有必要的。因学校经费有限，如跟396一样刷校园卡不允许外人乘坐、完全依靠学校承担相关费用，较难保证充足的车辆和班次。\r\n另一方面，因初步调查得知本线路客流集中的特征明显，分布非常不均匀，工作日集中于早中晚和上下课时间段，周末则集中在早出晚归时间段，如刷校园卡，就只能使用装有学校刷卡机的车辆，同时这些车辆也无法跑其他常规公交线路，运营非常受限制；如刷公交卡，则可以在高峰时段从其他线路灵活派车支援，更好地满足师生需求。\r\n3.关于发车时间的问题\r\n由于晚间的班次拟安排和其他线路共用车辆开行，需要进一步协调，将在近期内开行。线路目前是试运营，只要线路有足够好的客流数据，就可能覆盖更广的时间，提供更好的频率。对于放假前后的特殊情况，只要有充足的客流支撑，有望考虑加开早晚的班次以便坐火车坐飞机。\r\n4.关于线路的问题\r\n本次线路设计中已经尽可能考虑到绕避拥堵因素，在与公交公司的沟通时也表达了希望调度加强路况监控，如有路堵及时指挥司机在不影响站点的情况下绕行的诉求。\r\n5.关于开通到市区其他地方专线的问题以及接驳其他地铁站专线的问题\r\n目前，由于市区到处开工地铁和道路改造项目，拥堵情况十分严重，如开行公交直接进城，用时和乘坐体验可能非常糟糕。地铁网络现已相对完善，进城的同学还是通过地铁换乘到达目的地较为省时方便。\r\n另有同学希望开行至清江西路、茶店子客运站、羊犀立交等地铁站的接驳线路。一方面，作为专门的地铁接驳线，我们不希望距离太长。因为距离一旦拉长，车辆运行时间会明显上升，投入同样多车辆资源的前提下，发车频率会明显不如短的线路，影响大家的乘车便利性；另一方面，前往清江西路站的IT大道、前往羊犀立交、茶店子客运站的羊西线都处于改造施工状态，IT大道很长一段现在甚至只有一车道单行，接驳上述站点，极容易发生车辆堵在半路回不来、后续班次不能发的情况。此外，即使在在上述道路不堵的时候，通过对途经公交线路实时位置数据的分析结合地铁时刻表计算，以前往2、4号线共同的中医大省医院站为比较点，发现大多数时候坐公交去上述站点换乘地铁进城与去天河路换乘2号线进城用时相似甚至更长。结合前述两个方面，必要性不强。",
//                     "type": 0,
//                     "url": "http://bbs.uestc.edu.cn/data/attachment/forum/201801/05/180728c6qyt44qay2r8ej4.png"
//                 }
//             ],
//             "reply_type": "normal_complex",
//             "reply_name": "xyn0",
//             "reply_posts_id": 30812938,
//             "poststick": 0,
//             "position": 2,
//             "posts_date": "1529422532000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=158868&size=middle",
//             "level": 8,
//             "userTitle": "超级版主",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 1,
//             "is_quote": 0,
//             "quote_pid": 0,
//             "quote_content": "",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30812938&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 2,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         },
//         {
//             "reply_id": 118267,
//             "reply_content": [
//                 {
//                     "infor": " 本帖最后由 xyn0 于 2018-6-20 22:25 编辑 \r\n\r\n沙发。\r\n\r\n楼主为了该线路的开通做了很多重要的前期工作，曾多次熬夜，非常辛苦。然而即将毕业，不知今后能不能有其他人继续关注学校的交通问题并提出更好的切合实际的解决方案。",
//                     "type": 0
//                 }
//             ],
//             "reply_type": "normal",
//             "reply_name": "_____________",
//             "reply_posts_id": 30812988,
//             "poststick": 0,
//             "position": 3,
//             "posts_date": "1529424372000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=118267&size=middle",
//             "level": 0,
//             "userTitle": "蝌蚪 (Lv.1)",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 0,
//             "is_quote": 0,
//             "quote_pid": 0,
//             "quote_content": "",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30812988&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 3,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         },
//         {
//             "reply_id": 197254,
//             "reply_content": [
//                 {
//                     "infor": "支持",
//                     "type": 0
//                 }
//             ],
//             "reply_type": "normal",
//             "reply_name": "枫叶雨云",
//             "reply_posts_id": 30812994,
//             "poststick": 0,
//             "position": 4,
//             "posts_date": "1529424768000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=197254&size=middle",
//             "level": 1,
//             "userTitle": "河蟹 (Lv.3)",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 0,
//             "is_quote": 0,
//             "quote_pid": 0,
//             "quote_content": "",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30812994&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 0,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         },
//         {
//             "reply_id": 195245,
//             "reply_content": [
//                 {
//                     "infor": "感谢楼主[mobcent_phiz=http://bbs.uestc.edu.cn/static/image/smiley/alu/80.gif]",
//                     "type": 0
//                 }
//             ],
//             "reply_type": "normal",
//             "reply_name": "Skyline_Wu",
//             "reply_posts_id": 30813007,
//             "poststick": 0,
//             "position": 5,
//             "posts_date": "1529426212000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=195245&size=middle",
//             "level": 0,
//             "userTitle": "虾米 (Lv.2)",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "来自苹果客户端",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 0,
//             "is_quote": 0,
//             "quote_pid": 0,
//             "quote_content": "",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30813007&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 0,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         },
//         {
//             "reply_id": 204892,
//             "reply_content": [
//                 {
//                     "infor": "支持[mobcent_phiz=http://bbs.uestc.edu.cn/static/image/smiley/alu/55.gif]",
//                     "type": 0
//                 }
//             ],
//             "reply_type": "normal",
//             "reply_name": "月照西桥",
//             "reply_posts_id": 30813014,
//             "poststick": 0,
//             "position": 6,
//             "posts_date": "1529426943000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=204892&size=middle",
//             "level": 1,
//             "userTitle": "河蟹 (Lv.3)",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "来自苹果客户端",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 0,
//             "is_quote": 0,
//             "quote_pid": 0,
//             "quote_content": "",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30813014&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 0,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         },
//         {
//             "reply_id": 98134,
//             "reply_content": [
//                 {
//                     "infor": "不错不错，",
//                     "type": 0
//                 }
//             ],
//             "reply_type": "normal",
//             "reply_name": "不曾北去",
//             "reply_posts_id": 30813029,
//             "poststick": 0,
//             "position": 7,
//             "posts_date": "1529432501000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=98134&size=middle",
//             "level": 7,
//             "userTitle": "版主",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 0,
//             "is_quote": 0,
//             "quote_pid": 0,
//             "quote_content": "",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30813029&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 0,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         },
//         {
//             "reply_id": 196997,
//             "reply_content": [
//                 {
//                     "infor": "资词，就是早班车能不能再早点",
//                     "type": 0
//                 }
//             ],
//             "reply_type": "normal",
//             "reply_name": "kamen777",
//             "reply_posts_id": 30813040,
//             "poststick": 0,
//             "position": 8,
//             "posts_date": "1529453029000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=196997&size=middle",
//             "level": 1,
//             "userTitle": "河蟹 (Lv.3)",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 0,
//             "is_quote": 0,
//             "quote_pid": 0,
//             "quote_content": "",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30813040&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 0,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         },
//         {
//             "reply_id": 135745,
//             "reply_content": [
//                 {
//                     "infor": "还是收车太早啊",
//                     "type": 0
//                 }
//             ],
//             "reply_type": "normal",
//             "reply_name": "super_mac",
//             "reply_posts_id": 30813056,
//             "poststick": 0,
//             "position": 9,
//             "posts_date": "1529454559000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=135745&size=middle",
//             "level": 1,
//             "userTitle": "河蟹 (Lv.3)",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 0,
//             "is_quote": 0,
//             "quote_pid": 0,
//             "quote_content": "",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30813056&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 0,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         },
//         {
//             "reply_id": 158868,
//             "reply_content": [
//                 {
//                     "infor": "super_mac 发表于 2018-6-20 08:29\r\n还是收车太早啊\r\n\r\n公交公司已经表示，只要客流好，延时不是问题。由于晚上开行需要协调的问题比较多，为了线路尽快开行，尽早服务师生，暂时先开行了白天的班次。线路先开行进行试运行，之后再慢慢协调相对复杂的问题并优化时刻。",
//                     "type": 0
//                 }
//             ],
//             "reply_type": "normal",
//             "reply_name": "xyn0",
//             "reply_posts_id": 30813073,
//             "poststick": 0,
//             "position": 10,
//             "posts_date": "1529455794000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=158868&size=middle",
//             "level": 8,
//             "userTitle": "超级版主",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 1,
//             "is_quote": 0,
//             "quote_pid": 0,
//             "quote_content": "",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30813073&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 0,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         },
//         {
//             "reply_id": 135745,
//             "reply_content": [
//                 {
//                     "infor": "感谢感谢！楼主辛苦了，开通了就是大好事！",
//                     "type": 0
//                 }
//             ],
//             "reply_type": "normal",
//             "reply_name": "super_mac",
//             "reply_posts_id": 30813075,
//             "poststick": 0,
//             "position": 11,
//             "posts_date": "1529455844000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=135745&size=middle",
//             "level": 1,
//             "userTitle": "河蟹 (Lv.3)",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 0,
//             "is_quote": 1,
//             "quote_pid": 0,
//             "quote_content": "xyn0 发表于 2018-6-20 08:49\n公交公司已经表示，只要客流好，延时不是问题。由于晚上开行需要协调的问题比较多，为了线路尽快开行，尽 ...",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30813075&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 0,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         },
//         {
//             "reply_id": 158868,
//             "reply_content": [
//                 {
//                     "infor": "kamen777 发表于 2018-6-20 08:03\r\n资词，就是早班车能不能再早点\r\n\r\n客流调查显示除了放假前后几天由于赶火车飞机的原因，其他时候早出发的客流较少。考虑到比较早的时候犀浦拥堵情况不是很严重且数据显示116在7:40前发车频率较好，出于保证较高的利用率数据考虑，暂不考虑开行更早班次。放假前拟另外进行客流调查，考虑协调临时开行接驳首班地铁的班次。",
//                     "type": 0
//                 }
//             ],
//             "reply_type": "normal",
//             "reply_name": "xyn0",
//             "reply_posts_id": 30813087,
//             "poststick": 0,
//             "position": 12,
//             "posts_date": "1529456370000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=158868&size=middle",
//             "level": 8,
//             "userTitle": "超级版主",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 1,
//             "is_quote": 0,
//             "quote_pid": 0,
//             "quote_content": "",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30813087&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 0,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         },
//         {
//             "reply_id": 41373,
//             "reply_content": [
//                 {
//                     "infor": "办实事，感谢！",
//                     "type": 0
//                 }
//             ],
//             "reply_type": "normal",
//             "reply_name": "_baron_",
//             "reply_posts_id": 30813094,
//             "poststick": 0,
//             "position": 13,
//             "posts_date": "1529456635000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=41373&size=middle",
//             "level": 2,
//             "userTitle": "泥鳅 (Lv.4)",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 1,
//             "is_quote": 0,
//             "quote_pid": 0,
//             "quote_content": "",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30813094&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 0,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         },
//         {
//             "reply_id": 180340,
//             "reply_content": [
//                 {
//                     "infor": "干实事 楼煮辛苦了",
//                     "type": 0
//                 }
//             ],
//             "reply_type": "normal",
//             "reply_name": "#享受孤独",
//             "reply_posts_id": 30813099,
//             "poststick": 0,
//             "position": 14,
//             "posts_date": "1529456992000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=180340&size=middle",
//             "level": 4,
//             "userTitle": "鳙鱼 (Lv.6)",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 0,
//             "is_quote": 0,
//             "quote_pid": 0,
//             "quote_content": "",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30813099&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 0,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         },
//         {
//             "reply_id": 107358,
//             "reply_content": [
//                 {
//                     "infor": "点赞点赞   广而告之   支持支持",
//                     "type": 0
//                 }
//             ],
//             "reply_type": "normal",
//             "reply_name": "dyymppch",
//             "reply_posts_id": 30813114,
//          x`   "poststick": 0,
//             "position": 15,
//             "posts_date": "1529457760000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=107358&size=middle",
//             "level": 1,
//             "userTitle": "河蟹 (Lv.3)",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 0,
//             "is_quote": 0,
//             "quote_pid": 0,
//             "quote_content": "",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30813114&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 0,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         },
//         {
//             "reply_id": 194903,
//             "reply_content": [
//                 {
//                     "infor": "支持",
//                     "type": 0
//                 }
//             ],
//             "reply_type": "normal",
//             "reply_name": "阆苑仙葩xz",
//             "reply_posts_id": 30813118,
//             "poststick": 0,
//             "position": 16,
//             "posts_date": "1529457836000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=194903&size=middle",
//             "level": 1,
//             "userTitle": "河蟹 (Lv.3)",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "来自苹果客户端",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 0,
//             "is_quote": 0,
//             "quote_pid": 0,
//             "quote_content": "",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30813118&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 0,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         },
//         {
//             "reply_id": 206358,
//             "reply_content": [
//                 {
//                     "infor": "支持",
//                     "type": 0
//                 }
//             ],
//             "reply_type": "normal",
//             "reply_name": "小耗子吃虾米",
//             "reply_posts_id": 30813154,
//             "poststick": 0,
//             "position": 17,
//             "posts_date": "1529459007000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=206358&size=middle",
//             "level": 0,
//             "userTitle": "虾米 (Lv.2)",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "来自苹果客户端",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 0,
//             "is_quote": 0,
//             "quote_pid": 0,
//             "quote_content": "",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30813154&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 0,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         },
//         {
//             "reply_id": 207446,
//             "reply_content": [
//                 {
//                     "infor": "资词",
//                     "type": 0
//                 }
//             ],
//             "reply_type": "normal",
//             "reply_name": "mate595",
//             "reply_posts_id": 30813157,
//             "poststick": 0,
//             "position": 18,
//             "posts_date": "1529459206000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=207446&size=middle",
//             "level": 0,
//             "userTitle": "虾米 (Lv.2)",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "来自安卓客户端",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 0,
//             "is_quote": 0,
//             "quote_pid": 0,
//             "quote_content": "",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30813157&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 0,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         },
//         {
//             "reply_id": 62061,
//             "reply_content": [
//                 {
//                     "infor": " 发表于 58 秒前 | 只看该作者 来自安卓客户端来自安卓客户端\r\n资词",
//                     "type": 0
//                 }
//             ],
//             "reply_type": "normal",
//             "reply_name": "香农咖啡",
//             "reply_posts_id": 30813164,
//             "poststick": 0,
//             "position": 19,
//             "posts_date": "1529459358000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=62061&size=middle",
//             "level": 2,
//             "userTitle": "泥鳅 (Lv.4)",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 1,
//             "is_quote": 0,
//             "quote_pid": 0,
//             "quote_content": "",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30813164&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 0,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         },
//         {
//             "reply_id": 0,
//             "reply_content": [
//                 {
//                     "infor": "强烈要求增加西二门“天润路水杉路站”，这一站上下车的人都很多，非常有需要，开行本车次是以方便学校师生为目的，希望能真正便于师生交通出行。谢谢！",
//                     "type": 0
//                 }
//             ],
//             "reply_type": "normal",
//             "reply_name": "",
//             "reply_posts_id": 30813165,
//             "poststick": 0,
//             "position": 20,
//             "posts_date": "1529459427000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=0&size=middle",
//             "level": 0,
//             "userTitle": "",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 0,
//             "is_quote": 0,
//             "quote_pid": 0,
//             "quote_content": "",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30813165&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 0,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         },
//         {
//             "reply_id": 192835,
//             "reply_content": [
//                 {
//                     "infor": "非常感谢楼主！",
//                     "type": 0
//                 }
//             ],
//             "reply_type": "normal",
//             "reply_name": "逛论坛的小八八",
//             "reply_posts_id": 30813210,
//             "poststick": 0,
//             "position": 21,
//             "posts_date": "1529460670000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=192835&size=middle",
//             "level": 0,
//             "userTitle": "虾米 (Lv.2)",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 0,
//             "is_quote": 0,
//             "quote_pid": 0,
//             "quote_content": "",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30813210&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 0,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         },
//         {
//             "reply_id": 179842,
//             "reply_content": [
//                 {
//                     "infor": "支持！辛苦了！",
//                     "type": 0
//                 }
//             ],
//             "reply_type": "normal",
//             "reply_name": "不良青年",
//             "reply_posts_id": 30813224,
//             "poststick": 0,
//             "position": 22,
//             "posts_date": "1529460870000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=179842&size=middle",
//             "level": 8,
//             "userTitle": "超级版主",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 1,
//             "is_quote": 0,
//             "quote_pid": 0,
//             "quote_content": "",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30813224&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 0,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         },
//         {
//             "reply_id": 133885,
//             "reply_content": [
//                 {
//                     "infor": "支持，可以去试试～！",
//                     "type": 0
//                 }
//             ],
//             "reply_type": "normal",
//             "reply_name": "有源相控阵",
//             "reply_posts_id": 30813229,
//             "poststick": 0,
//             "position": 23,
//             "posts_date": "1529461040000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=133885&size=middle",
//             "level": 4,
//             "userTitle": "鳙鱼 (Lv.6)",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 1,
//             "is_quote": 0,
//             "quote_pid": 0,
//             "quote_content": "",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30813229&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 0,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         },
//         {
//             "reply_id": 197671,
//             "reply_content": [
//                 {
//                     "infor": "辛苦辛苦了 ",
//                     "type": 0
//                 }
//             ],
//             "reply_type": "normal",
//             "reply_name": "嘉木",
//             "reply_posts_id": 30813236,
//             "poststick": 0,
//             "position": 24,
//             "posts_date": "1529461106000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=197671&size=middle",
//             "level": 9,
//             "userTitle": "站长",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 1,
//             "is_quote": 0,
//             "quote_pid": 0,
//             "quote_content": "",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30813236&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 0,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         },
//         {
//             "reply_id": 101783,
//             "reply_content": [
//                 {
//                     "infor": "强烈要求增加西二门和校医院站点，方便师生的同时也可以兼顾龙湖和学府海棠的客流。",
//                     "type": 0
//                 }
//             ],
//             "reply_type": "normal",
//             "reply_name": "bidybibo",
//             "reply_posts_id": 30813261,
//             "poststick": 0,
//             "position": 25,
//             "posts_date": "1529461751000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=101783&size=middle",
//             "level": 3,
//             "userTitle": "草鱼 (Lv.5)",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 1,
//             "is_quote": 0,
//             "quote_pid": 0,
//             "quote_content": "",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30813261&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 0,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         },
//         {
//             "reply_id": 0,
//             "reply_content": [
//                 {
//                     "infor": "晚上收车时间应该推迟到23点左右",
//                     "type": 0
//                 }
//             ],
//             "reply_type": "normal",
//             "reply_name": "",
//             "reply_posts_id": 30813289,
//             "poststick": 0,
//             "position": 26,
//             "posts_date": "1529462625000",
//             "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=0&size=middle",
//             "level": 0,
//             "userTitle": "",
//             "userColor": "",
//             "location": "",
//             "mobileSign": "",
//             "reply_status": 1,
//             "status": 1,
//             "role_num": 1,
//             "title": "",
//             "gender": 0,
//             "is_quote": 0,
//             "quote_pid": 0,
//             "quote_content": "",
//             "quote_user_name": "",
//             "delThread": false,
//             "managePanel": [],
//             "extraPanel": [
//                 {
//                     "action": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=forum/support&sdkVersion=2.6.1.7&accessToken=null&accessSecret=null&apphash=30484d2f&tid=1722345&pid=30813289&type=post",
//                     "title": "支持",
//                     "recommendAdd": "",
//                     "extParams": {
//                         "beforeAction": "",
//                         "recommendAdd": 0,
//                         "isHasRecommendAdd": 0
//                     },
//                     "type": "support"
//                 }
//             ]
//         }
//     ],
//     "forumName": "新生专区",
//     "boardId": 326,
//     "forumTopicUrl": "http://bbs.uestc.edu.cn/forum.php?mod=viewthread&tid=1722345",
//     "img_url": "",
//     "icon_url": ""
// }
