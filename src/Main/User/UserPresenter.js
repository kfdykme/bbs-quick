
import DateUtil from '../../Common/DateUtil'
import UserApi from "../../Common/UserApi"
import MessageApi from "../../Common/MessageApi"
import UserCache from "../../Common/UserCache"
import UserModel from "./UserModel"
import router from '@system.router'
import prompt from '@system.prompt'
import storage from '@system.storage'
/**
 * @class UserPresenter
 * @constructor constructor
 */
export default class UserPresenter{



    constructor(view){
        this.view = view
        this.app = view.context.$app
        this.model = UserModel.getInstance(this)

        //NOTE : get some data from view
        this.uid = view.uid

        UserApi.init(this.app)
        this.myId = UserApi.user().uid
        view.myId = this.myId

    }

    /**
     * @method attach
     */
    async attach(){
        try{

            var userRe = await this.model.loadLocal(this.uid)
            if(userRe != null){

              this.view.renderUserInfo(userRe)
              this.view.renderAvatar(UserApi.getUserAvatarBig(this.uid))
              console.info("load userinfo from local cache success")
            } else {
              console.info("load userinfo success but null")
            }
        } catch(err){
            console.info("load userinfo from local fail : "+err)
        }
        try {
          var isMute = await this.model.loadIsMute(this.uid,this.myId)

          console.info('load isMute:', isMute)
          this.view.renderMute(isMute)
        } catch (err) {
          console.error("load local user config of " + this.uid + " fail :" + err)
        }
        this.initInfo()
    }

    async initInfo(){


        const userRe = await this.model.getUserInfo(this.uid)


        this.view.renderUserInfo(userRe)
        this.view.renderAvatar(UserApi.getUserAvatarBig(this.uid))


        this.initPosts()
        if(this.myId == this.uid){
            this.initSelf()
        }

    }

    initPosts(){



        //NOTE: 或取回复过的帖子
        UserApi.getUserReplyPost(this.uid,1,10,
            function(re){

                this.view.renderReplyNumber(re)
            }.bind(this)
        )


        // NOTE : 或取关注了的人
        UserApi.getFollows(this.uid,1,
            function(re){
                this.view.renderFollows(re)
            }.bind(this)
        )

        // NOTE : 获取粉丝
        UserApi.getFolloweds(this.uid,1,
            function(re){
                this.view.renderFolloweds(re)
            }.bind(this)
        )
    }

    initSelf(){
        UserApi.getFirends(this.uid,
            function(re){
                this.friendList = re.list
            }.bind(this))

    }


    onClickEvent(type,arg){

        if(type == 'about'){
            router.push({
                uri:"Other/About"
            })
        }

        //NOTE : 关注 follow
        if(type == 'follow'){
            var onFollowSuccess = function(re){
                prompt.showToast({
                    message : re.errcode
                })
                this.initInfo()
            }.bind(this)
            UserApi.follow(this.uid,
            onFollowSuccess)
        }

        //NOTE : 取消关注
        if(type =='unfollow'){
            var onUnFollowSuccess = function(re){
                prompt.showToast({
                    message : re.errcode
                })
                this.initInfo()
            }.bind(this)

            UserApi.unFollow(this.uid,
                onUnFollowSuccess)
        }

        //NOTE : 添加好友事件
        if(type== 'addFriend'){
            UserApi.addFriend(this.uid
                ,function(re){
                    prompt.showToast({
                        message:re.errcode
                    })
                    this.initInfo()
                }.bind(this))
        }

        // NOTE: 删除好友事件
        if(type == 'unFriend'){
            UserApi.deleteFriend(this.uid
                ,function(re){
                    prompt.showToast({
                        message:"删除成功"
                    })
                    this.initInfo()
                }.bind(this))
        }

        // NOTE : 站内私信
        if(type == 'chat'){


              router.push({
                uri :"Main/Message/PmList",
                params :{
                  toUserId:this.uid,
                  plid : 0
                }
              })

        }

        if(type == 'history'){
            router.push({
              uri : 'Main/User/Reply',
              params : {
                  uid :arg,
                  type:'history'
              }
            })
        }


        // NOTE : 我的收藏
        if(type == 'favorite'){
            router.push({
              uri : 'Main/User/Reply',
              params : {
                  uid :arg,
                  type:'favorite'
              }
            })
        }

        // NOTE : 登出
        if(type == 'logout'){
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
                            router.replace({
                                uri : "Start/Login",
                            })
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


        // NOTE : 查看参与
        if(type == 'replycount'){
            router.push({
              uri : 'Main/User/Reply',
              params : {
                  uid :arg,
                  type:'me-reply'
              }
            })
        }

        // NOTE : 查看关注的人
        if(type == 'lookfollow'){
            router.push({
              uri : 'Main/User/Follow',
              params : {
                  uid :arg,
                  tag : "follow"
              }
            })
        }
        // NOTE : 查看关注的人
        if(type == 'lookfollowed'){
            router.push({
              uri : 'Main/User/Follow',
              params : {
                  uid :arg,
                  tag : "followed"
              }
            })
        }

        // NOTE : 本地缓存屏蔽用户
        if (type == 'mute') {
          this.model.saveIsMute(
            this.uid,
            this.myId,
            true
          ).then(res => {
            this.view.renderMute(res)
          }).catch(err => {
            console.error(err)
          })
        }

        //NOTE : 本地缓存取消屏蔽用户
        if (type == 'unmute') {
          this.model.saveIsMute(
            this.uid,
            this.myId,
            false
          ).then(res => {
            this.view.renderMute(res)
          }).catch(err => {
            console.error(err)
          })
        }
    }
}
