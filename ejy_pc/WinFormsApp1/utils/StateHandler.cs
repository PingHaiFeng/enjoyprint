using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace CloudPrint.utils
{
    class State
    {
        public Boolean Success;
       
        public JObject Data { get; set; }
        public String Msg { get; set; }
    }
}
