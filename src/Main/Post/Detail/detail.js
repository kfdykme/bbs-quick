
import PostApi from '../../../Common/PostApi'
import UserApi from '../../../Common/UserApi'
import Api from '../../../Common/Api'
import prompt from '@system.prompt'
import DateUtil from '../../../Common/DateUtil'
import ImageUtil from '../../../Common/ImageUtil'
import router from '@system.router'
import clipboard from '@system.clipboard'
import share from '@service.share'
import systemShare from '@system.share'



export default {
    protected: {
        topicid: "id",
        topic: {
            title: "",
            content: [],
            poll_info: {
                poll_item_list: []
            }
        },
        list: [],
        canLoadMore: true,
        isRefreshing: false,
        page: 1,
        commentSend: "发送",
        commentContent: "",
        showCommentBtn: false,                     //是否显示评论按钮
        commentBtnText: "评论",
        commentReplyId: 0,
        showImage: false,                          // 是否可以加载图片了
        showMenu:false,
        /**
         *  scrollY 用来记录滚动的距离
         */
        scrollY:0,
        topicImages: [],
        images: [],                                // 本页的图片url数组,查看图片时作为参数传入
        imageId:0,
        emojiId: 0,                                // 用于作为list-item-type的标识
        lastReplyTime: 0,                          //最后一条评论/回复的时间,用来筛选某一页的新数据哪些应该加载哪些不应该
        votes: [],                                 //投票选项id
        totalNumber: 0,                            //全部回复的数量
        sortMode: 1,                               //1 :正序 2: 倒序 3:按点赞排序
        topNumber: 0,                              //置顶的回复数,用于显示楼层时去掉置顶项
        DEFAULT_PAGE_SIZE: 25,                     //默认每页加载回复数
        userId:0,                                  //
        zan:{
          hasZan :false,
          showZan: false
        },
        rate:{
          showRate:false
        },
        score:{
          showScore:false                         //是否正在显示评价dialog
        }
    }
    , onShow() {
        $umeng_stat.resume(this)
        this.refresh()
    }
    , onHide() {
        $umeng_stat.pause(this)
    }
    /**
     * @method convertList
     * @param  {array} list
     * @return {array}
     * @desc 处理转化网络请求中返回的list
     */
    , convertList(list) {


        for (let x in list) {

            list[x].posts_date = DateUtil.convertTime(list[x].posts_date)

            // NOTE: 判断是否是置顶的回复,是的话就topNumber++
            if (list[x].poststick == 1) {
                this.topNumber++
            }

            // NOTE:判断是否为图片如果是则image++
            for(var i in list[x].reply_content){
              if(list[x].reply_content[i].type == 1){
                list[x].reply_content[i].id = this.imageId++
              }
            }

            //NOTE : 如果没有这一行，signature就不会更新
            list[x].signature = ""


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
    , convertEmoji(rc) {
        for (var y in rc) {
            var content = rc[y]
            //如果是文本的话,就提取表情包
            if (content.type == 0) {
                const emojiRex = /\[mobcent_phiz=.*?\]/g
                var emojis = content.infor.match(emojiRex)
                if (emojis == null) {
                    continue //没有表情包
                } else {
                    // 有表情包
                    // console.info(emojis)
                    var nt = []
                    var t = content.infor
                    for (var z in emojis) {
                        var e = emojis[z]
                        var tempt = t.split(e)

                        for (var aa in tempt[0]) {

                            if (tempt[0][aa] == '\n') {
                                nt.push("</br>")
                            }
                            else
                                nt.push(tempt[0][aa])
                        }
                        t = tempt[1] == null ? "" : tempt[1]
                        e = e.substring(14, e.length - 1)
                        nt.push(e)
                    }

                    if (t != null)
                        for (var aa in t) {
                            if (t[aa] == '\n') {
                                nt.push("</br>")
                            }
                            else
                                nt.push(t[aa])
                        }
                    // console.info(nt)
                    //NOTE:先用11作为带有表情包的文本
                    content.type = 11
                    content.infor = nt
                    content.item = this.emojiId++
                }
            }
        }
        return rc
    }


    , convertSign(v){
        UserApi.getUserInfo(this.list[v].reply_id,function(res){
          if (this.list[v] != null)
              this.list[v].signature = res.sign
         }.bind(this))
    }

    /**
     * @method loadSend
     * @desc 加载评论/回复之后的内容
     */
    , loadSend() {


        //刷新...
        if (this.list.length < this.DEFAULT_PAGE_SIZE) {

            this.page = 1
            this.fetchReplys()
            return
        }

        this.loadMore()

    }
    , onInit() {

        var app = this.$app

        PostApi.init(app)
        UserApi.init(app)

        //init this.userId
        this.usrId = app.$def.cache.user.uid

        this.$on('on-score-back',this.onEvent)
        this.$on('on-render-fetching',this.onEvent)
        this.$on('on-render-fetch-end',this.onEvent)

    }

    , onScrollBottom() {
        this.loadMore()
    }

    , onBackPress(){
      var scoreDialog = this.$vm('scoreDialog')
      if(scoreDialog != null && scoreDialog.view != null && scoreDialog.isShowing()){
        scoreDialog.view.toggle()
        return true;
      }
    }



    /**
     * @method onChange
     * @param {object} event 自己构建的event
     * @param {object} e api自带事件对象
     * @desc 投票中的input的checkbox改变时触发
     */
    , onChange(event, e) {

        var id = event.data
        var eve = {
            type: event.type,
            data: {
                id: id,
                check: e.checked
            }
        }

        this.onEvent(eve)
    }
    , async onEvent(e,oriE) {

        if(e.type === 'scroll'){
          this.scrollY += oriE.scrollY
        }

        if(e.type == 'scroll-to-top'){
          this.$element('postList').scrollTo({
          index:0})
        }

        if(e.type == 'toggle-zan'){
          this.zan.showZan = ! this.zan.showZan
        }

        if(e.type == 'toggle-rate'){
          this.rate.showRate = ! this.rate.showRate
        }

        if(e.type == 'dialog-change-score-reason'){
          this.dialogScore.reason = oriE.value
        }

        if(e.type == 'dialog-select-score'){
          this.dialogScore.score = oriE.newValue
        }

        if(e.type == 'dialog-check-sendreasonpm'){
          this.dialogScore.sendreasonpm =  this.dialogScore.sendreasonpm == 'on' ? '' : "on"
        }

        if(e.type == 'dialog-send-score'){

        }

        //
        if(e.type =='on-score'){

          this.$broadcast('on-score',{type:'on-score'})

        }

        if(e.type == 'on-score-back'){
          this.score.showScore = e.detail.data
        }

        if(e.type == 'on-render-fetching'){
          var loadingPage = this.$vm('loadingPage')
          loadingPage.renderLoad()
        }

        if(e.type == 'on-render-fetch-end'){
          var loadingPage = this.$vm('loadingPage')
          loadingPage.renderHide()
          this.refresh()
        }

        if(e.type == 'favo'){
           var loadingPage = this.$vm('loadingPage')
          loadingPage.renderLoad()
          PostApi.favorite(
            this.topic.is_favor  == 0 ? PostApi.Constant.FAVO : PostApi.Constant.DELFAVO,
            this.topicid
          ).then((re)=>{
            loadingPage.renderHide()
            var res = JSON.parse(re.data.data)
            prompt.showToast({
              message : res.errcode
            })
            this.refresh()
          }).catch((re)=>{
              console.error(JSON.stringify(re));
              loadingPage.renderHide()
          })
        }

        if(e.type == 'support-topic'){

          var loadingPage = this.$vm('loadingPage')
          loadingPage.renderLoad()
          Api.fetch(  this.topic.extraPanel[1].action,null,function(re){
            prompt.showToast({
              message : re.errcode
            })
            loadingPage.renderHide()
            this.refresh()
          }.bind(this),function(){

            loadingPage.renderHide()
            this.refresh()
          }.bind(this))


          console.info(JSON.stringify(this.topic))
        }

        //NOTE: 回退
        if(e.type == 'back'){
          router.back();
        }

        if(e.type == 'share'){

          const url = "http://bbs.uestc.edu.cn/forum.php?mod=viewthread&tid="+this.topic.topic_id

          share.share({
            shareType: 0,
            imagePath:this.images.length == 0 ? '':this.images[0],
            title: this.topic.title,
            targetUrl: url,
          })
        }

        //修改浏览顺序
        if (e.type == 'change-sort-mode' && e.value == 'default') {
            if (this.sortMode == 1) {

                //0 清空回复
                this.list = []
                this.fetchReverseReplys()

            } else if (this.sortMode == 2 ||
                this.sortMode == 3 ) {
                //无论是倒序->正序 还是 点赞排序->正序，都是走这个状态

                this.list = []
                this.sortMode = 1
                this.page = 1
                this.lastReplyTime = 0
                this.refresh()

            }

        }

        //sort by zan
        if (e.type == 'change-sort-mode' && e.value == 'zan') {
            if (this.sortMode == 3) {
                this.onEvent({ type: 'change-sort-mode', value: 'default'})
            } else if (this.sortMode == 1
                || this.sortMode == 2) {

                    this.list = []
                    this.sortMode = 3
                    this.fetchAllReplysSortByZan()
                }
        }

        //投票
        if (e.type == 'vote') {
            var voteids = ""
            for (var x in this.votes) {
                voteids = this.votes[x] + ","
            }
            PostApi.vote(this.topic.topic_id, voteids)
                .then(data => {
                    const rs = JSON.parse(data.data.data)
                    prompt.showToast({
                        message: rs.errcode
                    })
                    this.refresh()
                })
                .catch(data => {
                    prompt.showToast({
                        message: data
                    })
                })
        }


        //选择投票的选项
        if (e.type == 'change-vote') {


            if (e.data.check) {
                this.votes.push(e.data.id)
            } else {

                let newVotes = []
                for (var x in this.votes) {
                    if (this.votes[x] != e.data.id)
                        newVotes.push(this.votes[x])
                }
                this.votes = newVotes
            }



        }


        //点击用户
        if (e.type == 'user') {
            router.push({
                uri: "Main/User",
                params: {
                    uid: e.data
                }
            })
        }

        //浏览图片
        if (e.type == 'view-image') {
            var images = this.topicImages
            for (var x in this.images)
                images.push(this.images[x])
            ImageUtil.ViewImage(e.data, images)

        }




        //跳转到评论页面
        if (e.type == 'comment') {
            router.push({
                uri: "Main/Post/Reply",
                params: {
                    option: {
                        type: e.type,
                        topicId: this.topic.topic_id
                    }

                }
            })
        }

        //回复,跳转到评论页面
        if (e.type == 'reply') {
            this.commentReplyId = this.list[e.data].reply_posts_id
            router.push({
                uri: "Main/Post/Reply",
                params: {

                    option: {
                        type: "reply",
                        topicId: this.topic.topic_id,
                        replyId: this.commentReplyId
                    }
                }
            })
        }


    }
    , async replySupport(index) {

        const pid = this.list[index].reply_posts_id
        const type = 'post'
        const tid = 0
        try {

            const res = await PostApi.supportPost(tid, pid, type)
            const re = JSON.parse(res.data.data)
            prompt.showToast({
                message: re.errcode
            })
            this.list[index].extraPanel[0].extParams.isHasRecommendAdd = 1
            this.list[index].extraPanel[0].extParams.recommendAdd++

        } catch (e) {
            prompt.showToast({
                message: JSON.stringify(e)
            })
            console.err(JSON.stringify(e))
        }
    },
    renderTopic(json) {

        json.topic.create_date = DateUtil.convertTime(json.topic.create_date)
        json.topic.content = this.convertEmoji(json.topic.content)

        //如果没有投票选项的画,处理成对应的结构保证渲染成功...
        if (json.topic.poll_info == null) {

            json.topic.poll_info = {
                poll_item_list: []
            }
        }
        this.topic = json.topic

        //如果赞的列表里面已经有了自己，就不显示点赞了
        for(var x in json.topic.zanList){
          var zan = json.topic.zanList[x]
          if(zan.recommenduid == this.$app.$def.cache.user.uid){
            this.zan.hasZhan = true
          }
        }


        // 如果是图片的话,添加到图片总数之中
        this.topicImages = []
        for (var x in json.topic.content) {
            var re = json.topic.content[x]

            if (re.type == 1) {
                this.topicImages.push(re.originalInfo)
            }
        }



        //处理投票数据
        if (this.topic.poll_info != null) {

            var pollInfo = this.topic.poll_info.poll_item_list
            for (var x in pollInfo) {
                pollInfo[x].percentNumber = pollInfo[x].percent.substring(0, pollInfo[x].percent.length - 1)
            }
        }





        this.renderTopicComplete()
    },
    renderTopicComplete() {

        this.showImage = true
        this.showCommentBtn = true
        this.showMenu = true
        this.loadMore()

        //NOTE: 没有用的
        // //当topic加载完之后，才会把ScoreDialog加载出来，所以这个时候可以找一下
        // try{
        //   if(this.scoreDialog != null ){
        //     return
        //   }
        //   this.scoreDialog = this.$element('score-dialog')
        //   if(this.scoreDialog == null){
        //     console.error("读取scoreDialog失败")
        //   }
        //
        // }catch(e){
        //   console.error(e)
        // }
    },
    renderReply(json) {
        if (json.list != null && json.list.length != 0) {

            /**
             *  fixbug: 需要在筛选之前就充值this.image里面的内容，不然的话就没了
             */
             this.images = []
             for (var x in json.list) {
                 var re = json.list[x]
                 //NOTE:如果是图片的话,添加到图片总数之中
                 for (var y in re.reply_content) {
                     var rc = re.reply_content[y]
                     if (rc.type == 1) {
                         this.images.push(rc.originalInfo)
                     }
                 }
             }

            //根据缓存中的最后一个帖子的{{posts_date}}时间筛选json.list里面的东西
            var tempList = []
            for (var x in json.list) {
                if (json.list[x].posts_date > this.lastReplyTime)
                    tempList.push(json.list[x])
            }
            json.list = tempList

            //NOTE:更新最后的回复的时间
            //NOT E: 该操作要在 @method convertList() 之前,否则最后的回复时间会变成字符而不是时间戳
            if (json.list.length != 0)
                this.lastReplyTime = json.list[json.list.length - 1].posts_date

            json.list = this.convertList(json.list)

            //NOTE 处理数据
            for (var x in json.list) {
                var re = json.list[x]

                if (re.position <= this.DEFAULT_PAGE_SIZE + this.topNumber + 1) {
                    re.position -= this.topNumber
                }
            }





            this.list = this.list.concat(json.list)

            //note: 获取签名
            for(let v in this.list){
              this.convertSign(v)
            }

            this.renderReplyComplete()

            if (json.list.length < this.DEFAULT_PAGE_SIZE || json.has_next == 0) {

                this.renderError("没有更多了")
            }

            if (json.list.length >= this.DEFAULT_PAGE_SIZE)
                this.page = this.page + 1

        } else {
            this.renderError("没有更多了")
            this.loadMoreComplete()
        }

        this.refreshComplete()


    },
    /**
     * @method renderAllReply
     * @param {object} re
     * @desc 渲染一个倒序了的回复数组
     */
    renderAllReply(re) {

        //1 判断是否为空
        if (re.list != null && re.list.length != 0) {

            //2处理时间

            this.list = this.convertList(re.list)
            // 如果是图片的话,添加到图片总数之中
            this.images = []
            for (var x in this.list) {
                var re = this.list[x]
                for (var y in re.reply_content) {
                    var rc = re.reply_content[y]
                    if (rc.type == 1) {
                        this.images.push(rc.originalInfo)
                    }
                }
            }

            this.renderError("没有更多了")
            this.renderReplyComplete()

        } else {

            this.renderError("未知错误")
            this.loadMoreComplete()

        }

        //3 结束
        this.refreshComplete()

    },
    /**
     * @method renderMoreReply
     * @param {object} json
     * @desc 同 @method loadMore
     */
    renderMoreReply(json) {


        if (json.list != null && json.list.length != 0) {


            //根据筛选json.list里面的东西
            var tempList = []
            for (var x in json.list) {
                if (json.list[x].posts_date > this.lastReplyTime)
                    tempList.push(json.list[x])
            }
            json.list = tempList



            //更新最后的回复的时间
            if (json.list.length != 0)
                this.lastReplyTime = json.list[json.list.length - 1].posts_date

            json.list = this.convertList(json.list)

            // 如果是图片的话,添加到图片总数之中
            for (var x in json.list) {
                var re = json.list[x]
                for (var y in re.reply_content) {
                    var rc = re.reply_content[y]
                    if (rc.type == 1) {
                        this.images.push(rc.originalInfo)
                    }
                }
            }

            this.list = this.list.concat(json.list)

            if (json.list.length < this.DEFAULT_PAGE_SIZE || json.has_next == 0) {

                this.renderError("没有更多了")
            }

            if (json.list.length >= this.DEFAULT_PAGE_SIZE)
                this.page = this.page + 1

            this.renderReplyComplete()
        } else {
            this.renderError("没有更多了")
            this.loadMoreComplete()
        }

    },
    renderReplyComplete() {


        this.loadMoreComplete()
    },
    renderError(msg) {
        this.$broadcast("render_no_more", { tag: this.TAG })

    },
    refresh() {
        this.fetchTopic()
    }
    /**
     * @method loadMore
     */
    , loadMore() {
        if (this.canLoadMore) {
            this.canLoadMore = false

            if (this.sortMode == 1)
                this.fetchReplys()

        }
    },
    loadMoreComplete() {
        this.canLoadMore = true

    },
    fetchTopic() {

        PostApi.fetchPostDetail(1, this.topicid,
            function (data) {
                try {
                  let json = JSON.parse(data.data)
                  if (json.rs == 1) {
                    this.renderTopic(json)


                  } else {
                    this.renderError(json.errcode)
                  }
                } catch (e) {
                  console.info('Your data is : ', data )
                  console.error('Error while fetchTopic : ' + e)
                  this.renderError('抱歉服务器发生了一下错误')
                }

            }.bind(this),
            function (data, code) {
                console.log(data);
            })

    },
    /**
     * @method fetchReplys
     */
    fetchReplys() {
        PostApi.fetchPostDetail(this.page, this.topicid,
            function (data) {

              try {
                let json = JSON.parse(data.data)

                if (json.rs == 1) {

                  //update totalNumber
                  if (json.total_num != null)
                  this.totalNumber = json.total_num

                  if (this.page == 1) {
                    this.renderReply(json)
                  } else {
                    this.renderMoreReply(json)
                  }
                } else {
                  this.renderError(json.errcode)
                }
              } catch (e) {
                console.error('Error in fetchReplys() : ' + e)
                this.renderError('抱歉服务器发生了一些错误')
              }


            }.bind(this),
            function (data, code) {
                console.log(data);
            })

    },
    /**
     * @method fetchReverseReplys
     */
    async fetchReverseReplys() {

        //1 加载所有回复
        await PostApi.all(this.topicid, this.totalNumber)
            .then(data => {
                const re = JSON.parse(data.data.data)
                this.sortMode = 2
                re.list = re.list.reverse()
                this.renderAllReply(re)
            }).catch(data => {
                prompt.showToast({
                    message: data.data
                })
            })
        //2 倒序
    },
    /**
     * @method fetchAllReplysSortByZan
     * @desc 尝试获取按赞排序
     */
    async fetchAllReplysSortByZan() {
        await PostApi.all(this.topicid, this.totalNumber)
            .then(data => {
                let re = JSON.parse(data.data.data)
                this.sortMode = 3
                re.list = re.list.sort((a,b) => {
                    return b.extraPanel[0].extParams.recommendAdd - a.extraPanel[0].extParams.recommendAdd;
                })
                //todo: 先用倒序回复的先
                this.renderAllReply(re)
            })
            .catch(data => {
                prompt.showToast({
                    message: data.data
                })
            })
    },
    reqRefresh(e) {
        this.isRefreshing = e.refreshing


        if (this.sortMode == 1) {

            this.page = 1
            this.fetchReplys()

        } else if (this.sortMode == 2) {
            this.fetchReverseReplys()
            this.lastReplyTime = 0
        }
    },
    refreshComplete() {

        if (this.isRefreshing) {
            this.isRefreshing = false

            prompt.showToast({
                message: '刷新完成'
            })
        }

    }

}
