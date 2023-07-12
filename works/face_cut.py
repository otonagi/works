# このプログラムは、FLIR3という通常の可視光画像とサーモグラフィ画像を同時に撮影できるカメラで撮った写真を使って、
# 可視光画像から人の顔の位置を特定して、サーモグラフィ画像の同じ座標部分を切り取り、保存するものである。

import cv2
import numpy as np

def extract_faces(visible_image_path, thermal_image_path):
    visible_image = cv2.imread(visible_image_path)
    thermal_image = cv2.imread(thermal_image_path)

    face_cascade = cv2.CascadeClassifier('./opencv-master/data/haarcascades/haarcascade_frontalface_default.xml')
    gray_image = cv2.cvtColor(visible_image, cv2.COLOR_BGR2GRAY)
    faces_haar = face_cascade.detectMultiScale(gray_image, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    dnn_face_detector = cv2.dnn.readNetFromCaffe('./facial_recognition-master/deploy.prototxt.txt', './facial_recognition-master/res10_300x300_ssd_iter_140000.caffemodel')
    blob = cv2.dnn.blobFromImage(cv2.resize(visible_image, (300, 300)), 1.0, (300, 300), (104.0, 177.0, 123.0), False, False)
    dnn_face_detector.setInput(blob)
    detections_dnn = dnn_face_detector.forward()

    detected_faces = []
    for (x, y, w, h) in faces_haar:
        detected_faces.append((x, y, w, h))
    for i in range(detections_dnn.shape[2]):
        confidence = detections_dnn[0, 0, i, 2]
        if confidence > 0.5:
            box = detections_dnn[0, 0, i, 3:7] * np.array([visible_image.shape[1], visible_image.shape[0], visible_image.shape[1], visible_image.shape[0]])
            (x, y, w, h) = box.astype(int)
            detected_faces.append((x, y, w, h))

    for (x, y, w, h) in detected_faces:
        thermal_face = thermal_image[y:y+h, x:x+w]
        output_path = f'face_cut_{x}_{y}.jpg'
        cv2.imwrite(output_path, thermal_face)
        print(f'Extracted face saved: {output_path}')

visible_image_path = './visible_image.jpg'
thermal_image_path = './thermal_image.jpg'

extract_faces(visible_image_path, thermal_image_path)