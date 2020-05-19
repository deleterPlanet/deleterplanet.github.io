#11.120
a = list(map(int, input().split()))
maxx = 0
count = 0
for i in a:
	if maxx < i:
		maxx = i
		count = 1
	elif maxx == i:
		count += 1
print (count)