import os
import urllib2
import json
from ratelimit import *

idx = 400
url = "http://pokeapi.co/api/v2/pokemon/"
rootPath = os.path.expanduser("~/public_html/pokedex/pokesprites")

if not os.path.isdir(rootPath):
	os.makedirs(rootPath)

def download(saveRoot, saveSub, target):
	saveLocation = saveRoot + "/%s" % saveSub

	if not os.path.isdir(saveLocation):
		os.makedirs( saveLocation )

	fName = target.split('/')[-1]

	u = urllib2.urlopen(target)		
	f = open(saveLocation+"/"+fName, 'wb')
	meta = u.info()
	fSize = int(meta.getheaders("Content-Length")[0])
	print "\nDownloading: %s Bytes: %s" % (fName, fSize)
	
	fSizeDl = 0
	blockSz = 8192
	while True:
		buffer = u.read(blockSz)
		if not buffer:
			break
		fSizeDl += len(buffer)
		f.write(buffer)
		status = r"%10d [%3.2f%%]" % (fSizeDl, fSizeDl * 100. / fSize)
		status = status + chr(8)*(len(status)+1)
		print status,
	f.close()	

def save_sprites(json):
	global idx
	saveLocation = rootPath + "/%s" % str(idx)

	if not os.path.isdir( saveLocation ):
		os.makedirs( saveLocation )

	for key in json:
		link = json[key]
		if link:
			download(saveLocation, key, link);


@rate_limited(0.5)
def request_api(url, idx):
	request = urllib2.Request(url+str(idx), headers={'User-Agent' : "Magic Browser"})
	response = urllib2.urlopen( request )
	parsed = json.load(response)
	print "\n============= %s ===========" % (parsed['name'].title())
	sprites = parsed['sprites']
	return sprites
	
def main():
	global idx	
	while idx < 525:
		sprites = request_api(url, idx);
		save_sprites(sprites)
		idx += 1;
main()
