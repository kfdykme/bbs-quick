
    import BoardApi from '../../../Common/BoardApi'
    import PostApi from '../../../Common/PostApi'
    import prompt from '@system.prompt'
    import file from '@system.file'
    import storage from '@system.storage'

    import ImageUtil from "../../../Common/ImageUtil"
    import media from "@system.media"

    export default{
      protected: {
        category :[],
        board :[],
        classificationType_list : [],
        targettBoardForumInfo :{},
        targetBoard:{},
        targetClass:{
                "classificationType_id": 0,
                "classificationType_name": "无"
        },
        publishTitle :"",
        publishContent : "",
        isPublishing : false,
        showEmojiBar:false //是否显示选择emoji的框框的boolean


      }
      ,async onInit(){
        BoardApi.init(this.$app)
        PostApi.init(this.$app)


        //从缓存中读取
        const  forumlist = await storage.get({key : 'forumlist'})
        this.category = JSON.parse(forumlist.data).list

        BoardApi.getForumList(
          function(data){
              const re = JSON.parse(data.data)
              this.save(data.data,"forumlist")

          }.bind(this),
          function(data,code){
            console.log(code);
          }
        )



        this.$on('choose_emoji', this.onEvent)

      }


      /**
       * @method onBackPress
       * @return 是否拦截该事件
       * @desc 如果正在显示emoji-bar,则关闭,否则不处理
       */
      ,onBackPress(){
          if(this.showEmojiBar == true)
          {
              this.showEmojiBar = false
              return true
          }

          return false
      }

      ,async onEvent(e){
          if(e.type == 'emoji'){
              this.showEmojiBar = !this.showEmojiBar
          }


          if(e.type == 'choose_emoji'){

              this.showEmojiBar = !this.showEmojiBar
              //把该emoji的url格式化之后添加到文本内容里
              // let imageUrl = "["+e.detail.event.data+"]"
              this.publishContent += e.detail.event.data
          }

          if(e.type == 'image'){
              var res = await media.pickImage()

              console.info(res)
          }
      }
      ,onChangeGategory(e){

          this.board = []
          setTimeout(function(){

              this.board = JSON.parse(e.newValue).board_list

              for(let x in this.board){
                  if(this.$element("board-select-option-"+x)) {

                      if(this.$element("board-select-option-"+x).attr.selected)
                      {
                          this.onChangeBoard(this.board[x])
                      }
                  }

              }
          }.bind(this),200)
      }
      ,onChangeContent(e){
          this.publishContent = e.value
      }
      ,onChangeTitle(e){
          this.publishTitle = e.value
      }
      ,onSelectBoard(e){

          this.onChangeBoard(JSON.parse(e.newValue))
      }
      ,async onChangeBoard(board){
           var key = 'classification'+board.board_id

            this.classificationType_list = [{
                "classificationType_id": 0,
                "classificationType_name": "无"
            }]


            this.targetClass = this.classificationType_list[0]

            var res = await storage.get({key:key})
            if(res.data != ""){

                res = JSON.parse(res.data)

                this.targettBoardForumInfo = res.forumInfo
                this.targetBoard = board

                this.classificationType_list = this.classificationType_list.concat(res.classificationType_list)
            }


            var success = function (data){

                this.classificationType_list = [{
                    "classificationType_id": 0,
                    "classificationType_name": "无"
                }]


                this.targetClass = this.classificationType_list[0]

                this.save(data.data,key)

                const re = JSON.parse(data.data)

                this.targettBoardForumInfo = re.forumInfo
                this.targetBoard = board

                this.classificationType_list = this.classificationType_list.concat(re.classificationType_list)


            }.bind(this)

            BoardApi.fetchClassificationTypeList(board.board_id,
            success)

      }
      ,onClickClassification(e){
          this.targetClass = e
          // console.log(id);
      }
      ,onPublish(){
            //console.info("id   ",this.targetBoard.board_id,"name  ",this.targetBoard.board_name);
            if(!this.isPublishing){

                    var contentList = []
                    var publishContent = {}



                    publishContent.infor = this.publishContent
                    publishContent.type = 0
                    contentList.push(publishContent)

                    var info = {}
                    info.content = JSON.stringify(contentList)
                    info.title = this.publishTitle
                    info.fid = this.targetBoard.board_id
                    info.isAnonymous = 0
                    if(this.targetClass.classificationType_id != 0)
                    info.typeId = this.targetClass.classificationType_id

                    var body = {}
                    body.json = info

                    var publishJson = {}
                    publishJson.body = body


                    // console.info(publishContent)

                    PostApi.publish(publishJson,
                      function(data){
                        const re = JSON.parse(data.data)

                        prompt.showToast({
                          message : re.errcode
                        })
                        this.onPublishCompelete()
                      }.bind(this))


            }
            this.onPublishCompelete()
      }
      ,onPublishCompelete(){

            this.isPublishing = false

            this.publishContent = ""
            this.publishTitle = ""

      }
      // ,convertPublish(){
      //
      //     var content = this.publishContent
      //     const rex = /\[.*?\/[0-9]{1,3}\.gif\]/g
      //     var res = content.match(rex)
      //     for(var x  in res){
      //         var re = res[x]
      //         re = re.substring(1,re.length-1)
      //         let imageUrl = "mobcent_phiz=http://bbs.uestc.edu.cn/static/image/smiley/"+re
      //         content = content.replace(re,imageUrl)
      //     }
      //
      //     return content
      // }
      /**
       * @method save
       * @param {string} value
       * @param {string} key
       */
      ,async save(value,key){

          var res = await storage.set({
              key : key,
              value : value
          })

          console.info("set:"+key,res)
      }
    }
