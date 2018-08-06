import router from '@system.router'
import fetch from '@system.fetch'
import file from '@system.file'
import request from '@system.request'
export default {
  protected: {
      imageUrl :"internal://files/home.jpg"
  },
  onInit(){

      //获取图片并保存
      fetch.fetch({
          url : "http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1",
          success :function(data){
              const re = JSON.parse(data.data)
              this.imageUrl = "http://www.bing.com"+re.images[0].url

              request.download({
                url:   this.imageUrl,
                success: function (d) {
                  request.onDownloadComplete({
                    token: d.token,
                    success: function (data) {
                      file.move({
                        srcUri: data.uri,
                        dstUri: 'internal://files/home.jpg',
                        success: function (uri) {
                          console.info(`move success: ${uri}`)
                        },
                        fail: function (data, code) {
                          console.info(`handling fail, code = ${code}`)
                        }
                      })
                    },
                    fail: function (data, code) {
                      console.info(`handling fail, code = ${code}`)
                    }
                  })
                },
                fail: function (data, code) {
                  console.info(`handling fail, code = ${code}`)
                }
              })
          }.bind(this)
      })


      setTimeout(function(){
          router.replace({
              uri : "Start/Login",
          })

      },2000)
  }
}
