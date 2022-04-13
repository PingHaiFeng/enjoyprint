import time
import traceback
import functools
from utils.state_handler import State
from utils.automail import Automail
def except_logger(func):
    @functools.wraps(func)
    def wrapper(*args,**kwargs):
        try:
            return func(*args,**kwargs)
        except:
            with open('./log/log.txt', 'a+') as f:
                error = traceback.format_exc()
                print(error)
                t = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
                content = "[{}]\n{}\n{}\n".format(t,func.__name__,error)
                f.seek(0)
                f.write(content)
                # Automail.send("云即印出现异常告警",content)
                print(t+"-出现异常，请前往日志文件查看")

                return State.fail()
    return wrapper

@except_logger
def err_maker():
    1/0
if __name__ == '__main__':
    err_maker()