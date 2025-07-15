import {Product} from "../product";

export interface ProductWithStock extends Product{
  stock: number;
}
