using System;
using System.Security.Cryptography;
using System.Text;

namespace EnjoyPrint.utils
{
    public static class Md5
    {
        public static string Md5Encryption(string origin)
        {
            byte[] b = Encoding.Default.GetBytes(origin);
            b = new MD5CryptoServiceProvider().ComputeHash(b);
            string ret = "";
            for (int i = 0; i < b.Length; i++)
            {
                ret += b[i].ToString("x").PadLeft(2, '0');
            }
            return ret;
        }
    }
}
