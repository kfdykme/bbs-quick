
import prompt from '@system.prompt'

export default class ScoreDialogView{

  constructor(){
    this.call = null
    this.canUseWater = 0
    this.canUseRange = ''
    this.showDialog = false
    this.loading = false
  }

  toggle(){
    this.showDialog = !this.showDialog
    return this.showDialog
  }

  renderMessage(msg){
    prompt.showToast({
      message :msg
    })
  }

  renderFetching(){
    this.loading = true
  }

  renderFetchEnd(){
    this.loading = false
  }

}
