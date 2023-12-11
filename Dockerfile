# Usa una imagen base de Node.js
FROM node:18-alpine
RUN npm config set registry https://registry.npmjs.org/

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de tu aplicación al contenedor
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos
COPY . .

# Compila tu aplicación React
RUN npm run build

# Expone el puerto en el que tu aplicación React se ejecutará (puede variar)
EXPOSE 3000

# Comando para iniciar tu aplicación React (esto puede variar según tu configuración)
CMD ["npm", "start"]
