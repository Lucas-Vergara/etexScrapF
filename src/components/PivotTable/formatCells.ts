export default function formatCells(): void {
  const elementosPvtVal = document.getElementsByClassName("pvtVal");
  const elementosPvpTotal = document.getElementsByClassName("pvtTotal");

  // Convertir HTMLCollection a arrays usando Array.from
  const elementosPvtValArray = Array.from(elementosPvtVal);
  const elementosPvpTotalArray = Array.from(elementosPvpTotal);

  // Concatenar ambos arrays
  const todosLosElementos = elementosPvtValArray.concat(
    elementosPvpTotalArray
  );

  for (const elemento of todosLosElementos) {
    const valorOriginal = elemento.innerHTML;
    const valorFormateado = valorOriginal
      .replace(/,/g, ".")
      .replace(/\.\d{2}$/, "");

    elemento.innerHTML = valorFormateado;
  }
}