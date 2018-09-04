import MessageApi from "../../Common/MessageApi"
import router from '@system.router'
import MessageModel from "./MessageModel"
import prompt from '@system.prompt'



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
        this.model = MessageModel.getInstance(this)

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
     * @method onClickEvent
     * @param {string} type
     * @param {any} arg
     * @event
     */
    async onClickEvent(type,arg){

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

                var onDealMessageSuccess  = function (re){

                    prompt.showToast({
                        message : re.errcode
                    })
                }

                MessageApi.dealMessageActions(actions,onDealMessageSuccess)


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


            console.log("id : "+topicId);
            router.push({
              uri : 'Main/Post/Detail',
              params : {
                topicid : topicId
              }
            })

        }

        if(type == 'pm'){
            var item = arg
            const re = await this.model.pmseMissionList(item.toUserId, item.plid)

              router.push({
                uri :"Main/Message/PmList",
                params :{
                  re :re
                }
              })



        }
    }
}
