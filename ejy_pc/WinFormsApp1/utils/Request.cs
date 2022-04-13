using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Windows.Forms;

namespace CloudPrint
{
    
   public static class Request
    {
      

        /// <summary>
        /// 指定Post地址使用Get 方式获取全部字符串
        /// </summary>
        /// <param name="url">请求后台地址</param>
        /// <returns></returns>
        public static JObject Post(string url, Dictionary<string, object> dic)
        {
            string result = "";
            HttpWebRequest req = (HttpWebRequest)WebRequest.Create(Config.BASEURL+url);
            req.Method = "POST";
            req.ContentType = "application/x-www-form-urlencoded";
            req.Headers.Add("X-Token", GlobalData.token);
            #region 添加Post 参数
            StringBuilder builder = new StringBuilder();
            int i = 0;
            foreach (var item in dic)
            {
                if (i > 0)
                    builder.Append("&");
                builder.AppendFormat("{0}={1}", item.Key, item.Value);
                i++;
            }
            byte[] data = Encoding.UTF8.GetBytes(builder.ToString());
            req.ContentLength = data.Length;
            using (Stream reqStream = req.GetRequestStream())
            {
                reqStream.Write(data, 0, data.Length);
                reqStream.Close();
            }
            #endregion
            HttpWebResponse resp = (HttpWebResponse)req.GetResponse();
            
            Stream stream = resp.GetResponseStream();
            //获取响应内容
            using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
            {
                result = reader.ReadToEnd();
                Console.WriteLine(result);
            }
            JObject jResult = (JObject)JsonConvert.DeserializeObject(result);
            return jResult;
            //try
            //{
            //    string stateCode = jResult["state"].ToString();
            //    if (stateCode == "1")
            //    {
            //       jResult
   
            //    }
            //    else
            //    {
            //        this.Success = false;
            //        MessageBox.Show("网络错误");
            //    }
            //}
            //catch
            //{
            //    this.Success = false;
            //    MessageBox.Show("网络错误");
            //}
            //return jResult;

        }

    }
}
