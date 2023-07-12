import pygame.mixer
import schedule
import time

#アラーム処理
def Alarm():
    print("時間です")
#   print("\007")  #ビープ音
    Sound()
    exit()

#音再生処理
def Sound():
    pygame.mixer.init() #初期化
    pygame.mixer.music.load('alerm1.mp3')
    pygame.mixer.music.play(-1) #引数を1にすると1回のみ
    input()
    pygame.mixer.music.stop() #終了

#目覚まし設定時間取得
print("目覚ましをセットする時間を指定してください")
hour = input("時間（hour）：")
minute = input("分（minute）：")
target = f"{hour.zfill(2)}:{minute.zfill(2)}"
print(target+"にアラームをセットしました")

#アラーム時間設定
schedule.every().day.at(target).do(Alarm)

while True:
    schedule.run_pending()
    time.sleep(1)
