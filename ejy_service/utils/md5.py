import hashlib

# md5加密
def md5Encryption(inStr):
    hl = hashlib.md5()
    hl.update(inStr.encode(encoding='utf-8'))
    return hl.hexdigest()

if __name__ == '__main__':
    pwd="1"
    print(md5Encryption(pwd))