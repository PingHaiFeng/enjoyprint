using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Text;
using Newtonsoft.Json.Linq;

namespace EnjoyPrint
{

    class MyPrinters
    {
        //获取所有打印机参数
        public static string GetInstalledPrinters()
        {

            var printersInstalled = PrinterSettings.InstalledPrinters;
            List<object> allPrintersParamList = new List<object>();


            foreach (var item in printersInstalled)
            {

                allPrintersParamList.Add(PrintersAllParam(item.ToString()));

            }
            Console.WriteLine(allPrintersParamList);

            return JsonConvert.SerializeObject(allPrintersParamList);
        }
        public static Dictionary<string, object> PrintersAllParam(string printerName)
        {

            Dictionary<string, object> printersDict = new Dictionary<string, object>();
            PrinterSettings settings = new PrinterSettings();
            settings.PrinterName = printerName;
            printersDict.Add("printer_name", printerName);
            printersDict.Add("can_duplex", settings.CanDuplex == true ? 1 : 0);
            printersDict.Add("supports_color", settings.SupportsColor == true ? 1 : 0);
            printersDict.Add("is_defalut", settings.IsDefaultPrinter == true ? 1 : 0);
            //printersDict.Add("SupportsPaperSizes", settings.PaperSizes);
            return printersDict;
        }



    }
}
