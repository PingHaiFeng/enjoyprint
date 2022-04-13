from PyPDF2 import PdfFileReader
from plugins import transform_pdf
from haifeng.YunJIYIn.utils.utils import *
import time
import os
from pptx import Presentation

IO_PATH = get_relative_path()+ "\\temp_files\\"
def readFiles(file_new_name,file_name, file_type):
    """获取文件类型"""
    # 文件类型为word则自动转换为pdf
    if file_type == "docx" or file_type == "doc":
        time1 = time.time()
        print("正在转换{}".format(file_name))
        file_type_id=2
        doc_path = IO_PATH+file_new_name
        pdf_path = IO_PATH+file_new_name+".pdf"
        print(doc_path)
        transform_pdf.doc2pdf(doc_path, pdf_path)
        page_num = getPdfPageNum(file_new_name + ".pdf")
        time2 = time.time()
        print("转换完成，共耗时" + str(time2 - time1) + "秒")
        return page_num, file_type_id

    # elif file_type == "pptx":
    #     file_type_id=3
    #     print(file_new_name)
    #     page_num = getPptPageNum(file_new_name)
    #     return page_num, file_type_id

    elif file_type == "ppt" or file_type == "pptx":
        time1 = time.time()
        print("正在转换{}".format(file_name))
        file_type_id=3
        ppt_path = IO_PATH + file_new_name
        pdf_path = IO_PATH + file_new_name + ".pdf"
        transform_pdf.ppt2pdf(ppt_path, pdf_path)
        page_num = getPdfPageNum(file_new_name + ".pdf")
        time2 = time.time()
        print("转换完成，共耗时" + str(time2 - time1) + "秒")
        return page_num,  file_type_id
    elif file_type == "jpg" or file_type == "png":
        file_type_id=4
        page_num = 1
        img_path = IO_PATH + file_new_name
        pdf_path = IO_PATH + file_new_name + ".pdf"
        transform_pdf.img2pdf(img_path, pdf_path)
        return page_num, file_type_id
    elif file_type == "pdf":
        file_type_id=1
        page_num = getPdfPageNum(file_new_name)
        return page_num,  file_type_id


# 获取ppt页数
def getPptPageNum(file_id):

    try:
        ppt_path = "./temp_files/{}".format(file_id)
        p = Presentation(ppt_path)
        page = len(p.slides)
    except KeyError:
        page = 0
    return page

# 获取pdf页数
def getPdfPageNum(file_id):
    """获取pdf文件页数"""
    pdf_path = r"./temp_files/{}".format(file_id)
    reader = PdfFileReader(pdf_path, strict=False)
    if reader.isEncrypted:
        reader.decrypt('')
    return reader.getNumPages()


