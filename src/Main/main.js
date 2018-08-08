
  import ForumApi from '../Common/ForumApi'
  import UserCache from '../Common/UserCache'

  export default {
    private: {
      username : "",
      forms : [],
      uid : 0,
      formIndex :0,
      homeIndex : 0,
      tags :[
        ForumApi.Tag.newReply,
        ForumApi.Tag.newPublish,
        ForumApi.Tag.todayHot
      ],
    }
    ,onInit(){

      UserCache.init(this.$app)

      this.username = UserCache.user().userName
      this.uid = UserCache.user().uid
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

  }
