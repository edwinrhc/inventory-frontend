import {InventoryDocument} from "../inventory-document.model";


export interface CreateInventoryResponse {
  data: InventoryDocument;
  warnings: string[];
  message: string[];
}
