# 素数とメルセンヌ素数を求めるプログラム
from sympy import isprime
import time
start = time.time()

def mersenne_print (x):
  p = 1
  M = 2 ** p - 1
  while M < x:
    if isprime(M):
      print(M)
    p += 1
    M = 2 ** p - 1

def prime(N):
  primes = []
  for i in range(2, N + 1):
    primes.append(i)
    for p in range(2, i):
      if i % p == 0:
        primes.remove(i)
        break
  return primes

def mersenne_list (x):
  p = 1
  M = 2 ** p - 1
  l = []
  while M < x:
    if M in primes:
      l.append(M)
    p += 1
    M = 2 ** p - 1
  return l

N = int(input('素数・メルセンヌ素数を調べる値の上限値を入力してください. >>>'))
primes = prime(N)
print(primes)
result = mersenne_list(N)
end = time.time()
print(result, len(result))
print(end - start, '[s]')