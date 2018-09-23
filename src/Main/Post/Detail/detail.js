
  import PostApi from '../../../Common/PostApi'
  import prompt from '@system.prompt'
  import DateUtil from '../../../Common/DateUtil'
  import ImageUtil from '../../../Common/ImageUtil'
  import router from '@system.router'
  import clipboard from '@system.clipboard'

  export default{
    protected :{
      topicid : "id",
      topic :{
        title :"",
        content : []
      },
      list :[],
      canLoadMore :true,
      isRefreshing :false,
      page : 1,
      pro_show : true,
      pro_msg : "",
      commentSend : "发送",
      commentContent : "",
      showCommentBar : false,//是否显示评论输入框
      showEmojiBar:false,//是否显示表情包选择框
      exCommentBar:false,//用来暂时扩展输入框
      commentBtnText : "评论",
      commentReplyId : 0,
      isReplying :false, //是不是正在发送网络请求进行回复
      showImage : true, // 是否可以加载图片了
      TAG :"Main/Post/Detail",
      images:[], // 本页的图片url数组,查看图片时作为参数传入
      lastReplyTime :0,//最后一条评论/回复的时间,用来筛选某一页的新数据哪些应该加载哪些不应该
    }
    /**
     * @method convertList
     * @param  {array} list
     * @return {array}
     * @desc 处理转化网络请求中返回的list
     */
    ,convertList(list){

        // console.info(JSON.stringify(list))

        for (let  x in list){

          list[x].posts_date = DateUtil.convertTime(list[x].posts_date)

          list[x].showAct = false

          //处理表情
          var rc = this.convertEmoji(list[x].reply_content)

        }
        return list
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
            if(content.type == 0)
            {
                const emojiRex = /\[mobcent_phiz=.*?\]/g
                var emojis = content.infor.match(emojiRex)
                if(emojis == null){
                    continue //没有表情包
                } else{
                    // 有表情包
                    // console.info(emojis)
                    var nt = []
                    var t = content.infor
                    console.info(t)
                    for(var z in emojis){
                        var e = emojis[z]
                        var tempt = t.split(e)
                        nt.push(tempt[0])
                        t = tempt[1] == null ? "" :tempt[1]
                        e = e.substring(14,e.length-1)
                        nt.push(e)
                    }

                    if(t != null)
                        nt.push(t)
                    // console.info(nt)
                    //NOTE:先用11作为带有表情包的文本
                    content.type = 11
                    content.infor = nt
                    console.info(nt)
                }
            }
        }
        return rc
    }
    /**
     * @method loadSend
     * @desc 加载评论/回复之后的内容
     */
    ,loadSend(){


        //刷新...
        if(this.list.length <25) {

              this.page = 1
              this.fetchReplys()
            return
        }

        this.loadMore()

    }
    ,onInit(){

      var app = this.$app

      PostApi.init(app)

      this.$on('choose_emoji', this.onEvent)
    }
    ,onBackPress(){

        if(this.showEmojiBar){
            this.showEmojiBar = false
            return true
        }

        if(this.showCommentBar){
            this.showCommentBar = false
            this.commentBtnText = "评论"

            return true
        }

        return false
    }
    ,onShow(){
        this.refresh()
    },
    onScrollBottom(){
      this.loadMore()
    },
    onChangeCommentContent(e){
      this.commentContent = e.value
      this.exCommentBar = true
      this.exCommentBar = false
    },
    onClickReplyAction(index){
      var re = this.list[index]
      this.list[index].showAct = this.list[index].showAct  ? false : true

    }
    ,onClickImage(uri){
        ImageUtil.ViewImage(uri)
    }
    ,onChangeCommentBar(){
      this.showCommentBar = this.showCommentBar == true ? false : true
    }
    ,onClickUser(id){
        router.push({
            uri : "Main/User",
            params :{
                uid :id
            }
        })
    }
    ,onMenuPress(){
        prompt.showToast({
            message:"rewrite"
        })
    }
    ,async onEvent(e){


        console.info(e)

        if(e.type == 'emoji'){
            this.showEmojiBar = !this.showEmojiBar
        }


        if(e.type == 'choose_emoji'){

            this.showEmojiBar = !this.showEmojiBar
            //把该emoji的url格式化之后添加到文本内容里
            this.commentContent += e.detail.event.data
        }

  
    }
    ,onSendComment(){
      if(this.commentBtnText == "评论"){

          if(!this.isReplying){
                this.isReplying = true
                  PostApi.comment(this.commentContent,this.topic.topic_id,
                    function (data){

                      const re = JSON.parse(data.data)

                      prompt.showToast({
                        message:re.errcode
                      })

                      this.commentContent = ""

                      this.isReplying = false
                      this.onChangeCommentBar()

                      this.loadSend()

                    }.bind(this))
        }
      } else {



        if(!this.isReplying){
              this.isReplying = true
              PostApi.replyComment(this.commentContent,this.topic.topic_id,this.commentReplyId,
                function(data){

                  const re = JSON.parse(data.data)

                  prompt.showToast({
                      message:re.errcode
                  })

                  this.commentContent = ""
                  this.onChangeCommentBar()

                  this.commentBtnText = "评论"
                  this.isReplying = false

                  this.loadSend()

                }.bind(this))
              }

        }

    },
    replyComment(index){
      this.commentReplyId = this.list[index].reply_posts_id
      this.commentBtnText = "回复"
      this.onChangeCommentBar()
      this.onClickReplyAction(index)

    },
    async replySupport(index){

         const pid = this.list[index].reply_posts_id
         const type = 'post'
         const tid = 0
         try{

             const res = await PostApi.supportPost(tid,pid,type)
             const re = JSON.parse(res.data.data)
             prompt.showToast({
                 message : re.errcode
             })
             this.list[index].extraPanel[0].extParams.isHasRecommendAdd  = 1
             this.list[index].extraPanel[0].extParams.recommendAdd++

         } catch(e){
             prompt.showToast({
                 message :JSON.stringify(e)
             })
             console.err(JSON.stringify(e))
         }
    },
    renderTopic(json){

      json.topic.create_date = DateUtil.convertTime(json.topic.create_date)
      json.topic.content = this.convertEmoji(json.topic.content)
      this.topic = json.topic



      // TODO:写一半呢
      // for(x in topic.content){
      //     var c = topic.content[x]
      //     if(c.type == 1){
      //
      //     }
      // }
      // this.images.add()

      this.renderTopicComplete()
    },
    renderTopicComplete(){
      this.loadMore()
    },
    renderReply(json){

      if(json.list != null && json.list.length != 0){



        //根据筛选json.list里面的东西
        var tempList = []
        for(var x in json.list){
        if(json.list[x].posts_date > this.lastReplyTime)
            tempList.push(json.list[x])
        }
        json.list = tempList

        //更新最后的回复的时间

        if(json.list.length != 0)
            this.lastReplyTime = json.list[json.list.length -1].posts_date

        json.list = this.convertList(json.list)
        this.list = this.list.concat(json.list)
        // console.info(this.list)
        this.renderReplyComplete()


        if(json.list.length < 25 || json.has_next == 0){

             this.renderError("没有更多了")
        }
        if(json.list.length == 25)
            this.page = this.page +1


      }  else {
       this.renderError("没有更多了")
       this.loadMoreComplete()
      }

      this.refreshComplete()


    },
    /**
     * @method renderMoreReply
     * @param {object} json
     * @desc 同 @method loadMore
     */
    renderMoreReply(json){


      if(json.list != null && json.list.length != 0){


        //根据筛选json.list里面的东西
        var tempList = []
        for(var x in json.list){
            if(json.list[x].posts_date > this.lastReplyTime)
                tempList.push(json.list[x])
        }
        json.list = tempList


        //更新最后的回复的时间
        if(json.list.length != 0)
            this.lastReplyTime = json.list[json.list.length -1].posts_date

        json.list = this.convertList(json.list)

        this.list = this.list.concat(json.list)

       if(json.list.length < 25 || json.has_next == 0){

            this.renderError("没有更多了")
       }

       if(json.list.length == 25)
           this.page = this.page +1

        this.renderReplyComplete()
      } else {
        this.renderError("没有更多了")
        this.loadMoreComplete()
      }

      // console.info(this.list)
    },
    renderReplyComplete(){
      // prompt.showToast({
      //   message : "加载新的回复"
      // })
      this.showImage = true;
      this.loadMoreComplete()
    },
    renderError(msg){
        this.$broadcast("render_no_more", { tag : this.TAG })

    },
    refresh(){
      this.fetchTopic()
    }
    /**
     * @method loadMore
     */
    ,loadMore(){
        if(this.canLoadMore){
            this.canLoadMore = false

            this.fetchReplys()

        }
    },
    loadMoreComplete(){
      this.canLoadMore = true

    },
    fetchTopic(){

        PostApi.fetchPostDetail(1,this.topicid,
          function(data){

            let json = JSON.parse(data.data)
            if(json.rs == 1){
              this.renderTopic(json)


            } else {
              this.renderError(json.errcode)
            }

          }.bind(this),
          function(data,code){
            console.log(data);
          })

    },
    /**
     * @method fetchReplys
     */
    fetchReplys(){
        PostApi.fetchPostDetail(this.page,this.topicid,
          function(data){

            let json = JSON.parse(data.data)



            if(json.rs == 1){
              if(this.page == 1){
                this.renderReply(json)
              }else{
                this.renderMoreReply(json)
              }


              // //如果 json.list.lengt 等于25 就是说这一页已经加载完成了,下一次就可以加载下一页了
              // if(json.list.length == 25)
              //   this.page = this.page +1
            } else {
              this.renderError(json.errcode)
            }


          }.bind(this),
          function(data,code){
            console.log(data);
          })

    },
    reqRefresh(e){
      this.isRefreshing = e.refreshing

      this.page = 1
      this.fetchReplys()
    },
    refreshComplete(){

      if(this.isRefreshing){
        this.isRefreshing = false

        prompt.showToast({
            message: '刷新完成'
        })
      }

    }

  }
