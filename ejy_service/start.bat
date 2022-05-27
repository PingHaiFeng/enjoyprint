cd D:\enjoyprint\ejy_service
python D:\enjoyprint\ejy_service\manage.py &
cd C:\Users\Administrator\Desktop\Redis &
redis-server.exe redis.windows.conf &
python D:\enjoyprint\ejy_service\socket_sever\tcp_server.py 
pause