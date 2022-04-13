const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()


  return `${[year, month, day].map(formatNumber).join('')}`
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
const unque_id = id => {
  var jschars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  var res = "";
  for (var i = 0; i < 15; i++) {
    var id = Math.ceil(Math.random() * 61);
    res += jschars[id];
  }

  res = formatDate(new Date()) + res
  console.log(res)
  return res

}

module.exports = {
  formatTime,
  unque_id
}