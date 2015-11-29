import cv2
import imutils
import numpy as np
import argparse

image = cv2.imread("query.png")
(height, width) = image.shape[:2]

hsv_img = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
lower_red = np.array([170,60,40])
upper_red = np.array([179,255,255])
lower_white = np.array([166,11,255])
upper_white = np.array([0,0,255])
#lower_black = np.array([])
#upper_black = np.array([])

mask = np.ones((height,width,3), np.uint8)
red_mask = cv2.inRange(hsv_img, lower_red, upper_red)
white_mask = cv2.inRange(hsv_img, lower_white, upper_white)
mask = cv2.bitwise_and(red_mask, white_mask, mask= cv2.cvtColor(mask, cv2.COLOR_BGR2HSV))


cv2.imshow('original', image)
cv2.imshow('red', mask)
cv2.imshow('result', res)
cv2.imshow('hsv', hsv_img)
while True:
    k = cv2.waitKey(0) & 0xFF
    if k == 27: break

cv2.destroyAllWindows()
