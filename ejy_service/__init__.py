# -*- coding:utf-8 -*-
from flask import Flask
import pymysql
pymysql.install_as_MySQLdb()
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True)  # 允许跨域
    app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://cloudprint:cloudprint@59.111.148.52:3306/cloudprint"
    app.config['SECRET_KEY'] = "haifeng"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True  # 设置sqlalchemy自动跟踪数据库
    app.config['SQLALCHEMY_POOL_RECYCLE']=10
    app.config['SQLALCHEMY_POOL_SIZE']=300
    
    from view.mini.mini import mini
    from view.pc.pc import pc
    from view.web.web import web
    from view.admin.admin import admin
    app.register_blueprint(mini, url_prefix='/mini')
    app.register_blueprint(pc, url_prefix='/pc')
    app.register_blueprint(web, url_prefix='/web')
    app.register_blueprint(admin, url_prefix='/admin')
    db.init_app(app)
    db.create_all(app=app)
    return app