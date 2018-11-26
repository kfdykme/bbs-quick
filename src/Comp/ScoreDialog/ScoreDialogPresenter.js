import PostApi from '../../Common/PostApi'

export default class ScoreDialogPresenter{

  constructor(view,app){
    this.view = view
    this.actionUrl = ''
    this.reason = ''
    this.score = ''
    this.sendreasonpm = ''

    PostApi.init(app)
  }

  async sendScore(){
    this.view.renderFetching()
    var res = await PostApi.score(this.actionUrl,this.score,this.reason,this.sendreasonpm)
    this.view.renderFetchEnd()
    try{
      
      var data = res.data.data
      const regMsg = /var errorMsg = '(.*?)';/

      var errorMsg = data.match(regMsg)
      if(errorMsg != null && errorMsg.length >1){

        this.view.renderMessage(errorMsg[1])

      }

      const regAlert = /alert\("(.*?)"\)/
      var alerttMsg = data.match(regAlert)
      if(alerttMsg != null && alerttMsg.length >1){
        this.view.renderMessage(alerttMsg[1])

      }

      const regSuc = /redirect to mobile view/
      if(data.match(regSuc) != null){
        this.view.renderMessage("成功评论")

      }

    } catch(e){
      console.error(e)
    }
  }
}
