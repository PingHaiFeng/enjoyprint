using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Text;

namespace CloudPrint
{
    public partial class PrintFileView : Component
    {
        public PrintFileView()
        {
            InitializeComponent();
        }

        public PrintFileView(IContainer container)
        {
            container.Add(this);

            InitializeComponent();
        }
    }
}
