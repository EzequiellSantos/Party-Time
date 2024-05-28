from random import choice
from time import sleep
n = choice(range(1,11))
r = 0
e = 0
print('Estou pensando em um número de 1 a 10, dúvido você acertar qual é')
sleep(1)
print('HAHA')
sleep(1)
print('HA...')
while n != r:
    r =int(input('Qual número estou pensando ?'))
    e +=1
    if r != n:
        if n > r:
            print('Muito baixo')
        else:
            print('Muito alto')

for c in range (1,11):
    sleep(0.2)
    print('='*c, end='')
    sleep(0.2)
if e > 1:
    print('\nHAHAHAHA, precisou de {} tentativas para acertar'.format(e))
else:
    print('\nKOROI CUZÃO de primeira')