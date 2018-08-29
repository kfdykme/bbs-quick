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
    welcome : "清水河畔-注册",
    username :"",
    password : "",
    password2 : "",
    email : "",
    stuNumber:"",
    stuPassword :"",
    tvSure : "确认",
    tryingRegister : false,
    formhash:"",
    cookie:""
  },
  convsertCookie(cookie){
      cookie = ""+cookie
      var arr = cookie.split(",")
      var mC = {}
      for(var x in arr){
          var name = arr[x].split(";")[0].split("=")[0]
          var value = arr[x].split(";")[0].split("=")[1]
          if(name != null && value != null)
              mC[name] = value
      }
      console.info(JSON.stringify(mC))
      return mC
  }
  ,readCookie(){
      var s = ""
      for(var x in this.cookie){
          s+=x+"="+this.cookie[x]+";"
      }
      return s
  }
  ,onInit(){

        console.info(JSON.stringify(this.$app))

            fetch.fetch({
                url:"http://bbs.uestc.edu.cn/member.php?mod=register",
                method : "POST",
                success:function(data){
                    const regExp =  /formhash\" value=\".*\" \/><i/g
                    var formhash =  data.data.match(regExp);
                    formhash = formhash[0].substring(17)
                    formhash = formhash.substring(0,formhash.length-6)

                    this.formhash  = formhash
                    this.cookie = this.convsertCookie(data.headers['Set-Cookie'])
                }.bind(this),
                fail: function(data,code){
                  Api.onFetchFail(data,code)
                }
            })

  }
  ,doRegister(){

      if(this.tryingRegister) return


      this.tryingRegister = true
      const url = "http://bbs.uestc.edu.cn/member.php?mod=register&mobile=2&handlekey=registerform&inajax=1"
      var data = {
            regsubmit : 'yes',
            formhash : 	this.formhash,
            referer:"http://bbs.uestc.edu.cn/./",
            activationauth:"",
            agreebbrule : "",
            usr	:this.username,
            pwd	:this.password,
            pwd2	:this.password2,
            mCdCdC:this.email
      }
      data["stunumber" + this.formhash] = this.stuNumber
      data[" stupswd"+this.formhash] = this.stuPassword

      fetch.fetch({
        url : url,
        method : "POST",
        data : data,
        header : {
            "Cookie" : this.readCookie()
        },
        success :function(data){
            //NOTE:处理script返回,原先只是返回了js的alert加上重定位,现在得暂时自己来

            const sucRegExp = /succeedmessage/
            var suc = data.data.match(sucRegExp)
            if(suc!=null && suc.length != 0){
                prompt.showToast({
                    message : "注册成功"
                })
                router.back()
                return
            }

            const regExp =  /errorhandle_registerform\(\'.*\'/g
            var errcode =  data.data.match(regExp);
            if(errcode == null || errcode.length ==  0){
                Api.onSuccessError("error")
                return
            }
            errcode = errcode[0].substring(26)
            errcode = errcode.substring(0,errcode.length-1)

            prompt.showToast({
                message:errcode
            })

            this.tryingRegister = false

        }.bind(this),
        fail : function(data,code){
          Api.onFetchFail(data,code)
        }
      })
  }
  ,onTextChange(type,e){
      console.info("\n"+type+" \t"+e.value)
      if(type == 'username'){

            this.username = e.value
      }
      if(type == 'password'){

            this.password = e.value
      }
      if(type == 'password2'){

            this.password2 = e.value
      }
      if(type == 'email'){

            this.email = e.value
      }
      if(type == 'stuNumber'){

            this.stuNumber = e.value
      }
      if(type == 'stuPassword'){

            this.stuPassword = e.value
      }

  }
  ,onUserNameChange(e){
    this.username = e.value
  },
  onPasswordChange(e){

    this.password = e.value
  }
}
