import hashlib, base64, os
salt = os.urandom(12).hex()
h = hashlib.pbkdf2_hmac('sha256', b'testpass123', salt.encode(), 260000)
print(f'pbkdf2_sha256$260000${salt}${base64.b64encode(h).decode()}')
