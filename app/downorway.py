#!/usr/bin/env python -u

import sys
import json
import struct
import os
import urllib
import requests

def getMessage():
    rawLength = sys.stdin.buffer.read(4)
    if len(rawLength) == 0:
        sys.exit(0)
    messageLength = struct.unpack('@I', rawLength)[0]
    message = sys.stdin.buffer.read(messageLength).decode('utf-8')
    try:
        obtainedJson = json.loads(message)
    except ValueError:
        print('Decoding JSON has failed')
    return obtainedJson

sys.stdout = open('debug.txt', 'w')
sys.stderr = open('err.txt', 'w')
while True:
    receivedMessage = getMessage()
    path = receivedMessage["path"] + "\\" + receivedMessage["name"]
    try:
        os.mkdir(path)
    except OSError:
        print("Creation of the directory %s failed" % path)
    else:
        print("Successfully created the directory %s" % path)
        for l in receivedMessage["links"]:
            splitted = l.split("/")
            localName = splitted[len(splitted)-1]
            localPath = path + "\\" + localName
            r = requests.get(l, allow_redirects=True, stream=True)
            open(localPath, 'wb').write(r.content)