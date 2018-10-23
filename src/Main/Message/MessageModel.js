import storage from '@system.storage'
import MessageApi from "../../Common/MessageApi"
import DateUtil from "../../Common/DateUtil"



class Message{



    constructor(tag){


        this.TYPE_POST = "post"
        this.TYPE_ATME = "atme"
        this.TYPE_PM = "pm"
        this.TYPE_SYSTEM = "system"
        this.DEFAULT_PAGESIZE = 100

        this.tag = tag
        this.init()
    }




    init(){

        // console.info("init - "+this.tag)
        this.data = []
        this.page = 1
        // this.renderPage = 1
        // this.requestPage = 1
        this.pageSize = this.DEFAULT_PAGESIZE
    }



}


/**
* @class MessageModel
* @constructor constructor
*/
export default class MessageModel{

    /**
     * @method bindPresenter
     * @for MessageModel
     * @param {MessagePresenter} p
     */
    bindPresenter(p){
        this.presenter = p
    }

    constructor(uid){
        // af 常量标识MessageModel在storage中的值
        this.KEY = "MessageModel"+uid
        this.CODE_SUCCESS = 2333
        this.CODE_EMPTY = 2111
        this.TYPE_POST = "post"


        this.TYPE_ATME = "atme"
        this.TYPE_PM = "pm"
        this.TYPE_SYSTEM = "system"

        this.model = this.buildModel(null)

        this.init()
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
            post: m && m.post?m.post:new Message("post"),
            atme : m && m.atme ? m.atme : new Message("atme"),
            pm : m && m.pm ? m.pm : new Message("pm"),
            system : m && m.system ? m.system : new Message("system")
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
           case this.TYPE_PM:
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

           case this.TYPE_SYSTEM:
               list = re.body.data

               for (let x in list){
                 var l = list[x]
                     // console.info(JSON.stringify(list[x]))
                 l.replied_date = DateUtil.convertTime(l.replied_date)
                 l.topic_content = l.note
               }

               break;

           case this.TYPE_POST:
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
           case this.TYPE_ATME:
           default:

               list = re.body.data

               for (let x in list){
                 var l = list[x]
                 l.replied_date = DateUtil.convertTime(l.replied_date)
                 //清空
                 l.topic_content = l.topic_content.replace(/(^\s*)|(\s*$)/g, "")
                 l.reply_content = l.reply_content.replace(/(^\s*)|(\s*$)/g, "")
               }
               break;
         }

         // console.info("convertData "+type+"/"+list.length)
         return list
    }


    /**
     *
     * @method fetch
     * @for MessageModel
     * @param {number} page
     * @param {string} type
     * @desc 从互联网获取数据,如果是第一页数据的话就当成是刷新,刷新的时候要清空其他数据
     */
    async fetch(page,type){
        var that = this
        return new Promise(function (resolve,reject){



            var success = function(re){



                //console.info("success : "+JSON.stringify(re))
                var list = that.convertData(re,type)

                if(list == null || list.length == 0) resolve({data:null,type:type})
                re.list = list
                var module

                switch(type){
                    case that.TYPE_POST :
                        module = that.model.post
                        break;
                    case that.TYPE_ATME :
                        module = that.model.atme
                        break;
                    case that.TYPE_PM :
                        module = that.model.pm
                        break;
                    case that.TYPE_SYSTEM :
                        module = that.model.system
                        break;
                    default:
                        return;
                }

                //NOTE : 主动刷新数据
                if(page == 1 && module.data.length != 0){
                    module.data = [re]
                    module.page = 1
                }
                //NOTE: 系统消息有可能第一页返回结果的长度是0
                else if(page == 1 && module.data.length == 0 && type == that.TYPE_SYSTEM) {
                    module.data = [re]
                    module.page = 1

                } else{

                    module.data.push(re)
                }



                //// FIXME:  很迷
                // console.info(type+"?"+module.data.length)
                module.page++
                resolve({data:re,type:type})

                var saveRes = that.save()
            }


            switch(type){
                case that.TYPE_POST :
                    MessageApi.fetchMessagePost(success,that.model.post.pageSize,page)
                    break;
                case that.TYPE_ATME :
                    MessageApi.fetchMessageAtMe(success,that.model.atme.pageSize,page)
                    break;
                case that.TYPE_PM :
                    MessageApi.fetchMessagePmseMission(success,that.model.pm.pageSize,page)
                    break;
                case that.TYPE_SYSTEM :
                    MessageApi.fetchMessageSystem(success,that.model.system.pageSize,page)
                    break;
            }

        })
    }


    /** 单例
    * @method getInstance 获取单例
    * @for MessageModel
    * @param {MessagePresenter} p 获取的同时绑定一个presenter
    * @return {MessageModel}
    */
    static getInstance(p,uid){

        if(!this.instance){
            this.instance = new MessageModel(uid)
        }
        if(p)
            this.instance.bindPresenter(p)
        return this.instance
    }


    /**
     *
     * @method init 初始化
     */
    async init(){

        try{

            // NOTE: STEP 1: 从本地加载缓存数据
            var res = await this.initData()
            if(res.code == this.CODE_SUCCESS){
                const o = JSON.parse(res.data)
                this.model = this.buildModel(o)

                //NOTE : 从本地加载数据完成时,尝试通知presenter刷新数据
                if(this.presenter){
                    this.presenter.attach()
                }
            }
            // console.info("MessageModel init success")
        } catch(err){
            console.info("error"+err.code)
        }


    }


    /**
     * @method initData 异步从storage加载数据
     * @for MessageModel
     * @param resolve
     * @param reject
     */
    async initData(resolve,reject){
        var that = this
        return new Promise((resolve,reject)=>{

            storage.get({
                key :  that.KEY,
                success:function(data){
                    if(data == '')
                        reject({data:data,code:that.CODE_EMPTY})
                    else
                        resolve({data:data,code:that.CODE_SUCCESS})
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
    async load(page,type){
        try{
            const re =  await this.fetch(page,type)
            return re.data
        } catch(err){
            console.error(err.msg)
            return null
        }
     }

    loadLocal(type){
        return this.model[type].data[0]
    }


    async loadLocalPmlist(toUserId,pid){
        const key = this.KEY+toUserId+pid
        var local =  await storage.get({key : key})
        local = local.data
        if(local == ''|| local == null) local = '{}'
        return JSON.parse(local)
    }

    async savePmlist(toUserId,pid,re){
        const key = this.KEY+toUserId+pid
        return await storage.set({
                    key :key,
                    value :JSON.stringify(re)
                })

    }

    /**
     * @method pmseMissionList
     * @for MessageModel
     */
    async pmseMissionList(toUserId,pid){

        return new Promise(function(resolve, reject) {

            var success = function(re){
                if(re.rs ==1)
                    resolve(re)
                else
                    reject(re)
            }

            MessageApi.fetchPmseMissionList(
                toUserId,
                pid,
                pid,
                success)
        });
    }

    /**
     * @method save 异步保存数据
     *
     */
    save(){
        const data = JSON.stringify(this.model)

        storage.set({
            key :this.KEY,
            value :data,
            success :function(data){
            },
            fail :function(data,code){
            }
        })

    }


}
