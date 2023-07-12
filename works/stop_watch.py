import PySimpleGUI as sg
import time

#　現在時間を取得
def time_as_int():
    return int(round(time.time() * 100))

sg.theme('Black')

layout = [[sg.Text('')],
          [sg.Text('', size=(8, 2), font=('Helvetica', 20),justification='center', key='text')],
          [sg.Button('Pause', key='-RUN-PAUSE-', button_color=('white', '#001480')),
           sg.Button('Reset', button_color=('white', '#007339'), key='-RESET-'),
           sg.Exit(button_color=('white', 'firebrick4'), key='Exit')]]

window = sg.Window('Running Timer', layout,
                   no_titlebar=True,
                   auto_size_buttons=False,
                   keep_on_top=True,
                   grab_anywhere=True,
                   element_padding=(0, 0),
                   finalize=True,
                   element_justification='c',
                   right_click_menu=sg.MENU_RIGHT_CLICK_EDITME_EXIT)

# 変数の初期化
current_time, paused_time, paused = 0, 0, False
start_time = time_as_int()      # 開始時点の時間を保持

while True:
    if not paused:
        event, values = window.read(timeout=10)     #　入力イベントを監視
        current_time = time_as_int() - start_time       #　経過時間を算出
    else:
        event, values = window.read()    #　入力イベントを監視

    # ウィンドウ上のボタン操作時の処理
    if event in (sg.WIN_CLOSED, 'Exit'):        # Exitボタン押下時は、処理終了
        break

    if event == '-RESET-':        # Resetボタン押下時は、変数を全てクリアする
        paused_time = start_time = time_as_int()
        current_time = 0
    elif event == '-RUN-PAUSE-':        # RUN/Pauseボタン押下時の処理

        paused = not paused        # Pause状態を反転

        if paused:
            paused_time = time_as_int()
        else: # 経過時間計測を再開
            start_time = start_time + time_as_int() - paused_time

        # ウィンドウの表示を更新
        window['-RUN-PAUSE-'].update('Run' if paused else 'Pause')

    elif event == 'Edit Me':
        sg.execute_editor(__file__)

    # ウィンドウの表示を更新
    window['text'].update('{:02d}:{:02d}.{:02d}'.format((current_time // 100) // 60,
                                                        (current_time // 100) % 60,
                                                        current_time % 100))

window.close()