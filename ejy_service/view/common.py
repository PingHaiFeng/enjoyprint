# from flask import Blueprint, request,jsonify
# from utils.utils import Utils
# from model.super_admin import NoticeBoard
# from haifeng.YunJIYIn.model.shop import StoreAccount,Order,Printer,db
# import ast
# import requests
# import datetime
# # 获取店铺信息
# @common.route('/get_swiper', methods=["POST", "GET"])
# def get_store_info():
#     if request.method=="POST":
#         token = request.form.get("token")
#     if request.method == "GET":
#         token = request.args.get("token")
#     account = StoreAccount.query.filter_by(token=token).first()
#     if account:

#         return jsonify({"state": SUCCESS, "msg": "获取店铺信息成功", "data":{"store_name":account.store_name,"store_id":account.store_id} }) #{"token":token,"store_name":isHaveAccount.store_name}
#     else:
#         return jsonify({"state": FAIL, "msg": "获取店铺信息失败"})
