/**
 * @class SearchPresenter
 */
export default class SearchPresenter {

    constructor(view){
        this.view = view
        this.key = ''
    }

    onEvent(e){

        if(e.type == 'enter-key'){
          this.search()
        }

        if(e.type == 'change-type'){
            this.type = e.data
            this.view.renderChangeType(e.data)
            //note: 如果切换搜索的tag，同时关键字不是空的话，那就自动重新搜索
            if(this.key != '' && this.key != null){
              this.search()
            }
        }

        if(e.type == 'change-key'){
            this.key = e.data
        }

        if(e.type == 'do-search'){
            this.search()
        }
    }

    search(){
        const key = this.key
        var type = this.type

        // NOTE : 初始化type为post
        if(type == '' || type == null) type = 'post'

        this.view.renderSearch(key,type)
    }
}
