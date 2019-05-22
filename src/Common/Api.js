import prompt from "@system.prompt"
import fetchModule from "@system.fetch"
import request from '@system.request'
import network from '@system.network'



/**
 * 由于服务器原因,以下部分板块无法显示
 * 需要在板块页面以及发帖的时候将这部分隐藏
 */
const BOARD_CAN_NOT_FETCH = [
  '学术交流',
  '出国留学',
  '考试专区',
  '新生专区',
  '自然科学',
  '前段之美',
  '科技资讯',
  '站务公告',
  '站务综合'
]

const UPLOAD_PARSE_JSON_ERROR = '上传过程中发生错误'

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


    // console.info('APi.upload', JSON.stringify(o));
    var that = this
    request.upload({
        url : "http://bbs.uestc.edu.cn//mobcent/app/web/index.php?r=forum/sendattachmentex",
        files : o.files,
        data : o.data,
        method:"POST",
        success : function(data){
          try{
            const re = JSON.parse(data.data)

            console.info('Api.upload:' + JSON.stringify(re, null, 2))
            if(re.rs == 0)
            {
              that.onSuccessError(re)
            } else {
              success(re)
            }
          } catch(e){
            console.info('Api.upload:'+ e)
            prompt.showToast({
              message : UPLOAD_PARSE_JSON_ERROR
            })
          }
        },
        fail: that.onFetchFail
    })


}



function onFetchFail(data,code,and){

  if(typeof and == 'function'){
    and(data)
  }
  console.error("onFetchFail 发生了错误: "+code +"\n"+JSON.stringify(data));
  prompt.showToast({
    message :"网络请求发生了错误: "+code
  })
}

function onSuccessError(re,and){

  if(typeof and == 'function'){
    and(re)
  }

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
function fetch(url,data,suc,andError,onParseFail, tag){

    var that = this
    network.getType({
      success:(net)=>{
        if(net.type != 'none'){

          fetchModule.fetch({
            url : url,
            method : "POST",
            data : data,
            success :function(data){
              if (tag == 'MessageApi') {

                console.info('Api.fetch:',tag, data.data)
              }

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
              console.info(tag, 'on Fetch Fail')
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
  BOARD_CAN_NOT_FETCH,
  fetch,
  onFetchFail,
  onSuccessError,
  upload,
  saveCookie
}
