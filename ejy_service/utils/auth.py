from flask import request,jsonify,current_app
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from model.db_model.store import StoreAccount
from model.db_model.admin import AdminAccount
import functools

def create_token(id,plat):
    '''
    生成token
    :param api_user:用户id
    :return: token
    '''
    #第一个参数是内部的私钥
    #第二个参数是有效期(秒)
    s = Serializer(current_app.config["SECRET_KEY"],expires_in=3600*24*7)
    token =plat+ s.dumps({"id":id}).decode("ascii")
    return token

#校检Token
def verify_token(token):
    #参数为私有秘钥，跟上面方法的秘钥保持一致
    s = Serializer(current_app.config["SECRET_KEY"])
    try:
        plat =token[:2]
        data = s.loads(token[2:])
    except Exception:
        return None
    if plat =="W-":user = StoreAccount.query.get(data["id"])
    if plat =="P-":user = StoreAccount.query.get(data["id"])
    if plat =="A-":user = AdminAccount.query.get(data["id"])
    return user

#在上面的基础上导入
def login_required(view_func):
    @functools.wraps(view_func)
    def verify_token(*args,**kwargs):
        try:
            token = request.headers["X-Token"]
        except Exception:
            return jsonify(state = 0,msg = '缺少参数token')
        s = Serializer(current_app.config["SECRET_KEY"])
        try:
            s.loads(token[2:])
        except Exception:
            return jsonify(state = 0,msg = "登录已过期")

        return view_func(*args,**kwargs)

    return verify_token