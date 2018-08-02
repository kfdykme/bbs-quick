# BBS

this is an quickapp of UESTC-BBS



## Api

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
