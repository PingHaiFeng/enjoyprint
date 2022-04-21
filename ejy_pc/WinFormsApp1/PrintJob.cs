using System;
using EnjoyPrint.api;
using EnjoyPrint.entity;
using EnjoyPrint.print;

namespace EnjoyPrint
{


    public class PrintJob
    {
        [Obsolete]
        public int StartPrintWork(TempFile file)
        {
            try
            {
                Download.DownloadFile(file);
                HandlePrint.HandlePrint2(file);

                return 1;
            }
            catch
            {
                return 0;
            }

        }
    }
}
