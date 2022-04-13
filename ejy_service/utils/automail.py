import smtplib
from email.mime.text import MIMEText
from email.header import Header
from time import sleep
class Automail:

    def send(title, content):
        mail_host = "smtp.qq.com"
        mail_user = "2371097818@qq.com"
        mail_pass = 'jzmgffnsburtdjhi'
        sender = "2371097818@qq.com"
        receiver = "920988322@qq.com"
        subject = title  # 邮件主题
        message = MIMEText(content)  #邮件内容
        message['From'] = Header("云即印助手", "utf-8")
        message['To'] = Header("接收人", "utf-8")
        message['subject'] = Header(subject, 'utf-8')

        try:
            smtpObj = smtplib.SMTP()
            smtpObj.connect(mail_host, 25)
            smtpObj.login(mail_user, mail_pass)
            smtpObj.sendmail(sender, receiver, message.as_string())
            return "邮件自动发送成功"
        except :
            return "邮件自动发送失败"



if __name__ == '__main__':
    Automail.send("云即印系统出现异常","牛逼")
