using System;
using System.Collections.Generic;
using System.Text;

namespace EnjoyPrint.entity
{
    public class TempFile
    {

        //public string FileId { get; set; }
        //public string FileName { get; set; }
        //public string FileType { get; set; }
        //public int FileTypeID { get; set; }

        //public string FilePath { get; set; }
        //public string Size { get; set; }
        //public int PrintColor { get; set; }

        //public int Duplex { get; set; }
        //public short PrintCount { get; set; }
        //public int IsPrintAll { get; set; }
        //public int PrintFromRange { get; set; }
        //public int PrintToRange { get; set; }
        //public int PrintPageNum { get; set; }
        //public string DownloadUrl { get; set; }
        //public float PrintPrice { get; set; }
        public string file_id { get; set; }
        public string file_name { get; set; }
        public string file_type { get; set; }
        public int file_type_id { get; set; }
        public string file_path { get; set; }
        public string size { get; set; }
        public int print_color { get; set; }

        public int duplex { get; set; }
        public short print_count { get; set; }
        public int is_print_all { get; set; }
        public int print_from_page { get; set; }
        public int print_to_page { get; set; }
        public int print_page_num { get; set; }
        public string download_url { get; set; }
        public float print_price { get; set; }
        //public string FileNewName { get; set; }
        //public string FileNewNamePdf { get; set; }
        //public IDictionary<string, string> PrintInfo { get; set; }

    }

}
