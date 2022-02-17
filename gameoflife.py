#!/usr/bin/env python3

from flask import Flask, render_template
app = Flask(__name__)

DEV_MODE = True

@app.route('/')
def homepage():
    return render_template(
        'index.html',
        dev_mode=DEV_MODE,
        scripts=['cell', 'app'])

if __name__ == '__main__':
    app.run(debug=DEV_MODE)