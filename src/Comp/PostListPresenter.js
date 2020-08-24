
import PostListModel from './PostListModel'
import DateUtil from  '../Common/DateUtil'
import router from '@system.router'
import storage from '@system.storage'

/**
 * 为了筛选一些临时错误
 */
import Api from '../Common/Api'

/**
 * @class PostListPresenter
 * @constructor constructor
 */
export default class PostListPresenter{

    constructor(view){
        this.view = view
        this.app = view.context.$app
        this.tag = view.context.tag
        this.type = view.context.type
        this.model = PostListModel.getInstance(this.app,this)
        this.muteUsers = {}
    }

    /**
     * @method attach
     */
    async attach(){


        const re = await this.model.loadLocal(this.tag)

        if(re!= null){

            for(let x in re.list){
                let time = re.list[x].last_reply_date
                re.list[x].last_reply_date = DateUtil.convertTime(time)

                re.list[x].userAvatar = "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid="+re.list[x].user_id+"&size=big"
            }
            this.view.render(re.list)
        }

        this.refresh()

    }

    /**
    * @method fetchPosts
    * @param {string} tag
    * @param {number} page
    */
    fetchPosts(tag,page){
        var success = function (re){

          let x
          for(x in re.list){

              if (this.muteUsers[re.list[x].user_id])
                re.list[x].isMute = true
              else
                re.list[x].isMute = false
              let time = re.list[x].last_reply_date
              re.list[x].last_reply_date = DateUtil.convertTime(time)
              re.list[x].userAvatar = "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid="+re.list[x].user_id+"&size=big"
          }

          /**
           * 临时无奈的筛选
           */
          try {
            re.list = re.list.filter(item => {
              for (let x in Api.BOARD_CAN_NOT_FETCH) {
                if (Api.BOARD_CAN_NOT_FETCH[x] === item.board_name) {
                  return false
                }
              }
              return true
            })
          } catch (e) {
            console.error(JSON.stringify(e))
          }

          if(page == 1){
              this.view.render(re.list)
          } else {

              // console.log(JSON.stringify(re.list));
              this.view.renderMore(re.list)
          }

          if(re.has_next == 0 ){
              this.view.renderError("没有更多了")
              return
          }

        }.bind(this)

        var fail = function(re){
              console.info("search fail",JSON.stringify(re))
              this.view.renderError("没有更多了")
        }.bind(this)


        this.model.load(page,tag,success,this.type,fail)
    }


    /**
     * @method loadMore
     */
    loadMore(){

        this.view.renderLoading()
        this.canLoadMore = false
        this.page = this.page+ 1
        this.fetchPosts(this.tag,this.page)

    }


    /**
     * @method
     * @param {Object} event
     */
    onEvent(event){
        switch(event.type){
            case 'post':

                router.push({
                  uri : 'Main/Post/Detail',
                  params : {
                    topicid :event.data
                  }
                })
                break;
            case 'user':
                router.push({
                    uri : "Main/User",
                    params :{
                        uid :event.data
                    }
                })
                break;
        }
    }


    /**
     * @method refresh
     */
     async refresh(){

         this.muteUsers = await this.model.loadMuteStatus()
         this.muteUsers = this.muteUsers.muteUsers
         this.page = 1
         this.view.renderLoading()
         this.fetchPosts(this.tag,this.page)
     }


}
