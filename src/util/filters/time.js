// example:  {{ timeStamp | timeFormat('yyyy-MM-dd h:m:s') }}
export function timeFormat(timeStamp, format = 'yyyy-MM-dd h:mm:ss') {
  if (isNaN(timeStamp)) {
    return ''
  }
  const D = new Date(timeStamp)
  const date = {
    "M+": D.getMonth() + 1,
    "d+": D.getDate(),
    "h+": D.getHours(),
    "m+": D.getMinutes(),
    "s+": D.getSeconds(),
    "q+": Math.floor((D.getMonth() + 3) / 3),
    "S+": D.getMilliseconds()
  }
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (D.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length))
    }
  }
  return format
}
