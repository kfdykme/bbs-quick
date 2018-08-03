import Api from "./Api"
import UserCache from './UserCache'


var app = null
function init(app){
  this.app = app
  UserCache.init(app)
}


/**
 * fetchMessagePost() 请求用户的帖子回复
 *
 * @param <function> success(re) re为object 是判断过数据是否合格的json对象的回调
 * @param <int> pageSize 每页的数据条数
 * @param <int> page 页数
 */
function fetchMessagePost(success,pageSize = 100,page){

  Api.fetch(
       Api.BASE_URL + "app/web/index.php?r=message/notifylistex&type=post&pageSize="+pageSize,
      {
          accessToken :UserCache.token(),
          accessSecret :UserCache.secret(),
          sdkVersion : Api.sdkVersion,
          appHash :UserCache.appHash()
      },
      success)
}


/**
 * fetchMessageAtMe() 请求@用户的消息
 *
 * @param <function> success(re) 同上
 * @param <int> pageSize 每页的数据条数
 * @param <int> page 页数
 */
function fetchMessageAtMe(success,pageSize = 100,page){

    Api.fetch(
      Api.BASE_URL + "app/web/index.php?r=message/notifylistex&type=at&pageSize="+pageSize,
      {
          accessToken :UserCache.token(),
          accessSecret :UserCache.secret(),
          sdkVersion : Api.sdkVersion,
          appHash :UserCache.appHash()
      },
      success)
}


/**
 * fetchMessageSystem() 请求系统消息
 *
 * @param <function> success(re) 同上
 * @param <int> pageSize 每页的数据条数
 * @param <int> page 页数
 */
function fetchMessageSystem(success,pageSize = 100,page){

      Api.fetch(
        Api.BASE_URL + "app/web/index.php?r=message/notifylistex&type=system&pageSize="+pageSize,
        {
            accessToken :UserCache.token(),
            accessSecret :UserCache.secret(),
            sdkVersion : Api.sdkVersion,
            appHash :UserCache.appHash()
        },
        success)
}

/**
 * fetchMessagePmseMission() 获取私信消息
 *
 * @param <function> success(re) 同上
 * @param <int> pageSize 每页的数据条数
 * @param <int> page 页数
 */
function fetchMessagePmseMission(success,pageSize = 100, page){

      Api.fetch(
        Api.BASE_URL + "app/web/index.php?r=message/pmsessionlist",
        {
            json : JSON.stringify({
                    'page' : page,
                    'pageSize' : pageSize
                  }),
            accessToken :UserCache.token(),
            accessSecret :UserCache.secret(),
            sdkVersion : Api.sdkVersion,
            appHash :UserCache.appHash()
        },
        success)
}

/**
 *fetchPmseMissionList() 获取与某个用户之间的消息记录
 *
 * @param <Integer> fromUid
 * @param <Integer> plid
 * @param <Integer> pmid
 * @param <function> success
 */
 function fetchPmseMissionList(fromUid,plid,pmid,success){

   Api.fetch(
     "http://bbs.uestc.edu.cn//mobcent/app/web/index.php?r=message/pmlist",
     {
       pmlist : {
             'body':{
                 'pmInfos':[
                   {
                       'fromUid':fromUid,
                       'startTime':0,
                       'stopTime' :0,
                       'chcheCount':0,
                       'pmLimit':10,
                       'plid':plid,
                       'pmid':pmid
                   }
                 ],
                 "externInfo":{
                   "onlyFromUid":0
                 }
             }},
       accessToken :UserCache.token(),
       accessSecret :UserCache.secret(),
       sdkVersion : Api.sdkVersion,
       appHash :UserCache.appHash()

     },
     success)
 }


 /**
  *fetchPmseMissionList() 获取与某个用户之间的消息记录
  *
  * @param <Integer> fromUid
  * @param <Integer> plid
  * @param <Integer> pmid
  * @param <function> success
  */
function uploadPmFile(fileUri,success){


      Api.upload(
            {
              files :[
              {
                uri : fileUri,
                name: "uploadFile[]",
                filename : fileUri.substring(fileUri.length-5)
              }
              ],
              data :[
                {
                  name :'accessToken',
                  value : UserCache.token()
                },
                {
                  name : 'accessSecret',
                  value : UserCache.secret()
                },
                {
                  name : 'sdkVersion',
                  value : Api.sdkVersion
                },
                {
                  name : 'apphash',
                  value : UserCache.appHash()
                },
                {
                  name : 'module',
                  value : 'pm'
                },
                {
                  name : 'type',
                  value : 'image'
                }]
          },success
      )

  }


 /**
  *fetchPmseMissionList() 获取与某个用户之间的消息记录
  *
  * @param <Integer> touid
  * @param <Integer> pid
  * @param <string> type
  * @param <string> content
  * @param <function> success
  */
function send(touid,pid,type,content,success){
    const url = "http://bbs.uestc.edu.cn//mobcent/app/web/index.php?r=message/pmadmin"


    Api.fetch(
      url,
      {

        json : JSON.stringify({
          'action' : "send",
          'toUid' : touid,
          'plid' : pid,
          'pmid' : pid,
          'msg' : {
              'type' : type,
              'content' : content
          }
        }),
        accessToken :UserCache.token(),
        accessSecret :UserCache.secret(),
        sdkVersion : Api.sdkVersion,
        appHash :UserCache.appHash()
      },
      success
    )
}


export default{
  fetchMessagePost,
  fetchMessageAtMe,
  fetchMessageSystem,
  fetchMessagePmseMission,
  fetchPmseMissionList,
  uploadPmFile,
  send,
  init
}
