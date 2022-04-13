using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace CloudPrint.Api
{
    class PrinterApi
    {
        
      
        /// <summary>
        /// 传送打印机配置信息
        /// </summary>
        /// <param name="store_id"></param>
        /// <returns></returns>
        public static JObject SetPrintersInfo(string store_id)
        {
            
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("store_id", store_id);
            dic.Add("computer_id", "001");
            dic.Add("printers_params", MyPrinters.GetInstalledPrinters());
            return Request.Post(url: "/set_printers_info", dic);
        }
        /// <summary>
        /// 打印反馈
        /// </summary>
        /// <param name="code"></param>
        /// <param name="file_id"></param>
        /// <param name="order_id"></param>
        /// <returns></returns>
        public static JObject FeedBackPrintState(int code, string ErrMsg,string order_id)
        {
            
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("code", code);
            dic.Add("order_id", order_id);
            dic.Add("err_msg", ErrMsg);
            return Request.Post(url: "/state-feedback", dic);
        }
    }
}
