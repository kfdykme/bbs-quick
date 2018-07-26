
import crypto from "md5"
import storage from "@system.storage"
const KEY_APP_BY_ME = "appbyme_key"

 

function appHash(){

  let time = new Date().getTime().toString();

  let authkey = KEY_APP_BY_ME

  let authString = time.substring(0,5) + authkey

  let hashkey = crypto(authString)

  let appHashValue = hashkey.substring(8,16);

  return appHashValue
};



function token(){
  storage.get({
    key:"user",
    success : function(data){
      const user = JSON.parse(data)
      return user.token
    },
    fail : function(data,code){
      console.log(code);
    }
  })

};

function secret(){
  storage.get({
    key:"user",
    success : function(data){
      const user = JSON.parse(data)
      return user.secret
    },
    fail : function(data,code){
      console.log(code);
    }
  })

};

function user(suc,fai){
  storage.get({
    key:"user",
    success : function(data){
      console.log(data);
    },
    fail : function(data,code){
      console.log(code);
    }
  })



}

function updateUser(u){
  storage.set({
    key:"user",
    value :JSON.stringify(u),
    success : function(data){
        user = JSON.parse(data)
    },
    fail : function(data,code){
      console.log(code);
    }
  })
  user = u
}

export default {
  appHash,
  token,
  secret,
  user,
  updateUser
}
