import DateUtil from "../../../Common/DateUtil"
import media from "@system.media"
import MessageApi from "../../../Common/MessageApi"
import prompt from "@system.prompt"
import ImageUtil from "../../../Common/ImageUtil"
import router from "@system.router"
import MessageModel from '../MessageModel'

export default{
    public:{
      msgList:[],
      name:'',
      senderUid:0,
      senderAvatar:'',
      toAvatar:'',
      fromUid:0,//fromUid of re.body
      plid : 0,//plid of re.bodyr
      imageToSend : "../../../Res/ic_pick_image.png",
      baseImageToSend :"../../../Res/ic_pick_image.png",
      textToSend :"",
      isEx:false,
      lastInputTime:'',
      toUserId : '',
      length:0,//长度
      images:[],
      showEmojiBar:false,//是否显示表情包选择框
      showList: false,
      listItemId:0
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
                  continue; //没有表情包
                } else {
                    // 有表情包
                    var nt = []
                    let rex = /\[mobcent_phiz=.*?\]/
                    var t = content.content

                    let res = t.match(rex)
                    while (res != null) {
                      let index = res.index
                      if (index > 0) {
                        let i = 0
                        while (i < index){
                          nt.push(t[i])
                          i++
                        }
                      }
                      nt.push(res[0].substring(14,res[0].length-1))
                      t = t.substring(res.index + res[0].length)
                      res = t.match(rex)
                    }
                    let i2 = 0
                    while (i2 < t.length) {
                      nt.push(t[i2])
                      i2++
                    }

                    // console.info(nt)
                    //NOTE:先用11作为带有表情包的文本
                    content.type = 'emoji'
                    content.content = nt
                    content.id = this.listItemId++
                }
            }
        }
        return rc
    }


    /**
     * @method fetchHeart
     */
    ,async fetchHeart(){
        await MessageApi.fetchHeart()
            .then(data =>{
                const rs = JSON.parse(data.data.data)

                if(rs.body.pmInfos.length != 0){
                    this.fetchPmList()
                }
            })
            .catch(data =>{
                console.error(data)
            })

        setTimeout(function(){
            this.fetchHeart()
        }.bind(this),5000)
    }

    , async onReady(){

      MessageApi.init(this.$app)
      this.model =  MessageModel.getInstance(null,this.$app.$def.cache.user.uid)
      this.msgList = []
      try{
          var localRe = await this.model.loadLocalPmlist(this.toUserId,this.plid)
          this.render(localRe)
      } catch(err){
          console.error('Error while render local pmlist ' + err)
          this.showList = true
      }

      this.fetchPmList()

      this.fetchHeart()

      //注册表情包选择框的反馈
      this.$on('choose_emoji', this.onEvent)
      this.$on('click_emoji_page', this.onEvent)

    }
    ,onBackPress(){
        if(this.showEmojiBar){
            this.hideEmojiBar()
            return true
        }

        this.$page.finish()
        return true
    }

    ,fetchPmList(){
        this.model.pmseMissionList(this.toUserId, this.plid)
        .then(re =>{
            var msl = re.body.pmList[0].msgList
            msl = this.convertEmoji(msl)
            re.length = msl.length
            this.images = []
            for(let x in msl){

                msl[x].date = DateUtil.convertTime(msl[x].time)

                if( x == 0
                    || msl[x].time -msl[x-1].time >120000){

                    msl[x].showTime = true
                    re.length++
                }else{

                    msl[x].showTime = false
                }

                //
                if(msl[x].type == 'image'){
                    this.images.push(msl[x].content)
                }
            }


            this.render(re)
            this.save(re)


        })
        .catch(re =>{
            console.error(re)
        })


    }
    /**
     * @method render
     * @param {object} re
     */
    ,render(re){

        if (re != null) {
          this.msgList = []
          this.msgList = this.msgList.concat(re.body.pmList[0].msgList)
          this.name = re.body.pmList[0].name
          this.senderUid = re.body.userInfo.uid
          this.senderAvatar = re.body.userInfo.avatar
          this.toAvatar = re.body.pmList[0].avatar
          this.fromUid = re.body.pmList[0].fromUid
          this.plid = re.body.pmList[0].plid

          let list = null
          try {
            list = this.$element("pmList")

            if (list != null) {
              setTimeout(()=>{
                list.scrollTo({
                  index:10000
                })
                this.showList = true
              },200)
            }
          } catch (e) {
            console.error('-----------------------\nError while list.scrollTo :\n' + e + '\n\t re :' + JSON.stringify(re) +'\n\tlist: ' + JSON.stringify(list) )
          }
        }


    }
    ,async save(re){
        if(re==null || re.body == null) return;

        await this.model.savePmlist(this.toUserId,this.plid,re)
          .then(data =>{
              console.info('save pmlist: ' + data,re)
          })
          .catch(data =>{
              console.error(data)
          })
    }
    ,onClickImage2(uri){
        ImageUtil.ViewImage(uri,this.images)
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
        this.lastInputTime = new Date().getTime()
        this.check()
        this.textToSend = e.value
    }

    , check() {

      if (this.isEx)
      setTimeout(function (){
        console.info(new Date().getTime() -this.lastInputTime)
        if (new Date().getTime() -this.lastInputTime > 5000) {
          this.lastInputTime = new Date().getTime()
          this.isEx = false
        } else {
          this.check()
        }
      }.bind(this),5000)

    }

    ,onClickSend(){

      MessageApi.send(
        this.fromUid, //touid
        this.plid, //plid
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

        setTimeout(function(){
            this.fetchPmList()
        }.bind(this),2000)

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
          /**
          * 如果输入法正在打开，就yingchangshurufa
          */
          let taPostContent = this.$element('textarea-pmlist-content')
          taPostContent.focus({
            focus: false
          })
          this.showEmojiBar = !this.showEmojiBar
        }


        if(e.type == 'choose_emoji'){

            //把该emoji的url格式化之后添加到文本内容里
            // let imageUrl = "["+e.detail.event.data+"]"
            this.textToSend += e.detail.event.data
        }

        if (e.type == 'click_emoji_page') {
          this.hideEmojiBar()
        }
    }

    , hideEmojiBar() {
      this.$broadcast('render-hide-emoji-bar')
      /**
       * animation 2s
       */
      setTimeout(() => {

        this.showEmojiBar = !this.showEmojiBar
      }, 400)
    }

    /**
     * @method refresh 弃用
     */
    ,async refresh(){

        MessageApi.fetchPmseMissionList(
            this.fromUid,//fromUid
            this.plid,//plid
            this.plid,//pmid
            async function(re){
                  var msl = re.body.pmList[0].msgList
                  msl = this.convertEmoji(msl)

                  for(let x in msl){

                      msl[x].date = DateUtil.convertTime(msl[x].time)
                      msl[x].showTime = x == 0 || re.body.pmList[0].msgList[x].time - re.body.pmList[0].msgList[x-1].time >120000

                  }

                  const saveRes = await this.model.savePmlist(this.toUserId,this.plid,re)
            }.bind(this)
        )
    }
}
