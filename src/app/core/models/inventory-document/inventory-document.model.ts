

export interface InventoryLine{

  productId: string;
  quantity: number;
  unitPrice?: number;
  detail?: string;

}

export interface InventoryDocument{

  type: 'IN'| 'OUT';
  reference: string;
  date: string;
  notes: string;
  lines: InventoryLine[];
}
