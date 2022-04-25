from __init__ import db
from sqlalchemy import func


# 店铺基本信息
class Store(db.Model):
    __tablename__ = "store"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    store_id = db.Column(db.Integer)
    store_name = db.Column(db.String(255))
    area = db.Column(db.String(255))
    adcode = db.Column(db.Integer)
    adname = db.Column(db.String(255))
    store_announce = db.Column(db.String(255))
    detail_addr =  db.Column(db.String(255))
    use_take_id = db.Column(db.Integer)
    o_id = db.Column(db.Integer,db.ForeignKey("order.id"))
    def __init__(self, store_id, store_name, area, adcode,adname, store_announce,detail_addr,use_take_id):
        self.store_id = store_id
        self.store_name = store_name
        self.area = area
        self.detail_addr = detail_addr
        self.adcode = adcode
        self.adname = adname
        self.store_announce = store_announce
        self.use_take_id=use_take_id


# 店铺账号信息
class StoreAccount(db.Model):
    __tablename__ = "store_account"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    store_id = db.Column(db.Integer)
    username = db.Column(db.String(255))
    password = db.Column(db.String(255))
    host_ip = db.Column(db.String(255))
    enabled = db.Column(db.Integer)
    def __init__(self,  store_id, username, password, host_ip,enabled):
        self.store_id = store_id
        self.username = username
        self.password = password
        self.host_ip = host_ip
        self.enabled = enabled

#价格信息
class Price(db.Model):
    __tablename__ = "price"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True,nullable=False,autoincrement=True) 
    store_id=db.Column(db.String(255),nullable=False)
    paper_type=db.Column(db.String(30))
    size=db.Column(db.String(30))
    color=db.Column(db.String(30))
    duplex=db.Column(db.String(30))
    price=db.Column(db.DECIMAL(20,2))
    def __init__(self,store_id, data):
       self.store_id=store_id
       self.paper_type=data.get("paper_type")
       self.size=data.get("size")
       self.color=data.get("color")
       self.duplex=data.get("duplex")
       self.price=data.get("price")

#打印机信息
class Printer(db.Model):
    __tablename__ = "printer"
    __table_args__ = {'extend_existing': True}
    printer_id=db.Column(db.Integer, primary_key=True,autoincrement=True)
    store_id=db.Column(db.String(255))
    computer_id=db.Column(db.String(255))
    host_ip=db.Column(db.String(255))
    printer_name=db.Column(db.String(255))
    can_duplex=db.Column(db.Integer)
    is_defalut=db.Column(db.Integer)
    is_user_set_defalut=db.Column(db.Integer)
    supports_color=db.Column(db.Integer)

    can_self_print=db.Column(db.Integer,default=0)
    def __init__(self, store_id,computer_id,host_ip,printer_name,can_duplex,is_defalut,is_user_set_defalut,supports_color,can_self_print):
       self.store_id=store_id
       self.computer_id=computer_id
       self.host_ip=host_ip
       self.printer_name=printer_name
       self.can_duplex=can_duplex
       self.is_defalut=is_defalut
       self.is_user_set_defalut=is_user_set_defalut
       self.supports_color=supports_color
       self.can_self_print=can_self_print


# 账户信息
# class Users(db.Model):
#     __tablename__ = "users"
#     id = db.Column(db.Integer, primary_key=True)  # 整型的主键，会默认设置为自增主键
#     openid = db.Column(db.String(126), unique=True)
#     nick_name = db.Column(db.String(64), unique=False)
#     face = db.Column(db.String(128))
#
#     # role_id = db.Column(db.Integer, db.ForeignKey("pt_jobs.id"))  # 外键
#     def __init__(self, openid, nick_name, face):
#         self.openid = openid
#         self.nick_name = nick_name
#         self.face = face
#
