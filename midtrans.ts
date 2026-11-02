import { createHash, timingSafeEqual } from "node:crypto";

const required = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing server environment variable: ${name}`);
  return value;
};

export function isLiveCheckoutEnabled(): boolean {
  return process.env.LIVE_CHECKOUT_ENABLED === "true";
}

export async function createSnapTransaction(input: {
  orderId: string;
  grossAmount: number;
  itemName: string;
  customerEmail?: string;
}) {
  if (!isLiveCheckoutEnabled()) throw new Error("Checkout is disabled pending end-to-end approval.");
  if (!Number.isSafeInteger(input.grossAmount) || input.grossAmount <= 0) throw new Error("Invalid payment amount.");

  const serverKey = required("MIDTRANS_SERVER_KEY");
  const production = process.env.MIDTRANS_IS_PRODUCTION === "true";
  const baseUrl = production ? "https://app.midtrans.com" : "https://app.sandbox.midtrans.com";
  const response = await fetch(`${baseUrl}/snap/v1/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${serverKey}:`).toString("base64")}`
    },
    body: JSON.stringify({
      transaction_details: { order_id: input.orderId, gross_amount: input.grossAmount },
      item_details: [{ id: input.orderId, price: input.grossAmount, quantity: 1, name: input.itemName.slice(0, 50) }],
      ...(input.customerEmail ? { customer_details: { email: input.customerEmail } } : {})
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(15000)
  });

  const data: unknown = await response.json().catch(() => null);
  if (!response.ok || !data || typeof data !== "object" || !("token" in data) || !("redirect_url" in data) || typeof data.token !== "string" || typeof data.redirect_url !== "string") {
    throw new Error(`Midtrans transaction creation failed (${response.status}).`);
  }
  return { token: data.token, redirect_url: data.redirect_url };
}

export function verifyMidtransSignature(input: {
  orderId: string;
  statusCode: string;
  grossAmount: string;
  signatureKey: string;
}): boolean {
  const expected = createHash("sha512")
    .update(input.orderId + input.statusCode + input.grossAmount + required("MIDTRANS_SERVER_KEY"))
    .digest();
  const supplied = Buffer.from(input.signatureKey, "hex");
  return supplied.length === expected.length && timingSafeEqual(expected, supplied);
}
