export type SupplierProduct = {
  code: string;
  name: string;
  gameCode: string;
  price: number;
};

export type SupplierOrderRequest = {
  reference: string;
  productCode: string;
  userId: string;
  zoneId?: string;
};

export type SupplierOrderResult = {
  reference: string;
  status: "PROCESSING" | "SUCCESS" | "FAILED";
  raw: unknown;
};

export interface TopupSupplier {
  getCatalog(): Promise<SupplierProduct[]>;
  createOrder(input: SupplierOrderRequest): Promise<SupplierOrderResult>;
  getOrderStatus(reference: string): Promise<SupplierOrderResult>;
}