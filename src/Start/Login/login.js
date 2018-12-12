import router from '@system.router'
import fetch from  '@system.fetch'
import storage from '@system.storage'
import UserCache from '../../Common/UserCache'
import Api from '../../Common/Api'
import prompt from "@system.prompt"


export default {

  protected: {
    welcome : "清水河畔",
    username :"",
    password : "",
    register : "注册",
    login : "登陆",
    tryingLogin : false
  }
  ,onInit(){



  }
  ,doLogin () {

    if(this.tryingLogin)
      return


    var app = this.$app
    //检查表单信息


    this.tryingLogin = true
    this.login = "稍我等在加中载"



    //发送登陆请求
    fetch.fetch({
          url : Api.BASE_URL+Api.login,
          method : "POST",
          data : {
                type :"login",
                username : this.username,
                password : this.password
          },
          success: function (data) {

                const user = JSON.parse(data.data)
                if(user != null && user.rs != 0){

                   app.initUser(user)

                   UserCache.init(app)

                   router.replace({
                      uri: "Main"
                   })
                } else{
                  prompt.showToast({
                    message : user.errcode
                  })
                }

          }.bind(this),
          fail: function (data, code) {

          },
          complete : function (){
            this.login = "登录"
            this.tryingLogin = false
          }.bind(this)
        })
  }
  ,
  doRegister (e){

      router.push({
          uri: "Start/Register"
      })

  },
  onUserNameChange(e){
    this.username = e.value
  },
  onPasswordChange(e){

    this.password = e.value
  }
}
