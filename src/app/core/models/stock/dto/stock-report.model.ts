
export interface StockReportDto{
  productId: number;
  sku: string;
  name: string;
  price: number;
  isActive: boolean;
  totalIn: number;
  totalOut: number;
  currentStock: number;
  lastInRef?: string;
  lastOutRef?: string;
  lastInPrice?: number;
  lasOutPrice?: number;
}


