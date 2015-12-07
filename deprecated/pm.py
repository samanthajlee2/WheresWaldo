# -*- coding: utf-8 -*-
"""
    jQuery Example
    ~~~~~~~~~~~~~~
    A simple application that shows how Flask and jQuery get along.
    :copyright: (c) 2015 by Armin Ronacher.
    :license: BSD, see LICENSE for more details.
"""
from flask import Flask, jsonify, render_template, request
app = Flask(__name__)


@app.route('/_add_numbers')
def add_numbers():
    """Add two numbers server side, ridiculous but well..."""
    a = request.args.get('a', 0, type=int)
    b = request.args.get('b', 0, type=int)
    c = request.args.get('c', 0, type=str)
    bb= [a,b]
    # return json.dump(bb)
    return jsonify(result=[a,b,4,3,5,6,8,9,9,c])
    # bb= [a,b]
    # return jsonify(result=bb)


@app.route('/')
def index():
    return render_template('patternmatcher.html')

if __name__ == '__main__':
    app.run()