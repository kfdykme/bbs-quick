import storage from '@system.storage'
import MessageApi from "../../Common/MessageApi"



class Post{

    static TYPE_POST = "post"
    static TYPE_ATME = "atme"
    static TYPE_PM = "pm"
    static TYPE_SYSTEM = "system"
    static DEFAULT_PAGESIZE = 10


    constructor(tag){
        this.tag = tag
        this.data = []
        this.renderPage = 1
        this.requestPage = 1
        this.pageSize = Post.DEFAULT_PAGESIZE
    }


    /**
    * 从已有的Post实例中加载
    * @method load
    * @param {object} post
    */
    load(post){
        this.data = post.data
        this.renderPage = post.renderPost
        this.requestPage = post.requestPage
        this.pageSize = post.pageSize
    }



}


/**
* @class MessageModel
* @constructor constructor
*/
export default class MessageModel{

    // af 常量标识MessageModel在storage中的值
    static KEY = "MessageModel"
    static CODE_SUCCESS = 2222

    constructor(){
        this.model = buildModel(null,null,null,null)
        this.init()
        console.info("constructor MessageModel complete")
    }


    /**
     * @method buildModel
     * @for MessageModel
     * @param {Post} post
     * @param {Post} atme
     * @param {Post} pm
     * @param {Post} system
     * @return {object}
     */
    buildModel(m){
        const model = {
            post: m && m.post?m.post:new Post("post"),
            atme : m && m.atme ? m.atme : new Post("atme"),
            pm : m && m.pm ? m.pm : new Post("pm"),
            system : m && m.system ? m.system : new Post("system")
        }

        return model
    }


    /**
     * 处理消息数据
     * @method convertData
     * @for MessageModel
     * @param {object} re 网络请求返回的内容实体
     * @param {string} type
     * @return {array} list 数组
     */
    convertData(re,type){


         var list = null
         switch (type) {
           case Post.TYPE_PM:
               re.has_next = re.body.hasNext
               re.totalNum = re.body.count
               list = re.body.list
               for (let x in list){
                 var l = list[x]
                 l.replied_date = DateUtil.convertTime(l.lastDateline)
                 l.topic_content = l.lastSummary == "" ? "[image]" : l.lastSummary
                 l.icon = l.toUserAvatar
               }

               break;

           case Post.TYPE_SYSTEM:
               list = re.body.data

               for (let x in list){
                 var l = list[x]
                     // console.info(JSON.stringify(list[x]))
                 l.replied_date = DateUtil.convertTime(l.replied_date)
                 l.topic_content = l.note
               }

               break;

           case Post.TYPE_POST:
               list = re.body.data
               for (let x in list){
                   var l = list[x]
                   if(l.topic_content == null) {
                       // console.info(JSON.stringify(list[x]))
                       l.reply_content = l.content

                       l.reply_content = l.reply_content.replace(/(^\s*)|(\s*$)/g, "")
                   }
                   l.replied_date = DateUtil.convertTime(l.replied_date)
               }
               break;
           case Post.TYPE_ATME:
           default:

               list = re.body.data

               for (let x in list){
                 var l = list[x]
                 l.replied_date = DateUtil.convertTime(l.replied_date)
                 //清空
                 l.topic_content = l.topic_content.replace(/(^\s*)|(\s*$)/g, "")
                 console.info(JSON.stringify(l));
                 l.reply_content = l.reply_content.replace(/(^\s*)|(\s*$)/g, "")
               }
               break;
         }


         return list
    }


    /**
     *从互联网获取数据
     * @method fetch
     * @for MessageModel
     * @param {number} page
     * @param {string} type
     */
    async fetch(page,type){

        return new Promise(function resolve,reject){
            var that = this

            var success = function(re){

                var list = that.convertData(re,type)

                if(list == null || list.length == 0) reject({msg:"error"})



                switch(type){
                    case Post.TYPE_POST :
                    that.model.post.data.push(re)
                    that.model.post.requestPage++

                    break;
                    case Post.TYPE_ATME :
                    that.model.atme.data.push({
                        list :list
                    })
                    that.model.atme.requestPage++
                    break;
                    case Post.TYPE_PM :
                    that.model.pm.data.push({
                        list :list
                    })
                    that.model.pm.requestPage++
                    break;
                    case Post.TYPE_SYSTEM :
                    that.model.system.data.push({
                        list :list
                    })
                    that.model.system.requestPage++
                    break;
                }

                resolve({data:list,type:type})

                //NOTE : 主动刷新数据
                if(page == 1)
                if(this.presenter)
                this.presenter.refresh(type)

            }

            switch(type){
                case Post.TYPE_POST :
                MessageApi.fetchMessagePost(success,Post.DEFAULT_PAGESIZE,this.model.post.requestPage)
                break;
                case Post.TYPE_ATME :
                MessageApi.fetchMessageAtMe(success,Post.DEFAULT_PAGESIZE,this.model.atme.requestPage)
                break;
                case Post.TYPE_PM :
                MessageApi.fetchMessagePmseMission(success,Post.DEFAULT_PAGESIZE,this.model.pm.requestPage)
                break;
                case Post.TYPE_SYSTEM :
                MessageApi.fetchMessageSystem(success,Post.DEFAULT_PAGESIZE,this.model.system.requestPage)
                break;
            }

        }
    }


    /** 单例
    * @method getInstance 获取单例
    * @for MessageModel
    * @return {MessageModel}
    */
    static getInstance(){
        if(!this.instance){
            this.instance = new MessageModel()
        }
        return this.instance
    }


    /**
     *
     * @method init 初始化
     */
    async init(){

        // STEP 1: 从本地加载缓存数据
        var res = await this.initData()

        if(res.code == MessageModel.CODE_SUCCESS){
            const o = JSON.parse(res.data)
            this.model = buildModel(o)
        }

        console.info("MessageMode init completed")

        // STEP 2: 发送网络请求从网络端加载数据
        // NOTE: 用回调更新数据库

    }


    /**
     * @method initData 异步从storage加载数据
     * @for MessageModel
     * @param resolve
     * @param reject
     */
    async initData(resolve,reject){
        return new Promise((resolve,reject)=>{
            storage.get({
                key :  MessageModel.KEY,
                success:function(data){
                    if(data == '') data = "{}"
                    resolve({data:data,code:MessageModel.CODE_SUCCESS})
                },
                fail :function(data,code){
                    reject({data:data,code:code})
                }
            })
        })
    }



    /**
     * 加载数据
     * @method loa]
     * @param {number} page
     * @param {string} type
     */
     load(page,type){


         var module
         switch (type) {
             case Post.TYPE_POST:
                    module = this.model.post
                 break;
             case Post.TYPE_ATME:
                    module = this.model.atme
                 break;
             case Post.TYPE_SYSTEM:
                    module = this.model.system
                 break;
             case Post.TYPE_PM:
                    module = this.model.pm
                 break;
             default:
                return;
         }

         // 要用的页数等于要请求的页数
         if(module.renderPag == module.requestPage){
             await this.fetch(page,type)
         }



         return module.data[page]
     }

    /**
     * @method save 异步保存数据
     *
     */
    async save(){
        const data = JSON.stringify(this.model)
        const that = this

        return new new Promise(function(resolve, reject) {
            storage.set({
                key :MessageModel.KEY,
                value :data,
                success :function(data){
                    resolve({data})
                },
                fail :function(data,code){
                    reject({data:data,code:code})
                }
            })
        });

    }


}
