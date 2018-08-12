import MessageApi from "../../Common/MessageApi"
import DateUtil from "../../Common/DateUtil"
import router from '@system.router'

//TODO:有时候为了测试方便直接在presenter内部使用prompt
import prompt from '@system.prompt'

var app = null
var view = null



/*
* 0 -> Post
* 1 -> AtMe
* 2 -> 私信
* 3 -> system
*/
var cache =[
  {
    'page' : 1,
    'canLoadMore' :true,
    'dataLength' : 0,
    'totalNum' : 0
  },
  {
    'page' : 1,
    'canLoadMore' :true,
    'dataLength' : 0,
    'totalNum' : 0
  },
  {
    'page' : 1,
    'canLoadMore' :true,
    'dataLength' : 0,
    'totalNum' : 0
  },
  {
    'page' : 1,
    'canLoadMore' :true,
    'dataLength' : 0,
    'totalNum' : 0
  }
]


var TAG = {
  'post': 0,
  'atme' : 1,
  'pm' : 2,
  'system' : 3
}

function init(view){
    this.view = view
    this.app = view.context.$app
    MessageApi.init(this.app)
    this.attach()
}


function attach(){
    this.refresh(this.TAG.post)
    this.refresh(this.TAG.atme)
    this.refresh(this.TAG.pm)
    this.refresh(this.TAG.system)
}

function loadMore(tag){

    if(this.cache[tag].canLoadMore){

        this.view.renderLoading(tag)

        if(this.cache[tag].totalNum <= this.cache[tag].dataLength){
            this.view.renderNoMore("没有更多了",tag)
            this.cache[tag].canLoadMore = false
            return
        }



        this.cache[tag].page = this.cache[tag].page +1

        var that = this

        var success = function(re){


            // if(tag == 0 && that.cache[tag].page == 2)
            //     console.info("re  ",JSON.stringify(re))
            // else
            //     console.info("none")

            var list = that.convertData(re,tag)

            that.cache[tag].hax_next = re.has_next
            that.cache[tag].totalNum = re.total_num
            that.cache[tag].dataLength += list.length

            if(list != null && list.length != 0)
                that.view.renderMoreData(list,tag)
            else
                that.view.renderNoMore("没有更多了",tag)


            that.cache[tag].canLoadMore  = true
        }


        switch(tag){
          case this.TAG.post :
              MessageApi.fetchMessagePost(success,10,this.cache[tag].page)
              break;
          case this.TAG.atme :
              MessageApi.fetchMessageAtMe(success,10,this.cache[tag].page)
              break;
          case this.TAG.pm :
              MessageApi.fetchMessagePmseMission(success,10,this.cache[tag].page)
              break;

          case this.TAG.system :
              MessageApi.fetchMessageSystem(success,10,this.cache[tag].page)
              break;
        }

    }


}

function refresh(tag){
    this.cache[tag].page = 1

    var that = this

    var success = function(re){

        //

        var list = that.convertData(re,tag)

        that.cache[tag].hax_next = re.has_next
        that.cache[tag].totalNum = re.total_num
        that.cache[tag].dataLength = list.length
        that.cache[tag].canLoadMore = true

        if(list != null && list.length != 0)
            that.view.renderData(list,tag)
        else
            that.view.renderNoMore("没有更多了",tag)

    }

    switch(tag){
      case this.TAG.post :
          MessageApi.fetchMessagePost(success,10,this.cache[tag].page)
          break;
      case this.TAG.atme :
          MessageApi.fetchMessageAtMe(success,10,this.cache[tag].page)
          break;
      case this.TAG.pm :
          MessageApi.fetchMessagePmseMission(success,10,this.cache[tag].page)
          break;

      case this.TAG.system :
          MessageApi.fetchMessageSystem(success,10,this.cache[tag].page)
          break;
    }
}


function onClickEvent(type,arg){

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

        var success = function(re){

          router.push({
            uri :"Main/Message/PmList",
            params :{
              re :re
            }
          })
        }

        MessageApi.fetchPmseMissionList(
           item.toUserId,
           item.plid,
           item.pmid,
           success)
    }
}


function onRefreshComplete(tag){

      if(this.cache[tag].hax_next == 0){
          this.cache[tag].canLoadMore = false
          this.view.renderNoMore("没有更多了",tag)

      }
}

function convertData(re,tag){

  var list = null
  switch (tag) {
    case this.TAG.pm:
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

    case this.TAG.system:
        list = re.body.data

        for (let x in list){
          var l = list[x]
          l.replied_date = DateUtil.convertTime(l.replied_date)
          l.topic_content = l.note
        }

        break;

    case this.TAG.post:
        list = re.body.data
        for (let x in list){
            var l = list[x]
            if(l.topic_contetn == null) l.topic_content = l.content
            l.replied_date = DateUtil.convertTime(l.replied_date)
        }
        break;
    case this.TAG.atme:
    default:

        list = re.body.data

        for (let x in list){
          var l = list[x]
          l.replied_date = DateUtil.convertTime(l.replied_date)
        }
        break;
  }


  return list
}

export default{
  init,
  attach,
  refresh,
  loadMore,
  onClickEvent,
  view,
  cache,
  convertData,
  onRefreshComplete,
  TAG
}
