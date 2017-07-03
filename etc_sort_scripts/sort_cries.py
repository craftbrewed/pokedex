import os
import csv
import operator
from shutil import copy

cryPath = "/home/dave/Documents/pokecries/play.pokemonshowdown.com/audio/cries/src/"
cryExt = ".wav"
destRoot = os.path.expanduser("~/public_html/pokedex/pokesprites/")
print destRoot




def main():
	reader = csv.reader(open("list.csv"), delimiter=',')
	sortedList = sorted(reader, key=lambda row: row[1])
	for pokeman in sortedList:
		name = pokeman[1].lower();
		number = pokeman[0];
		src = cryPath+name+cryExt
		dest = destRoot+number
		if( os.path.isfile(src) and os.path.isdir(dest) ):
			if not os.path.isdir(dest+"/cries"):
				os.makedirs(dest+"/cries")
			dest = dest+"/cries"
			print "\nCopying %s to %s" % (src, dest)
			copy(src, dest)
		
main();
