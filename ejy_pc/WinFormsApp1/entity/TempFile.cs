using System;
using System.Collections.Generic;
using System.Text;

namespace CloudPrint.Entity
{
    public class TempFile
    {

        public string FileId { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        public int FileTypeID { get; set; }

        public string FilePath { get; set; }
        public string Size { get; set; }
        public int PrintColor { get; set; }

        public int Duplex { get; set; }
        public short PrintCount { get; set; }
        public int IsPrintAll { get; set; }
        public int PrintFromRange { get; set; }
        public int PrintToRange { get; set; }
        public int PrintPageNum { get; set; }
        public float PrintPrice { get; set; }
        //public string FileNewName { get; set; }
        //public string FileNewNamePdf { get; set; }
        //public IDictionary<string, string> PrintInfo { get; set; }

    }

}
