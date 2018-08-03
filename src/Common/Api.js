import prompt from "@system.prompt"
import fetchModule from "@system.fetch"
import request from '@system.request'

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

function onFetchFail(data,code){
  console.error("发生了错误: "+code +"\n"+data);
  prompt.showToast({
    message :"发生了错误: "+code +"\n"+data
  })
}

function onSuccessError(re){
  console.info(JSON.stringify(re));
  prompt.showToast({
    message :re.errcode
  })
}

function fetch(url,data,suc){

    var that = this
    fetchModule.fetch({
      url : url,
      method : "POST",
      data : data,
      success :function(data){
        const re = JSON.parse(data.data)

        if(re.rs == 0)
            that.onSuccessError(re)
        else if (re.rs == 1)
            suc(re)

      },
      fail : function(data,code){
        that.onFetchFail(data,code)
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
  upload
}
