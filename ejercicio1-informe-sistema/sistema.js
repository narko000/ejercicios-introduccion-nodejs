// Ejercicio 1 · Informe del sistema (os + picocolors)
const os = require('node:os')
const pc = require('picocolors')

// Convierte bytes a GB con 2 decimales
function formatearBytes (bytes) {
  return (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB'
}

// Convierte segundos a formato "Xh Ym"
function formatearUptime (segundos) {
  const horas = Math.floor(segundos / 3600)
  const minutos = Math.floor((segundos % 3600) / 60)
  return `${horas}h ${minutos}m`
}

// Pinta el porcentaje según su valor: verde < 60, amarillo 60-85, rojo > 85
function colorearPorcentaje (porcentaje) {
  const texto = porcentaje + ' %'
  if (porcentaje < 60) return pc.green(texto)
  if (porcentaje <= 85) return pc.yellow(texto)
  return pc.red(texto)
}

// Muestra una línea "etiqueta: valor" con la etiqueta en gris
function mostrarDato (etiqueta, valor) {
  console.log(pc.dim(etiqueta.padEnd(15)) + valor)
}

// Datos de memoria
const memTotal = os.totalmem()
const memLibre = os.freemem()
const porcentajeUsado = Math.round(((memTotal - memLibre) / memTotal) * 100)

// Datos de CPU
const cpus = os.cpus()

// Informe
console.log(pc.bold(pc.cyan('\n=== INFORME DEL SISTEMA ===\n')))

mostrarDato('Equipo:', pc.white(os.hostname()))
mostrarDato('Sistema:', pc.white(`${os.type()} ${os.release()} (${os.arch()})`))
mostrarDato('Usuario:', pc.white(os.userInfo().username))
mostrarDato('Procesador:', pc.white(`${cpus[0].model} · ${cpus.length} CPUs`))

console.log(pc.bold(pc.cyan('\n--- Memoria ---')))
mostrarDato('Total:', pc.green(formatearBytes(memTotal)))
mostrarDato('Libre:', pc.green(formatearBytes(memLibre)))
mostrarDato('Usada:', colorearPorcentaje(porcentajeUsado))

console.log(pc.bold(pc.cyan('\n--- Tiempo activo ---')))
mostrarDato('Uptime:', pc.white(formatearUptime(os.uptime())))
console.log()
