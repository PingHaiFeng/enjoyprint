using CloudPrint.Entity;
using Spire.Pdf;
using Spire.Pdf.Graphics;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Printing;
using System.Text;
using WinFormsApp1;

namespace CloudPrint.print
{
    class HandlePrint
    {
        public static int PrintFistPage()
        {
            return 1;
        }
        [Obsolete]
        public static int HandlePrint2(TempFile file)
        {
            string FileNewNamePdf;
            string FileNewName = file.FileId + "." + file.FileType;

            if (file.FileType == "pdf" || file.FileType == "Pdf")
            {
                FileNewNamePdf = FileNewName;
            }
            else
            {
                FileNewNamePdf = FileNewName + ".pdf";
            }

            FormMain.formMain.UpdatePrintState(file.FileId, "打印准备...");
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
            PdfDocument doc = new PdfDocument();
            doc.LoadFromFile(Config.OUTFILE_PATH + @"/" +FileNewNamePdf);//指定打印文件
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
            PrintDocument printDoc = doc.PrintDocument;

            if (GlobalData.printer_name.Length > 0)//设置自定义打印机
            {
                printDoc.PrinterSettings.PrinterName = GlobalData.printer_name;
            }

            printDoc.DocumentName = file.FileName + "." + file.FileType;//打印框显示的文档名字
            //doc.PrintSettings.SelectPageRange(file.PrintFromRange, file.PrintToRange);//打印范围
            printDoc.PrinterSettings.PrintRange = PrintRange.SomePages;
            printDoc.PrinterSettings.FromPage = file.PrintFromRange;
            Console.WriteLine(file.PrintFromRange);

            printDoc.PrinterSettings.ToPage = file.PrintToRange;
            printDoc.DefaultPageSettings.Color = file.PrintColor == 2;//是否彩印
            printDoc.PrinterSettings.Copies = file.PrintCount;//要打印的份数
            if (printDoc.PrinterSettings.CanDuplex == true)//是否双面
            {
                if (file.Duplex==2)//收到双面打印指令
                {
                    printDoc.PrinterSettings.Duplex = Duplex.Vertical;
                }
            }
            if (printDoc.PrinterSettings.IsValid)
            {
                FormMain.formMain.UpdatePrintState(file.FileId, "正在打印...");
                printDoc.PrintController = new StandardPrintController();
                printDoc.Print();

                //PdfDocument adPage = new PdfDocument();
                //adPage.Pages.Add();
                //PdfPageBase page = adPage.Pages[0];
                //PdfTrueTypeFont trueTypeFont = new PdfTrueTypeFont(new Font("黑体", 16f), true);
                //PdfSolidBrush brush = new PdfSolidBrush(Color.Black);
                //page.Canvas.DrawString("取件码：", trueTypeFont, brush, 10, 20);
                //page.Canvas.DrawString("文件份数：3", trueTypeFont, brush, 10, 45);
                //page.Canvas.DrawString("自取门店", trueTypeFont, brush, 10, 70);
                //adPage.SaveToFile(Config.OUTFILE_PATH + @"/ad_page.pdf");
                //adPage.Close();
                //adPage.Print();
                //Console.WriteLine("保存首页成功");
                //加载图片并将图片设置PDF文件背景
                //Image img = Image.FromFile("img.jpg");
                //page.BackgroundImage = img;
                FormMain.formMain.UpdatePrintState(file.FileId, "打印成功");
                return 1;
            }
            else
            {
                FormMain.formMain.UpdatePrintState(file.FileId, "打印失败");
                return 0;
            }


        }
    }
}
