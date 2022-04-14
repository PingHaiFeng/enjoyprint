from flask import Blueprint, request,jsonify,send_from_directory
from utils.utils import *
from sqlalchemy import func
from model.db_model.admin import NoticeBoard
from model.db_model.store import StoreAccount,Store,Printer,Price,db
from model.db_model.user import FileOrder, Order,db
from utils.auth import create_token,login_required,verify_token
from utils.state_handler import State
from log.except_logger import *
from plugins.redis_serve import *
import qrcode

web = Blueprint('web', __name__) 

# 店铺账号登录
@web.route('/login', methods=["POST", "GET"])
@except_logger
def login():
    username = request.form.get("username")
    password = request.form.get("password")
    if not all([username,password]):
        return State.fail("请填写手机号和密码")
    user = StoreAccount.query.filter_by(username=username,password=password).first()
    if user is None:
        return State.fail("账号或密码错误")

    return State.success(data={"token":create_token(user.id,"W-")})


# 获取店铺信息
@web.route('/get_info', methods=["POST", "GET"])
@login_required
@except_logger
def get_info():
    store = verify_token(request.headers["X-Token"]) 
    store_name = Store.query.filter_by(store_id=store.store_id).first().store_name
    return State.success(data={"id":store.id,"store_id":store.store_id,"store_name":store_name})


# 店铺详情
@web.route('/store-detail', methods=["POST", "GET"])
@login_required
@except_logger
def get_store_detail():
    storeAccount = verify_token(request.headers["X-Token"])
    store= Store.query.filter_by(store_id=storeAccount.store_id).first()
    pc_online =  r.exists("ONLINE_STATE_"+storeAccount.store_id)
    return State.success(data={"store_name":store.store_name,"username":storeAccount.username,"store_announce":store.store_announce,"detail_addr":store.detail_addr,"pc_online":pc_online })

#保存店铺信息
@web.route('/set_store_detail', methods=["POST", "GET"])
@login_required
@except_logger
def set_store_detail():
    account = verify_token(request.headers["X-Token"])
    store_name=request.form.get("store_name")
    store_announce=request.form.get("store_announce")
    store = Store.query.filter_by(store_id=account.store_id).first()
    account.store_name=store_name
    store.store_name=store_name
    store.store_announce=store_announce
    db.session.commit()   
    return State.success("修改店铺信息成功")

#打印机设置
@web.route("/printer", methods=["POST", "GET", "PUT", "DELETE"])
@except_logger
@login_required
def handlePrinter():
    store_id = verify_token(request.headers["X-Token"]).store_id
    '''改'''
    if request.method == "PUT": 
            data = request.form.to_dict()
            Printer.query.filter_by(store_id=store_id,id=data.get("id")).update(data)
            db.session.commit()
            return State.success()
    '''查'''         
    if request.method == 'GET': 
            list = model_to_dict(Printer.query.filter_by(store_id=store_id))
            return State.success(data={"list":list})



#价格设置
@web.route('/price', methods=["POST", "GET", "PUT", "DELETE"])
@login_required
@except_logger
def handlePrice():
    store_id = verify_token(request.headers["X-Token"]).store_id
    '''增'''
    if request.method == "POST":
        db.session.add(Price(store_id=store_id,data=request.form))
        db.session.commit()
        return State.success()
    '''删'''
    if request.method == "DELETE":
        id = request.args.get('id')
        Price.query.filter_by(id=id,store_id=store_id).delete()
        db.session.commit()
        return State.success()
    '''改'''
    if request.method == "PUT": 
        data = request.form.to_dict()
        Price.query.filter_by(id=data.get("id"),store_id=store_id).update(data)
        db.session.commit()
        return State.success()
    '''查'''  
    if request.method == 'GET':
        list = model_to_dict(Price.query.filter_by(store_id=store_id))
        return State.success(data={"list": list})




# 账户信息设置
@web.route('/account', methods=["POST", "GET"])
@login_required
@except_logger
def account():
    store_id = verify_token(request.headers["X-Token"]).store_id
    res = StoreAccount.query.filter_by(store_id=store_id).first()
    res.store_id=store_id
    db.session.commit()  


# 公告
@web.route('/notice', methods=["POST", "GET"])
@except_logger
@login_required
def get_notice():
    notice = model_to_dict(NoticeBoard.query.all())
    return  State.success(data={"notice": notice})

# 订单列表
@web.route('/list-order', methods=["POST", "GET"])
@login_required
@except_logger
def list_order():
    store_id = verify_token(request.headers["X-Token"]).store_id
    _form=request.form
    map=[]
    if _form.get("order_id"):  #订单id
        map.append(Order.order_id==_form.get("order_id"))
    # if _form.get("pay_type"):  #订单id
    #     map.append(Order.pay_type==_form.get("pay_type"))
    if _form.get("take_id"):  #取件码
        map.append(Order.take_id==_form.get("take_id"))
    if _form.get("print_situation"):#打印状态
        map.append(Order.print_situation==_form.get("print_situation"))
    if _form.get("date_range"):#开始日期
        map.append(Order.create_time  >= _form.get("date_range").split(',')[0]+" 00:00:00")
        map.append(Order.create_time <= _form.get("date_range").split(',')[1]+" 23:59:59" )
    if len(map)>0:
        total=Order.query.filter(*map).filter_by(store_id=store_id).count()
        list = Order.query.filter(*map).filter_by(store_id=store_id).order_by(Order.create_time.desc()).limit(_form.get("page_size")).offset((int(_form.get("page_num"))-1)*int(_form.get("page_size")))
    else:
        total=Order.query.filter_by(store_id=store_id).count()
        list = Order.query.filter_by(store_id=store_id).order_by(Order.create_time.desc()).limit(_form.get("page_size")).offset((int(_form.get("page_num"))-1)*int(_form.get("page_size")))
    list=model_to_dict(list)
    return State.success(data={"list": list,"total":total})

# 获取文件详情
@web.route('/list-file-order', methods=["POST", "GET"])
@login_required
@except_logger
def get_file_order():
    order_id = request.args.get("order_id")
    print(order_id)
    total = FileOrder.query.filter_by(order_id=order_id).count()
    list = model_to_dict(FileOrder.query.filter_by(order_id=order_id).all())
    return State.success(data={"list": list,"total":total})

#获取近日营业数据
@web.route('/recent-sales', methods=["POST", "GET"])
@login_required
def get_recent_sales():
    store_id = verify_token(request.headers["X-Token"]).store_id
    s_date = request.form.get("s_date")
    e_date = request.form.get("e_date")
    date_list=getEveryDay(s_date,e_date)
    bill_data=[]
    for date_item in date_list:
        map=[]
        map.append(Order.create_time  >= date_item+" 00:00:00")
        map.append(Order.create_time <=date_item+" 23:59:59" )
        order_num=Order.query.filter(*map).filter_by(store_id=store_id).count()
        order_money = db.session.query(func.sum(Order.price)).filter(*map).filter_by(store_id=store_id).scalar()#计算总价
        if order_money is None:order_money=0
        d = {date_item:{"order_num":order_num,"order_money":order_money}}
        bill_data.append(d)
    return  State.success(data={"recent_sales": bill_data})



# 获取张贴二维码
@web.route("/printer_ewm", methods=["POST", "GET"])
def printer_ewm():
    return "请使用微信端扫码"

@web.route("/create_printer_ewm", methods=["POST", "GET"])
@login_required
def create_printer_ewm():
    store_id=request.args.get("store_id")
    printer_id=request.args.get("printer_id")
    if not store_id or printer_id:
        return "缺少参数" 
    img = qrcode.make('http://localhost:5300/web/printer_ewm?store_id={}&printer_id={}'.format(store_id,printer_id))
    img_name = store_id+'-'+printer_id+'.png'
    Path = get_relative_path()+ "\\asset\\printer_ewm\\user"
    with open(Path+'\\'+img_name, 'wb') as f:
        img.save(f)
    return send_from_directory(Path, img_name, as_attachment=True)



# 退出登录
@web.route('/logout', methods=["POST", "GET"])
def logout():
    return State.success()

@web.after_request
def releaseDB(response):
    db.session.close()
    return response