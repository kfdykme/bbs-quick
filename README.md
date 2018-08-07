# BBS

this is an quickapp of UESTC-BBS





## Api

## UserInfo

### baseinfo

POST //mobcent/app/web/index.php?r=user/userinfo HTTP/1.1

packageName	com.appbyme.app118563
userId	199446
forumType	7
accessToken	3a92218375094ad61d1afb42d3627
appName	清水河畔
egnVersion	v2102.5
accessSecret	2870f155b160fa40addd801dd71ab
imei	868450030049702
sdkVersion	2.5.0.0
apphash	da025595
forumKey	CBQJazn9Wws8Ivhr6U
platType	1
imsi	460018175289254
sdkType
``` JSON

{
    "rs": 1,
    "errcode": "",
    "head": {
        "errCode": "00000000",
        "errInfo": "调用成功,没有任何错误",
        "version": "2.6.1.7",
        "alert": 0
    },
    "body": {
        "externInfo": {
            "padding": ""
        },
        "repeatList": [],
        "profileList": [
            {
                "type": "realname",
                "title": "真实姓名",
                "data": ""
            },
            {
                "type": "gender",
                "title": "性别",
                "data": "保密"
            },
            {
                "type": "birthday",
                "title": "生日",
                "data": ""
            },
            {
                "type": "birthprovince",
                "title": "出生省份",
                "data": ""
            },
            {
                "type": "birthcity",
                "title": "出生地",
                "data": ""
            },
            {
                "type": "birthdist",
                "title": "出生县",
                "data": ""
            },
            {
                "type": "birthcommunity",
                "title": "出生小区",
                "data": ""
            },
            {
                "type": "resideprovince",
                "title": "居住省份",
                "data": ""
            },
            {
                "type": "residecity",
                "title": "居住地",
                "data": ""
            },
            {
                "type": "residedist",
                "title": "居住县",
                "data": ""
            },
            {
                "type": "residecommunity",
                "title": "居住小区",
                "data": ""
            },
            {
                "type": "graduateschool",
                "title": "毕业学校",
                "data": ""
            },
            {
                "type": "education",
                "title": "学历",
                "data": ""
            },
            {
                "type": "company",
                "title": "公司",
                "data": ""
            },
            {
                "type": "occupation",
                "title": "职业",
                "data": ""
            },
            {
                "type": "position",
                "title": "职位",
                "data": ""
            },
            {
                "type": "lookingfor",
                "title": "交友目的",
                "data": ""
            },
            {
                "type": "site",
                "title": "个人主页",
                "data": ""
            },
            {
                "type": "interest",
                "title": "兴趣爱好",
                "data": ""
            }
        ],
        "creditList": [
            {
                "type": "credits",
                "title": "积分",
                "data": 32
            },
            {
                "type": "extcredits1",
                "title": "威望",
                "data": 0
            },
            {
                "type": "extcredits2",
                "title": "水滴",
                "data": 22
            },
            {
                "type": "extcredits6",
                "title": "奖励券",
                "data": 0
            }
        ],
        "creditShowList": [
            {
                "type": "credits",
                "title": "积分",
                "data": 32
            },
            {
                "type": "extcredits2",
                "title": "水滴",
                "data": 22
            }
        ]
    },
    "flag": 1,
    "is_black": 0,
    "is_follow": 0,
    "isFriend": 0,
    "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=199446&size=middle",
    "level_url": "",
    "name": "kfdykme",
    "email": "wim.k.f@live.com",
    "status": 2,
    "gender": 0,
    "score": 32,
    "credits": 32,
    "gold_num": 22,
    "topic_num": 6,
    "photo_num": 0,
    "reply_posts_num": 27,
    "essence_num": 0,
    "friend_num": 0,
    "follow_num": 0,
    "level": 1,
    "sign": "",
    "userTitle": "虾米 (Lv.2)",
    "verify": [],
    "mobile": "",
    "info": []
}
```

### post info

POST //mobcent/app/web/index.php?r=user/topiclist HTTP/1.1

pageSize	20
accessToken	3a92218375094ad61d1afb42d3627
isImageList	1
accessSecret	2870f155b160fa40addd801dd71ab
sdkVersion	2.5.0.0
apphash	da025595
uid	199446
type	topic
page	1


``` JSON

{
    "rs": 1,
    "errcode": "",
    "head": {
        "errCode": "00000000",
        "errInfo": "调用成功,没有任何错误",
        "version": "2.6.1.7",
        "alert": 0
    },
    "body": {
        "externInfo": {
            "padding": ""
        }
    },
    "list": [
        {
            "imageList": [],
            "board_id": 25,
            "board_name": "水手之家",
            "topic_id": 1728444,
            "type_id": 0,
            "sort_id": 0,
            "title": "水水水",
            "subject": "灌水。  想水个河畔好难啊",
            "user_id": 199446,
            "last_reply_date": "1533020430000",
            "user_nick_name": "kfdykme",
            "hits": 3,
            "replies": 3,
            "top": 0,
            "status": 32800,
            "essence": 0,
            "hot": 0,
            "userAvatar": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=199446&size=middle",
            "special": 0
        },
        {
            "imageList": [],
            "board_id": 25,
            "board_name": "水手之家",
            "topic_id": 1711534,
            "type_id": 0,
            "sort_id": 0,
            "title": "shuishuishui\n可以水吗\n不可以吗\n不管了",
            "subject": "没有说说说说个屁",
            "user_id": 199446,
            "last_reply_date": "1523790908000",
            "user_nick_name": "kfdykme",
            "hits": 113,
            "replies": 3,
            "top": 0,
            "status": 32800,
            "essence": 0,
            "hot": 0,
            "userAvatar": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=199446&size=middle",
            "special": 0
        },
        {
            "imageList": [],
            "board_id": 25,
            "board_name": "水手之家",
            "topic_id": 1681272,
            "type_id": 0,
            "sort_id": 0,
            "title": "有人吗",
            "subject": "很急的想被挽尊",
            "user_id": 199446,
            "last_reply_date": "1504199026000",
            "user_nick_name": "kfdykme",
            "hits": 132,
            "replies": 11,
            "top": 0,
            "status": 32800,
            "essence": 0,
            "hot": 0,
            "userAvatar": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=199446&size=middle",
            "special": 0
        },
        {
            "imageList": [],
            "board_id": 25,
            "board_name": "水手之家",
            "topic_id": 1681072,
            "type_id": 0,
            "sort_id": 0,
            "title": "继续水",
            "subject": "我的目标是自己的总回帖数超过十",
            "user_id": 199446,
            "last_reply_date": "1504104863000",
            "user_nick_name": "kfdykme",
            "hits": 118,
            "replies": 19,
            "top": 0,
            "status": 32800,
            "essence": 0,
            "hot": 0,
            "userAvatar": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=199446&size=middle",
            "special": 0
        },
        {
            "imageList": [],
            "board_id": 25,
            "board_name": "水手之家",
            "topic_id": 1680939,
            "type_id": 315,
            "sort_id": 0,
            "title": "[灌水]水一水",
            "subject": "求挽尊 真的求 测试呢",
            "user_id": 199446,
            "last_reply_date": "1504058649000",
            "user_nick_name": "kfdykme",
            "hits": 70,
            "replies": 12,
            "top": 0,
            "status": 32800,
            "essence": 0,
            "hot": 0,
            "userAvatar": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=199446&size=middle",
            "special": 0
        },
        {
            "imageList": [],
            "board_id": 25,
            "board_name": "水手之家",
            "topic_id": 1679859,
            "type_id": 315,
            "sort_id": 0,
            "title": "[灌水]萌新求挽尊",
            "subject": "求挽尊",
            "user_id": 199446,
            "last_reply_date": "1503294485000",
            "user_nick_name": "kfdykme",
            "hits": 225,
            "replies": 11,
            "top": 0,
            "status": 32800,
            "essence": 0,
            "hot": 0,
            "userAvatar": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=199446&size=middle",
            "special": 0
        }
    ],
    "page": 1,
    "has_next": 0,
    "total_num": 6
}
```

### 好友列表
POST //mobcent/app/web/index.php?r=user/userlist HTTP/1.1

pageSize	20
accessToken	3a92218375094ad61d1afb42d3627
accessSecret	2870f155b160fa40addd801dd71ab
sdkVersion	2.5.0.0
apphash	da025595
uid	199446
orderBy	dateline
type	friend
page	1

``` JSON
{
    "rs": 1,
    "errcode": "",
    "head": {
        "errCode": "00000000",
        "errInfo": "调用成功,没有任何错误",
        "version": "2.6.1.7",
        "alert": 0
    },
    "body": {
        "externInfo": {
            "padding": ""
        }
    },
    "list": [
        {
            "distance": "",
            "location": "",
            "is_friend": 0,
            "isFriend": 1,
            "isFollow": 0,
            "uid": 178888,
            "name": "Evilkjoker",
            "status": 0,
            "is_black": 0,
            "gender": 1,
            "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=178888&size=middle",
            "level": 0,
            "userTitle": "星辰工作室",
            "verify": [],
            "lastLogin": "1533525339000",
            "dateline": "1533525339000",
            "signature": "*",
            "credits": 3671
        },
        {
            "distance": "",
            "location": "",
            "is_friend": 0,
            "isFriend": 1,
            "isFollow": 0,
            "uid": 197674,
            "name": "sgh0109",
            "status": 0,
            "is_black": 0,
            "gender": 0,
            "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=197674&size=middle",
            "level": 0,
            "userTitle": "蝌蚪 (Lv.1)",
            "verify": [],
            "lastLogin": "1532826565000",
            "dateline": "1532826565000",
            "signature": "",
            "credits": 10
        }
    ],
    "page": 1,
    "has_next": 0,
    "total_num": 2
}
```



## Message

``` JSON
{
    "rs": 1,
    "errcode": "",
    "head": {
        "errCode": "00000000",
        "errInfo": "调用成功,没有任何错误",
        "version": "2.6.1.7",
        "alert": 0
    },
    "body": {
        "externInfo": {
            "padding": ""
        },
        "data": [
            {
                "replied_date": "1532929752000",
                "mod": "firend",
                "note": "嘉木 请求加您为好友  ",
                "user_name": "嘉木",
                "user_id": 197671,
                "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=197671&size=middle",
                "actions": [
                    {
                        "redirect": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=user/useradminview&sdkV…627&accessSecret=2870f155b160fa40addd801dd71ab&apphash=&act=add&uid=197671",
                        "title": "批准申请",
                        "type": "firend"
                    }
                ],
                "is_read": "0",
                "type": "system"
            },
            {
                "replied_date": "1511485582000",
                "type": "system",
                "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=0&size=middle",
                "user_name": "系统",
                "user_id": "0",
                "mod": "admin",
                "note": "11月25日线下活动通告！11月25日下午2点的开幕式改在活动中心1楼咖啡厅进行！！！到时候有大蛋糕吃！！！大家先过来看看，吃吃，再听听游戏的具体规则！我们不见不散！",
                "is_read": "0"
            },
            {
                "replied_date": "1511449193000",
                "type": "system",
                "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=0&size=middle",
                "user_name": "系统",
                "user_id": "0",
                "mod": "admin",
                "note": "十年同舟共济，一路河畔有你清河畔今年十岁了！在这十年里，河畔陪伴着大家走过风风雨雨、河畔分享着大家的喜怒哀乐、河畔陪伴着大家一起成长！戳戳这里：http://bbs.uestc.edu.cn/tenth_anniversary/index.php，看看自己与河畔有着怎样的故事~送祝福给河畔有神秘加成哦~",
                "is_read": "0"
            },
            {
                "replied_date": "1510112330000",
                "mod": "firend",
                "note": "Fore 请求加您为好友  ",
                "user_name": "Fore",
                "user_id": 205769,
                "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=205769&size=middle",
                "actions": [
                    {
                        "redirect": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=user/useradminview&sdkV…627&accessSecret=2870f155b160fa40addd801dd71ab&apphash=&act=add&uid=205769",
                        "title": "批准申请",
                        "type": "firend"
                    }
                ],
                "is_read": "0",
                "type": "system"
            },
            {
                "replied_date": "1501838950000",
                "mod": "firend",
                "note": "Вīń 请求加您为好友  ",
                "user_name": "Вīń",
                "user_id": 194933,
                "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=194933&size=middle",
                "actions": [
                    {
                        "redirect": "http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=user/useradminview&sdkV…627&accessSecret=2870f155b160fa40addd801dd71ab&apphash=&act=add&uid=194933",
                        "title": "批准申请",
                        "type": "firend"
                    }
                ],
                "is_read": "0",
                "type": "system"
            },
            {
                "replied_date": "1479354880000",
                "type": "system",
                "icon": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=0&size=middle",
                "user_name": "系统",
                "user_id": "0",
                "mod": "admin",
                "note": "尊敬的kfdykme，您已经注册成为清水河畔－电子科技大学官方论坛的会员，请你务必阅读新手导航以了解河畔。点此下载手机客户端如果您有什么疑问可以联系管理员，Email: uestcbbs@163.com。\r\n\r\n\r\n清水河畔－电子科技大学官方论坛\r\n2016-11-17 11:54",
                "is_read": "0"
            }
        ]
    },
    "page": 1,
    "has_next": 0,
    "total_num": 7
}

```
## 私信相关

### 获取pm body

``` JSON
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
```

### 获取私信消息

url : http://bbs.uestc.edu.cn//mobcent/app/web/index.php?r=message/pmlist

#### 抓取的post body:
pmlist
	{"body":{"pmInfos":[{"fromUid":197674,"startTime":"0","stopTime":"0","cacheCount":0,"pmLimit":10,"plid":4004947,"pmid":4004947}],"externInfo":{"onlyFromUid":0}}}
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



#### 整理post body

``` JSON
{
  "pmlist" : {
      "body":{
          "pmInfos":[
            {
                "fromUid":197674,
                "startTime":0,
                "stopTime" :0,
                "chcheCount":0,
                "pmLimit":10,
                "plid":4004947,
                "pmid":4004947
            }
          ],
          "externInfo":{
            "onlyFromUid":0
          }
      }},
  "accessToken" :"3a92218375094ad61d1afb42d3627",
  "accessSecret": "2870f155b160fa40addd801dd71ab",
  "apphash":"c65cd93e",
  "sdkVersion" : 	"2.5.0.0"

}
```

#### 返回数据

```JSON
{
    "rs": 1,
    "errcode": "",
    "head": {
        "errCode": "00000000",
        "errInfo": "调用成功,没有任何错误",
        "version": "2.6.1.7",
        "alert": 0
    },
    "body": {
        "externInfo": {
            "padding": ""
        },
        "userInfo": {
            "uid": 199446,
            "name": "kfdykme",
            "avatar": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=199446&size=small"
        },
        "pmList": [
            {
                "fromUid": 197674,
                "name": "sgh0109",
                "avatar": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=197674&size=small",
                "msgList": [
                    {
                        "sender": 197674,
                        "mid": 4255917,
                        "content": "哈哈",
                        "type": "text",
                        "time": "1510110223000"
                    },
                    {
                        "sender": 197674,
                        "mid": 4255919,
                        "content": "看到了吗",
                        "type": "text",
                        "time": "1510110263000"
                    },
                    {
                        "sender": 199446,
                        "mid": 4255953,
                        "content": "看到了",
                        "type": "text",
                        "time": "1510111570000"
                    },
                    {
                        "sender": 199446,
                        "mid": 4255954,
                        "content": "在别的app上",
                        "type": "text",
                        "time": "1510111586000"
                    },
                    {
                        "sender": 199446,
                        "mid": 4257469,
                        "content": "哈哈哈",
                        "type": "text",
                        "time": "1510816381000"
                    }
                ],
                "plid": 4004947,
                "hasPrev": 0
            }
        ]
    }
}
```

###发送私信

url : http://bbs.uestc.edu.cn//mobcent/app/web/index.php?r=message/pmadmin

#### post抓包
packageName	com.appbyme.app118563
forumType	7
json	%7B%22action%22%3A%22send%22%2C%22toUid%22%3A197674%2C%22plid%22%3A4004947%2C%22pmid%22%3A4004947%2C%22msg%22%3A%7B%22type%22%3A%22text%22%2C%22content%22%3A%22q11q%22%7D%7D
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

#### 整理 post

``` JSON

{
  "json" :"{\"action\":\"send\",\"toUid\":197674,\"plid\":4004947,\"pmid\":4004947,\"msg\":{\"type\":\"text\",\"content\":\"q11q\"}}",
  "accessToken" : "string",
  "accessSecret" : "string",
  "sdkVersion" : "string",
  "apphash" : "string"
}


// json
{
  "action":"send",
  "toUid":197674,
  "plid":4004947,
  "pmid":4004947,
  "msg":{"type":"text","content":"q11q"}
}


//先发送附件，然后发送附件地址+type
// image JSON
{
  "action":"send",
  "toUid":197674,
  "plid":4004947,
  "pmid":4004947,
  "msg":{
    "type":"image",
    "content":"http:\/\/bbs.uestc.edu.cn\/data\/appbyme\/upload\/image\/201808\/02\/O5fXjLgvvRyb.jpg"}
  }


```

#### 返回
``` json
{
    "rs": 1,
    "errcode": "操作成功 ",
    "head": {
        "errCode": "0000000",
        "errInfo": "操作成功 ",
        "version": "2.6.1.7",
        "alert": 0
    },
    "body": {
        "externInfo": {
            "padding": ""
        },
        "plid": 4004947,
        "pmid": 4305168,
        "sendTime": "1533197709000"
    }
}

```
### 发送附件

url ： http://bbs.uestc.edu.cn//mobcent/app/web/index.php?r=forum/sendattachmentex&packageName=com.appbyme.app118563&sortId=0&forumType=7&fid=0&accessToken=3a92218375094ad61d1afb42d3627&module=pm&appName=%E6%B8%85%E6%B0%B4%E6%B2%B3%E7%95%94&accessSecret=2870f155b160fa40addd801dd71ab&sdkVersion=2.5.0.0&imei=868450030049702&apphash=c65cd93e&albumId=0&type=image&forumKey=CBQJazn9Wws8Ivhr6U&platType=1&imsi=460018175289254


r	forum/sendattachmentex
packageName	com.appbyme.app118563
sortId	0
forumType	7
fid	0
accessToken	3a92218375094ad61d1afb42d3627
module	pm
appName	清水河畔
accessSecret	2870f155b160fa40addd801dd71ab
sdkVersion	2.5.0.0
imei	868450030049702
apphash	c65cd93e
albumId	0
type	image
forumKey	CBQJazn9Wws8Ivhr6U
platType	1
imsi	460018175289254


#### Multipart
uploadFile[]
  - Size
  - Content-Type
  - Client Path



#### 返回

``` JSON
{
    "rs": 1,
    "errcode": "",
    "head": {
        "errCode": "00000000",
        "errInfo": "调用成功,没有任何错误",
        "version": "2.6.1.7",
        "alert": 0
    },
    "body": {
        "externInfo": {
            "padding": ""
        },
        "attachment": [
            {
                "id": 0,
                "urlName": "http://bbs.uestc.edu.cn/data/appbyme/upload/image/201808/02/UCssWycOpnZ4.jpg"
            }
        ]
    }
}

```
