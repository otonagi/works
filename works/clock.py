import tkinter as tk
from datetime import datetime
import time

root = tk.Tk()
root.attributes("-topmost", True)   # ウィンドウを最前面に表示.
root.title('My Clock')
cnvs = tk.Canvas(width = 700, height = 300, background = '#ffffff') # background = 'snow'で背景が透過される
cnvs.pack()
cnvs.create_text(350, 150, text = '', font = ('', 100), fill = 'black', tags = 'MyText')
try:
    while True:
        now = datetime.now()
        timer = '{0:0>2d}:{1:0>2d}:{2:0>2d}'.format(now.hour, now.minute, now.second)
        cnvs.itemconfig('MyText', text = timer)
        cnvs.update()
        time.sleep(0.1)
except:
    pass