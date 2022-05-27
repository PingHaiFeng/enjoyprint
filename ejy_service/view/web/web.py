from flask import Blueprint, request,jsonify,send_from_directory
from utils.utils import *
from sqlalchemy import func
from model.db_model.admin import NoticeBoard,StoreLoginLog,db
from model.db_model.store import StoreAccount,Store,Printer,Price
from model.db_model.user import FileOrder, Order
from model.db_model.library import DocFolder,Doc
from socket_sever.handle_socket import send_to_server
from utils.auth import create_token,login_required,verify_token
from utils.state_handler import State
from utils.utils import make_file_id
from log.except_logger import *
from plugins.redis_serve import *
import qrcode
from plugins.file_reader import readFiles
from config import *
web = Blueprint('web', __name__) 

# 店铺账号登录
@web.route('/login', methods=["POST", "GET"])
@except_logger
def login():
    username = request.form.get("username")
    password = request.form.get("password")
    print(password)
    if not all([username,password]):
        return State.fail("请填写手机号和密码")
    user = StoreAccount.query.filter_by(username=username,password=password).first()
    if user is None:
        return State.fail("账号或密码错误")
    login_log=StoreLoginLog(store_id=user.store_id,login_type=2,state="Web后台登陆成功")
    db.session.add(login_log)
    db.session.commit()
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
@web.route('/store-detail', methods=["PUT", "GET"])
@login_required
@except_logger
def get_store_detail():
    storeAccount = verify_token(request.headers["X-Token"])
    if request.method=="GET":
        store= Store.query.filter_by(store_id=storeAccount.store_id).first()
        pc_online = r.exists("ONLINE_"+str(storeAccount.store_id))
        return State.success(data={"store_name":store.store_name,"username":storeAccount.username,"store_announce":store.store_announce,"detail_addr":store.detail_addr,"pc_online":pc_online })
    if request.method=="PUT":
        store_name=request.form.get("store_name")
        store_announce=request.form.get("store_announce")
        store = Store.query.filter_by(store_id=storeAccount.store_id).first()
        storeAccount.store_name=store_name
        store.store_name=store_name
        store.store_announce=store_announce
        db.session.commit()   
        return State.success("修改店铺信息成功")


#打印机设置
@web.route("/printer", methods=["POST", "GET", "PUT", "DELETE"])
@except_logger
@login_required
def handlePrinter():
    store_account = verify_token(request.headers["X-Token"])

    '''改'''
    if request.method == "PUT": 
            data = request.form.to_dict()
            Printer.query.filter_by(store_id=store_account.store_id,printer_id=data.get("printer_id")).update(data)
            db.session.commit()
            return State.success()
    '''查'''         
    if request.method == 'GET': 
            has_computer_online = r.exists("ONLINE_"+str(store_account.store_id))==1
            cur_computer_id = r.get("ONLINE_"+str(store_account.store_id)).decode('utf-8').split("_")[0] if has_computer_online else ""
            list = model_to_dict(Printer.query.filter_by(store_id=store_account.store_id))
            return State.success(data={"list":list,"cur_computer_id":cur_computer_id})

# 获取价格列表
@web.route('/list-price', methods=["POST", "GET"])
@login_required
@except_logger
def list_price():
    store_id = verify_token(request.headers["X-Token"]).store_id
    list = model_to_dict(Price.query.filter_by(store_id=store_id))
    return State.success(data={"list": list})


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
        id = request.args.get('id')
        data = model_to_dict(Price.query.filter_by(store_id=store_id,id = id).first())
        return State.success(data=data)




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
    list = model_to_dict(NoticeBoard.query.all())
    return  State.success(data={"list": list})

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
    print(s_date,e_date)
    date_list=getEveryDay(s_date,e_date)
    bill_data=[]
    for date_item in date_list:
        map=[]
        map.append(Order.create_time  >= date_item+" 00:00:00")
        map.append(Order.create_time <=date_item+" 23:59:59" )
        order_num=Order.query.filter(*map).filter_by(store_id=store_id).count()
        order_money = db.session.query(func.sum(Order.price)).filter(*map).filter_by(store_id=store_id).scalar()#计算总价
        if order_money is None:order_money=0
        d = {"date":date_item,"order_num":order_num,"order_money":order_money}
        bill_data.append(d)
    return  State.success(data={"recent_sales": bill_data})

#获取历史总收益数据
@web.route('/all-sales', methods=["POST", "GET"])
@login_required
def get_all_sales():
    store_id = verify_token(request.headers["X-Token"]).store_id
    print( request.form.get("date_range"))
    s_date = request.form.get("date_range").split(",")[0]
    e_date = request.form.get("date_range").split(",")[1]
    date_list=getEveryDay(s_date,e_date)
    bill_data=[]
    all_phone_order_num = 0
    all_phone_order_money = 0
    all_computer_order_num = 0
    all_computer_order_money = 0
    all_booking_order_num = 0
    all_booking_order_money = 0
    all_total_order_num = 0
    all_total_order_money = 0
    for date_item in date_list:
        map=[]
        total_order_num=0
        total_order_money=0
        map.append(Order.create_time  >= date_item+" 00:00:00")
        map.append(Order.create_time <=date_item+" 23:59:59" )
        phone_order_num=Order.query.filter(*map).filter_by(store_id=store_id,order_type=1).count()
        phone_order_money = db.session.query(func.sum(Order.price)).filter(*map).filter_by(store_id=store_id,order_type=1).scalar()#计算总价
        computer_order_num=Order.query.filter(*map).filter_by(store_id=store_id,order_type=2).count()
        computer_order_money = db.session.query(func.sum(Order.price)).filter(*map).filter_by(store_id=store_id,order_type=2).scalar()#计算总价
        booking_order_num=Order.query.filter(*map).filter_by(store_id=store_id,order_type=3).count()
        booking_order_money = db.session.query(func.sum(Order.price)).filter(*map).filter_by(store_id=store_id,order_type=3).scalar()#计算总价
        if phone_order_money is None:phone_order_money=0
        if computer_order_money is None:computer_order_money=0
        if booking_order_money is None:booking_order_money=0
        total_order_num += phone_order_num + computer_order_num + booking_order_num
        total_order_money += phone_order_money + computer_order_money + booking_order_money
        d = {"date":date_item,"phone_order_num":phone_order_num,"phone_order_money":phone_order_money,
             "computer_order_num":computer_order_num,"computer_order_money":computer_order_money,
             "booking_order_num":booking_order_num,"booking_order_money":booking_order_money,
             "total_order_num":total_order_num,"total_order_money":total_order_money
             }
        all_phone_order_num += phone_order_num
        all_phone_order_money += phone_order_money
        all_computer_order_num += computer_order_num
        all_computer_order_money += computer_order_money
        all_booking_order_num += booking_order_num
        all_booking_order_money += booking_order_money
        all_total_order_num += total_order_num
        all_total_order_money += total_order_money
        bill_data.insert(0,d)
    d_all = {"date":"总计","phone_order_num":all_phone_order_num,"phone_order_money":all_phone_order_money,
             "computer_order_num":all_computer_order_num,"computer_order_money":all_computer_order_money,
             "booking_order_num":all_booking_order_num,"booking_order_money":all_booking_order_money,
             "total_order_num":all_total_order_num,"total_order_money":all_total_order_money
             }
    bill_data.insert(0,d_all)
    return  State.success(data={"list": bill_data})


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

# 获取文件夹列表
@web.route('/list-doc-folder', methods=["POST", "GET"])
@login_required
@except_logger
def list_folder():
    list =  model_to_dict(DocFolder.query.order_by(DocFolder.on_sale.desc()).all())
    return State.success(data={"list": list})

# 获取文件列表
@web.route('/list-doc', methods=["POST", "GET"])
@except_logger
@login_required
def list_doc():
    store_id = verify_token(request.headers["X-Token"]).store_id
    list =  model_to_dict(Doc.query.filter_by(store_id=store_id).order_by(Doc.on_sale.desc()).all())
    return State.success(data={"list": list})


#文件设置
@web.route('/doc', methods=["POST", "GET", "PUT", "DELETE"])
@login_required
@except_logger
def handleDoc():
    store_id = verify_token(request.headers["X-Token"]).store_id
    '''改'''
    if request.method == "PUT": 
        data = request.form.to_dict()
        Doc.query.filter_by(file_id=data.get("file_id"),store_id=store_id).update(data)
        db.session.commit()
        return State.success()
    '''删'''
    if request.method == "DELETE":
        ids = request.args.get('ids')
        for id in ids.split(","):
            Doc.query.filter_by(id=id,store_id=store_id).delete()
            db.session.commit()
        return State.success()
    '''查'''  
    if request.method == 'GET':
        file_id = request.args.get("file_id")
        data = model_to_dict(Doc.query.filter_by(store_id=store_id,file_id=file_id).first())
        return State.success(data=data)
#文件夹
@web.route('/doc-folder', methods=["POST", "GET", "PUT", "DELETE"])
@login_required
@except_logger
def doc_folder():
    store_id = verify_token(request.headers["X-Token"]).store_id
    '''增'''
    if request.method == "POST":
        print(request.form)
        db.session.add(DocFolder(store_id=store_id,data=request.form))
        db.session.commit()
        return State.success()
    '''删'''
    if request.method == "DELETE":
        folder_ids = request.args.get('folder_ids').split(",")
        for folder_id in folder_ids:
            DocFolder.query.filter_by(folder_id=folder_id,store_id=store_id).delete()
            db.session.commit()
        return State.success()
    '''改'''
    if request.method == "PUT": 
        data = request.form.to_dict()
        DocFolder.query.filter_by(folder_id=data.get("folder_id"),store_id=store_id).update(data)
        db.session.commit()
        return State.success()
    '''查'''  
    if request.method == 'GET':
        folder_id = request.args.get("folder_id")
        data = model_to_dict(DocFolder.query.filter_by(store_id=store_id,folder_id=folder_id).first())
        return State.success(data=data)

# 接收上传的文件
@web.route('/doc-upload', methods=["POST", "GET"])
@except_logger
def doc_upload():
    store_id = request.form.get("store_id")
    file = request.files.get("file")  # 待接收文件
    file_name = request.form.get("file_name")  # 文件名带扩展名
    folder_id = request.form.get("folder_id")
    on_sale = request.form.get("on_sale")
    commission = request.form.get("commission")
    file_type = file_name.split(".")[-1]  # 文件扩展名
    file_id = make_file_id()
    download_url = LIB_UPLOAD_PATH + file_id+".pdf"
    with open(LIB_UPLOAD_PATH +file_id + '.' + file_type , "wb") as f:
        data = file.read()
        f.write(data)
    file_page_num, file_type_id = readFiles(LIB_UPLOAD_PATH,file_id,  file_type)  # 返回文件页数和文件图标路径
    download_url = "https://cloudprint.pinghaifeng.cn/pdf_view/web/library/" + file_id + ".pdf"
    db.session.add(Doc(
        file_id = file_id,
        file_type = "pdf",
        folder_id = folder_id,
        file_type_id = 1,
        on_sale = on_sale,
        store_id = store_id,
        file_name = file_name[::-1].split(".", 1)[-1][::-1],  # 取消后缀名,
        file_page_num = file_page_num,
        download_url = download_url,
        commission = commission
    ))
    db.session.commit()
    return State.success()

@web.route('/pc-restart', methods=["POST", "GET"])
@except_logger
def pc_restart():
    store_id = verify_token(request.headers["X-Token"]).store_id
    host_ip = StoreAccount.query.filter_by(store_id=store_id).first().host_ip
    if host_ip:
        instruct_data = {
            "instruct_id":"Restart",
            "instruct_content":"pc-restart",
            "instruct_dict":{"goal_ip":host_ip}
        }
        return send_to_server(instruct_data)

# 退出登录
@web.route('/logout', methods=["POST", "GET"])
def logout():
    return State.success()

@web.after_request
def releaseDB(response):
    db.session.close()
    return response