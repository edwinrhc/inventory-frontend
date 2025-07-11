import {ProductType} from "../product-type/ProductType";

export interface Product {
  id: string;
  sku: string;
  name: string;
  description?: string;
  price: number;
  isActive: boolean;
  productTypeId?: string;     // ← aquí el FK
  productType?: { id: string; name: string; description?: string;  }// ← opcional, si tu API te devuelve el objeto anidado
  createdAt?: string;
  updatedAt?: string;
}
