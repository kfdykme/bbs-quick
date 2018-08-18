import Api from "./Api"
import UserCache from './UserCache'


var app = null
function init(app){
  this.app = app
  UserCache.init(app)
}

function user(){
    return UserCache.user()
}

function getUserInfo(uid,success){

    var data = {

        userId:uid,
        accessToken :UserCache.token(),
        accessSecret :UserCache.secret(),
        sdkVersion : Api.sdkVersion,
        appHash :UserCache.appHash()
    }



    Api.fetch(
        Api.BASE_URL + "/app/web/index.php?r=user/userinfo",
        data
      ,success)
}

/*
 * getUserAvatarBig 获取头像大的url
 * @params <String> uid
 * return url
 */

function getUserAvatarBig(uid){
    return "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid="+uid+"&size=big"
}

/*
 * firends获取好友
 *
 */

function getFirends(uid,success){
    Api.fetch(
        Api.BASE_URL +"/app/web/index.php?r=user/userlist ",
        {

            pageSize:100,
            accessToken :UserCache.token(),
            accessSecret :UserCache.secret(),
            sdkVersion : Api.sdkVersion,
            appHash :UserCache.appHash(),
            uid:uid,
            orderBy:"dateline",
            type:"friend",
            page:1
        },
        success
    )
}

/*
 * 获取发过的帖子
 *
 */
function getMePosts(uid,page,pageSize,success){

        Api.fetch(
            Api.BASE_URL+"/app/web/index.php?r=user/topiclist",
            {
                isImageList:1,
                pageSize:pageSize,
                accessToken :UserCache.token(),
                accessSecret :UserCache.secret(),
                sdkVersion : Api.sdkVersion,
                appHash :UserCache.appHash(),
                uid:uid,
                type:"topic",
                page:page
            },
            success
        )
}

export default {
    getUserInfo
    ,getUserAvatarBig
    ,getFirends
    ,getMePosts
    ,user
    ,init
}
