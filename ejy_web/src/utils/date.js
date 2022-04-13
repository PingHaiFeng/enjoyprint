export function getTodayDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var dates = date.getDate();
    dates = dates < 10 ? '0' + dates : dates;
   
    return (year + '-' + month + '-' + dates);
}

 //计算新天数
export function calDate(dateTemp, days) {
  var dateTemp = dateTemp.split("-");
  var nDate = new Date(dateTemp[1] + "-" + dateTemp[2] + "-" + dateTemp[0]); //转换为MM-DD-YYYY格式
  var millSeconds = Math.abs(nDate) + days * 24 * 60 * 60 * 1000;
  var rDate = new Date(millSeconds);
  var year = rDate.getFullYear();
  var month = rDate.getMonth() + 1;
  if (month < 10) month = "0" + month;
  var date = rDate.getDate();
  if (date < 10) date = "0" + date;

  return year + "-" + month + "-" + date;
}