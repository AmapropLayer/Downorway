#!/usr/bin/env python -u

import sys
import json
import struct
import os
import urllib
import requests

def getMessage():
    print("message!")
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

#sys.stdout = open('debug.txt', 'w')
#sys.stderr = open('err.txt', 'w')
cookies = dict(PHPSESSID='') # PHPSESSID here !
while True:
    receivedMessage = getMessage()
    path = receivedMessage["path"] + "\\" + (receivedMessage["name"].replace('?', '').replace(':', '').replace('"', '').replace('!', ''))
    try:
        os.mkdir(path)
    except OSError:
        print("Creation of the directory %s failed" % path)
    else:
        print("Successfully created the directory %s" % path)
        for l in receivedMessage["links"]:
            print(l)
            splitted = l.split("/")
            localName = splitted[len(splitted)-1]
            localPath = path + "\\" + localName
            r = requests.get(l, allow_redirects=True, stream=True, cookies=cookies)
            # Mandatory for big files
            with open(localPath, 'wb') as newfile:
                for chunck in r.iter_content(chunk_size=1024):
                    if chunck:
                        newfile.write(chunck)