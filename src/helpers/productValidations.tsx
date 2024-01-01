interface Product {
  sku: string;
  name: string;
  brand: string;
  distributor: string;
  category: string;
  region: string;
  format: string;
}

export default function productValidations(product: Product): string | null {
  const fieldTranslations: { [key in keyof Product]?: string } = {
    name: "Nombre",
    brand: "Marca",
    distributor: "Distribuidor",
    category: "Categoría",
    region: "Región",
    sku: "URL",
  };

  const keys = Object.keys(product) as Array<keyof Product>;
  for (const key of keys) {
    if ((key as string) === "__v") {
      continue;
    }
    if (key !== "format" && !product[key]) {
      return fieldTranslations[key] ?? key;
    }
  }
  return null;
}
