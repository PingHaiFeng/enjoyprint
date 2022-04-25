using System;
using System.Drawing;
using System.Windows.Forms;
using CloudPrint;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Threading;
using EnjoyPrint.entity;
using EnjoyPrint.config;
using EnjoyPrint;

namespace WinFormsApp1
{
    public partial class FormMain : Form
    {
        FormMenuStrip formMenuStrip = new FormMenuStrip();


        public static FormMain formMain;

        public FormMain()
        {
            //Thread thread = Thread.CurrentThread;
            //Console.WriteLine("线程名字", thread.Name);
            InitializeComponent();



            //允许跨线程调用
            CheckForIllegalCrossThreadCalls = false;
            formMain = this;
            labClose.Parent = pictureBoxBg;
            labMini.Parent = pictureBoxBg;
            pictureBoxLogo.Parent = pictureBoxBg;
            labStore.Parent = pictureBoxBg;
        }



        private void Form1_Load(object sender, EventArgs e)
        {
            labStore.Text = GlobalData.store_name;
            InitListView();
        }


        public void closeIcon()
        {
            MyNotifyIcon.Dispose();
        }


        /// <summary>
        /// 托盘单击事件
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>


        private void lab_Click(object sender, EventArgs e)
        {

        }

        Point p;
        private void pictureBoxBg_MouseDown(object sender, MouseEventArgs e)
        {

            p = e.Location;
        }

        private void pictureBoxBg_MouseUp(object sender, MouseEventArgs e)
        {
            p = e.Location;
        }

        private void pictureBoxBg_MouseMove(object sender, MouseEventArgs e)
        {
            if (e.Button == MouseButtons.Left)
                this.Location = new Point(this.Left + (e.X - p.X), this.Top + (e.Y - p.Y));

        }

        private void MyNotifyIcon_MouseClick(object sender, MouseEventArgs e)
        {
            if (e.Button == MouseButtons.Left)
            {
                if (formMain.WindowState != FormWindowState.Normal)//不是正常状态

                    WindowState = FormWindowState.Normal;
                formMain.TopMost = true;
                formMenuStrip.Hide();
            }

            if (e.Button == MouseButtons.Right)
            {

                formMenuStrip.Location = new Point(Cursor.Position.X - formMenuStrip.Width, Cursor.Position.Y - formMenuStrip.Height);
                formMenuStrip.Show();
            }
        }

        private void 密码退出ToolStripMenuItem_Click(object sender, EventArgs e)
        {
            GlobalData.form_main.closeIcon();
            Application.Exit();
            Environment.Exit(0);
        }

        private void 管理后台ToolStripMenuItem_Click_1(object sender, EventArgs e)
        {
            try
            {
                var psi = new ProcessStartInfo
                {
                    FileName = Config.ADMINURL,
                    UseShellExecute = true
                };
                Process.Start(psi);
            }
            catch (Exception ex)
            {
                MessageBox.Show("打开网址失败，请手动在浏览器输入");
            }
        }

        /// <summary>
        /// 初始化ListView的方法
        /// </summary>
        /// <param name="lv"></param>
        public void InitListView()
        {

            //设置属性
            //lv.GridLines = true;  //显示网格线
            listViewPrinting.FullRowSelect = true;  //显示全行
            listViewPrinting.MultiSelect = false;  //设置只能单选
            listViewPrinting.View = View.Details;  //设置显示模式为详细
                                                   //lv.HoverSelection = true;  //当鼠标停留数秒后自动选择
                                                   //把列名添加到listview中
            listViewPrinting.Columns.Add("序号", 80);
            listViewPrinting.Columns.Add("订单号", 250);
            listViewPrinting.Columns.Add("金额", 120);
            listViewPrinting.Columns.Add("页数", 120);
            listViewPrinting.Columns.Add("颜色", 120);
            listViewPrinting.Columns.Add("类型", 120);
            listViewPrinting.Columns.Add("份数", 120);
            listViewPrinting.Columns.Add("打印状态", 170);
            //TempFile tempFile = new TempFile();
            //tempFile.OrderId = "dada";
            //InsertListView(lv, tempFile);
        }

        /// <summary>
        /// 新增方法
        /// </summary>
        /// <param name="lv"></param>
        /// <returns></returns>
        public void InsertListView(TempFile tempFile)
        {
            String ListIndex = listViewPrinting.Items.Count < 9 ? "0" + (listViewPrinting.Items.Count + 1).ToString() : (listViewPrinting.Items.Count + 1).ToString();
            //创建行对象
            ListViewItem li = new ListViewItem(ListIndex);

            li.SubItems.Add(tempFile.file_id);
            li.SubItems.Add(tempFile.print_price.ToString());
            li.SubItems.Add(tempFile.print_page_num.ToString());
            li.SubItems.Add(tempFile.print_color == 1 ? "黑白" : "彩色");
            li.SubItems.Add(tempFile.duplex == 1 ? "单面" : "双面");
            li.SubItems.Add(tempFile.print_count.ToString());
            li.SubItems.Add("");//存放状态
            //将行对象绑定在listview对象中
            listViewPrinting.Items.Add(li);


        }
        public void UpdatePrintState(String FileId, string StateStr)
        {

            for (int i = 0; i < listViewPrinting.Items.Count; i++)
            {
                if (FileId == listViewPrinting.Items[i].SubItems[1].Text)
                {
                    listViewPrinting.Items[i].SubItems[7].Text = StateStr;
                }
            }
        }
        private void listView1_SelectedIndexChanged_1(object sender, EventArgs e)
        {

        }

        private void labMini_Click(object sender, EventArgs e)
        {
            WindowState = FormWindowState.Minimized;//最小化
            ShowInTaskbar = true;//显示在任务栏
        }

        private void labClose_Click(object sender, EventArgs e)
        {
            //closeIcon();
            //Application.Exit();
            //Environment.Exit(0);
            WindowState = FormWindowState.Minimized;//最小化
            ShowInTaskbar = true;//显示在任务栏
        }

        private void pictureBoxBg_Click(object sender, EventArgs e)
        {

        }

        private void MyNotifyIcon_MouseDoubleClick(object sender, MouseEventArgs e)
        {

        }
    }
}
