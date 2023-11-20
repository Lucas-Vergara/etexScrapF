export function getMonthName(monthNumber: number): string | null {
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  if (monthNumber >= 1 && monthNumber <= 12) {
    return months[monthNumber - 1];
  } else {
    // console.error('Número de mes no válido. Debe estar entre 1 y 12.');
    return null;
  }
}