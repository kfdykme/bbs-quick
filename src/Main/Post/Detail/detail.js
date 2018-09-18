
  import PostApi from '../../../Common/PostApi'
  import prompt from '@system.prompt'
  import DateUtil from '../../../Common/DateUtil'
  import ImageUtil from '../../../Common/ImageUtil'
  import router from '@system.router'


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
      page : 0,
      pro_show : true,
      pro_msg : "",
      commentSend : "发送",
      commentContent : "",
      showCommentBar : false,
      commentBtnText : "评论",
      commentReplyId : 0,
      isReplying :false,
      showImage : true,
      TAG :"Main/Post/Detail",
      images:[] // 本页的图片url数组,查看图片时作为参数传入


    },
    onInit(){

      var app = this.$app

      PostApi.init(app)

    }
    ,onBackPress(){
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


                    this.canLoadMore = true
                      setTimeout(function(){
                            this.loadMore()
                      }.bind(this) ,1000)

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
    render(){
      this.renderTopic()
    },
    renderTopic(json){

      json.topic.create_date = DateUtil.convertTime(json.topic.create_date)

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


        for (let  x in json.list){

          json.list[x].posts_date = DateUtil.convertTime(json.list[x].posts_date)

          json.list[x].showAct = false

        }
        this.list = json.list
        this.renderReplyComplete()


        //TODO : 暂时在此做个判断,10 == defaultPageSize
        if(json.list.length < 10){

             this.renderError("没有更多了")
        }


      }  else {
       this.renderError("没有更多了")
       this.loadMoreComplete()
      }

      this.refreshComplete()


    },
    renderMoreReply(json){

      if(json.list != null && json.list.length != 0){

        for (let x in json.list){
          json.list[x].posts_date = DateUtil.convertTime(json.list[x].posts_date)
          json.list[x].showAct = false
        }
        this.list = this.list.concat(json.list)

        this.renderReplyComplete()
      } else {
        this.renderError("没有更多了")
        this.loadMoreComplete()
      }
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
    },
    loadMore(){
      if(this.canLoadMore){
        this.canLoadMore = false

        this.page = this.page+ 1
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
