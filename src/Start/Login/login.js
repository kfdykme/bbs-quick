import router from '@system.router'
import fetch from  '@system.fetch'
import storage from '@system.storage'
import UserCache from '../../Common/UserCache'
import Api from '../../Common/Api'
import webview from "@system.webview"
import prompt from "@system.prompt"


export default {
  // 页面级组件的数据模型，影响传入数据的覆盖机制：private内定义的属性不允许被覆盖
  protected: {
    welcome : "清水河畔",
    username :"",
    password : "",
    register : "注册",
    login : "登陆",
    tryingLogin : false
  },
  onInit(){


    var app = this.$app

       //读取登陆缓存
    storage.get({
      key : "user",
      success: function (data) {
        if(data){
          const user = JSON.parse(data)
          console.log('get userinfo oninit : ' + user.token)


          if(user != null && user.rs != 0){

           app.initUser(user)

           UserCache.init(app)

           router.replace({
              uri: "Main"
          })
        }
      }

      },
      fail: function (data, code) {
        console.log(`handling fail, code = ${code}`)
      }
    })
  },
  onShow(){

    if(UserCache.user() != null ){

      this.username = UserCache.user().userName
    }
  },
  doLogin () {

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

        console.log(`handling fail,`)
      },
      complete : function (){
        this.login = "Login"
        this.tryingLogin = false
      }.bind(this)
    })
  }
  ,
  doRegister (e){

      router.push({
          uri: "Start/Register"
      })
    // webview.loadUrl({
    //   url : Api.REGISTER_URL
    // })
  },
  onUserNameChange(e){
    this.username = e.value
  },
  onPasswordChange(e){

    this.password = e.value
  }
}
