// if (Deno) {
  import { Hash } from "https://deno.land/x/checksum@1.4.0/mod.ts";
// } else {
//   const crypto = require('md5')
// }
import storage from "@system.storage"

const KEY_APP_BY_ME = "appbyme_key"

function appHash(){

  let time = new Date().getTime().toString();

  let authkey = KEY_APP_BY_ME

  let authString = time.substring(0,5) + authkey

  let hashkey 
  if (Deno) {
    hashkey = new Hash("md5").digestString(authString).hex()
  } else {
    hashkey = crypto(authString)
  }

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
