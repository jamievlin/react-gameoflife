from flask import Flask, render_template
app = Flask(__name__)

DEV_MODE = True

@app.route('/')
def homepage():
    return render_template(
        'index.html',
        dev_mode=DEV_MODE)

if __name__ == '__main__':
    app.run(debug=DEV_MODE)