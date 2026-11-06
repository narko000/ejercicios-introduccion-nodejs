// Ejercicio 2 · Explorador de carpetas (fs + path + picocolors)
const fs = require('node:fs')
const path = require('node:path')
const pc = require('picocolors')

// Ruta recibida por argumento. Si no hay, usamos la carpeta actual.
// process.argv[0] es node y process.argv[1] es este script, por eso cogemos el [2]
const ruta = process.argv[2] ?? '.'

// Convierte bytes a B, KB o MB
function formatearTamano (bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1024 / 1024).toFixed(1) + ' MB'
}

// Si la ruta no existe, error con fondo rojo y salimos con código 1
if (!fs.existsSync(ruta)) {
  console.log(pc.bgRed(pc.white(` ERROR: la ruta "${ruta}" no existe `)))
  process.exit(1)
}

// Leemos el contenido. withFileTypes nos da objetos con isDirectory()
const elementos = fs.readdirSync(ruta, { withFileTypes: true })

let numCarpetas = 0
let numArchivos = 0
let tamanoTotal = 0

console.log(pc.bold(pc.cyan(`\nContenido de ${path.resolve(ruta)}\n`)))

for (const elemento of elementos) {
  const nombre = elemento.name
  const esOculto = nombre.startsWith('.')

  if (elemento.isDirectory()) {
    numCarpetas++
    // Carpetas ocultas en gris, normales en azul, siempre con "/" al final
    console.log(esOculto ? pc.gray(nombre + '/') : pc.blue(nombre + '/'))
  } else {
    numArchivos++
    const tamano = fs.statSync(path.join(ruta, nombre)).size
    tamanoTotal += tamano
    // Archivos ocultos en gris, normales en verde. El tamaño siempre en gris
    const textoNombre = esOculto ? pc.gray(nombre) : pc.green(nombre)
    console.log(`${textoNombre} ${pc.gray('(' + formatearTamano(tamano) + ')')}`)
  }
}

// Resumen final
console.log(pc.bold(`\n${numCarpetas} carpetas, ${numArchivos} archivos, ${formatearTamano(tamanoTotal)} en total\n`))
