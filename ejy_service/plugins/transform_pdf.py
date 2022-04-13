# -*- encoding: utf-8 -*-
import os
from win32com import client
import pythoncom
import comtypes.client
from pptx import Presentation
import os
import glob
import fitz


def doc2pdf(doc_name, pdf_name):
    """
    :word文件转pdf
    :param doc_name word文件名称
    :param pdf_name 转换后pdf文件名称
    """
    try:
        pythoncom.CoInitialize()
        word = client.DispatchEx("Word.Application")
        if os.path.exists(pdf_name):
            os.remove(pdf_name)
        worddoc = word.Documents.Open(doc_name, ReadOnly=1)
        worddoc.SaveAs(pdf_name, FileFormat=17)
        worddoc.Close()
        word.Quit()
        pythoncom.CoUninitialize()
        return pdf_name
    except:
        raise


def ppt2pdf(ppt_name, pdf_name):
    """
    :ppt文件转pdf
    :param ppt_name ppt文件名称
    :param pdf_name 转换后pdf文件名称
    """
    try:
        pythoncom.CoInitialize()
        ppt_app = client.Dispatch("Powerpoint.Application")
        # ppt_app.Visible = False  # 程序操作应用程序的过程是否可视化
        if os.path.exists(pdf_name):
            os.remove(pdf_name)

        ppt = ppt_app.Presentations.Open(ppt_name, WithWindow=False)

        # 4). 打开的PPT另存为pdf文件。17数字是ppt转图片，32数字是ppt转pdf。
        ppt.SaveAs(pdf_name, 32)
        print("导出成pdf格式成功!!!")
        # 退出PPT程序
        ppt_app.Quit()
        pythoncom.CoUninitialize()
        return pdf_name
    except:
        raise


def img2pdf(img_name,pdf_name):
    
    # 使用glob读图
    os.environ['NLS_LANG'] = 'SIMPLIFIED CHINESE_CHINA.UTF8'
    img = img_name
    # 打开空文档
    doc = fitz.open()
    # 打开指定图片
    imgdoc = fitz.open(img)
    # 使用图片创建单页的PDF
    pdfbytes = imgdoc.convert_to_pdf()
    imgpdf = fitz.open("pdf", pdfbytes)
    # 将当前页写入文档
    doc.insert_pdf(imgpdf)
    # 保存为指定名称的PDF文件
    doc.save(pdf_name)
    # 关闭
    doc.close()
    return pdf_name


if __name__ == '__main__':
    # doc2pdf(r"C:\Users\92098\PycharmProjects\pythonProject\example\云打印后端接口\云打印文件存放\text.docx",r"C:\Users\92098\PycharmProjects\pythonProject\example\云打印后端接口\云打印文件存放\texd.pdf")
    img2pdf(r"C:\\Users\\Administrator\\Desktop\\云打印后端接口\\云打印文件存放\\-262e32199e87bb57.png",
            r"C:\\Users\\Administrator\\Desktop\\云打印后端接口\\云打印文件存放\\-262e32199e87bb57.pdf")