import os

root = "../pokesprites"

for name in os.listdir(root):
	if not os.path.isdir(os.path.join(root, name, "cries")):
		print  name
