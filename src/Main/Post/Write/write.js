
    import BoardApi from '../../../Common/BoardApi'
    import PostApi from '../../../Common/PostApi'
    import prompt from '@system.prompt'
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
        isPublishing : false


      },
      onInit(){
        BoardApi.init(this.$app)
        PostApi.init(this.$app)
        BoardApi.getForumList(
          function(data){
              const re = JSON.parse(data.data)
              this.category = re.list


          }.bind(this),
          function(data,code){
            console.log(code);
          }
        )
      },
      onChangeGategory(e){

          this.test = e.newValue
          this.board = []
          this.board = JSON.parse(e.newValue).board_list
          // this.childBoard = []
          this.onChangeBoard(this.board[0])
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
      ,onChangeBoard(board){


        this.classificationType_list = [{
                "classificationType_id": 0,
                "classificationType_name": "无"
        }]
        this.targetClass = this.classificationType_list[0]



        var success = function (data){


            const re = JSON.parse(data.data)

            this.targettBoardForumInfo = re.forumInfo
            this.targetBoard = board


            this.classificationType_list = this.classificationType_list.concat(re.classificationType_list)


        }.bind(this)

        BoardApi.fetchClassificationTypeList(board.board_id,
          success)
      },
      onClickClassification(e){
          this.targetClass = e
          // console.log(id);
      }
      ,onPublish(){

            if(this.isPublishing){

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
                    info.tyoeId = this.targetClass.classificationType_id

                    var body = {}
                    body.json = info

                    var publishJson = {}
                    publishJson.body = body


                    PostApi.publish(publishJson,
                      function(data){
                        console.log(data.data);
                        const re = JSON.parse(data.data)

                        prompt.showToast({
                          message : re.errcode
                        })

                        this.isPublishing = false

                      }.bind(this))


                    }

            }

    }
