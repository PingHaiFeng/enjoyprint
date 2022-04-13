using CloudPrint;
using Spire.Pdf;
using Spire.Pdf.Graphics;
using System;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using WebSocketSharp;



public class Test
{
    public Test()
    {
        Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
        PdfDocument adPage = new PdfDocument();
        adPage.Pages.Add();
        PdfPageBase page = adPage.Pages[0];
        PdfTrueTypeFont trueTypeFont = new PdfTrueTypeFont(new Font("黑体", 16f), true);
        PdfSolidBrush brush = new PdfSolidBrush(Color.Black);
        page.Canvas.DrawString("取件码：12-3", trueTypeFont, brush, 10, 20);
        page.Canvas.DrawString("文件份数：3", trueTypeFont, brush, 10, 45);
        page.Canvas.DrawString("自取门店", trueTypeFont, brush, 10, 70);
        adPage.SaveToFile(Config.OUTFILE_PATH + @"/ad_page.pdf");
        adPage.Close();
    }
}
