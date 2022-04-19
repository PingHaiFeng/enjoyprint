from __init__ import create_app, db
from plugins.redis_serve import *
app = create_app()
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5300)