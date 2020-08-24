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
  ,async onInit(){



    var startTime = new Date().getTime()

    await storage.get({
      key: "flash-note"
    }).then((data)=>{
      this.note = data.data
    })


    fetch.fetch({
      url : "https://bbs.uestc.edu.cn/forum.php?mobile=no",
      success:(re)=>{
        const reg = /pointer.*\r?\n?<\/span/g
        try{

          // console.info(re.data)
          var res = re.data.match(reg)
          // console.info(res)
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
    /**
     * 读取登陆缓存
     * 这里面的嵌套太多了
     *  主要就是读取storage的缓存，然后读不到会怎样，读到了解析错误会怎样，没有好多优化方法，看起来有嗲乱
     */
    await storage.get({
        key : "user"
    }).then(data =>{
        while(new Date().getTime() -startTime < 3000);

        if(data != null){
            try{

              const user = JSON.parse(data.data)

              if(user != null && user.rs != 0){

                this.$app.initUser(user)

                UserCache.init(this.$app)
                console.info("Enter Main Page because load UserCache success.")
                router.replace({
                  uri: "Main"
                })

              } else {
                console.info("Enter Login Page because UserCache is useless.")
                router.replace({
                  uri : "Start/Login",
                })
              }
            } catch (e){
              //防止Json.parse失败
              console.error(e)
              console.info("Enter Login Page because parse UserCache fail.")
              router.replace({
                uri : "Start/Login",
              })
            }
        } else {

            console.info("Enter Login Page because has not UserCache in storage.")
            router.replace({
                uri : "Start/Login",
            })
        }
    }).catch(data =>{
        while(new Date().getTime() -startTime < 3000);

        console.info("Enter Login Page because read UserCache from storage fail .")
        router.replace({
            uri : "Start/Login",
        })
    })



  }
}
