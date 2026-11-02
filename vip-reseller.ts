import type {
  SupplierOrderRequest, SupplierOrderResult, SupplierProduct, TopupSupplier
} from "./types";

/**
 * Fail-closed adapter.
 * The supplied website currently resolves to a storefront, not verified API documentation.
 * Do not guess endpoint paths, signatures, payload fields, or response formats.
 * Implement these methods only after the supplier's official API specification is reviewed.
 */
export class VipResellerSupplier implements TopupSupplier {
  private assertConfigured(): never {
    if (process.env.SUPPLIER_ENABLED !== "true") {
      throw new Error("VIP Reseller integration is disabled pending API verification.");
    }
    throw new Error("VIP Reseller API contract has not been implemented or verified.");
  }

  async getCatalog(): Promise<SupplierProduct[]> {
    return this.assertConfigured();
  }

  async createOrder(_input: SupplierOrderRequest): Promise<SupplierOrderResult> {
    return this.assertConfigured();
  }

  async getOrderStatus(_reference: string): Promise<SupplierOrderResult> {
    return this.assertConfigured();
  }
}