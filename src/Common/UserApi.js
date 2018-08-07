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

    console.log(JSON.stringify(data));

    Api.fetch(
        Api.BASE_URL + "/app/web/index.php?r=user/userinfo",
        data
      ,success)
}


export default {
    getUserInfo
    ,user
    ,init
}
