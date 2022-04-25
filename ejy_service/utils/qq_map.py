import requests
from config import MAP_KEY
def reverseGeocoder(latitude,longitude):
    url  ="https://apis.map.qq.com/ws/geocoder/v1/"
    params =  {
        "key": "JD3BZ-DIFCK-YQ7JL-AICKT-VSPGH-P7B3E",
        "location": latitude+","+longitude}
   
    res = requests.get(url=url,params=params).json()
    adcode = res["result"]["ad_info"]["adcode"]
    adname = res["result"]["ad_info"]["name"]
    return adcode,adname