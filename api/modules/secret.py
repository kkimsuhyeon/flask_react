import base64
import hashlib
from Crypto import Random
from Crypto.Cipher import AES

BS = 16
pad = lambda s: s + (BS - len(s) % BS) * chr(BS - len(s) % BS).encode()
unpad = lambda s: s[0:-s[-1]]

class AESCipher:

    def __init__(self, key):
        self.key = key
        self.key = hashlib.sha256(key.encode()).digest()


    def encrypt(self, raw):
        raw = str(raw)
        raw = raw.encode()
        raw = pad(raw)
        iv = Random.new().read(AES.block_size)
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return base64.b64encode(iv + cipher.encrypt(raw)).decode()

    def decrypt(self, enc):
        print(enc)
        enc = base64.b64decode(enc)
        iv = enc[:16]
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return unpad(cipher.decrypt(enc[16:])).decode()
