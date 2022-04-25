using EnjoyPrint;
using EnjoyPrint.api;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Runtime.InteropServices;
using System.Text;
using System.Windows.Forms;
using WinFormsApp1;
using 云打印;

namespace CloudPrint
{
    public partial class FormAdminLock : Form
    {
        public static FormAdminLock formAdminLock;

        public FormAdminLock()
        {
            InitializeComponent();
        
            //允许跨线程调用
            CheckForIllegalCrossThreadCalls = false;

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void tb_password_TextChanged(object sender, EventArgs e)
        {

        }
        private void BtnConfirm_KeyPress(object sender, KeyPressEventArgs e)
        {

            if (e.KeyChar == 13) HandleExit();


        }

        private void btn_login_Click(object sender, EventArgs e)
        {
            HandleExit();
        }
        public void HandleExit()
        {
            JObject resData = UserApi.AdminExit(GlobalData.UserName, tbPassword.Text);
            String stateCode = resData["state"].ToString();
            if (stateCode == "1")
            {
                FormMain.formMain.closeIcon();
                Application.Exit();
                Environment.Exit(0);
            }
            else
            {
                MessageBox.Show("管理员密码错误", "提示");
            }

        }
        private void AdminLock_Load(object sender, EventArgs e)
        {

        }

        private void label1_Paint(object sender, PaintEventArgs e)
        {
            Label label1 = (Label)sender;
            DrawBorder(label1, e.Graphics, Color.Transparent, label1.Width, label1.Height);

        }

        private Color labelBorderColor = Color.Black;
        private SolidBrush SegBrush; //   功控填充颜色所用brush 
        /// <summary>
        /// //绘制边框
        /// </summary>
        /// <param name="g"></param>
        /// <param name="color">lable背景颜色</param>
        /// <param name="color">边框颜色</param>
        /// <param name="x">label宽度</param>
        /// <param name="y">label高度</param>
        private void DrawBorder(Label label1, Graphics g, Color color, int x, int y)
        {


            SegBrush = new SolidBrush(color);
            Pen pen = new Pen(SegBrush, 1);
            //e.Graphics.FillRectangle(SegBrush, RcTime);

            label1.BorderStyle = BorderStyle.None;
            label1.BackColor = color;

            pen.Color = Color.White;

            Rectangle myRectangle = new Rectangle(0, 0, x, y);
            ControlPaint.DrawBorder(g, myRectangle, labelBorderColor, ButtonBorderStyle.Solid);//画个边框
                                                                                               // g.DrawRectangle(pen, myRectangle);
                                                                                               //g.DrawEllipse(pen, myRectangle);
        }

        private void label3_Click(object sender, EventArgs e)
        {
            this.Hide();
        }
    }
}