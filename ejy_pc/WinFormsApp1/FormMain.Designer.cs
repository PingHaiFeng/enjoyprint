
namespace WinFormsApp1
{
    partial class FormMain
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(FormMain));
            this.lab_store_name = new System.Windows.Forms.Label();
            this.labStore = new System.Windows.Forms.Label();
            this.pictureBoxLogo = new System.Windows.Forms.PictureBox();
            this.MyNotifyIcon = new System.Windows.Forms.NotifyIcon(this.components);
            this.contextMenuStrip1 = new System.Windows.Forms.ContextMenuStrip(this.components);
            this.管理后台ToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.检查更新ToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.禁止操作打印任务ToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.密码退出ToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.listViewPrinting = new System.Windows.Forms.ListView();
            this.pictureBoxBg = new System.Windows.Forms.PictureBox();
            this.labMini = new System.Windows.Forms.Label();
            this.labClose = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBoxLogo)).BeginInit();
            this.contextMenuStrip1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBoxBg)).BeginInit();
            this.SuspendLayout();
            // 
            // lab_store_name
            // 
            this.lab_store_name.AutoSize = true;
            this.lab_store_name.Location = new System.Drawing.Point(49, 29);
            this.lab_store_name.Margin = new System.Windows.Forms.Padding(5, 0, 5, 0);
            this.lab_store_name.Name = "lab_store_name";
            this.lab_store_name.Size = new System.Drawing.Size(0, 24);
            this.lab_store_name.TabIndex = 3;
            // 
            // labStore
            // 
            this.labStore.AutoSize = true;
            this.labStore.BackColor = System.Drawing.Color.Transparent;
            this.labStore.Font = new System.Drawing.Font("微软雅黑", 15F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.labStore.ForeColor = System.Drawing.Color.White;
            this.labStore.Location = new System.Drawing.Point(117, 48);
            this.labStore.Margin = new System.Windows.Forms.Padding(5, 0, 5, 0);
            this.labStore.Name = "labStore";
            this.labStore.Size = new System.Drawing.Size(227, 39);
            this.labStore.TabIndex = 7;
            this.labStore.Text = "云即印打印店铺";
            this.labStore.Click += new System.EventHandler(this.lab_Click);
            // 
            // pictureBoxLogo
            // 
            this.pictureBoxLogo.BackColor = System.Drawing.Color.Transparent;
            this.pictureBoxLogo.BackgroundImageLayout = System.Windows.Forms.ImageLayout.None;
            this.pictureBoxLogo.Image = global::CloudPrint.Properties.Resources.logo1;
            this.pictureBoxLogo.Location = new System.Drawing.Point(33, 29);
            this.pictureBoxLogo.Margin = new System.Windows.Forms.Padding(5);
            this.pictureBoxLogo.Name = "pictureBoxLogo";
            this.pictureBoxLogo.Size = new System.Drawing.Size(62, 58);
            this.pictureBoxLogo.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pictureBoxLogo.TabIndex = 8;
            this.pictureBoxLogo.TabStop = false;
            // 
            // MyNotifyIcon
            // 
            this.MyNotifyIcon.Icon = ((System.Drawing.Icon)(resources.GetObject("MyNotifyIcon.Icon")));
            this.MyNotifyIcon.Text = "云集印";
            this.MyNotifyIcon.Visible = true;
            this.MyNotifyIcon.MouseClick += new System.Windows.Forms.MouseEventHandler(this.MyNotifyIcon_MouseClick);
            // 
            // contextMenuStrip1
            // 
            this.contextMenuStrip1.Font = new System.Drawing.Font("Microsoft YaHei UI", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.contextMenuStrip1.ImageScalingSize = new System.Drawing.Size(20, 20);
            this.contextMenuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.管理后台ToolStripMenuItem,
            this.检查更新ToolStripMenuItem,
            this.禁止操作打印任务ToolStripMenuItem,
            this.密码退出ToolStripMenuItem});
            this.contextMenuStrip1.Name = "contextMenuStrip1";
            this.contextMenuStrip1.Size = new System.Drawing.Size(225, 124);
            // 
            // 管理后台ToolStripMenuItem
            // 
            this.管理后台ToolStripMenuItem.Name = "管理后台ToolStripMenuItem";
            this.管理后台ToolStripMenuItem.Size = new System.Drawing.Size(224, 30);
            this.管理后台ToolStripMenuItem.Text = "管理后台";
            this.管理后台ToolStripMenuItem.Click += new System.EventHandler(this.管理后台ToolStripMenuItem_Click_1);
            // 
            // 检查更新ToolStripMenuItem
            // 
            this.检查更新ToolStripMenuItem.Name = "检查更新ToolStripMenuItem";
            this.检查更新ToolStripMenuItem.Size = new System.Drawing.Size(224, 30);
            this.检查更新ToolStripMenuItem.Text = "检查更新";
            // 
            // 禁止操作打印任务ToolStripMenuItem
            // 
            this.禁止操作打印任务ToolStripMenuItem.Name = "禁止操作打印任务ToolStripMenuItem";
            this.禁止操作打印任务ToolStripMenuItem.Size = new System.Drawing.Size(224, 30);
            this.禁止操作打印任务ToolStripMenuItem.Text = "禁止操作打印任务";
            // 
            // 密码退出ToolStripMenuItem
            // 
            this.密码退出ToolStripMenuItem.Name = "密码退出ToolStripMenuItem";
            this.密码退出ToolStripMenuItem.Size = new System.Drawing.Size(224, 30);
            this.密码退出ToolStripMenuItem.Text = "密码退出";
            this.密码退出ToolStripMenuItem.Click += new System.EventHandler(this.密码退出ToolStripMenuItem_Click);
            // 
            // listViewPrinting
            // 
            this.listViewPrinting.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.listViewPrinting.Font = new System.Drawing.Font("Microsoft YaHei UI", 10.8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.listViewPrinting.ForeColor = System.Drawing.Color.DimGray;
            this.listViewPrinting.HeaderStyle = System.Windows.Forms.ColumnHeaderStyle.Nonclickable;
            this.listViewPrinting.HideSelection = false;
            this.listViewPrinting.Location = new System.Drawing.Point(15, 157);
            this.listViewPrinting.Margin = new System.Windows.Forms.Padding(4);
            this.listViewPrinting.Name = "listViewPrinting";
            this.listViewPrinting.Size = new System.Drawing.Size(1346, 726);
            this.listViewPrinting.TabIndex = 9;
            this.listViewPrinting.UseCompatibleStateImageBehavior = false;
            this.listViewPrinting.SelectedIndexChanged += new System.EventHandler(this.listView1_SelectedIndexChanged_1);
            // 
            // pictureBoxBg
            // 
            this.pictureBoxBg.BackgroundImage = global::CloudPrint.Properties.Resources.bg_bggenerator_com1;
            this.pictureBoxBg.InitialImage = global::CloudPrint.Properties.Resources.bg_bggenerator_com1;
            this.pictureBoxBg.Location = new System.Drawing.Point(0, -5);
            this.pictureBoxBg.Margin = new System.Windows.Forms.Padding(4);
            this.pictureBoxBg.Name = "pictureBoxBg";
            this.pictureBoxBg.Size = new System.Drawing.Size(1379, 134);
            this.pictureBoxBg.TabIndex = 10;
            this.pictureBoxBg.TabStop = false;
            this.pictureBoxBg.Click += new System.EventHandler(this.pictureBoxBg_Click);
            this.pictureBoxBg.MouseDown += new System.Windows.Forms.MouseEventHandler(this.pictureBoxBg_MouseDown);
            this.pictureBoxBg.MouseMove += new System.Windows.Forms.MouseEventHandler(this.pictureBoxBg_MouseMove);
            this.pictureBoxBg.MouseUp += new System.Windows.Forms.MouseEventHandler(this.pictureBoxBg_MouseUp);
            // 
            // labMini
            // 
            this.labMini.AutoSize = true;
            this.labMini.BackColor = System.Drawing.Color.Transparent;
            this.labMini.Cursor = System.Windows.Forms.Cursors.Hand;
            this.labMini.Font = new System.Drawing.Font("Microsoft YaHei UI", 15F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.labMini.ForeColor = System.Drawing.Color.White;
            this.labMini.Location = new System.Drawing.Point(1258, 11);
            this.labMini.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.labMini.Name = "labMini";
            this.labMini.Size = new System.Drawing.Size(47, 40);
            this.labMini.TabIndex = 11;
            this.labMini.Text = "一";
            this.labMini.Click += new System.EventHandler(this.labMini_Click);
            // 
            // labClose
            // 
            this.labClose.BackColor = System.Drawing.Color.Transparent;
            this.labClose.Cursor = System.Windows.Forms.Cursors.Hand;
            this.labClose.Font = new System.Drawing.Font("Microsoft YaHei UI", 22.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.labClose.ForeColor = System.Drawing.Color.White;
            this.labClose.Location = new System.Drawing.Point(1314, 0);
            this.labClose.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.labClose.Name = "labClose";
            this.labClose.Size = new System.Drawing.Size(65, 54);
            this.labClose.TabIndex = 12;
            this.labClose.Text = "×";
            this.labClose.Click += new System.EventHandler(this.labClose_Click);
            // 
            // FormMain
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(11F, 24F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.White;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.None;
            this.ClientSize = new System.Drawing.Size(1375, 898);
            this.Controls.Add(this.labClose);
            this.Controls.Add(this.labMini);
            this.Controls.Add(this.listViewPrinting);
            this.Controls.Add(this.pictureBoxLogo);
            this.Controls.Add(this.labStore);
            this.Controls.Add(this.lab_store_name);
            this.Controls.Add(this.pictureBoxBg);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Margin = new System.Windows.Forms.Padding(5);
            this.Name = "FormMain";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "云即印";
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.pictureBoxLogo)).EndInit();
            this.contextMenuStrip1.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.pictureBoxBg)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private System.Windows.Forms.Label lab_store_name;
        private System.Windows.Forms.Label labStore;
        private System.Windows.Forms.PictureBox pictureBoxLogo;
        public System.Windows.Forms.NotifyIcon MyNotifyIcon;
        private System.Windows.Forms.ContextMenuStrip contextMenuStrip1;
        private System.Windows.Forms.ToolStripMenuItem 管理后台ToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem 检查更新ToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem 禁止操作打印任务ToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem 密码退出ToolStripMenuItem;
        public  System.Windows.Forms.ListView listViewPrinting;
        private System.Windows.Forms.PictureBox pictureBoxBg;
        private System.Windows.Forms.Label labMini;
        private System.Windows.Forms.Label labClose;
    }
}

