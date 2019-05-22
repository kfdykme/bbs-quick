
import ForumApi from '../Common/ForumApi'
import UserCache from '../Common/UserCache'
import router from '@system.router'
import network from '@system.network'
import prompt from '@system.prompt'
import clipboard from '@system.clipboard'

export default {
  public: {

    /**当前登陆用户的用户名,显示在下方作为个人资料入口的标识 */
    username: "",
    /**当前登陆用户的uid */
    uid: 0,
    /**当前显示的是推荐页中3个页面中的哪一个的索引 */
    formIndex: 0,
    /**当前显示的哪一个主页面的索引 */
    homeIndex: 0,
    /**用于给post-list-view标识,确认post-list-view内部应该去抓取什么forum数据 */
    tags: [
      ForumApi.Tag.newReply,
      ForumApi.Tag.newPublish,
      ForumApi.Tag.todayHot
    ],
    debugLastChangeFromIndexTime :0,
  }
  , async onShow(){
      $umeng_stat.resume(this)
      APP_STATISTICS.page_show()
      this.$broadcast("show-home-view")

      //判断一下网络状态
      network.getType({
        success:(re)=>{
          if(re.type == 'none'){
            prompt.showToast({
              message :"当前无网络~~~"
            })
          }
        }
      })

      //判断一下剪贴板的内容，如果内容是bbs的帖子的网址链接，则询问是否要进入浏览页面
      var clipContent = await clipboard.get({})
      clipContent = clipContent.data.text

      //check
      let POST_URL = /http:\/\/bbs.uestc.edu.cn\/forum.php\?mod=viewthread&tid=/g;
      if(clipContent.match(POST_URL)!= null ){
        let tid= clipContent.match(/[0-9]+/g)[0]
        prompt.showDialog({
          title: '检测到已复制了一个河畔帖子地址',
          message: '是否进入该帖子',
          buttons: [
            {
              text: '是',
              color: '#00bcd4'
            },
            {
              text: '否',
              color: '#333333'
            }
          ],
          success: function (data) {
            router.push({
              uri:"Main/Post/Detail",
              params:{
                topicid:tid
              }
            })
            clipboard.set({
              text: ''
            })
          },
          cancel: function (data) {
            clipboard.set({
              text: ''
            })
          }
        })
      }
  }

  ,onHide() {
      $umeng_stat.pause(this)
      this.$broadcast("hide-home-view")
  }

  , onInit() {

    //用户缓存
    //TODO:不好用,得更改
    UserCache.init(this.$app)

    this.username = UserCache.user().userName
    this.uid = UserCache.user().uid

  }

  /**
   * @method onChangeForm
   * @param {number} index
   * @desc 当改变首页中的某个页面时发生
   * DEBUG: 在华为引擎中,刚刚启动该页面的时候如果快速切换
   * tab-content,会出现疯狂反复调用该方法的情况,
   *
   * 为了debug增加了一个时间变量用于检测
   */
  , onChangeForm(index) {
    let t = new Date().getTime()

    if(t-this.debugLastChangeFromIndexTime<=100)
      return;
    this.formIndex = index

    this.debugLastChangeFromIndexTime = new Date().getTime()
  }
  /**
   * @method onClickBottom
   * @param {number} index
   * @desc 点击底部栏
   */
  , onClickBottom(index) {
    this.homeIndex = index
  }
  , changeTabactive(evt) {
    this.onChangeForm(evt.index)
  }
  , changeHomeTag(evt) {
    this.homeIndex = evt.index
  }
  , clickTabBar(index) {
    this.onChangeForm(index)
  }
  , onClickEvent(event) {
    if (event.type == 'search') {
      router.push({
        uri: 'Other/Search'
      })
    }
  }

}
