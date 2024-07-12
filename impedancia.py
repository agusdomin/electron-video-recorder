import numpy as np

# función para calcular la impedancia de un capacitor de "C" faradios a una frecuencia f
def Z_capacitor(f,C) : return (abs(1/(1.0j*2*np.pi*f*C)), np.angle(1/(1.0j*np.pi*C),True))

# función para calcular la impedancia de un capacitor de "C" faradios a una frecuencia "f" en serie con una resistencia "R"
def Z_serie_R_C_(f,R,C) : return (abs(R+1/(1.0j*2*np.pi*f*C)), np.angle(R+1/(1.0j*2*f*np.pi*C),True))

# función para calcular la impedancia de un capacitor de "C" faradios a una frecuencia "f" en paralelo con una resistencia "R"
def Z_paralelo_R_C_(f,R,C) : return (abs((1/R+(1.0j*2*np.pi*f*C)**-1)), np.angle((1/R+(1.0j*2*np.pi*f*C))**-1,True))

Z = Z_capacitor(5000,1*10**-9)
print(Z)

Z1 = Z_serie_R_C_(1000, 10000,1*10**-9)
print(Z1)

Z2 = Z_paralelo_R_C_(1000, 10000,1*10**-9)
print(Z2)

