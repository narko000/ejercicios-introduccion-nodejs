# Ejercicios Introducción a Node.js

Ejercicios de la asignatura **Programación de Servicios y Procesos** (bloque 00, fundamentos de Node.js).

## Integrantes

- Marko González - Grupo: 2DM3


## Requisitos

Tener instalado Node.js. Cada ejercicio es un proyecto independiente, así que hay que hacer `npm install` dentro de cada carpeta antes de ejecutarlo (instala picocolors, que es la librería que usamos para los colores).

---

## Ejercicio 1 - Informe del sistema

Programa que saca por consola información del ordenador usando el módulo `os`: nombre del equipo, sistema operativo, usuario, procesador, memoria y el tiempo que lleva encendido.

El porcentaje de memoria usada cambia de color según lo lleno que esté:
- Verde si es menos del 60%
- Amarillo entre 60% y 85%
- Rojo si pasa del 85%

**Cómo ejecutarlo:**
```bash
cd ejercicio1-informe-sistema
npm install
node sistema.js
```

![Ejercicio 1](ejercicio1-captura.png)

---

## Ejercicio 2 - Explorador de carpetas

Le pasas una ruta y te lista lo que hay dentro usando `fs` y `path`. Las carpetas salen en azul, los archivos en verde con su tamaño, y los ocultos (los que empiezan por `.`) en gris. Al final muestra un resumen con cuántas carpetas y archivos hay y cuánto ocupan.

Si no le pasas ninguna ruta, usa la carpeta actual. Si la ruta no existe, da un error en rojo y se cierra.

**Cómo ejecutarlo:**
```bash
cd ejercicio2-explorador-carpetas
npm install
node listar.js ./una-carpeta
node listar.js
```

![Ejercicio 2](ejercicio2-captura.png)

---

## Ejercicio 3 - Informe a archivo con historial

Es el ejercicio 1 pero además guarda el informe en disco:
- `informe.txt`: se sobrescribe cada vez que se ejecuta (`writeFileSync`)
- `historial.log`: va añadiendo una línea con la fecha y la RAM usada en cada ejecución (`appendFileSync`)

El texto se guarda sin colores, porque si no el archivo se llena de caracteres raros de picocolors. Los colores solo se ponen al mostrarlo por consola.

**Cómo ejecutarlo:**
```bash
cd ejercicio3-informe-archivo
npm install
node informe.js
```

![Ejercicio 3](ejercicio3-captura.png)