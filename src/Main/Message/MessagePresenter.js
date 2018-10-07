import MessageApi from "../../Common/MessageApi"
import router from '@system.router'
import MessageModel from "./MessageModel"
import prompt from '@system.prompt'
import notification from '@system.notification'
import vibrator from '@system.vibrator'

/**
 * @class MessagePresenter
 * @constructor constructor
 */
 export default class MessagePresenter{

    /**
     * 构造方法
     * @method constructor
     * @param {MessageView} view
     */
    constructor(view){


        this.TYPE_POST = "post"
        this.TYPE_ATME = "atme"
        this.TYPE_PM = "pm"
        this.TYPE_SYSTEM = "system"


        this.view = view
        this.app = view.context.$app
        this.model = MessageModel.getInstance(this,this.app.$def.cache.user.uid)
        this.tryToLoadPmList = false

        this.stopHeart = false
        this.showNotification = false

        //NOTE : 缓存,用来判断是否应该刷新某个消息页面或者发出消息提醒
        this.cacheHeart = {
            render :true,
            reply:0,
            atme:0,
            system:0,
            pm:0
        }


        this.cache = {
            'post':{
              'page' : 1,
              'canLoadMore' :true,
              'dataLength' : 0,
              'totalNum' : 0
            },
            'atme':{
              'page' : 1,
              'canLoadMore' :true,
              'dataLength' : 0,
              'totalNum' : 0
            },
            'pm':{
              'page' : 1,
              'canLoadMore' :true,
              'dataLength' : 0,
              'totalNum' : 0
            },
            'system':{
              'page' : 1,
              'canLoadMore' :true,
              'dataLength' : 0,
              'totalNum' : 0
            }
        }
    }



    /**
     * attach
     * @method attach
     */
    attach(){
        this.loadLocal(this.TYPE_POST)
        this.loadLocal(this.TYPE_ATME)
        this.loadLocal(this.TYPE_PM)
        this.loadLocal(this.TYPE_SYSTEM)
        this.refresh(this.TYPE_POST)
        this.refresh(this.TYPE_ATME)
        this.refresh(this.TYPE_PM)
        this.refresh(this.TYPE_SYSTEM)
        this.fetchHeart()
    }

    /**
     * @method fetchHeart
     */
    async fetchHeart(){
        await MessageApi.fetchHeart()
        .then(data =>{
            const rs = JSON.parse(data.data.data)
            if(rs.body.replyInfo.count != this.cacheHeart.reply
            || rs.body.atMeInfo.count != this.cacheHeart.atme
            || rs.body.systemInfo.count != this.cacheHeart.system
            || (rs.body.pmInfos.length != 0
                && rs.body.pmInfos[0].time != this.cacheHeart.pm)){



                if(rs.body.replyInfo.count != this.cacheHeart.reply ){
                    this.refresh(this.TYPE_POST)
                    this.cacheHeart.reply = rs.body.replyInfo.count
                }
                if(rs.body.systemInfo.count != this.cacheHeart.system ){
                    this.refresh(this.TYPE_SYSTEM)
                    this.cacheHeart.system = rs.body.systemInfo.count
                }
                if( rs.body.pmInfos[0].time != this.cacheHeart.pm  ){

                    this.refresh(this.TYPE_PM)
                    this.cacheHeart.pm = rs.body.pmInfos[0].time
                }
                if(rs.body.atMeInfo.count !=  this.cacheHeart.atme){

                    this.refresh(this.TYPE_ATME)
                    this.cacheHeart.atme = rs.body.atMeInfo.count
                }

                if(this.cacheHeart.render){
                    this.view.renderHeart(this.showNotification)
                    this.cacheHeart.render = false
                }
            } else {

                //NOTE heart返回的数据与上一次一样,表示暂时没有新的消息了
                this.cacheHeart.render = true
            }

        })
        .catch(data =>{
            console.error(data)
        })

        if(this.stopHeart)
            return;

        setTimeout(function(){
            this.fetchHeart()
        }.bind(this),5000)
    }

    /**
     * @method laodLocal
     * @param {string} type
     */
    loadLocal(type){
        const re = this.model.loadLocal(type)
        if(!re) {
            this.view.renderNoMore("没有更多了",type)
            return
        }
        var list = re.list
        if(!list) {
            this.view.renderNoMore("没有更多了",type)
            return
        }

        this.cache[type].hax_next = re.has_next
        this.cache[type].totalNum = re.total_num
        this.cache[type].dataLength = list.length
        this.cache[type].canLoadMore = true
        if(list != null && list.length != 0)
            this.view.renderData(list,type)
        else
            this.view.renderNoMore("没有更多了",type)
    }

    /**
     * 加载
     * @method loadMore
     * @param type
     */
    async loadMore(type){

        if(this.cache[type].canLoadMore){

            this.view.renderLoading(type)

            if(this.cache[type].totalNum <= this.cache[type].dataLength){
                this.view.renderNoMore("没有更多了",type)
                this.cache[type].canLoadMore = false
                return
            }

            this.cache[type].page = this.cache[type].page +1

            var re = await this.model.load(this.cache[type].page,type)

            if(!re) {

                this.view.renderNoMore("没有更多了",type)

                return
            }
            var list = re.list

            if(!list) {

                this.view.renderNoMore("没有更多了",type)

                return
            }

            this.cache[type].hax_next = re.has_next

            this.cache[type].totalNum = re.total_num

            this.cache[type].dataLength += list.length

            if(list != null && list.length != 0)

                this.view.renderMoreData(list,type)

            else

                this.view.renderNoMore("没有更多了",type)

            this.cache[type].canLoadMore  = true
        }
    }


    /**
     * 刷新
     * @method refresh
     * @param type
     */
    async refresh(type){
        this.cache[type].page = 1
        const re =await this.model.load(1, type)

        if(!re) {
            this.view.renderNoMore("没有更多了",type)
            return
        }
        var list = re.list
        if(!list) {
            this.view.renderNoMore("没有更多了",type)
            return
        }

        this.cache[type].hax_next = re.has_next

        this.cache[type].totalNum = re.total_num

        this.cache[type].dataLength = list.length

        this.cache[type].canLoadMore = true

        if(list != null && list.length != 0)

            this.view.renderData(list,type)

        else

            this.view.renderNoMore("没有更多了",type)
    }


    onRefreshComplete(tag){

          if(this.cache[tag].hax_next == 0){

              this.cache[tag].canLoadMore = false

              this.view.renderNoMore("没有更多了",tag)

          }
    }


    /**
     * 点击事件
     * @method onEvent
     * @param {string} type
     * @param {any} arg
     * @event
     */
    async onEvent(type,arg){

         if(type == 'show-home-view'){
             this.stopHeart = false
             this.showNotification = false
             this.fetchHeart()
        }

        if(type == 'hide-home-view'){
            this.showNotification = true
        }

        if(type == "system"){

            //TODO:得改,但是怎么改,
            prompt.showToast({
                message :"暂不支持"
            })
        }

        if(type == "action"){

            var item  = arg
            var actions = item.actions

            if(actions == null || actions.length <1){

                        prompt.showToast({
                            message :"点我是没有反应的,朋友"
                        })
            } else{


                //NOTE:还是用跳转吧 太累了 太多东西
                router.push({
                    uri:"Other/Web",
                    params:{
                        baseUrl:actions[0].redirect
                    }
                })
                // var onDealMessageSuccess  = function (re){
                //
                //     prompt.showToast({
                //         message : re.errcode
                //     })
                // }
                //
                // MessageApi.dealMessageActions(actions,onDealMessageSuccess)


            }

        }

        if(type == "user"){

            router.push({
                uri : "Main/User",
                params :{
                    uid :arg
                }
            })
        }
        if(type == "topic"){
            var topicId = arg


            router.push({
              uri : 'Main/Post/Detail',
              params : {
                topicid : topicId
              }
            })

        }

        if(type == 'pm'){
            var item = arg
            if(this.tryToLoadPmList)
                return

            this.tryToLoadPmList = true


              router.push({
                uri :"Main/Message/PmList",
                params :{
                  toUserId:item.toUserId,
                  plid : item.plid
                }
              })
              this.stopHeart = true

             this.tryToLoadPmList = false
        }
    }
}
