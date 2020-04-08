from flask import Flask, request
from flask_cors import CORS
import json

from modules.secret import AESCipher
from modules.makepassword import pwd

app = Flask(__name__)
CORS(app)
AES = AESCipher("secret") # key 값


@app.route("/fore", methods=["POST", "GET"])
def fore():
    if request.method == "POST":
        data = request.get_json()
        data_password = data["password"]
        result = AES.encrypt(data_password)
        return json.dumps({"result": result})


@app.route("/back", methods=["POST", "GET"])
def back():
    print(2)
    if request.method == "POST":
        data = request.get_json()
        data_password = data["password"]
        if (len(data_password) <= 40):
            return json.dumps({"result":"error"})
        result = AES.decrypt(data_password)
        return json.dumps({"result": result})



@app.route("/password", methods=["POST", "GET"])
def password():
    result = 0
    if request.method == "POST":
        data = json.loads(request.data.decode("UTF-8"))
        number = data["number"]
        punc = data["punc"]
        if data == "":
            pass
        else:
            if number == "":
                return json.dumps({"result": ""})
            result = pwd(int(number), punc)
        return json.dumps({"result": result})

if __name__ == "__main__":
    app.run(debug=True, port=50001)
