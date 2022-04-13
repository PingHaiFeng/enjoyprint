import html2canvas from "html2canvas";
import QRCode from "qrcodejs2";

// 生成专属二维码
function createQrcode(text) {
    const qrcodeImgEl = document.getElementById("qrcodeImg");
    let qrcode = new QRCode(qrcodeImgEl, {
        width: 500,
        height: 500,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
    });
    qrcode.makeCode(text);
}

// 保存专属二维码图片到本地
export function downQrcode(row) {

    createQrcode(
        "https://cloudprint.pinghaifeng.cn/web/printer_ewm?store_id=" +
        row.store_id +
        "&printer_id=" +
        row.printer_id
    );
    const domObj = document.getElementById("posterHtml");
    html2canvas(domObj, {
        useCORS: true,
        allowTaint: false,
        logging: false,
        letterRendering: true,
        onclone(doc) {
            let e = doc.querySelector("#posterHtml");
            e.style.display = "block";
            // e.style.transform="translate(219px, 375px)";
        },
    })
        .then((canvas) => {
            var alink = document.createElement("a");
            alink.href = canvas.toDataURL("image/png");
            alink.download = `${row.printer_name}的专属二维码`; // 图片名
            alink.click();
         
        })
        .catch((err) => {
          
        });
}


