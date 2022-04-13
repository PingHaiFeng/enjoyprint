using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Text;

namespace CloudPrint.Entity
{
    public class Printer
    {
        public string PrinterName { get; set; }//能否使用
        public bool IsValid { get; set; }//能否使用
        public bool CanDuplex { get; set; }//能否双面打印
        public bool SupportsColor { get; set; }//能否彩色打印
        public PrinterSettings.PaperSizeCollection SupportsPaperSizes { get; set; }//所支持的纸张大小列表
    }
}
