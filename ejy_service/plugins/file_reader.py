from PyPDF2 import PdfFileReader
from plugins import transform_pdf
from utils.utils import *
import time
import os
from pptx import Presentation
from config import IO_PATH

def readFiles(file_id, file_type):
    """获取文件类型"""
    # 文件类型为word则自动转换为pdf
    if file_type == "docx" or file_type == "doc":
        time1 = time.time()
        file_type_id=2
        doc_path = IO_PATH+file_id+"."+file_type
        pdf_path = IO_PATH+file_id+".pdf"
        transform_pdf.doc2pdf(doc_path, pdf_path)
        page_num = getPdfPageNum(file_id + ".pdf")
        time2 = time.time()
        return page_num, file_type_id

    elif file_type == "ppt" or file_type == "pptx":
        time1 = time.time()
        file_type_id=3
        ppt_path = IO_PATH+file_id+"."+file_type
        pdf_path = IO_PATH + file_id + ".pdf"
        transform_pdf.ppt2pdf(ppt_path, pdf_path)
        page_num = getPdfPageNum(file_id + ".pdf")
        time2 = time.time()
        return page_num,  file_type_id
    elif file_type == "jpg" or file_type == "png":
        file_type_id=4
        page_num = 1
        img_path = IO_PATH+file_id+"."+file_type
        pdf_path = IO_PATH + file_id + ".pdf"
        transform_pdf.img2pdf(img_path, pdf_path)
        return page_num, file_type_id
    elif file_type == "pdf":
        file_type_id=1
        page_num = getPdfPageNum(file_id + ".pdf")
        return page_num,  file_type_id

# 获取pdf页数
def getPdfPageNum(name):
    """获取pdf文件页数"""
    pdf_path = IO_PATH + name
    reader = PdfFileReader(pdf_path, strict=False)
    if reader.isEncrypted:
        reader.decrypt('')
    return reader.getNumPages()


