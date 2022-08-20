import numpy as np
import matplotlib.pyplot as plt
from scipy.special import comb
p = 0.4
n = 10
x = np.linspace(0,n,n+1)
y = comb(n,x)*p**x*(1-p)**(n-x)
print(x)
print(y)
plt.scatter(x,y)
plt.grid(True)
plt.show()
