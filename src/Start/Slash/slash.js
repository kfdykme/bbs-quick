import router from '@system.router'
import fetch from '@system.fetch'
import file from '@system.file'
import request from '@system.request'
import prompt from '@system.prompt'
export default {
  protected: {
      imageUrl :"internal://files/home.jpg"
  },
  onInit(){

      /// NOTE: 弃用
      //获取图片并保存
      /*
      fetch.fetch({
          url : "http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1",
          success :function(data){
              const re = JSON.parse(data.data)

              this.imageUrl = "http://www.bing.com"+re.images[0].url


          }.bind(this)
      })
      */

      setTimeout(function(){
          router.replace({
              uri : "Start/Login",
          })

      },1000)
  }
}
