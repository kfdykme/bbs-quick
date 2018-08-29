
function convertTimeShort(time){
    if(time < 0)
      return time


    let diffTime = parseInt((new Date().getTime() - time)/1000)
    if(diffTime < 86400 && diffTime > 0){
        if( diffTime < 3600) {
          let min = parseInt(diffTime / 60)
          if(min == 0)
            return "刚刚"
          else
            return min + "分钟前"
        } else {
            return parseInt(diffTime/3600) +"小时前"
        }
    } else{
      const date = new Date(parseInt(time));
      const y = date.getFullYear()
      const M = date.getMonth()+1
      const d = date.getDate()
      const h = date.getHours()
      const m = date.getMinutes()

      const cd = new Date()
      const cy = cd.getFullYear()
      const cM = cd.getMonth()+1
      const cD = cd.getDate()
      const ch = cd.getHours()
      const cm = cd.getMinutes()

      if(y == cy && M == cM && d == cD){
        return h +":"+(m <10 ? "0"+m:m)
      }
      if(y == cy && M == cM && d == cD-1){
        return "昨天"+ h +":"+(m <10 ? "0"+m:m)
      }
      if(y == cy && M == cM && d == cD-2){
        return "前天"+ h +":"+(m <10 ? "0"+m:m)
      }

      if(y== cy){
        return M+"月"+d+"日"
      }



      return y+"年"+M+"月"+d+"日"
    }
}


function convertTime(time){
  if(time < 0)
    return time


  let diffTime = parseInt((new Date().getTime() - time)/1000)
  if(diffTime < 86400 && diffTime > 0){
      if( diffTime < 3600) {
        let min = parseInt(diffTime / 60)
        if(min == 0)
          return "刚刚"
        else
          return min + "分钟前"
      } else {
          return parseInt(diffTime/3600) +"小时前"
      }
  } else{
    const date = new Date(parseInt(time));
    const y = date.getFullYear()
    const M = date.getMonth()+1
    const d = date.getDate()
    const h = date.getHours()
    const m = date.getMinutes()

    const cd = new Date()
    const cy = cd.getFullYear()
    const cM = cd.getMonth()+1
    const cD = cd.getDate()
    const ch = cd.getHours()
    const cm = cd.getMinutes()

    if(y == cy && M == cM && d == cD){
      return h +":"+(m <10 ? "0"+m:m)
    }
    if(y == cy && M == cM && d == cD-1){
      return "昨天"+ h +":"+(m <10 ? "0"+m:m)
    }
    if(y == cy && M == cM && d == cD-2){
      return "前天"+ h +":"+(m <10 ? "0"+m:m)
    }

    if(y== cy){
      return M+"月"+d+"日"+" "+ h +":"+(m <10 ? "0"+m:m)
    }



    return y+"年"+M+"月"+d+"日"
  }
}


export default {
  convertTime
  ,convertTimeShort
}
