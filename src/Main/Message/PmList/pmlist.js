import DateUtil from "../../../Common/DateUtil"
import media from "@system.media"
import MessageApi from "../../../Common/MessageApi"
import prompt from "@system.prompt"
import ImageUtil from "../../../Common/ImageUtil"
import router from "@system.router"
import MessageModel from '../MessageModel'

export default{
    protected:{
      re : null,
      imageToSend : "../../../Res/ic_pick_image.png",
      baseImageToSend :"../../../Res/ic_pick_image.png",
      textToSend :"",
      isEx:false,
      toUserId : '',
      plid : '',
      showEmojiBar:false//是否显示表情包选择框
    },
    private :{
      TAG :"PmList"
    }
    ,onShow(){
        $umeng_stat.resume(this)
    }
    ,onHide() {
        $umeng_stat.pause(this)
    }

    /**
     * @method convertEmoji
     * @param {array} rc
     * @return {array}
     * @desc 重构数组,提取表情包
     */
    ,convertEmoji(rc){
        for(var y in rc){
            var content = rc[y]
            //如果是文本的话,就提取表情包
            if(content.type == 'text')
            {
                const emojiRex = /\[mobcent_phiz=.*?\]/g
                var emojis = content.content.match(emojiRex)
                if(emojis == null){
                    continue //没有表情包
                } else{
                    // 有表情包
                    var nt = []
                    var t = content.content
                    for(var z in emojis){
                        var e = emojis[z]
                        var tempt = t.split(e)
                        for(var aa in tempt[0]){

                            nt.push(tempt[0][aa])
                        }
                        t = tempt[1] == null ? "" :tempt[1]
                        e = e.substring(14,e.length-1)
                        nt.push(e)
                    }

                    if(t != null)
                        for(var aa in t){

                            nt.push(t[aa])
                        }
                    // console.info(nt)
                    //NOTE:先用11作为带有表情包的文本
                    content.type = 'emoji'
                    content.content = nt
                }
            }
        }
        return rc
    }

    , async onInit(){



      MessageApi.init(this.$app)
      this.model =  MessageModel.getInstance(null)

      try{

          const localRe = await this.model.loadLocalPmlist(this.toUserId,this.plid)

          this.re = localRe
      } catch(err){
          console.info(err)
      }
      const re = await this.model.pmseMissionList(this.toUserId, this.plid)

      this.re = re

      var msl = this.re.body.pmList[0].msgList
      msl = this.convertEmoji(msl)

      for(let x in msl){

          msl[x].date = DateUtil.convertTime(msl[x].time)
          msl[x].showTime = x == 0 || this.re.body.pmList[0].msgList[x].time - this.re.body.pmList[0].msgList[x-1].time >120000

      }


      setTimeout(function(){
        this.refresh()

      }.bind(this),1000)



      //注册表情包选择框的反馈
      this.$on('choose_emoji', this.onEvent)
    }
    ,onBackPress(){
        if(this.showEmojiBar){
            this.showEmojiBar = false
            return true
        }

        return false
    }
    ,onClickImage2(uri){
        ImageUtil.ViewImage(uri)
    }
    ,onClickImage(){

        var that = this
        var onPickImageSuccess = function (uri){
            MessageApi.uploadPmFile(uri,
              function(re){

                  MessageApi.send(
                    that.re.body.pmList[0].fromUid, //touid
                    that.re.body.pmList[0].plid, //plid
                    "image",
                    re.body.attachment[0].urlName,
                    function(re){

                        that.onSendComplete()

                    }.bind(this)

                  )
              })
        }
        media.pickImage({
          success: function (data) {
            onPickImageSuccess(data.uri)
          }
        })
    }
    ,onChangeText(e){

        /**
         * NOTE: 通过修改 @param isEx 使得 textarea的class改变,高度改变为对应class中的值
         * 然后又 再次修改 @param isEx 使得 textarea的class改回来,高度自适应为当前控件中内容的高度
         * 达到 最大高度的效果
         */

        this.isEx = true
        this.isEx = false
        this.textToSend = e.value
    }
    ,onClickSend(){

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
    ,onSendComplete(){

        prompt.showToast({
          message : "发送成功"
        })



    }
    ,onClickUser(id){

        router.push({
            uri : "Main/User",
            params :{
                uid :id
            }
        })

    }
    ,onEvent(e){
        if(e.type == 'emoji'){
            this.showEmojiBar = !this.showEmojiBar
        }


        if(e.type == 'choose_emoji'){

            this.showEmojiBar = !this.showEmojiBar
            //把该emoji的url格式化之后添加到文本内容里
            // let imageUrl = "["+e.detail.event.data+"]"
            this.textToSend += e.detail.event.data
        }
    }
    ,async refresh(){


        MessageApi.fetchPmseMissionList(
            this.re.body.pmList[0].fromUid,//fromUid
            this.re.body.pmList[0].plid,//plid
            this.re.body.pmList[0].plid,//pmid
            async function(re){
                  this.re = re
                  var msl = this.re.body.pmList[0].msgList

                  msl = this.convertEmoji(msl)    

                  for(let x in msl){

                      msl[x].date = DateUtil.convertTime(msl[x].time)
                      msl[x].showTime = x == 0 || this.re.body.pmList[0].msgList[x].time - this.re.body.pmList[0].msgList[x-1].time >120000

                  }

                  const saveRes = await this.model.savePmlist(this.toUserId,this.plid,re)
                  // console.info(saveRes)
                  //TODO:滚到
                  // const pmList = this.$element('pmList')
                  // pmList.scrollTo({
                  //     index: this.re.body.pmList[0].msgList.length * 2 -1
                  // })

                  // console.info("after scroll to ")
                  setTimeout(function(){

                    this.refresh()

                }.bind(this),3000)
            }.bind(this)
        )
    }
}
