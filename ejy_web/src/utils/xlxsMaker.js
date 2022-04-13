import FileSaver from "file-saver";
import {getTodayDate} from "@/utils/date"
const xlsx =require("xlsx")
export function xlxsMaker(domID,fileName){
          var wb = xlsx.utils.table_to_book(document.querySelector(domID),{ raw: true } );
          var dateToday=getTodayDate()
          /* get binary string as output */
          var wbout = xlsx.write(wb, {
            bookType: "xlsx",
            bookSST: true,
            type: "array",
          });
          try {
            FileSaver.saveAs(
              new Blob([wbout], { type: "application/octet-stream" }),
              `${fileName}-${dateToday}.xlsx`
            );
          } catch (e) {
            if (typeof console !== "undefined") console.log(e, wbout);
          }
          return wbout;
}