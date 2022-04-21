using System;
using System.Collections.Generic;
using System.Text;

namespace EnjoyPrint.entity
{
    [Serializable]
    public class User
    {
        public string UserName { get; set; }
        public string PassWord { get; set; }
        public bool AutoLogin { get; set; }
        public bool RememberPwd { get; set; }
    }
}
