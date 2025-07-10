import {InventoryLine} from "../inventory-document.model";


export interface CreateInventoryDocumentDto {
  type: 'IN'| 'OUT';
  reference: string;
  date: string;
  notes: string;
  lines: InventoryLine[];
}
