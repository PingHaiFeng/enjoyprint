using System;
using System.Collections.Generic;
using System.Text;

namespace EnjoyPrint.entity
{
    internal class Order
    {
        public string OrderId { get; set; }
        public int FileCount { get; set; }
        public TempFile tempFile { get; set; }
    }
}
