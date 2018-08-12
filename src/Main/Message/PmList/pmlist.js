import DateUtil from "../../../Common/DateUtil"
import media from "@system.media"
import MessageApi from "../../../Common/MessageApi"
import prompt from "@system.prompt"
import ImageUtil from "../../../Common/ImageUtil"
import router from "@system.router"

export default{
    protected:{
      re : {},
      imageToSend : "../../../Res/ic_pick_image.png",
      textToSend :""
    },
    private :{
      TAG :"PmList"
    }
    ,onInit(){
      //TODO:test
      this.re = JSON.parse(this.re)
      var msl = this.re.body.pmList[0].msgList
      MessageApi.init(this.$app)

      for(let x in msl){

          msl[x].date = DateUtil.convertTime(msl[x].time)
          msl[x].showTime = x == 0 || this.re.body.pmList[0].msgList[x].time - this.re.body.pmList[0].msgList[x-1].time >120000

      }
       // console.info(this.TAG,"on Init"+JSON.stringify(this.re))

    }
    ,onClickImage2(uri){
        ImageUtil.ViewImage(uri)
    }
    ,onClickImage(){

        var that = this
        var onPickImageSuccess = function (uri){
            MessageApi.uploadPmFile(uri,
              function(re){
                  that.imageToSend = re.body.attachment[0].urlName

                  prompt.showToast({
                    message : "点击发送以发出选中的图片"
                  })
              })
        }
        media.pickImage({
          success: function (data) {
            onPickImageSuccess(data.uri)
          }
        })
    }
    ,onChangeText(e){

        this.textToSend = e.value
    }
    ,onClickSend(){


        if(this.imageToSend != ""){

            MessageApi.send(
              this.re.body.pmList[0].fromUid, //touid
              this.re.body.pmList[0].plid, //plid
              "image",
              this.imageToSend,
              function(re){

                  this.imageToSend = ""
                  this.onSendComplete()

              }.bind(this)

            )

        } else {

              MessageApi.send(
                this.re.body.pmList[0].fromUid, //touid
                this.re.body.pmList[0].plid, //plid
                "text",
                this.textToSend,
                function(re){
                    this.textToSend  = ""
                    this.onSendComplete()
                }.bind(this)

              )
        }
    }
    ,onSendComplete(){

        prompt.showToast({
          message : "发送成功"
        })


        setTimeout(function(){
          this.refresh()
        }.bind(this),1000)

    }
    ,onClickUser(id){

                router.push({
                    uri : "Main/User",
                    params :{
                        uid :id
                    }
                })
    }
    ,refresh(){


        MessageApi.fetchPmseMissionList(
            this.re.body.pmList[0].fromUid,//fromUid
            this.re.body.pmList[0].plid,//plid
            this.re.body.pmList[0].plid,//pmid
            function(re){
                  this.re = re
                  var msl = this.re.body.pmList[0].msgList

                  for(let x in msl){

                      msl[x].date = DateUtil.convertTime(msl[x].time)
                      msl[x].showTime = x == 0 || this.re.body.pmList[0].msgList[x].time - this.re.body.pmList[0].msgList[x-1].time >120000

                  }

            }.bind(this)
        )
    }
}
