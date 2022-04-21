using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;

namespace EnjoyPrint.utils
{
    class Common
    {

        public static string LineToHump(string name)
        {

            name = string.Concat(name.Select((x, i) => i > 0 && char.IsUpper(x) ? "_" + x.ToString() : x.ToString())).ToLower();
            Console.WriteLine(name);
            return name;
            //StringBuilder builder = new StringBuilder();

            //foreach (var s in name.Split(new[] { '_' }, StringSplitOptions.RemoveEmptyEntries))
            //{
            //    Console.WriteLine(builder);
            //    builder.Append(Thread.CurrentThread.CurrentCulture.TextInfo.ToUpper(s));
            //}

            //return builder.ToString();
        }

    }
}
