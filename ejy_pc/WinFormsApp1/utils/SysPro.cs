using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;

namespace EnjoyPrint.utils
{
    public class SysPro
    {
        public static void Restart()
        {
            System.Reflection.Assembly.GetEntryAssembly();
            string startpath = Directory.GetCurrentDirectory();
            Process.Start(startpath + "\\EnjoyPrint.exe");
            Process.GetCurrentProcess().Kill();
        }
    }
}
