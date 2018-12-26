
import BoardApi from '../../../Common/BoardApi'
import PostApi from '../../../Common/PostApi'
import MessageApi from '../../../Common/MessageApi'
import prompt from '@system.prompt'
import file from '@system.file'
import storage from '@system.storage'

import media from "@system.media"

export default {

    protected: {
        category: [],
        board: [{}],
        classificationType_list: [],
        targettBoardForumInfo: {},
        targetBoard: {},
        targetClass: {
            "classificationType_id": 0,
            "classificationType_name": "无"
        },
        publishTitle: "",
        publishContent: "",
        isPublishing: false,
        showEmojiBar: false, //是否显示选择emoji的框框的boolean
        showBoard: false,
        showBoardSelectPage:false,
        showLoadingPage: false,
        showingAts:false,
        skipAt:false,
        uploadImages: [],//保存已经上传的图片的数组
        showUploadImageButton: true, // 是否显示上传图片的按钮
        lastContent:"",          // 记录textarea上一次改动时的文本长度，用于判断是输入还是删除
        contentIndex:0
    }

    , onShow() {
        $umeng_stat.resume(this)
    }
    , onHide() {
        $umeng_stat.pause(this)
    }

    , onShow() {
        if (this.$app.$data.dataImageView && this.$app.$data.dataImageView.gotoPage === 'image-pick-bar') {
            // 从数据中获取回传给本页面的数据
            const data = this.$app.$data.dataImageView.params
            const newImages = []
            for (let x in this.uploadImages) {
                if (data.uri != this.uploadImages[x])
                    newImages.push(this.uploadImages[x])
            }
            this.uploadImages = newImages
            console.info(this.uploadImages)
            this.$broadcast('view-upload-update', this.uploadImages)
        }
    }

    , async onInit() {
        BoardApi.init(this.$app)
        PostApi.init(this.$app)

        //TODO:因为上传文件的api写进了这里,所有暂时调用先,之后重构
        MessageApi.init(this.$app)

        //从缓存中读取
        const forumlist = await storage.get({ key: 'forumlist' })
        if (forumlist.data != "")
            this.category = JSON.parse(forumlist.data).list

        BoardApi.getForumList(
            function (data) {
              const re = JSON.parse(data.data)
              this.save(data.data, "forumlist")

              re.list = re.list.filter(item => {
                item.board_list = item.board_list.filter(board => {
                  return BoardApi.checkBoardCanFetch(board.board_name)
                })
                return item.board_list.length > 0
              })
              console.info(re.list)
              this.category = re.list
              storage.set({
                key: 'forumlist',
                value: JSON.stringify(this.category)
              })
            }.bind(this),
            function (data, code) {
                console.log(code);
            }
        )

        this.$on('choose_emoji', this.onEvent)
        this.$on('click_emoji_page', this.onEvent)
        this.$on('choose_ats',this.onEvent)
        this.$on('on-pick-image', this.onEvent)

        //bind views
        let loadingPage = this.$vm('loadingPage')
        let imagePickBar = this.$vm('imagePickBar')
        imagePickBar.loadingPage = loadingPage
    }

    /**
     * @method onBackPress
     * @return 是否拦截该事件
     * @desc 如果正在显示emoji-bar,则关闭,否则不处理
     */
    , onBackPress() {


        if (this.showBoard) {
            this.hideBoardSelectPage()
            // this.showBoard = false
            return true
        }

        if (this.showEmojiBar == true) {
            this.hideEmojiBar()
            return true
        }

        if(this.showingAts){
          this.toggleAts()

          return true
        }


        return false
    }

    , async onEvent(e) {

        if (e.type == 'click-selected-board') {
            this.showBoard = true;
            this.showBoardSelectPage = true;
        }

        if (e.type == 'select-board') {
            this.hideBoardSelectPage()
            this.onChangeBoard(e.data);
        }

        if (e.type == 'change-category'){
            this.hideBoardSelectPage()
            let tempList = JSON.parse(e.data).board_list

            this.board = tempList;


            setTimeout(()=>{

              this.showBoardSelectPage = true;
              this.showBoard = true;
            },500)
        }

        if (e.type == 'emoji') {
          /**
          * 如果输入法正在打开，就yingchangshurufa
          */
          let taPostContent = this.$element('textarea-post-content')
          taPostContent.focus({
            focus: false
          })
          this.showEmojiBar = !this.showEmojiBar
        }

        if (e.type == 'choose_ats') {
          let name = e.detail.at
          this.toggleAts()
          let first = this.publishContent.substring(0,this.contentIndex)
          let end = this.publishContent.substring(this.contentIndex)

          this.skipAt = true

          this.publishContent  = first +end[0]+name+end.substring(1)

          //因为修改publishContent会触发onChange事件，所以我选择加一个异步防止无限触发
          setTimeout(()=>{
            this.skipAt = false
          },200)
        }


        if (e.type == 'choose_emoji') {

            // this.showEmojiBar = !this.showEmojiBar
            //把该emoji的url格式化之后添加到文本内容里
            // let imageUrl = "["+e.detail.event.data+"]"
            this.publishContent += e.detail.event.data
        }

        if (e.type == 'click_emoji_page') {
          this.hideEmojiBar()
        }


        if (e.type == 'on-pick-image') {
            // console.info(e)
            this.uploadImages = e.detail
        }
    }

    , onChangeGategory(e) {
        this.onEvent({ type: 'change-category', data: e.newValue })

    }

    , onChangeContent(e) {
        this.publishContent = e.value


        //输入的时候才会触发
        if(!this.skipAt && this.lastContent.length < e.value.length){

          //如果正在显示ats的时候再次输入，那就返回去
          if(this.showingAts){
            this.toggleAts()
          }
          //判断现在的文本是不是比上一次的文本多了一个 @ 符号


          let isAt = false
          let x
          for( x in this.lastContent){
            if(this.lastContent[x] != e.value[x] && e.value[x] === '@'){
              isAt = true

              break;
            }
          }

          x = isAt ? x : e.value.length-1
          this.contentIndex = x
          if(e.value[x] === '@'){
            isAt = true
          }

          if(isAt){
            this.toggleAts()
          }
        }

        this.lastContent= e.value
    }

    , onChangeTitle(e) {
        this.publishTitle = e.value
    }

    , async onChangeBoard(board) {
        let key = 'classification' + board.board_id

        this.classificationType_list = [{
            "classificationType_id": 0,
            "classificationType_name": "无"
        }]


        this.targetClass = this.classificationType_list[0]

        let res = await storage.get({ key: key })
        if (res.data != "") {

            res = JSON.parse(res.data)

            this.targettBoardForumInfo = res.forumInfo
            this.targetBoard = board

            this.classificationType_list = this.classificationType_list.concat(res.classificationType_list)
        }


        let success = function (data) {

            this.classificationType_list = [{
                "classificationType_id": 0,
                "classificationType_name": "无"
            }]


            this.targetClass = this.classificationType_list[0]

            this.save(data.data, key)

            const re = JSON.parse(data.data)

            this.targettBoardForumInfo = re.forumInfo
            this.targetBoard = board

            this.classificationType_list = this.classificationType_list.concat(re.classificationType_list)


        }.bind(this)

        BoardApi.fetchClassificationTypeList(board.board_id,
            success)

    }

    , onClickClassification(e) {
        this.targetClass = e
        // console.log(id);
    }

    , onPublish() {
        //console.info("id   ",this.targetBoard.board_id,"name  ",this.targetBoard.board_name);
        if (!this.isPublishing) {
            this.isPublishing = true;
            let contentList = []
            let publishContent = {}

            publishContent.infor = this.publishContent
            publishContent.type = 0
            contentList.push(publishContent)

            //把上传的图片插到末尾
            for (let x in this.uploadImages) {
                let content = {
                    type: 1,
                    infor: this.uploadImages[x]
                }
                contentList.push(content)
            }

            let info = {}
            info.content = JSON.stringify(contentList)
            info.title = this.publishTitle
            info.fid = this.targetBoard.board_id
            info.isAnonymous = 0
            if (this.targetClass.classificationType_id != 0)
                info.typeId = this.targetClass.classificationType_id

            let body = {}
            body.json = info

            let publishJson = {}
            publishJson.body = body


            // console.info(publishContent)

            //显示加载中
            //// FIXME: 有bug没办法采用本地变量
            this.showLoadingPage = true;

            PostApi.publish(publishJson,
                function (data) {
                    const re = JSON.parse(data.data)

                    prompt.showToast({
                        message: re.errcode
                    })
                    this.showLoadingPage = false;
                    this.onPublishCompelete(re.rs)
                }.bind(this))


        }
        this.onPublishCompelete()
    }
    , hideBoardSelectPage(){
      this.showBoard = false
      setTimeout(() => {
        this.showBoardSelectPage = false
      },500)
    }

    , hideEmojiBar(){
      this.$broadcast('render-hide-emoji-bar')
      /**
       * animation 2s
       */
      setTimeout(() => {

        this.showEmojiBar = !this.showEmojiBar
      }, 400)
    }

    /**
     *  @methodd onPublishCompelete
     *  @param {number} isSuccess  0->fail,1->success
     */
    , onPublishCompelete(rs) {

        //加载结束
        this.$broadcast('render_hide')

        this.isPublishing = false


        //当发贴成功时才会重置该页面
        if(rs == 1){

          this.publishContent = ""
          this.publishTitle = ""
          this.uploadImages = []
          this.showUploadImageButton = true
        }

    }

    /**
     * @method save
     * @param {string} value
     * @param {string} key
     */
    , async save(value, key) {

        let res = await storage.set({
            key: key,
            value: value
        })

    }

    /**
     * @method showAts
     * @param {integer} index  @ 符合所在的index
     */
    , toggleAts(index){
      let atsPage = this.$vm('atsPage')
        if(this.showingAts){

          atsPage.renderHideAts()
        } else{

          atsPage.renderAts()
        }
      this.showingAts = !this.showingAts
    }
}
