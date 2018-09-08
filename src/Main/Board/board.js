
  import BoardApi from '../../Common/BoardApi'
  import DateUtil from '../../Common/DateUtil'
  import router from '@system.router'
  import prompt from '@system.prompt'

  export default{
    protected :{
      boardId :"",
      list : [{
        page :0,
        postlist :[],
        canLoadMore :true,
        isRefreshing :false,
      }],
      forumInfo :{
        title : ""
      },
      boardList : [],
      boardIndex :0,
      deFloatBar :false

    },
    onInit(){
      BoardApi.init(this.$app)
    },
    onShow(){
      this.refresh()
    },
    onClickBoard(index){

      this.onChangeBoard(index)
    },
    onClickPost(topicid){
      // console.log("click : " + a.target.attr.topicid);

      router.push({
        uri : 'Main/Post/Detail',
        params : {
          topicid : topicid
        }
      })

    },
    onClickFloatBar(){
      this.deFloatBar = this.deFloatBar ? false : true
    },
    onClickNew(){
      router.push({
        uri : "Main/Post/Write"
      })
    },
    onChangeBoard(index){

      if(this.boardIndex != index){

        this.boardIndex = index

        let listview = this.$element("child-board")

        listview.scrollTo({
          index : index-1
        })


        if(this.list[index].page <1)
          this.fetchBoardPostList(index)
      }

    },
    changeTabBoard(e){

        const index = e.index
        this.onChangeBoard(index)

    },
    convertList(list){

       for(let x in  list){
         let time =  list[x].last_reply_date
          list[x].last_reply_date = DateUtil.convertTime(time)
       }

    },
    refresh(){
      this.fetchClassificationTypeList()
    },
    renderPost(index,list){
        this.convertList(list)
        this.list[index].postlist = list
        this.list[index].page = this.list[index].page+1

        if(this.list[index].isRefreshing){
          this.refreshComplete(index)
        }

    },
    renderMorePost(index,list){
       this.convertList(list)

       this.list[index].postlist = this.list[index].postlist.concat(list)
       this.list[index].page = this.list[index].page+1

       this.loadMoreComplete(index)
    },
    reqRefresh(i,e){
      this.list[i].isRefreshing = e.refreshing
      this.list[i].page = 0
      this.fetchBoardPostList(i)
    },
    refreshComplete(i){
      this.list[i].isRefreshing = false

      prompt.showToast({
          message: 'refresh complete'
      })
    },
    fetchClassificationTypeList(){
 
          BoardApi.fetchClassificationTypeList(this.boardId,
            function (data){
              const re = JSON.parse(data.data)

              console.info(JSON.stringify(re))
              this.forumInfo = re.forumInfo
              this.renderPost(0,re.list)

              this.loadChild()

            }.bind(this))
    },
    fetchBoardPostList(boardIndex){


        //先根据传进来的board索引，转换成对应的id
        let boardId = this.boardId

        if(boardIndex > 0)
          boardId = this.boardList[boardIndex-1].board_id



        //同样获取page
        let requestPage = this.list[boardIndex].page +1

        console.log(JSON.stringify(this.list) );
        //现在有对应的boardid和page了 ，就根据id和page获取对应的postlist



        //callback
        var success = function (re){


          if(re.rs == 1){


              if(requestPage>1){
                        console.log("success");

                this.renderMorePost(boardIndex,re.list)
              } else{
                this.renderPost(boardIndex,re.list)
              }

          }


        }.bind(this)


        //进行请求数据
        BoardApi.fetchBoardPostList(
          requestPage,
          boardId,
          success)

    },
    loadChild(){
      BoardApi.fetchChildBoardList(this.forumInfo.id,
        function (re){
          if(re.list.length > 0){

            this.boardList = re.list[0].board_list
          }

          this.loadChildComplete()
        }.bind(this))
    },
    loadChildComplete(){

      this.initList()

    },
    loadMore(index){
      let that = this.list[index]
      if(that.canLoadMore){
        that.canLoadMore = false
        that.page = that.page+1

                console.log("success");
        this.fetchBoardPostList(index)

      }
    },
    loadMoreComplete(index){
      this.list[index].canLoadMore = true
    },
    initList(){

      for(let x in this.boardList){
        this.list.push({
          page :0,
          postlist :[],
          canLoadMore :true,
          isRefreshing :false,
          pro_show : true,
          pro_msg : ""
        })
      }
    },


  }
