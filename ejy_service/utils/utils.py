import time
import os
from typing import IO
from collections.abc import Iterable
import datetime


def time_now():
    time_now=time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
    return time_now

def date_now():
    date_now=time.strftime('%Y-%m-%d', time.localtime(time.time()))
    return date_now
def get_relative_path():
    # relative_path=os.path.abspath(os.path.dirname(os.path.abspath(__file__)) + os.path.sep )
    relative_path=os.path.abspath('.')
    return relative_path


def create_unique_code():
    import random
    unique_code = ''.join(random.sample('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 30)).replace(" ", "")
    return unique_code


def model_to_dict(result):
    try:
        if isinstance(result, Iterable):
            tmp = [dict(zip(res.__dict__.keys(), res.__dict__.values())) for res in result]
            for t in tmp:
                t.pop('_sa_instance_state')
        else:
            tmp = dict(zip(result.__dict__.keys(), result.__dict__.values()))
            tmp.pop('_sa_instance_state')
        return tmp
    except BaseException as e:
        print(e.args)
        raise TypeError('Type error of parameter')

def getEveryDay(s_date,e_date):
    # 前闭后闭
    date_list = []
    s_date = datetime.datetime.strptime(s_date, "%Y-%m-%d")
    e_date = datetime.datetime.strptime(e_date,"%Y-%m-%d")
    while s_date <= e_date:
        date_str = s_date.strftime("%Y-%m-%d")
        date_list.append(date_str)
        s_date += datetime.timedelta(days=1)
    return date_list

