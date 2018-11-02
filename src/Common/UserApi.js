import Api from "./Api"
import UserCache from './UserCache'
import nativeFetch from '@system.fetch'


var app = null
function init(app){
  this.app = app
  UserCache.init(app)
}

/* user 获取user
 *
 * 通过UserCache获取user
 *
 * return user
 */
function user(){
    return UserCache.user()
}


/* getUserInfo 获取用户基本信息
 * @params <string> uid
 * @params <function> success
 */
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

/**
 * @method getUserAvatarBig 获取头像大的url
 * @param <String> uid
 * return url
 */
function getUserAvatarBig(uid){
    return "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid="+uid+"&size=big"
}

/*
 * firends获取好友
 *
 */
function getFirends(uid,success,page){
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
            page:page
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

/**
 * getUserReplyPost 获取回复过的帖子
 *
 * @param uid <string>
 * @param page <int>
 * @param pageSize <int>
 * @param success <function>
 */
function getUserReplyPost(uid, page,pageSize,success){
    Api.fetch(
        Api.BASE_URL +"/app/web/index.php?r=user/topiclist",
        {
            pageSize:pageSize,
            accessToken :UserCache.token(),
            accessSecret :UserCache.secret(),
            sdkVersion : Api.sdkVersion,
            appHash :UserCache.appHash(),
            uid:uid,
            type:"reply",
            page:page
        },
        success
    )
}


/**
 * getUserFavoritePost 获取回复过的帖子
 *
 * @param uid <string>
 * @param page <int>
 * @param pageSize <int>
 * @param success <function>
 */
function getUserFavoritePost(uid, page,pageSize,success){
    Api.fetch(
        Api.BASE_URL +"/app/web/index.php?r=user/topiclist",
        {
            pageSize:pageSize,
            accessToken :UserCache.token(),
            accessSecret :UserCache.secret(),
            sdkVersion : Api.sdkVersion,
            appHash :UserCache.appHash(),
            uid:uid,
            type:"favorite",
            page:page
        },
        success
    )
}


/**
 * @method deleteFriend() 删除好友,忽略好友关系
 *
 * @param uid
 * @param success 成功回调,参数为data
 */
function deleteFriend(uid,success){
    nativeFetch.fetch({
        url :Api.BASE_URL+"/app/web/index.php?r=user/useradminview&"+"sdkVersion="+Api.sdkVersion+"&accessToken="+UserCache.token()+"&accessSecret="+UserCache.secret()+"&apphash="+UserCache.appHash()+"&uid="+ uid+"&act=ignore&type=",
        method :"POST",
        data :{
            modsubmit:"确定"
        },
        success :function(data){

            console.info(data.data)
            var re = {
                rs :1,
                errcode :"success ignore friends"
            }
            success(re)
        },
        fail : function(data,code){
          Api.onFetchFail(data,code)
        }
    }
    )
}

/**
 * addFriend() 删除好友,忽略好友关系
 *
 * @param uid
 * @param success 成功回调,参数为data
 */
function addFriend(uid,success){
    nativeFetch.fetch({
        url :Api.BASE_URL+"/app/web/index.php?r=user/useradminview&"+"sdkVersion="+Api.sdkVersion+"&accessToken="+UserCache.token()+"&accessSecret="+UserCache.secret()+"&apphash="+UserCache.appHash()+"&uid="+ uid+"&act=add&type=",
        method :"POST",
        data :{
            modsubmit:"确定"
        },
        success :function(data){

            console.info(data.data)
            var re = {
                rs :1,
                errcode :"好友请求已发送，请等待对方验证"
            }
            success(re)
        },
        fail : function(data,code){
          Api.onFetchFail(data,code)
        }
    }
    )
}



/**
 * getFollows 或取关注的人
 * @param uid
 * @param page
 * @param success
 */
function getFollows(uid,page,onGetSuccess){
    const pageSize = 200

    Api.fetch(
        Api.BASE_URL+"/app/web/index.php?r=user/userlist",
        {
            accessToken :UserCache.token(),
            accessSecret :UserCache.secret(),
            sdkVersion : Api.sdkVersion,
            appHash :UserCache.appHash(),
            uid:uid,
            orderBy:'dateline',
            page:page,
            pageSize:pageSize,
            type:'follow'
        },
        onGetSuccess
    )
}


/**
 * getFolloweds 获取粉丝
 * @param uid
 * @param page
 * @param success
 */
function getFolloweds(uid,page,onGetSuccess){
    const pageSize = 200

    Api.fetch(
        Api.BASE_URL+"/app/web/index.php?r=user/userlist",
        {
            accessToken :UserCache.token(),
            accessSecret :UserCache.secret(),
            sdkVersion : Api.sdkVersion,
            appHash :UserCache.appHash(),
            uid:uid,
            orderBy:'dateline',
            page:page,
            pageSize:pageSize,
            type:'followed'
        },
        onGetSuccess
    )
}

/**
 * follow 关注
 * @param uid
 * @param onFollowSuccess
 */
function follow(uid,onFollowSuccess){
    Api.fetch(
        Api.BASE_URL +"/app/web/index.php?r=user/useradmin",
        {
            accessToken :UserCache.token(),
            accessSecret :UserCache.secret(),
            sdkVersion : Api.sdkVersion,
            appHash :UserCache.appHash(),
            uid:uid,
            type:'follow'
        },
        onFollowSuccess
    )
}

/**
 * follow 关注
 * @param uid
 * @param onUnFollowSuccess
 */
function unFollow(uid,onUnFollowSuccess) {
    Api.fetch(
        Api.BASE_URL +"/app/web/index.php?r=user/useradmin",
        {
            accessToken :UserCache.token(),
            accessSecret :UserCache.secret(),
            sdkVersion : Api.sdkVersion,
            appHash :UserCache.appHash(),
            uid:uid,
            type:'unfollow'
        },
        onUnFollowSuccess
    )
}


/**
 * @method search
 * @param keyword
 */
function search(keyword,page,onSearchSuccess,andError){
    Api.fetch(
        Api.BASE_URL +"/app/web/index.php?r=user/searchuser",
        {
            accessToken :UserCache.token(),
            accessSecret :UserCache.secret(),
            sdkVersion : Api.sdkVersion,
            appHash :UserCache.appHash(),
            searchid:0,
            pageSize :20,
            keyword:keyword,
            page : page
        },
        onSearchSuccess,
        andError
    )
}
export default {
     addFriend
    ,deleteFriend
    ,follow
    ,unFollow
    ,getUserInfo
    ,getUserAvatarBig
    ,getUserReplyPost
    ,getUserFavoritePost
    ,getFirends
    ,getFollows
    ,getFolloweds
    ,getMePosts
    ,user
    ,search
    ,init
}
