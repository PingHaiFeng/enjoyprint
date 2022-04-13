import socket
from threading import main_thread
import json
def send_to_server(instruct_data):
    try:
        sk = socket.socket()
        sk.connect(('172.16.0.2', 5301))
        sk.send(json.dumps(instruct_data).encode('utf-8'))
        res = sk.recv(1024*1024).decode('utf-8')
        sk.close()
        return res
    except:
        raise
if __name__ =="__main__":
    instruct_data={
            "instruct_id":"3002",
            "instruct_content":"transmit",
            "goal_ip":"211.97.128.106",
            "tempFile_list":"tempFile_list"
        }
    # instruct_data="daddasda"
    send_to_server(instruct_data)
