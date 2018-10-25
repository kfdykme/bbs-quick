
    import BoardApi from '../../../Common/BoardApi'
    import PostApi from '../../../Common/PostApi'
    import MessageApi from '../../../Common/MessageApi'
    import prompt from '@system.prompt'
    import file from '@system.file'
    import storage from '@system.storage'

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
        showEmojiBar:false, //是否显示选择emoji的框框的boolean

        showLoadingPage :true,

        uploadImages:[],//保存已经上传的图片的数组
        showUploadImageButton:true // 是否显示上传图片的按钮


      }
      ,onShow(){
          $umeng_stat.resume(this)
      }
      ,onHide() {
          $umeng_stat.pause(this)
      }
      ,onShow(){
          if (this.$app.$data.dataImageView && this.$app.$data.dataImageView.gotoPage === 'image-pick-bar') {
              // 从数据中获取回传给本页面的数据
             const data = this.$app.$data.dataImageView.params
             const newImages = []
             for(var x in  this.uploadImages ){
                 if(data.uri !=  this.uploadImages [x])
                  newImages.push( this.uploadImages [x])
             }
             this.uploadImages = newImages
             console.info(this.uploadImages)
             this.$broadcast('view-upload-update',this.uploadImages)
           }
      }
      ,async onInit(){
        BoardApi.init(this.$app)
        PostApi.init(this.$app)

        //TODO:因为上传文件的api写进了这里,所有暂时调用先,之后重构
        MessageApi.init(this.$app)

        //从缓存中读取
        const  forumlist = await storage.get({key : 'forumlist'})
        if(forumlist.data != "")
            this.category = JSON.parse(forumlist.data).list

        if(this.category.length == 0)
            BoardApi.getForumList(
              function(data){
                  const re = JSON.parse(data.data)
                  this.save(data.data,"forumlist")
                  this.category = re.list

              }.bind(this),
              function(data,code){
                console.log(code);
              }
            )



        this.$on('choose_emoji', this.onEvent)
        this.$on('on-pick-image',this.onEvent)

        //bind views
        var loadingPage = this.$vm('loadingPage')
        var imagePickBar = this.$vm('imagePickBar')
        imagePickBar.loadingPage = loadingPage
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


          if(e.type == 'on-pick-image'){
              // console.info(e)
              this.uploadImages = e.detail
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
                    this.isPublishing = true;
                    var contentList = []
                    var publishContent = {}



                    publishContent.infor = this.publishContent
                    publishContent.type = 0
                    contentList.push(publishContent)

                    //把上传的图片插到末尾
                    for(var x in this.uploadImages){
                        var content = {
                            type:1,
                            infor:this.uploadImages[x]
                        }
                        contentList.push(content)
                    }

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

                    //显示加载中
                    //// FIXME: 有bug没办法采用本地变量
                    this.showLoadingPage  = true;

                    PostApi.publish(publishJson,
                      function(data){
                        const re = JSON.parse(data.data)

                        prompt.showToast({
                          message : re.errcode
                        })
                        this.showLoadingPage  = false;
                        this.onPublishCompelete()
                      }.bind(this))


            }
            this.onPublishCompelete()
      }

      ,onPublishCompelete(){

            //加载结束
            this.$broadcast('render_hide')

            this.isPublishing = false

            this.publishContent = ""
            this.publishTitle = ""
            this.uploadImages =[]
            this.showUploadImageButton = true

      }

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

      }
    }
