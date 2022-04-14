from flask import Blueprint, request,jsonify
from utils.utils import *
from model.db_model.admin import NoticeBoard
from model.db_model.admin import AdminAccount,db
from model.db_model.store import Store,StoreAccount
from utils.auth import create_token,login_required,verify_token
from utils.state_handler import *
from log.except_logger import *


admin = Blueprint('admin', __name__)  # 第一个蓝图名称，第二个参数表示蓝图所在板块

# 管理员账号登录
@admin.route('/login', methods=["POST", "GET"])
def login():
    username = request.form.get("username")
    password = request.form.get("password")
    print(username,password )
    account = AdminAccount.query.filter_by(username=username,password=password).first()
    if account:
        return State.success(data={"token":create_token(account.admin_id,"A-")})
    else:
        return State.fail("用户名或密码错误")



# 获取信息
@admin.route('/info', methods=["POST", "GET"])
def get_info():
    admin_id = verify_token(request.headers["X-Token"]).admin_id
    account = AdminAccount.query.filter_by(admin_id=admin_id).first()
    if account:
        return State.success(data={"username":account.username,"admin_id":account.admin_id})
    else:
        return State.fail()

#店铺设置
@admin.route('/store', methods=["POST", "GET", "PUT", "DELETE"])
@login_required
@except_logger
def handleStoreAccount():
    '''增'''
    if request.method == "POST":
        db.session.add(StoreAccount(data=request.form))
        db.session.commit()
        return State.success()
    '''删'''
    if request.method == "DELETE":
        store_id = request.args.get('store_id')
        StoreAccount.query.filter_by(store_id=store_id).delete()
        Store.query.filter_by(store_id=store_id).delete()
        db.session.commit()
        return State.success()
    '''改'''
    if request.method == "PUT": 
        data = request.form.to_dict()
        StoreAccount.query.filter_by(store_id=data.get("store_id")).update(data)
        db.session.commit()
        return State.success()
    '''查'''  
    if request.method == 'GET':
        res = StoreAccount.query.filter_by(store_id=store_id).first()
        return State.success(data={"store": res})
# 店铺列表
@admin.route('/list-store', methods=["POST", "GET"])
@login_required
@except_logger
def list_store():
    _args=request.args
    map=[]
    if _args.get("store_id"):  #id
        map.append(store_id=_args.get("store_id"))
    if len(map)>0:
        total=Store.query.filter(*map).count()
        list = Store.query.filter(*map).limit(_args.get("page_size")).offset((int(_args.get("page_num"))-1)*int(_args.get("page_size")))
    else:
        total=Store.query.count()
        list = Store.query.limit(_args.get("page_size")).offset((int(_args.get("page_num"))-1)*int(_args.get("page_size")))
    list=model_to_dict(list)
    return State.success(data={"list": list,"total":total})

@admin.after_request
def releaseDB(response):
    db.session.close()
    return response