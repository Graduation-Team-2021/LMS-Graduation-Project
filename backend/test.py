import requests

import json

data={
    "name": "david",
    "email": "djman2",
    "national_id": "2888885478563",
    "birthday": "1998-05-14",
    "password": "1111",
    "role": "admin"
}

headers = {
    "Content-Type":"application/json"
}

url="https://lms-backend-2099.herokuapp.com"
#url="http://127.0.0.1:5000"

r = requests.post(f"{url}/sign_up", headers=headers, data=json.dumps(data))

