using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using WinFormsApp1;

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
            FormAdminLock formAdminLock = new FormAdminLock();
            formAdminLock.Show();
            Hide();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            try
            {
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

        }
    }
}
