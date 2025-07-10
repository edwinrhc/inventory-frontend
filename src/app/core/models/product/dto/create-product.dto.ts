
export interface CreateProductDto {
  sku: string;
  name: string;
  description: string;  // ← agregado
  price: number;
}

