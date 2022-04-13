using System;
using System.Collections.Generic;
using System.Text;

namespace CloudPrint.Entity
{
    public class TempFile
    {
        public string OrderId { get; set; }
        public int AlreadyOrderNum { get; set; } = 0;
        public int FileCount { get; set; }
        public string FileId { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public int PrintPageNum { get; set; }
        public string FileType { get; set; }
        public string PrintPrice { get; set; }
        public string FileNewName { get; set; }
        public string FileNewNamePdf { get; set; }
        public bool Duplex { get; set; }
        public bool PrintColor { get; set; }
    
        public int PrintFromRange { get; set; }
        public int PrintToRange { get; set; }
        public short PrintCount { get; set; }
        public IDictionary<string, string> PrintInfo { get; set; }

    }

}
