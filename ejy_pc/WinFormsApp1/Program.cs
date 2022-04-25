using System;
using System.Windows.Forms;
using ‘∆¥Ú”°;


namespace EnjoyPrint
{
    static class Program
    {
        private static TcpClient tcpClient;

        /// <summary>
        ///  The main entry point for the application.
        /// </summary>
        [STAThread]

        static void Main()
        {
            //new Test();

            Application.SetHighDpiMode(HighDpiMode.SystemAware);
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            Application.Run(new FormLogin());

            ////Application.Run(new FormMain());

        }

    }
}
