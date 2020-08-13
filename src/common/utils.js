export function formatDate(date, fmt) {
  //正则表达式： 字符串匹配 利器（难，规则太多）
  // y+ -> 1个或者多个y
  // y* -> 0个或者多个y
  // y? -> 0个或者1个y
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  // 小算法  让输出去的东西一定是两位
  return ('00' + str).substr(str.length);
};

