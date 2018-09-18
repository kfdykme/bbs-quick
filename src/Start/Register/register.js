import router from '@system.router'
import fetch from  '@system.fetch'
import Api from '../../Common/Api'
import prompt from "@system.prompt"


export default {

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
    emailhash:"",
    cookie:""
  }
  /**
   * @method convsertCookie
   * @param {} cookie
   * @return {object}
   * @desc 将cookie字符串转化成一个cookie对象
   */
  ,convsertCookie(cookie){
      cookie = ""+cookie
      var arr = cookie.split(",")
      var mC = {}
      for(var x in arr){
          var name = arr[x].split(";")[0].split("=")[0]
          var value = arr[x].split(";")[0].split("=")[1]
          if(name != null && value != null)
              mC[name] = value
      }

      return mC
  }
  /**
   * @method readCookie
   * @return {string}
   * @desc
   */
  ,readCookie(){
      var s = ""
      for(var x in this.cookie){
          s+=x+"="+this.cookie[x]+";"
      }
      return s
  }
  ,onInit(){


            //NOTE : 用正则表达式获取注册表格的哈希值,以及设置cookie,
            fetch.fetch({
                url:"http://bbs.uestc.edu.cn/member.php?mod=register",
                method : "POST",
                success:function(data){
                    const regExp =  /formhash\" value=\".*\" \/><i/g
                    var formhash =  data.data.match(regExp);
                    formhash = formhash[0].substring(17)
                    formhash = formhash.substring(0,formhash.length-6)

                    const emailExp = /name=\".*\" placeholder=\"邮箱\"/g

                    var emailHash = data.data.match(emailExp)

                    emailHash = emailHash[0].substring(6)
                    emailHash = emailHash.substring(0,emailHash.length-18)



                    this.formhash  = formhash
                    this.emailhash = emailHash
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


      //<label for="XrgAcN">Email:</label></th>
      //NOTE:POST数据
      var data = {
            regsubmit : 'yes',
            formhash : 	this.formhash,
            referer:"http://bbs.uestc.edu.cn/./",
            activationauth:"",
            agreebbrule : "",
            usr	:this.username,
            pwd	:this.password,
            pwd2	:this.password2
      }
      data["stunumber" + this.formhash] = this.stuNumber
      data["stupswd"+this.formhash] = this.stuPassword
      data[this.emailhash] = this.email




      //NOTE:注册请求,加上了cookie
      fetch.fetch({
        url : url,
        method : "POST",
        data : data,
        header : {
            "Cookie" : this.readCookie()
        },
        success :function(data){

            //NOTE:尝试注册结束
            this.tryingRegister = false
            //NOTE:处理script返回,原先只是返回了js的alert加上重定位,现在得暂时自己来

            //NOTE:用正则抓取是否注册成功
            const sucRegExp = /succeedmessage/
            var suc = data.data.match(sucRegExp)
            if(suc!=null && suc.length != 0){
                prompt.showToast({
                    message : "注册成功"
                })
                router.back()
                return
            }


            //NOTE:用正则抓取是否注册失败
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


        }.bind(this),
        fail : function(data,code){
          Api.onFetchFail(data,code)
        }
      })
  }
  ,onTextChange(type,e){


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

}
