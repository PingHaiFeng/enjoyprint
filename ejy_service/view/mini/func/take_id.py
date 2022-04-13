from flask import request
from model.db_model.user import Order
from utils.utils import date_now
'''
生成take_id
'''
def take_id_maker(store_id):
    store_id = request.form.get("store_id")
    map=[]
    map.append(Order.create_time  >= date_now()+" 00:00:00")
    map.append(Order.create_time <=date_now()+" 23:59:59" )
    today_order_num=Order.query.filter(*map).filter_by(store_id=store_id).count()
    today = date_now().split("-")[-1]
    front_str =("A" + today[1:] ) if int(today) < 10 else today
    take_id=  front_str+"-"+str(today_order_num+1)
    return take_id