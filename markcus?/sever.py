from flask import Flask, render_template
app = Flask(__name__)
import numpy as np
import argparse
import imutils
import glob
import cv2



def get_coords(puzname):
	l_templates=[]
	graybool= False
	edgebool= False
	threshold =0.5
	puzzle_name =puzname
	for x in xrange(1,9):
		name = "./static/img/puz"+str(x)+"_Q.jpg"
		l_templates.append(cv2.imread(name))
	puz = cv2.imread(puzzle_name)
	if edgebool:
		puz = cv2.cvtColor(puz, cv2.COLOR_BGR2GRAY)
		puz = cv2.Canny(puz, 50, 200)
	elif graybool:
		puz = cv2.cvtColor(puz, cv2.COLOR_BGR2GRAY)

	orig = cv2.imread(puzzle_name)
	for b in l_templates:
		template = b
		if edgebool:
			template = cv2.cvtColor(template, cv2.COLOR_BGR2GRAY)
			template = cv2.Canny(template, 50, 200)
		elif graybool:
			template = cv2.cvtColor(template, cv2.COLOR_BGR2GRAY)
			
		
		# template = cv2.Canny(template, 50, 200)
		(tH, tW) = template.shape[:2]
		# puz = cv2.Canny(puz, 50, 200)
		result = cv2.matchTemplate(puz,template,cv2.TM_CCOEFF_NORMED)
		loc = np.where( result >= threshold)
		res=[]
		for pt in zip(*loc[::-1]):
			# cv2.rectangle(puz, pt, (pt[0] + tW, pt[1] + tH), (0,0,255), 2)
			res.append(pt[0])
			res.append(pt[1])
			res.append(pt[0]+tW)
			res.append(pt[1]+tH)
		return res
		# cv2.rectangle(orig, (maxLoc[0], maxLoc[1]),
		# 	(maxLoc[0] + tW, maxLoc[1] + tH), (0, 0, 255), 2)
	# cv2.imwrite("temp.jpg",puz)

@app.route('/')
def index():
  return render_template('Waldo.html')

@app.route('/my-link/')
def my_link():
  print 'I got clicked!'
  #"./static/img/puzzle.jpg"

  return 'Click.'

if __name__ == '__main__':
	app.run(host='0.0.0.0')