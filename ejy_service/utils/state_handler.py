class State:
    def success(*args, **kwargs):
        if not args:
            args = ("OK",)
        if not kwargs:
            kwargs["data"] = {}
        return {"state": 1, "msg": args[0], "data": kwargs["data"]}

    def fail(*args):
        if not args:
            args = "错误"
        return {"state": 0, "msg": args}