from flask import Flask, request, jsonify, send_from_directory, abort

from haifeng.YunJIYIn import create_app, db
from haifeng.YunJIYIn.plugins.redis_serve import *
app = create_app()
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5300)