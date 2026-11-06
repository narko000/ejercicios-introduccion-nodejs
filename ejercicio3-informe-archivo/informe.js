// Ejercicio 3 · Informe a archivo con historial (os + fs + picocolors)
const os = require('node:os')
const fs = require('node:fs')
const pc = require('picocolors')

function formatearBytes (bytes) {
  return (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB'
}

function formatearUptime (segundos) {
  const horas = Math.floor(segundos / 3600)
  const minutos = Math.floor((segundos % 3600) / 60)
  return `${horas}h ${minutos}m`
}

function colorearPorcentaje (porcentaje) {
  const texto = porcentaje + ' %'
  if (porcentaje < 60) return pc.green(texto)
  if (porcentaje <= 85) return pc.yellow(texto)
  return pc.red(texto)
}

// Fecha con formato "2026-11-01 10:32:15"
function fechaActual () {
  const d = new Date()
  const dos = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${dos(d.getMonth() + 1)}-${dos(d.getDate())} ` +
         `${dos(d.getHours())}:${dos(d.getMinutes())}:${dos(d.getSeconds())}`
}

// 1. Recogemos los datos
const memTotal = os.totalmem()
const memLibre = os.freemem()
const porcentajeUsado = Math.round(((memTotal - memLibre) / memTotal) * 100)
const cpus = os.cpus()

// Lista de [etiqueta, valor] en texto PLANO (sin colores)
const datos = [
  ['Equipo', os.hostname()],
  ['Sistema', `${os.type()} ${os.release()} (${os.arch()})`],
  ['Usuario', os.userInfo().username],
  ['Procesador', `${cpus[0].model} · ${cpus.length} CPUs`],
  ['Memoria total', formatearBytes(memTotal)],
  ['Memoria libre', formatearBytes(memLibre)],
  ['Memoria usada', porcentajeUsado + ' %'],
  ['Tiempo activo', formatearUptime(os.uptime())]
]

// 2. Construimos el texto plano y lo guardamos (sin códigos de color)
let textoPlano = `INFORME DEL SISTEMA (${fechaActual()})\n\n`
for (const [etiqueta, valor] of datos) {
  textoPlano += `${(etiqueta + ':').padEnd(15)}${valor}\n`
}

fs.writeFileSync('informe.txt', textoPlano) // se sobrescribe cada vez
fs.appendFileSync('historial.log', `${fechaActual()} | RAM usada: ${porcentajeUsado}%\n`) // se añade una línea

// 3. Mostramos por consola, ahora sí con colores
console.log(pc.bold(pc.cyan('\n=== INFORME DEL SISTEMA ===\n')))
for (const [etiqueta, valor] of datos) {
  const valorColor = etiqueta === 'Memoria usada'
    ? colorearPorcentaje(porcentajeUsado)
    : pc.white(valor)
  console.log(pc.dim((etiqueta + ':').padEnd(15)) + valorColor)
}

console.log(pc.green('\n✔ Informe guardado en informe.txt\n'))
