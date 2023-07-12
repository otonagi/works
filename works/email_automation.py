import smtplib
import email

sender_adress = 'adress1'
recipient_adress = 'adress2'
# recipient_adress = input('宛先を入力してください. >>>')

server = smtplib.SMTP_SSL('smtp.gmail.com', '465')
server.login(sender_adress, 'password')

message = email.message.EmailMessage()

message['From'] = sender_adress
message['To'] = recipient_adress
message['Subject'] = str(input('件名を入力してください. >>>'))
message.set_content('メッセージ内容')

server.send_message(message)