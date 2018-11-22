
    export default class SearchView{

        constructor(page){
            this.app = page.$app
            this.page = page
        }

        renderChangeType(type){
            this.page.type = type
        }

        renderSearch(key,type){
            this.page.searchType = ''
            setTimeout(function(){

                this.page.searchType = type
                this.page.searchKeyword = key

            }.bind(this),100)
        }
    }
