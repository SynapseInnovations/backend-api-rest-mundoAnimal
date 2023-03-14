import pandas as pd
from datetime import datetime

# Crear DataFrame
df = pd.DataFrame({'Nombre': ['Juan', 'María', 'Pedro'], 'Edad': [25, 30, 35], 'País': ['México', 'Argentina', 'España']})

# Obtener fecha y hora actual
fecha_hora = datetime.now().strftime('%Y%m%d%H%M%S')

# Crear nombre del archivo con fecha y hora actual
nombre_archivo = 'datos_{}.csv'.format(fecha_hora)

# Guardar DataFrame en archivo CSV con el nombre creado
df.to_csv(nombre_archivo, index=False)
