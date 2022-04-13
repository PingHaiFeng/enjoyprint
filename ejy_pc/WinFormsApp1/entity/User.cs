using System;
using System.Collections.Generic;
using System.Text;

namespace CloudPrint.Entity
{
    [Serializable]
    public class User
    {
        public String UserName { get; set; }
        public string PassWord { get; set; }
        public Boolean AutoLogin { get; set; }
        public bool RememberPwd { get; set; }
    }
}
