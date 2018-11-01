import prompt from "@system.prompt"
import fetchModule from "@system.fetch"
import request from '@system.request'


var app = null
function init(app){
  this.app = app
  UserCache.init(app)
}

function saveCookie(name,value){
    this.app.$def.cache.cookie[name] = value
}

 /**
  *upload() 获取与某个用户之间的消息记录
  *
  * @param <Object> o : { files : { url : "",filename:"*.*"},name:"uploadFile[]"},data : { ...}}
  * @param <function> success
  */
function upload(o,success){


    console.info(JSON.stringify(o));
    var that = this
    request.upload({
        url : "http://bbs.uestc.edu.cn//mobcent/app/web/index.php?r=forum/sendattachmentex",
        files : o.files,
        data : o.data,
        method:"POST",
        success : function(data){
            const re = JSON.parse(data.data)
            if(re.rs == 0)
            {
              that.onSuccessError(re)
            } else {
              success(re)
            }
        },
        fail: that.onFetchFail
    })


}



function onFetchFail(data,code,and){
  if(and != null)
    and(data)
  console.error("发生了错误: "+code +"\n"+data);
  prompt.showToast({
    message :"发生了错误: "+code +"\n"+data
  })
}

function onSuccessError(re,and){
  if(and != null)
    and(re)
    
  console.error(JSON.stringify(re))
  //TODO : 喊后台把这个字符串改了
  if(re.errcode == 'faq_keyword_empty')
    re.errcode = '抱歉，您尚未指定要搜索的关键字'

  prompt.showToast({
    message :re.errcode
  })
}



 /**
  * fetch POST网络请求
  *
  * @param <string> url 请求地址
  * @param <Object> data post的表格数据
  * @param <function> success(re) 请求成功后的回调
  */
function fetch(url,data,suc,andError){

    var that = this
    fetchModule.fetch({
      url : url,
      method : "POST",
      data : data,
      success :function(data){

          if(data.code != 200) return

        const re = JSON.parse(data.data)

        if(re.rs == 0)
            that.onSuccessError(re,andError)
        else if (re.rs == 1)
            suc(re)

      },
      fail : function(data,code){
        that.onFetchFail(data,code,andError)
      }
    })
}


export default {
  REGISTER_URL : "http://bbs.uestc.edu.cn/member.php?mod=register",

  BASE_URL : "http://bbs.uestc.edu.cn/mobcent/",
  login : "app/web/index.php?r=user/login/",
  formlist : "app/web/index.php?r=forum/forumlist",
  atuserlist : "app/web/index.php?r=forum/atuserlist",
  topiclist : "app/web/index.php?r=forum/topiclist",
  topiclistex : "app/web/index.php?r=forum/topiclistex",
  sdkVersion : "2.5.0.0",
  fetch,
  onFetchFail,
  onSuccessError,
  upload,
  init,
  saveCookie
}
