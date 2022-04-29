from __init__ import db
import time
# 用户订单
class Order(db.Model):
    __tablename__ = "order"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    order_id=db.Column(db.String(50))
    store_name=db.Column(db.String(50))
    order_type = db.Column(db.Integer)
    take_id = db.Column(db.String(50))
    store_id = db.Column(db.String(50))
    printer_name = db.Column(db.String(50))
    price = db.Column(db.DECIMAL(20,2))
    file_count = db.Column(db.Integer)
    print_situation_code = db.Column(db.Integer)
    print_situation = db.Column(db.String(10))
    openid = db.Column(db.String(60))
    create_time = db.Column(db.String(60),default=db.func.now())
    timestamp = db.Column(db.Integer, default = int(time.time()))
    def __init__(self,order_id,order_type,take_id,store_name,file_count, store_id,printer_name, price,print_situation_code, print_situation,openid):
        self.order_id=order_id
        self.order_type = order_type
        self.store_name=store_name
        self.file_count=file_count
        self.take_id=take_id
        self.store_id = store_id
        self.printer_name = printer_name
        self.price = price
        self.print_situation_code = print_situation_code
        self.print_situation = print_situation
        self.openid = openid


# 用户文件订单
class FileOrder(db.Model):
    __tablename__ = "fileorder"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    order_id = db.Column(db.String(50))
    file_id = db.Column(db.String(50))
    file_name = db.Column(db.String(255))
    file_type = db.Column(db.String(255))
    file_type_id = db.Column(db.String(255))
    duplex = db.Column(db.Integer)
    print_color= db.Column(db.Integer)
    print_count=db.Column(db.Integer)
    print_price= db.Column(db.String(50))
    size= db.Column(db.String(50))
    create_time = db.Column(db.String(60),default=db.func.now())
    timestamp = db.Column(db.Integer, default = int(time.time()))
    def __init__(self,order_id,size,print_color,print_count, file_id, file_name,print_price,file_type, file_type_id,duplex):
        self.order_id = order_id
        self.file_id = file_id
        self.print_count=print_count
        self.file_name = file_name
        self.print_price = print_price
        self.file_type = file_type
        self.file_type_id = file_type_id
        self.duplex=duplex
        self.print_color=print_color
        self.size=size

