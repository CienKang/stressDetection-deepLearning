import numpy as np
from collections import Counter

class Combiner():
    def __init__(self):
        pass
    def calcMode(self, arr, bins):
        indx=np.digitize(arr, bins)
        nums=[]
        for i in range(len(indx)):
            if (indx[i]<len(bins)):
                nums.append((bins[indx[i]-1]+bins[indx[i]])/2.0)
            else:
                nums.append(float(bins[indx[i]-1]))
        data=Counter(nums)
        print(data)
        get_mode = dict(data)
        mode = [k for k, v in get_mode.items() if v == max(list(data.values()))]
        if len(mode) == len(arr):
            get_mode = -1
        else:
            get_mode = ''.join(map(str, mode))
        return get_mode
if __name__=="__main__":
    c=Combiner()
    print(c.calcMode([1,2,3,4,5,6,7,8,9,10], [1,2,3,4,5,6,7,8,9,10]))