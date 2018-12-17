import prompt from "@system.prompt"
import fetchModule from "@system.fetch"
import request from '@system.request'
import network from '@system.network'

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
          try{

            const re = JSON.parse(data.data)
            if(re.rs == 0)
            {
              that.onSuccessError(re)
            } else {
              success(re)
            }
          } catch(e){
            prompt.showToast({
              message :e
            })
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
  * @param <function> andError 请求失败后的自定义回调
  × @param <function> onParseFail 转换成json格式失败后会调用的函数
  */
function fetch(url,data,suc,andError,onParseFail){

    var that = this
    network.getType({
      success:(net)=>{
        if(net.type != 'none'){

          fetchModule.fetch({
            url : url,
            method : "POST",
            data : data,
            success :function(data){

              if(data.code != 200) {
                prompt.showToast({
                  message: data.data
                })
                return
              }

              try{

                const re = JSON.parse(data.data)

                if(re.rs == 0)
                  that.onSuccessError(re,andError)
                else if (re.rs == 1)
                  suc(re)
              }  catch(e){
                console.error(e)
                if(onParseFail!= null){

                  that.onParseFail(data)
                }
              }


            },
            fail : function(data,code){
              that.onFetchFail(data,code,andError)
            }
          })
        } else if (net.type == 'none'){
          console.error('network error .')
        }
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
