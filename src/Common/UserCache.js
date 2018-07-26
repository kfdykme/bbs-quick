
import crypto from "md5"
import storage from "@system.storage"
const KEY_APP_BY_ME = "appbyme_key"


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
//     "isValidation": 0,
//     "token": "3a92218375094ad61d1afb42d3627",
//     "secret": "2870f155b160fa40addd801dd71ab",
//     "score": 20,
//     "uid": 199446,
//     "userName": "kfdykme",
//     "avatar": "http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=199446&size=middle",
//     "gender": 0,
//     "userTitle": "蝌蚪 (Lv.1)",
//     "repeatList": [],
//     "verify": [],
//     "creditShowList": [
//         {
//             "type": "credits",
//             "title": "积分",
//             "data": 20
//         },
//         {
//             "type": "extcredits2",
//             "title": "水滴",
//             "data": 15
//         }
//     ],
//     "mobile": "",
//     "groupid": 26
// }


function appHash(){

  let time = new Date().getTime().toString();

  let authkey = KEY_APP_BY_ME

  let authString = time.substring(0,5) + authkey

  let hashkey = crypto(authString)

  let appHashValue = hashkey.substring(8,16);

  return appHashValue
};



function token(){

    if(this.app!=null){
      return this.app.$def.cache.user.token
    }

    console.log("UserCache : return null token");
    return null

};

function secret(){
  if(this.app!=null){
    return this.app.$def.cache.user.secret
  }

  console.log("UserCache : return null secret");
    return null
};

function user(){

  if(this.app!= null){
    return this.app.$def.cache.user
  }
  console.log("UserCache : return null user");
    return null
}

function updateUser(u){
  storage.set({
    key:"user",
    value :JSON.stringify(u),
    success: function (data) {
      console.log('save userinfo success : ' + data)

    },
    fail: function (data, code) {
      console.log(`handling fail, code = ${code}`)
    }
  })
}

function getUserFromApp(app){
  return app.$def.cache.user
}

var app = null

function logout(){
  storage.delete({
  key: 'user',
  success: function (data) {
    console.log('logout success')
  },
  fail: function (data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
}


function init(app){
  this.app = app
  this.updateUser(app.$def.cache.user)
  console.log("init app successfully");
}

export default {
  appHash,
  token,
  secret,
  user,
  updateUser,
  getUserFromApp,
  init,
  logout
}
