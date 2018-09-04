import storage from '@system.storage'
import BoardApi from '../Common/BoardApi'
import ForumApi from '../Common/ForumApi'
import UserApi from '../Common/UserApi'
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

    static getInstance(p){

        if(!this.instance)
            this.instance = new PostListModel()

        if(!p)
            this.presenter = p

        return this.instance

    }

    async loadLocal(key){
        const that = this
        try{

            const local =  await storage.get({key : this.KEY+key}) 
            return JSON.parse(local.data)
        } catch(err){
            return null
        }
    }

    load(page,tag,suc,type){

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

        // NOTE : board
        if(type == 'board'){
            //进行请求数据
            BoardApi.fetchBoardPostList(
              page,
              tag,
              success)
        }
    }

    async save(key,data){
        const set = await storage.set({key:this.KEY+key,value:data})
    }
}
