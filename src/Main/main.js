
import ForumApi from '../Common/ForumApi'
import UserCache from '../Common/UserCache'
import router from '@system.router'

export default {
  private: {

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
    ]
  }
  ,onShow(){
      $umeng_stat.resume(this)
  }
  ,onHide() {
      $umeng_stat.pause(this)
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
   */
  , onChangeForm(index) {
    this.formIndex = index

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
