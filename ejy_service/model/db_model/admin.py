from __init__ import db
from utils.utils import *


# 店铺账号信息
class AdminAccount(db.Model):
    __tablename__ = "admin_account"
    __table_args__ = {'extend_existing': True}
    admin_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(255))
    password = db.Column(db.String(255))
    def __init__(self,  username, password):
        self.username = username
        self.password = password

# 入驻
class Partner(db.Model):
    __tablename__ = "partner"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True,autoincrement=True) 
    nick_name=db.Column(db.String(255))
    avatar_url=db.Column(db.String(255))
    phone=db.Column(db.String(255))
    name=db.Column(db.String(255))
    def __init__(self, data):
       self.nick_name=data.get("nick_name")
       self.avatar_url=data.get("avatar_url")
       self.phone=data.get("phone")
       self.name=data.get("name")

# 公告栏
class NoticeBoard(db.Model):
    __tablename__ = "notice_board"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255))
    content = db.Column(db.String(255))
    create_time =db.Column(db.String(50),default = str(time_now()))
    auto_show= db.Column(db.Integer)
    show=db.Column(db.Integer)
    def __init__(self, title, content, create_time,auto_show,show):
        self.title = title
        self.content = content
        self.create_time = create_time
        self.auto_show=auto_show
        self.show=show
# 反馈信息
class FeedBack(db.Model):
    __tablename__ = "feedback"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True,autoincrement=True) 
    nick_name=db.Column(db.String(255))
    avatar_url=db.Column(db.String(255))
    picture=db.Column(db.String(2550))
    store_id=db.Column(db.String(255))
    suggestion=db.Column(db.String(255))
    plat=db.Column(db.String(255))
    create_time = db.Column(db.String(30),default=time_now())
    def __init__(self, data):
       self.nick_name=data.get("nick_name")
       self.picture=data.get("picture")
       self.avatar_url=data.get("avatar_url")
       self.store_id=data.get("store_id")
       self.suggestion=data.get("suggestion")
       self.plat=data.get("plat")

# 
class MiniInfo(db.Model):
    __tablename__ = "miniinfo"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True,autoincrement=True) 
    swiper=db.Column(db.String(2550))
   
    def __init__(self, swiper):
       self.swiper=swiper
       
class StoreLoginLog(db.Model):
    __tablename__ = "log_store"
    __table_args__ = {'extend_existing': True}
    login_id = db.Column(db.Integer, primary_key=True,autoincrement=True) 
    store_id = db.Column(db.Integer)
    login_type = db.Column(db.Integer)
    state =   db.Column(db.String(50))
    login_time = db.Column(db.String(50),default=time_now())
   
    def __init__(self, store_id,login_type,state):
       self.store_id=store_id
       self.login_type=login_type
       self.state=state