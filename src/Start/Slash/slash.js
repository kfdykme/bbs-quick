import router from '@system.router'
import fetch from '@system.fetch'
import file from '@system.file'
import request from '@system.request'
import prompt from '@system.prompt'
import storage from '@system.storage'
import UserCache from '../../Common/UserCache'
export default {
  protected: {
      imageUrl :"internal://files/home.jpg"
  }
  ,onShow(){
      $umeng_stat.resume(this)
  }
  ,onHide() {
      $umeng_stat.pause(this)
  }
  ,async onInit(){

      var startTime = new Date().getTime()
    //读取登陆缓存
    await storage.get({
        key : "user"
    }).then(data =>{
        while(new Date().getTime() -startTime < 2000);

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
        while(new Date().getTime() -startTime < 2000);

        router.replace({
            uri : "Start/Login",
        })
    })



  }
}
