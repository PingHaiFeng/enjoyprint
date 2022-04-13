using System;
using CloudPrint.Api;
using CloudPrint.Entity;
using CloudPrint.print;

namespace 云打印
{


    public class PrintJob
    {
        [Obsolete]
        public   int StartPrintWork(TempFile file)
        {
            try
            {
                Download.DownloadFile(file);
                HandlePrint.HandlePrint2(file);
                PrinterApi.FeedBackPrintState(1, "打印成功", file.OrderId);
                return 1;
            }
            catch
            {
                return 0;
            }
        
        }
    }
}
