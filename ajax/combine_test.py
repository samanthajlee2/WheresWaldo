import cgi
print """Content-type: text/html; charset=utf-8\n\n
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>"""
field= cgi.FieldStorage()
attr = field.getvalue("mymode", "error")

print "hello"

print """</html>"""