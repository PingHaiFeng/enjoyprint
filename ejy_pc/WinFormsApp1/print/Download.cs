using CloudPrint.Entity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using WinFormsApp1;

namespace CloudPrint.print
{
    class Download
    {
       
        [Obsolete]
        public static int DownloadFile(TempFile file)
        {
            string FileNewNamePdf;
            string FileNewName= file.FileId + "." + file.FileType;
            if (file.FileType == "pdf" || file.FileType == "Pdf")
            {
                FileNewNamePdf = FileNewName;
            }
            else
            {
                FileNewNamePdf = FileNewName + ".pdf";
            }
            FormMain.formMain.InsertListView(file);
            FtpWebRequest reqFTP;
            try
            {
                String Uri = Config.FTPIP;
                FormMain.formMain.UpdatePrintState(file.FileId, "正在获取加密文件");
                if (Directory.Exists(Config.OUTFILE_PATH) == false)
                {
                    Directory.CreateDirectory(Config.OUTFILE_PATH);
                }
                Console.WriteLine(Config.OUTFILE_PATH + "\\" +FileNewNamePdf);
               FileStream outputStream = new FileStream(Config.OUTFILE_PATH + "\\" +FileNewNamePdf, FileMode.Create);
                reqFTP = (FtpWebRequest)FtpWebRequest.Create(new Uri(Uri + FileNewNamePdf));
                reqFTP.Method = WebRequestMethods.Ftp.DownloadFile;//指定当前请求是什么命令（upload，download，filelist等）
                reqFTP.UseBinary = true;//指定文件传输的类型
                reqFTP.Credentials = new NetworkCredential(Config.FTP_USERNAME, Config.FTP_PASSWORD); //指定登录ftp服务器的用户名和密码。
                reqFTP.KeepAlive = false;//指定在请求完成之后是否关闭到 FTP 服务器的控制连接
                reqFTP.UsePassive = true;//指定使用主动模式还是被动模式
                FtpWebResponse response = (FtpWebResponse)reqFTP.GetResponse();
                Stream ftpStream = response.GetResponseStream();
                long cl = response.ContentLength;
                int bufferSize = 2048;
                int readCount;
                byte[] buffer = new byte[bufferSize];
                readCount = ftpStream.Read(buffer, 0, bufferSize);
                while (readCount > 0)
                {
                    outputStream.Write(buffer, 0, readCount);
                    readCount = ftpStream.Read(buffer, 0, bufferSize);
                }
                ftpStream.Close();
                outputStream.Close();
                response.Close();
                return 1;
 
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                return 0;
            }
        }

    }
}
