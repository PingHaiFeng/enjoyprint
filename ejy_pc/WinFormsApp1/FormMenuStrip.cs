<<<<<<< HEAD
﻿using System;
=======
﻿using EnjoyPrint.config;
using EnjoyPrint.utils;
using System;
>>>>>>> 84af6262785d8c2cee53c1f0e364859c3586c3c9
using System.Diagnostics;
using System.IO;
using System.Threading;
using System.Windows.Forms;

namespace CloudPrint
{
    public partial class FormMenuStrip : Form
    {
        public FormMenuStrip()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            string fileFullPath = Config.ACCOUNT_CONFIG_PATH + "account.bin";
            if (File.Exists(fileFullPath))
            {

                File.Delete(fileFullPath);
                SysPro.Restart();
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            try
            {
                //FormAdminLock formAdminLock = new FormAdminLock();
                //formAdminLock.Show();
                var psi = new ProcessStartInfo
                {
                    FileName = Config.ADMINURL,
                    UseShellExecute = true
                };
                Process.Start(psi);
                Hide();
            }
            catch (Exception ex)
            {
                MessageBox.Show("打开网址失败，请手动在浏览器输入");
            }
        }

        private void button4_Click(object sender, EventArgs e)
        {

        }

        private void button3_Click(object sender, EventArgs e)
        {
            //MessageBox.Show("已经是最新版本");
            SysPro.Restart();

        }


        private void button5_Click(object sender, EventArgs e)
        {
            FormAdminLock formAdminLock = new FormAdminLock();
            formAdminLock.Show();
            Hide();
        }

        private void FormMenuStrip_Deactivate(object sender, EventArgs e)
        {

            Hide();
        }
    }
}
