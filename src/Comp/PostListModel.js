import storage from '@system.storage'
import BoardApi from '../Common/BoardApi'
import ForumApi from '../Common/ForumApi'
import UserApi from '../Common/UserApi'
import PostApi from '../Common/PostApi'
/**
 * @class PostListModel
 * @constructor constructor
 */

export default class PostListModel{


    constructor(app){

        this.KEY = "PostListModel"
        BoardApi.init(app)
        UserApi.init(app)

    }

    static getInstance(app,presenter){

        if(!this.instance)
            this.instance = new PostListModel(app)

        if(!presenter)
            this.presenter = presenter

        return this.instance

    }

    async loadLocal(key){
        const that = this

        try{

            const local =  await storage.get({key : this.KEY+key})
            return JSON.parse(local.data)
        } catch(err){
            console.error('local local')
            return null
        }
    }

    async loadMuteStatus () {
      let key = 'UserModel' + UserApi.user().uid + "/mute/user"

      let mutes = await storage.get({key: key})
      try {
        mutes = JSON.parse(mutes.data)
      } catch (e) {
        console.info('load no mutes')
      }
      console.info('load mutes from key:' + key, mutes)
      return mutes;
    }

    load(page,tag,suc,type,fail){

        const that = this
        var success = function(re){
            if(page == 1)
            {
                that.save(tag,JSON.stringify(re))
            }

            suc(re)
        }

        // NOTE : froum
        if(type == 'forum'){

            ForumApi.getPostByTag(tag,page,
                success
            )
        }

        // NOTE : my publish
        if(type == 'me-publish'){
            //NOTE: 或取发过的帖子
            UserApi.getMePosts(tag,page,20,
                success)

        }


        // NOTE : my reply
        if(type == 'me-reply'){

            UserApi.getUserReplyPost(tag,page,10,
              success
            )
        }

        // NOTE : my favorite
        if(type == 'favorite'){
            UserApi.getUserFavoritePost(tag,page,10,
              success
            )
        }

        // NOTE : board
        if(type == 'board'){
            //进行请求数据
            BoardApi.fetchBoardPostList(
              page,
              tag,
              success)
        }

        // NOTE : search
        if(type == 'search'){
            const key = tag
            PostApi.search(key,page,success,fail)
        }
    }

    async save(key,data){
        const set = await storage.set({key:this.KEY+key,value:data})
    }
}
