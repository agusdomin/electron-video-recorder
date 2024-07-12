import zmq
import numpy as np
import json

print('Se enciende el equipo de medicion')
context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind('tcp://*:5555')
print('Socket abierto')

def Z_capacitor(f,C) : return (abs(1/(1.0j*2*np.pi*f*C)), np.angle(1/(1.0j*np.pi*C),True))

while True:
    print('Esperando ordenes...')
    message = socket.recv()
    print('Se va a realizar una medicion:', message.decode())

    reply = Z_capacitor(5000,1*10**-9)
    print('Medicion:',reply)
    json_string = json.dumps(reply)
    print('Enviando medicion...')
    socket.send(json_string.encode())