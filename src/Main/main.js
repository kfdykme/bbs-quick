
  import ForumApi from '../Common/ForumApi'
  import UserCache from '../Common/UserCache'
  import prompt from '@system.prompt'

  export default {
    private: {
      username : "",
      forms : [],
      formIndex :0,
      homeIndex : 0,
      tags :[
        ForumApi.Tag.newReply,
        ForumApi.Tag.newPublish,
        ForumApi.Tag.todayHot
      ],
      userInfo :{}
    }
    ,onInit(){

      UserCache.init(this.$app)

      this.username = UserCache.user().userName
      this.userInfo = UserCache.user()
    }
    ,onChangeForm(index){
      this.formIndex = index

    }
    ,onClickBottom(index){
      this.homeIndex = index
    }
    ,changeTabactive (evt) {
      this.onChangeForm(evt.index)
    }
    ,changeHomeTag(evt){
      this.homeIndex = evt.index
    }
    ,clickTabBar(index){
      this.onChangeForm(index)
    }
    ,clickUser(){
      prompt.showDialog({
        title: "要退出了吗..",
        message : '吗吗吗???',
        buttons: [
          {
            text :'登出',
            color :'#ffbc4d'
          },
          {
            text : '按错了',
            color : '#00bcd4'
          }
        ],
        success :function (data){

          switch(data.index){
            case 0 :

              UserCache.logout()
              router.back()
              break;
            case 1 :

              break;
            case 2 :
              break;
          }
        },
        fail :function(data){
          prompt.showToast({
            message : "未知错误"
          })
        }
      })
    }
  }
