using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;

namespace CloudPrint.utils
{
    class Common
    {
        public static string LineToHump(string name)
        {
            StringBuilder builder = new StringBuilder();
            foreach (var s in name.Split(new[] { '_' }, StringSplitOptions.RemoveEmptyEntries))
            {
                builder.Append(Thread.CurrentThread.CurrentCulture.TextInfo.ToTitleCase(s));
            }

            return builder.ToString();
        }

    }
}
