using EnjoyPrint.utils;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace EnjoyPrint.api
{
    internal class SysApi
    {
        public static JObject GetVersionInfo()
        {

            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("version", 1.0);


            return Request.Post(url: "/version-info", dic);
        }
    }
}
