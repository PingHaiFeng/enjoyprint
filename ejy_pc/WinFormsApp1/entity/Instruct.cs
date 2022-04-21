using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace EnjoyPrint.entity
{
    public class Instruct
    {
        public int instruct_id { get; set; }//指令id
        public string instruct_content { get; set; }//指令内容
        public Dictionary<string, object> instruct_dict { get; set; }


    }
}
