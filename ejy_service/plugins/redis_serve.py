import redis
r = redis.StrictRedis(host="127.0.0.1", port=6379, db=0)
def setRedis():
    # 获取redis数据库连接
# print(redis.get('name'))
    r.set(name="name", value="啊第三方打撒打算")
    print(r.exists('name')) #是否存在name这个键
 
# print(redis.type('name'))  #判断name的类型
 
# print(redis.keys('n*'))  #获取所有以n开头的键
 
# print(redis.randomkey())  #获取随机一个键
 
# print(redis.dbsize()) #获取当前数据库中的键的数目
# ————————————————
# 版权声明：本文为CSDN博主「雨轩恋i」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
# 原文链接：https://blog.csdn.net/ltf201834/article/details/84975724
    # redis存入键值对
    # r.set(name="a", value="啊第三方打撒打算")
    # # 读取键值对
    # print(r.get("key"))
    # # 删除
    # print(r.delete("key"))

    # # redis存入Hash值
    # r.hset(name="store_order_num", key="store_id", value="value1")
    # r.hset(name="store_order_num", key="store_id", value="value1")
    r.set(name="store",  value="sa", ex=30, px=None, nx=False, xx=False)
    # r.hset(name="倒萨", key="十大", value="value2")
    # # 获取所有哈希表中的字段
    # print(r.hgetall("name"))
    # # 获取所有给定字段的值
    # print(r.hmget("name", "key1", "key2"))
    # # 获取存储在哈希表中指定字段的值。
    # print(r.hmget("name", "key1"))
    # # 删除一个或多个哈希表字段
    # print(r.hdel("name", "key1"))

    # # 过期时间
    # r.expire("a", 60)  # 60秒后过期
#  print redis_cli.delete(key)
# 17         print redis_cli.hset(key, "test1", 1)  # 设置 key={test1:1}
# 18         print redis_cli.hget(key, "test1")  # 获取key[test1]
# 19         print redis_cli.hexists(key, "test1")  # 是否存在key[test1]
# 20         print redis_cli.hset(key, "test2", 2)  # 设置 key={test2:2}
# 21         print redis_cli.hlen(key)  # 查看key下的键值对数量
# 22         print redis_cli.hdel(key, "test1", "test2")  # 批量删除key下的键，返回实际删除的键数量
# 23         print redis_cli.hlen(key)  # 查看key下的键值对数量
# 24         print redis_cli.hexists(key, "test1")  # 是否存在key[test1]
# 25         print redis_cli.hsetnx(key, "test1", 1)   # 设置 key={test1:1}
# 26         print redis_cli.hsetnx(key, "test1", 1.11)   # 如果key[test1]已存在设置失败
# 27         print redis_cli.hget(key, "test1")  # 获取key[test1]
# 28         print redis_cli.hincrby(key, "test1", 2)   # 设置 key[test1] 累加2
# 29         print redis_cli.hget(key, "test1")  # 获取key[test1]
# 30         print redis_cli.hset(key, "test2", 2)  # 设置 key={test2:2}
# 31         print redis_cli.hgetall(key)  # 获取key，得到dict对象
# 32         print redis_cli.hkeys(key)  # 获取key下的所有键，得到list对象
# 33         print redis_cli.hvals(key)  # 获取key下的所有值，得到list对象
# 34         print redis_cli.hmget(key, "test1", "test2")  # 批量获取key下的指定键，得到list对象
# 35         print redis_cli.hmset(key, {"test3": 3, "test4": 4})  # 批量设置键值，无则添加，有则覆盖，
    # 更多相关内容可以参考菜鸟教程

if __name__ =="__main__":
    setRedis()