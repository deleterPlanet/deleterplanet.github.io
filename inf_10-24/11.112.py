#11.112
a = list(map(int, input().split()))
minn = 10**10
maxx = 0
for i in a:
	if i < minn: 
		minn = i
	elif i > maxx: 
		maxx = i
print (maxx - minn)