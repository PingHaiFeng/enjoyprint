from flask import Blueprint, request,jsonify
from utils.utils import *
from model.db_model.store import StoreAccount,Printer,Store,db
from model.db_model.user import Order,db
from utils.auth import create_token,login_required,verify_token
from utils.state_handler import *
import ast
from log.except_logger import *
from plugins.redis_serve import *
from config import *
pc = Blueprint('pc', __name__)  # 第一个蓝图名称，第二个参数表示蓝图所在板块

# 初始化版本信息
@pc.route('/version-info', methods=["POST", "GET"])
def version_info():
    return State.success(data={"last_version":PC_LAST_VERSION})


# 店铺账号登录
@pc.route('/login', methods=["POST", "GET"])
def login():
    username = request.form.get("username")
    password = request.form.get("password")
    account = StoreAccount.query.filter_by(username=username,password=password).first()
    if not account:
        return State.fail("用户名或密码错误")
    if not account.enabled:
        return State.fail("您的账户被冻结，请联系客服解决")
    return State.success(data={"token":create_token(account.id,"P-")})
        



# 获取店铺信息
@pc.route('/get_info', methods=["POST", "GET"])
def get_info():
    store_id = verify_token(request.headers["X-Token"]).store_id
    account = Store.query.filter_by(store_id=store_id).first()
    if account:
        return State.success(data={"store_name":account.store_name,"store_id":account.store_id})
    else:
        return State.fail()

# 保存店铺打印机信息
@except_logger
@pc.route('/set_printers_info', methods=["POST", "GET"])
def set_printers_info():

    store_id=request.form.get("store_id")
    computer_id=request.form.get("computer_id")
    printers_params=ast.literal_eval(request.form.get("printers_params"))
    host_ip = StoreAccount.query.filter_by(store_id=store_id).first().host_ip
    for i in range(0,len(printers_params)):
        printer_name=printers_params[i]["printer_name"]
        supports_color=printers_params[i]["supports_color"]
        can_duplex=printers_params[i]["can_duplex"]
        is_defalut=printers_params[i]["is_defalut"]
        res = Printer.query.filter_by(store_id=store_id,printer_name=printer_name).first()
        if res:
            res.computer_id=computer_id
            res.printer_name=printer_name
            res.supports_color=supports_color 
            res.can_duplex=can_duplex 
            res.is_defalut=is_defalut
            res.host_ip = host_ip
            db.session.commit()
        else:
            printer=Printer(store_id=store_id,computer_id=computer_id,host_ip=host_ip,printer_name=printer_name,supports_color=supports_color,can_duplex=can_duplex,is_defalut=is_defalut,can_self_print=0,is_user_set_defalut=is_defalut)
            db.session.add(printer)
            db.session.commit()
        
    return  State.success()



# 退出登录
@pc.route('/logout', methods=["POST", "GET"])
def logout():
   
    return State.success()

# 储存登陆ip
@pc.route('/save_host_ip', methods=["POST", "GET"])
def save_host_ip():
    try:
        host_ip = request.form.get("host_ip")
        token=request.form.get("token")
        res = verify_token(token)
        res.host_ip=host_ip
        db.session.commit()
        return "1"
    except:
   
        return "0"

# 追踪每份文件打印状态
@pc.route('/state-feedback', methods=["POST", "GET"])
def handle_print_state():
    try:
        order_id =request.form.get("order_id")
        code =request.form.get("code")
        print(order_id,code)
        res = Order.query.filter_by(order_id=order_id).first()
        res.print_situation_code=code
        if code=="1":res.print_situation="已打印"
        if code=="-1":res.print_situation="待打印"
        if code=="0":res.print_situation="打印失败"
        db.session.commit()  
        return  State.success()
    except:
        return  State.fail()

# 店铺账号登录
@pc.route('/admin_exit', methods=["POST", "GET"])
def admin_exit():
    username = request.form.get("username")
    password = request.form.get("password")
    account = StoreAccount.query.filter_by(username=username,password=password).first()
    if account:
        r.delete("ONLINE_STATE_"+str(account.store_id))
        return State.success()
    else:
        return State.fail("用户名或密码错误")

@pc.after_request
def releaseDB(response):
    db.session.close()
    return response