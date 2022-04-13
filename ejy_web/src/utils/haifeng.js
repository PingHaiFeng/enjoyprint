// 表单重置
export function resetForm(refName) {
    if (this.$refs[refName]) {
      this.$refs[refName].resetFields();
    }
  }
// 转换字符串，undefined,null等转化为""
export function parseStrEmpty(str) {
    if (!str || str == "undefined" || str == "null") {
      return "";
    }
    return str;
  }  