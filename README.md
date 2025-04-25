# Cliente (Frontend) - Sistema de Gestión de Videovigilancia

Este es el **cliente web** del sistema desarrollado para **Seguridad Privada Vanguardia Digital de Puerto Peñasco**, fue creado como proyecto escolar con un tiempo de desarrollo de 3 semanas. Su propósito es permitir la gestión eficiente y visual de instalaciones de cámaras, monitoreos y técnicos.
El Dashboard contiene unicamente datos estaticos, no dinamicos.

## 🧩 Propósito del Proyecto

El proposito es optimizar el monitoreo, mantenimiento y administración de sistemas de videovigilancia mediante una plataforma distribuida moderna y escalable.

## 🖥️ Tecnologías Utilizadas

- React.js
- React Router
- Axios
- Tailwind CSS / Ant design
- Docker

## 🐳 Docker

El lado del cliente cuenta con un `Dockerfile` para contenerización. Puedes levantarlo creando en la carpeta raiz del proyecto un archivo llamado "compose.yml" y pegar lo siguiente, tomando en cuenta el nombre del contexto de la carpeta, si no esta bien nombrado no podrá construirse, dos opciones son o cambiar el nombre de la carpeta o cambiar el nombre en el compose, despues de ello hacer "docker compose up --build" o "docker compose build" para construir el proyecto y se instalen las dependencias, uso de WSL2 para poder correrlo por dependencias como bcrypt, tener cuiado con la identación:

`services:
  api:
    container_name: vanguardia_api
    build:
      context: ./vanguardia-api
      dockerfile: dockerfile.api
    volumes:
      - ./vanguardia-api:/app
    ports:
      - "3000:3000"
    networks:
      - vanguardia-network

  client:
    container_name: vanguardia_client
    build:
      context: ./vanguardia-client
      dockerfile: dockerfile.client
    volumes:
      - ./vanguardia-client:/app
    ports:
      - "5173:5173"
    networks:
      - vanguardia-network
`

networks:
  vanguardia-network:
    driver: bridge

