export function bloquearAppMenu(
  desdeHoras = 11,
  desdeMin = 30,
  hastaHoras = 17,
  hastaMin = 0
) {
  const ahora = new Date();

  // Colombia está en UTC-5 todo el año, sin horario de verano.
  const horaColombia = ahora.getUTCHours() - 5;
  const minutosColombia = ahora.getUTCMinutes();

  // Ajustar si la resta da negativo (por ejemplo, UTC 2 - 5 = -3)
  const horaAjustada = (horaColombia + 24) % 24;

  const minutosActuales = horaAjustada * 60 + minutosColombia;
  const minutosDesde = desdeHoras * 60 + desdeMin;
  const minutosHasta = hastaHoras * 60 + hastaMin;

  return minutosActuales >= minutosDesde && minutosActuales < minutosHasta;
}
