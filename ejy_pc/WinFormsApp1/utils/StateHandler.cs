using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace EnjoyPrint.utils
{
    class State
    {
        public bool Success;

        public JObject Data { get; set; }
        public string Msg { get; set; }
    }
}
