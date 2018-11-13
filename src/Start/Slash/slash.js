import router from '@system.router'
import fetch from '@system.fetch'
import file from '@system.file'
import request from '@system.request'
import prompt from '@system.prompt'
import storage from '@system.storage'
import UserCache from '../../Common/UserCache'

export default {
  protected: {
      imageUrl :"internal://files/home.jpg",
      START_TIME :2000,
      note:""
  }
  ,onShow(){
      $umeng_stat.resume(this)
  }
  ,onHide() {
      $umeng_stat.pause(this)
  }
  ,async onInit(){



    var startTime = new Date().getTime()
    await storage.get({
      key: "flash-note"
    }).then((data)=>{
      this.note = data.data
    })
    fetch.fetch({
      url : "http://bbs.uestc.edu.cn/forum.php?mobile=no",
      success:(re)=>{
        const reg = /pointer.*\r?\n?<\/span/g
        try{

          console.info(re.data)
          var res = re.data.match(reg)
          console.info(res)
          res = res[0]

          res = res.substring(10,res.length-6)
          console.info(res)
          this.note = res
          storage.set({
            key: "flash-note",
            value:res,
            success:(re)=>{
              console.info(re)
            }
          })
        } catch(e){
          console.error(e);
        }
      }
    })
    //读取登陆缓存
    await storage.get({
        key : "user"
    }).then(data =>{
        while(new Date().getTime() -startTime < 3000);

        if(data){
            const user = JSON.parse(data.data)

                if(user != null && user.rs != 0){

                     this.$app.initUser(user)

                     UserCache.init(this.$app)
                     router.replace({
                        uri: "Main"
                     })

                } else {

                    router.replace({
                        uri : "Start/Login",
                    })
                }
        } else {

            router.replace({
                uri : "Start/Login",
            })
        }
    }).catch(data =>{
        while(new Date().getTime() -startTime < 3000);

        router.replace({
            uri : "Start/Login",
        })
    })



  }
}
