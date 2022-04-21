using System;
using System.Collections.Generic;
using System.Text;
using EnjoyPrint.utils;
using Newtonsoft.Json.Linq;

namespace EnjoyPrint.api
{
    public static class UserApi
    {
        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public static JObject Login(string username, string password)
        {

            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("username", username);
            dic.Add("password", Md5.Md5Encryption(password));

            return Request.Post(url: "/login", dic);
        }

        public static JObject AdminExit(string username, string password)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("username", username);
            dic.Add("password", Md5.Md5Encryption(password));
            Console.WriteLine(Md5.Md5Encryption(password));
            return Request.Post(url: "/admin_exit", dic);
        }

        public static JObject GetStoreInfo(string token)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("token", token);
            return Request.Post(url: "/get_info", dic);
        }


    }
}
