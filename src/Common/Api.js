import prompt from "@system.prompt"
import fetchModule from "@system.fetch"


function onFetchFail(data,code){
  console.error("发生了错误: "+code +"\n"+data);
  prompt.showToast({
    message :"发生了错误: "+code +"\n"+data
  })
}

function onSuccessError(re){
  prompt.showToast({
    message :re.errcode
  })
}

function fetch(url,data,suc){

    fetchModule.fetch({
      url : url,
      method : "POST",
      data : data,
      success :function(data){
        const re = JSON.parse(data.data)

        if(re.rs == 0)
            this.onSuccessError(re)
        else if (re.rs == 1)
            suc(re)

      },
      fail : function(data,code){
        this.onFetchFail(data,code)
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
  onSuccessError
}
