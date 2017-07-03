import os
import glob

from shutil import copy

cryPath = "/home/dave/Documents/pokeprints/veekun.com/dex/media/pokemon/footprints/"
cryExt = ".png"
destRoot = os.path.expanduser("~/public_html/pokedex/pokesprites/")





def main():
	os.chdir(cryPath);
	for footprint in glob.glob("*"+cryExt):
		src = cryPath+footprint;
		number = footprint.split('.')[0]
		dest = destRoot+number
		if( os.path.isfile(src) and os.path.isdir(dest) ):
			if not os.path.isdir(dest+"/footprint"):
				os.makedirs(dest+"/footprint")
			dest = dest+"/footprint"
			print "\nCopying %s to %s" % (src, dest)
			copy(src, dest)
		
main();
