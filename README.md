# BBS

this is an quickapp of UESTC-BBS



## Api

获取pm body
{"rs":1,
"errcode":"",
"head":{
  "errCode":"00000000",
  "errInfo":"调用成功,没有任何错误",
  "version":"2.6.1.7",
  "alert":0},
"body":{
  "externInfo":{
    "padding":""},
  "list":[
    {"plid":4004947,
    "pmid":4004947,
    "lastUserId":199446,
    "lastUserName":"kfdykme",
    "lastSummary":"哈哈哈",
    "lastDateline":"1510816381000",
    "toUserId":197674,
    "toUserAvatar":"http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=197674&size=middle",
    "toUserName":"sgh0109",
    "toUserIsBlack":0,"isNew":0},
    {"plid":4001543,
    "pmid":4001543,
    "lastUserId":194933,
    "lastUserName":"Вīń",
    "lastSummary":"水水",
    "lastDateline":"1503295050000",
    "toUserId":194933,
    "toUserAvatar":"http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=194933&size=middle",
    "toUserName":"Вīń",
    "toUserIsBlack":0,
    "isNew":0}],
  "hasNext":0,
  "count":2}}

获取私信消息

url : http://bbs.uestc.edu.cn//mobcent/app/web/index.php?r=message/pmlist

抓取的post body:
pmlist	{"body":{"pmInfos":[{"fromUid":197674,"startTime":"0","stopTime":"0","cacheCount":0,"pmLimit":10,"plid":4004947,"pmid":4004947}],"externInfo":{"onlyFromUid":0}}}
packageName	com.appbyme.app118563
forumType	7
accessToken	3a92218375094ad61d1afb42d3627
appName	清水河畔
egnVersion	v2102.5
accessSecret	2870f155b160fa40addd801dd71ab
imei	868450030049702
sdkVersion	2.5.0.0
apphash	c65cd93e
forumKey	CBQJazn9Wws8Ivhr6U
platType	1
imsi	460018175289254
sdkType

整理post body
{
  'pmlist' : {
      'body':{
          'pmInfos':[
            {
                'fromUid':197674,
                'startTime':0,
                'stopTime' :0,
                'chcheCount':0,
                'pmLimit':10,
                'plid':4004947,
                'pmid':4004947
            }
          ],
          "externInfo":{
            "onlyFromUid":0
          }
      }},
  'accessToken' :3a92218375094ad61d1afb42d3627,
  'accessSecret':2870f155b160fa40addd801dd71ab,
  'apphash':c65cd93e,
  'sdkVersion' : 	2.5.0.0

}
