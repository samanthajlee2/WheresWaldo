import Image
picture = Image.open("Waldo.jpg")
# Get the size of the image
picture.show()
# print picture.size()
width =50
height =50

# # Process every pixel
for x in range(picture.size[0]):
   for y in range(picture.size[1]):
   		current_color = picture.getpixel( (x,y) )
   		# print current_color[0]
   		if current_color[0] >100 and  current_color[0]/2 > current_color[1] and current_color[0]/2 > current_color[2]:
   			new_color =( 0,0,100)
   			picture.putpixel( (x,y), new_color)
       
       


picture.show()
picture.close("Waldo.jpg")