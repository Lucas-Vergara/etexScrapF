export const getErrorMessage = (error: Error): string => {
  if (
    error.message ===
    "Error durante el scraping: Protocol error (Page.navigate): Cannot navigate to invalid URL"
  ) {
    return "Url no encontrada";
  } else if (
    error.message.startsWith("Error durante el scraping: Waiting for selector")
  ) {
    return "Precio o Título del producto no encontrado";
  } else if (
    error.message ===
    "Error durante el scraping: Cannot read properties of null (reading 'pushToMissingProducts')"
  ) {
    return "Problemas con el Distribuidor";
  } else {
    return error.message;
  }
};
