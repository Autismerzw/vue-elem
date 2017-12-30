/*
 * @Author: mikey.zhangwei
 * @Date: 2017-12-29 11:11:29
 * @Last Modified by: mikey.zhangwei
 * @Last Modified time: 2017-12-29 11:37:10
 */

export function urlId () {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&/]+/g
  let arr = url.match(reg)
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}
