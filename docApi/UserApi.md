# 用户相关api

## 更新用户信息

### 更新用户个性签名

- status [DONE]

#### url 
- POST
- https://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=user/updateuserinfo&type=info

#### Form

sign	新筛
accessToken	3a92218375094ad61d1afb42d3627
accessSecret	2870f155b160fa40addd801dd71ab
sdkVersion	2.4.2
apphash	76517476

#### res

``` json
{
	"rs": 1,
	"errcode": "\u4e2a\u4eba\u8d44\u6599\u4fdd\u5b58\u6210\u529f ",
	"head": {
		"errCode": "00000000",
		"errInfo": "\u4e2a\u4eba\u8d44\u6599\u4fdd\u5b58\u6210\u529f ",
		"version": "2.6.1.7",
		"alert": 1
	},
	"body": {
		"externInfo": {
			"padding": ""
		}
	}
}
```

### 更新用户头像

- status [TODO]

## 删除好友
### url
https://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=user/useradminview&sdkVersion=2.6.1.7&accessToken=3a92218375094ad61d1afb42d3627&accessSecret=2870f155b160fa40addd801dd71ab&apphash=&uid=197671&act=ignore&type=
### query
r	user/useradminview
sdkVersion	2.6.1.7
accessToken	3a92218375094ad61d1afb42d3627
accessSecret	2870f155b160fa40addd801dd71ab
apphash
uid	197671
act	ignore
type

### res
``` javascript
<script>
<script>
```
## 关注

### url
https://bbs.uestc.edu.cn//mobcent/app/web/index.php?r=user/useradmin

### form  
accessToken	3a92218375094ad61d1afb42d3627
accessSecret	2870f155b160fa40addd801dd71ab
sdkVersion	2.5.0.0
imei	868450030049702
apphash	e2bdcd23
uid	197671
type	follow

### res json
``` json
{
	"rs": 1,
	"errcode": "\u6210\u529f\u5173\u6ce8",
	"head": {
		"errCode": "02000023",
		"errInfo": "\u6210\u529f\u5173\u6ce8",
		"version": "2.6.1.7",
		"alert": 1
	},
	"body": {
		"externInfo": {
			"padding": ""
		}
	}
}
```

## 取消关注


### url
https://bbs.uestc.edu.cn//mobcent/app/web/index.php?r=user/useradmin

### form  
accessToken	3a92218375094ad61d1afb42d3627
accessSecret	2870f155b160fa40addd801dd71ab
sdkVersion	2.5.0.0
imei	868450030049702
apphash	e2bdcd23
uid	197671
type  unfollow

### res
``` json
{
	"rs": 1,
	"errcode": "\u53d6\u6d88\u6210\u529f",
	"head": {
		"errCode": "02000024",
		"errInfo": "\u53d6\u6d88\u6210\u529f",
		"version": "2.6.1.7",
		"alert": 1
	},
	"body": {
		"externInfo": {
			"padding": ""
		}
	}
}
```

## 获取参与帖子
### url
https://bbs.uestc.edu.cn//mobcent/app/web/index.php?r=user/topiclist

### form

pageSize	20
accessToken	3a92218375094ad61d1afb42d3627
accessSecret	2870f155b160fa40addd801dd71ab
sdkVersion	2.5.0.0
apphash	e2bdcd23
uid	197637
type	reply
page	2  

### res json

``` json
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
            "pic_path": "",
            "board_id": 258,
            "board_name": "前端之美",
            "topic_id": 1729835,
            "type_id": 742,
            "sort_id": 0,
            "title": "[HTML5]萝莉控哦哦哦，那么",
            "subject": "哦哦哦哦哦哦哦你们⊙∀⊙！哦⊙∀⊙！魔你你们你们是不是哦",
            "user_id": 199446,
            "last_reply_date": "1534246211000",
            "user_nick_name": "kfdykme",
            "hits": 362,
            "replies": 4,
            "top": 0,
            "status": 32800,
            "essence": 0,
            "hot": 0,
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=199446&size=middle",
            "special": 0
        },
        {
            "pic_path": "",
            "board_id": 326,
            "board_name": "新生专区",
            "topic_id": 1726778,
            "type_id": 0,
            "sort_id": 0,
            "title": "清水河畔2018新生福利！！",
            "subject": "可遇不可求的事：    后海有树的院子，     夏代有",
            "user_id": 197671,
            "last_reply_date": "1531644484000",
            "user_nick_name": "嘉木",
            "hits": 5852,
            "replies": 75,
            "top": 0,
            "status": 32,
            "essence": 0,
            "hot": 1,
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=197671&size=middle",
            "special": 0
        },
        {
            "pic_path": "",
            "board_id": 70,
            "board_name": "程序员",
            "topic_id": 1726488,
            "type_id": 1283,
            "sort_id": 0,
            "title": "[Python]爬虫系列文章终于写完了",
            "subject": "前文见：  今天从早上开始写，写了一天，总算把后面两篇写",
            "user_id": 200009,
            "last_reply_date": "1531400904000",
            "user_nick_name": "ACool",
            "hits": 1255,
            "replies": 45,
            "top": 0,
            "status": 32,
            "essence": 0,
            "hot": 0,
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=200009&size=middle",
            "special": 0
        },
        {
            "pic_path": "",
            "board_id": 326,
            "board_name": "新生专区",
            "topic_id": 1722345,
            "type_id": 0,
            "sort_id": 0,
            "title": "清水河校区接驳地铁公交专线开行",
            "subject": "感谢大家对试运行初期种种问题的容忍，我们将争取不断完善。",
            "user_id": 158868,
            "last_reply_date": "1529413744000",
            "user_nick_name": "xyn0",
            "hits": 24392,
            "replies": 297,
            "top": 0,
            "status": 256,
            "essence": 0,
            "hot": 1,
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=158868&size=middle",
            "special": 0
        },
        {
            "pic_path": "",
            "board_id": 309,
            "board_name": "成电锐评",
            "topic_id": 1722672,
            "type_id": 75,
            "sort_id": 0,
            "title": "[时事评论]以一人之力碾压整个官僚集团",
            "subject": "历史上做到这点的就三人，嬴政、朱元璋、毛泽东。官僚被碾压",
            "user_id": 212412,
            "last_reply_date": "1529546120000",
            "user_nick_name": "大明王朝吕芳",
            "hits": 960,
            "replies": 18,
            "top": 0,
            "status": 32,
            "essence": 0,
            "hot": 0,
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=212412&size=middle",
            "special": 0
        },
        {
            "pic_path": "",
            "board_id": 70,
            "board_name": "程序员",
            "topic_id": 1720437,
            "type_id": 135,
            "sort_id": 0,
            "title": "[Other]【操作系统】Signal 就是一个异步回调？",
            "subject": "野路子程序员，工作之余学习操作系统提高下码技。  再翻 ",
            "user_id": 186702,
            "last_reply_date": "1528554303000",
            "user_nick_name": "SeanChense",
            "hits": 158,
            "replies": 12,
            "top": 0,
            "status": 32,
            "essence": 0,
            "hot": 0,
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=186702&size=middle",
            "special": 0
        },
        {
            "pic_path": "",
            "board_id": 99,
            "board_name": "Unix/Linux",
            "topic_id": 1712936,
            "type_id": 170,
            "sort_id": 0,
            "title": "[桌面/中文/多媒体]悔不该升级啊",
            "subject": "前几天看到ubuntu 18.04的测试版早就发布了，手",
            "user_id": 214004,
            "last_reply_date": "1524547975000",
            "user_nick_name": "皮、剑",
            "hits": 299,
            "replies": 4,
            "top": 0,
            "status": 32,
            "essence": 0,
            "hot": 0,
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=214004&size=middle",
            "special": 0
        },
        {
            "pic_path": "",
            "board_id": 46,
            "board_name": "站务综合",
            "topic_id": 1720034,
            "type_id": 8,
            "sort_id": 0,
            "title": "[公告]端午节抢楼领粽子预热",
            "subject": "参考往年的经验，河畔这次为广大水民准备了70个散装粽子，",
            "user_id": 197671,
            "last_reply_date": "1528373129000",
            "user_nick_name": "嘉木",
            "hits": 1086,
            "replies": 73,
            "top": 0,
            "status": 32,
            "essence": 0,
            "hot": 0,
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=197671&size=middle",
            "special": 0
        },
        {
            "pic_path": "",
            "board_id": 236,
            "board_name": "校园热点",
            "topic_id": 1719772,
            "type_id": 0,
            "sort_id": 0,
            "title": "情况说明",
            "subject": "情况说明           2018年6月5日凌晨，我",
            "user_id": 215359,
            "last_reply_date": "1528279606000",
            "user_nick_name": "研究生工作部",
            "hits": 30015,
            "replies": 846,
            "top": 0,
            "status": 0,
            "essence": 0,
            "hot": 0,
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=215359&size=middle",
            "special": 0
        },
        {
            "pic_path": "",
            "board_id": 25,
            "board_name": "水手之家",
            "topic_id": 1719109,
            "type_id": 0,
            "sort_id": 0,
            "title": "【注意】图书馆厕所有偷拍",
            "subject": "直接上图吧……",
            "user_id": 206495,
            "last_reply_date": "1528003185000",
            "user_nick_name": "Danielone",
            "hits": 1016,
            "replies": 26,
            "top": 0,
            "status": 32800,
            "essence": 0,
            "hot": 0,
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=206495&size=middle",
            "special": 0
        },
        {
            "pic_path": "",
            "board_id": 25,
            "board_name": "水手之家",
            "topic_id": 1711153,
            "type_id": 320,
            "sort_id": 0,
            "title": "[原创]大家好，我是接任畔花的新任站长",
            "subject": "接任以后，畔花会协助我管理两个月，我会尽自己最大的努力来",
            "user_id": 197671,
            "last_reply_date": "1523546893000",
            "user_nick_name": "嘉木",
            "hits": 1821,
            "replies": 120,
            "top": 0,
            "status": 32,
            "essence": 0,
            "hot": 0,
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=197671&size=middle",
            "special": 0
        },
        {
            "pic_path": "",
            "board_id": 225,
            "board_name": "交通出行",
            "topic_id": 1700553,
            "type_id": 1270,
            "sort_id": 0,
            "title": "[公交地铁]20180105版清水河校区常用路线指南更新",
            "subject": "新版本：          在放假回家之际，我们结合地铁",
            "user_id": 158868,
            "last_reply_date": "1515146894000",
            "user_nick_name": "xyn0",
            "hits": 787,
            "replies": 5,
            "top": 0,
            "status": 32,
            "essence": 0,
            "hot": 1,
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=158868&size=middle",
            "special": 0
        },
        {
            "pic_path": "",
            "board_id": 25,
            "board_name": "水手之家",
            "topic_id": 1704307,
            "type_id": 315,
            "sort_id": 0,
            "title": "[灌水]微博那人要给四川信访局写信了",
            "subject": "咋们是不是也要写信问下省里的经费配套. 哈哈哈",
            "user_id": 210853,
            "last_reply_date": "1518946680000",
            "user_nick_name": "237176253",
            "hits": 750,
            "replies": 15,
            "top": 0,
            "status": 32800,
            "essence": 0,
            "hot": 0,
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=210853&size=middle",
            "special": 0
        },
        {
            "pic_path": "",
            "board_id": 70,
            "board_name": "程序员",
            "topic_id": 1672268,
            "type_id": 131,
            "sort_id": 0,
            "title": "[PHP]我所理解的PHP",
            "subject": "自从去年开始工作以后就被PHP刷屏了，各大厂争先进行PH",
            "user_id": 57912,
            "last_reply_date": "1498549019000",
            "user_nick_name": "gouchaoer",
            "hits": 293,
            "replies": 18,
            "top": 0,
            "status": 32,
            "essence": 0,
            "hot": 0,
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=57912&size=middle",
            "special": 0
        },
        {
            "pic_path": "",
            "board_id": 0,
            "board_name": "",
            "topic_id": 1690976,
            "type_id": 0,
            "sort_id": 0,
            "title": "",
            "subject": "清河畔今年十岁了！在这十年里，河畔陪伴着大家走过风风雨雨",
            "user_id": 0,
            "last_reply_date": "000",
            "user_nick_name": "",
            "hits": 0,
            "replies": 0,
            "top": 0,
            "status": 0,
            "essence": 0,
            "hot": 0,
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=0&size=middle",
            "special": 0
        },
        {
            "pic_path": "",
            "board_id": 25,
            "board_name": "水手之家",
            "topic_id": 1689544,
            "type_id": 315,
            "sort_id": 0,
            "title": "[灌水]希望新注册的同学多水河畔",
            "subject": "希望新注册的同学们 多水河畔、多多关注哦        ",
            "user_id": 178888,
            "last_reply_date": "1509956255000",
            "user_nick_name": "Evilkjoker",
            "hits": 297,
            "replies": 44,
            "top": 0,
            "status": 32,
            "essence": 0,
            "hot": 0,
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=178888&size=middle",
            "special": 0
        },
        {
            "pic_path": "",
            "board_id": 174,
            "board_name": "就业创业",
            "topic_id": 1687209,
            "type_id": 235,
            "sort_id": 0,
            "title": "[求助讨论]offer求助 绵阳九院和oppo选哪个？",
            "subject": "最近一直纠结选哪个，之前让朋友帮忙发过求助帖，但是说的没",
            "user_id": 210820,
            "last_reply_date": "1507816937000",
            "user_nick_name": "点击领取",
            "hits": 506,
            "replies": 15,
            "top": 0,
            "status": 32,
            "essence": 0,
            "hot": 0,
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=210820&size=middle",
            "special": 0
        },
        {
            "pic_path": "",
            "board_id": 326,
            "board_name": "新生专区",
            "topic_id": 1687218,
            "type_id": 0,
            "sort_id": 0,
            "title": "有没多的中性笔笔芯，坐标立人楼A",
            "subject": "发现带了只没墨的笔，跑回去或者去买有点远，等室友还得一个",
            "user_id": 206919,
            "last_reply_date": "1507856101000",
            "user_nick_name": "小寒童鞋",
            "hits": 793,
            "replies": 3,
            "top": 0,
            "status": 0,
            "essence": 0,
            "hot": 0,
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=206919&size=middle",
            "special": 0
        },
        {
            "pic_path": "",
            "board_id": 225,
            "board_name": "交通出行",
            "topic_id": 1680936,
            "type_id": 1270,
            "sort_id": 0,
            "title": "[公交地铁]离沙河最近的地铁站是啥呀？",
            "subject": "离沙河最近的地铁站是啥呀？",
            "user_id": 197637,
            "last_reply_date": "1504058187000",
            "user_nick_name": ".exe",
            "hits": 82,
            "replies": 3,
            "top": 0,
            "status": 32800,
            "essence": 0,
            "hot": 0,
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=197637&size=middle",
            "special": 0
        },
        {
            "pic_path": "",
            "board_id": 326,
            "board_name": "新生专区",
            "topic_id": 1676947,
            "type_id": 0,
            "sort_id": 0,
            "title": "星辰工作室2017年招新开始啦!!!",
            "subject": "\"可遇不可求的事 后海有树的院子 夏代有工的玉",
            "user_id": 178888,
            "last_reply_date": "1501678111000",
            "user_nick_name": "Evilkjoker",
            "hits": 9230,
            "replies": 92,
            "top": 0,
            "status": 32,
            "essence": 0,
            "hot": 1,
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=178888&size=middle",
            "special": 0
        }
    ],
    "page": 1,
    "has_next": 1,
    "total_num": 21
}

```
## 获取关注的人
### url
https://bbs.uestc.edu.cn//mobcent/app/web/index.php?r=user/userlist
### form
pageSize	20
accessToken	3a92218375094ad61d1afb42d3627
accessSecret	2870f155b160fa40addd801dd71ab
sdkVersion	2.5.0.0
apphash	e2bdcd23
uid	197637
orderBy	dateline
type	follow
page	1

### json
``` json
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
            "is_friend": 1,
            "isFriend": 0,
            "isFollow": 1,
            "uid": 186364,
            "name": "IAM1",
            "status": 0,
            "is_black": 0,
            "gender": 1,
            "icon": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=186364&size=middle",
            "level": 4,
            "userTitle": "鳙鱼 (Lv.6)",
            "verify": [

            ],
            "lastLogin": "1535549241000",
            "dateline": "1535549241000",
            "signature": "",
            "credits": 1223
        }
    ],
    "page": 1,
    "has_next": 0,
    "total_num": 1
}
```

## 或取粉丝

### url

### form

### json



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
    "icon": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=199446&size=middle",
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
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=199446&size=middle",
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
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=199446&size=middle",
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
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=199446&size=middle",
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
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=199446&size=middle",
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
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=199446&size=middle",
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
            "userAvatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=199446&size=middle",
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
            "icon": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=178888&size=middle",
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
            "icon": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=197674&size=middle",
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

### 关注

POST https://bbs.uestc.edu.cn//mobcent/app/web/index.php?r=user/useradmin

accessToken	3a92218375094ad61d1afb42d3627
accessSecret	2870f155b160fa40addd801dd71ab
sdkVersion	2.5.0.0
apphash	56e11469
uid	197637
type	follow

### 取消关注

POST https://bbs.uestc.edu.cn//mobcent/app/web/index.php?r=user/useradmin

accessToken	3a92218375094ad61d1afb42d3627
accessSecret	2870f155b160fa40addd801dd71ab
sdkVersion	2.5.0.0
apphash	56e11469
uid	197637
type	unfollow




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
                "icon": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=197671&size=middle",
                "actions": [
                    {
                        "redirect": "https://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=user/useradminview&sdkV…627&accessSecret=2870f155b160fa40addd801dd71ab&apphash=&act=add&uid=197671",
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
                "icon": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=0&size=middle",
                "user_name": "系统",
                "user_id": "0",
                "mod": "admin",
                "note": "11月25日线下活动通告！11月25日下午2点的开幕式改在活动中心1楼咖啡厅进行！！！到时候有大蛋糕吃！！！大家先过来看看，吃吃，再听听游戏的具体规则！我们不见不散！",
                "is_read": "0"
            },
            {
                "replied_date": "1511449193000",
                "type": "system",
                "icon": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=0&size=middle",
                "user_name": "系统",
                "user_id": "0",
                "mod": "admin",
                "note": "十年同舟共济，一路河畔有你清河畔今年十岁了！在这十年里，河畔陪伴着大家走过风风雨雨、河畔分享着大家的喜怒哀乐、河畔陪伴着大家一起成长！戳戳这里：https://bbs.uestc.edu.cn/tenth_anniversary/index.php，看看自己与河畔有着怎样的故事~送祝福给河畔有神秘加成哦~",
                "is_read": "0"
            },
            {
                "replied_date": "1510112330000",
                "mod": "firend",
                "note": "Fore 请求加您为好友  ",
                "user_name": "Fore",
                "user_id": 205769,
                "icon": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=205769&size=middle",
                "actions": [
                    {
                        "redirect": "https://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=user/useradminview&sdkV…627&accessSecret=2870f155b160fa40addd801dd71ab&apphash=&act=add&uid=205769",
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
                "icon": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=194933&size=middle",
                "actions": [
                    {
                        "redirect": "https://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=user/useradminview&sdkV…627&accessSecret=2870f155b160fa40addd801dd71ab&apphash=&act=add&uid=194933",
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
                "icon": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=0&size=middle",
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
      "toUserAvatar":"https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=197674&size=middle",
      "toUserName":"sgh0109",
      "toUserIsBlack":0,"isNew":0},
      {"plid":4001543,
      "pmid":4001543,
      "lastUserId":194933,
      "lastUserName":"Вīń",
      "lastSummary":"水水",
      "lastDateline":"1503295050000",
      "toUserId":194933,
      "toUserAvatar":"https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=194933&size=middle",
      "toUserName":"Вīń",
      "toUserIsBlack":0,
      "isNew":0}],
    "hasNext":0,
    "count":2}}
```

### 获取私信消息

url : https://bbs.uestc.edu.cn//mobcent/app/web/index.php?r=message/pmlist

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
            "avatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=199446&size=small"
        },
        "pmList": [
            {
                "fromUid": 197674,
                "name": "sgh0109",
                "avatar": "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=197674&size=small",
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

url : https://bbs.uestc.edu.cn//mobcent/app/web/index.php?r=message/pmadmin

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

url ： https://bbs.uestc.edu.cn//mobcent/app/web/index.php?r=forum/sendattachmentex&packageName=com.appbyme.app118563&sortId=0&forumType=7&fid=0&accessToken=3a92218375094ad61d1afb42d3627&module=pm&appName=%E6%B8%85%E6%B0%B4%E6%B2%B3%E7%95%94&accessSecret=2870f155b160fa40addd801dd71ab&sdkVersion=2.5.0.0&imei=868450030049702&apphash=c65cd93e&albumId=0&type=image&forumKey=CBQJazn9Wws8Ivhr6U&platType=1&imsi=460018175289254


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
                "urlName": "https://bbs.uestc.edu.cn/data/appbyme/upload/image/201808/02/UCssWycOpnZ4.jpg"
            }
        ]
    }
}

```
