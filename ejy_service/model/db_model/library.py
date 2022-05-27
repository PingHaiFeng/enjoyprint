from __init__ import db
from utils.utils import *
import datetime
import time

CURRENT_TIME = time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime())

# 文件夹
class DocFolder(db.Model):
    __tablename__ = "doc_folder"
    __table_args__ = {'extend_existing': True}
    folder_id=db.Column(db.Integer, primary_key=True,autoincrement=True)
    store_id=db.Column(db.Integer)
    ishot=db.Column(db.Integer, default = 0)
    folder_name=db.Column(db.String(255))
    create_date=db.Column(db.String(60),default=db.func.now())
    read_num=db.Column(db.Integer)
    print_num=db.Column(db.Integer)
    on_sale = db.Column(db.Integer)
    def __init__(self,store_id,data):
        self.store_id = store_id
        self.folder_name = data.get("folder_name")
        self.read_num = data.get("read_num")
        self.print_num = data.get("print_num")
        self.on_sale = data.get("on_sale")

# 文件
class Doc(db.Model):
    __tablename__ = "doc"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True) 
    file_id=db.Column(db.String(255))
    file_type=db.Column(db.String(55))
    store_id=db.Column(db.Integer)
    file_type_id=db.Column(db.Integer)
    folder_id=db.Column(db.Integer)
    ishot=db.Column(db.Integer)
    file_name=db.Column(db.String(255))
    create_date=db.Column(db.String(255),default=time_now())
    read_num=db.Column(db.Integer,default=0)
    print_num=db.Column(db.Integer,default=0)
    file_page_num=db.Column(db.Integer)
    download_url=db.Column(db.String(255))
    commission=db.Column(db.DECIMAL(20,2))
    on_sale = db.Column(db.Integer,default=1)
    def __init__(self, folder_id,store_id,file_id,file_type,file_type_id,file_name,file_page_num,download_url,on_sale,commission):
        self.folder_id=folder_id
        self.file_id=file_id
        self.store_id=store_id
        self.file_type=file_type
        self.file_type_id=file_type_id
        self.file_name=file_name
        self.file_page_num=file_page_num
        self.download_url=download_url
        self.on_sale = on_sale
        self.commission = commission
