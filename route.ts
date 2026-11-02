import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Only supplier-synced, explicitly activated products are public. */
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      select: {
        id: true,
        gameCode: true,
        name: true,
        description: true,
        sellPrice: true,
        updatedAt: true
      },
      orderBy: [{ gameCode: "asc" }, { sellPrice: "asc" }]
    });
    return NextResponse.json({ products }, {
      headers: { "Cache-Control": "no-store" }
    });
  } catch {
    return NextResponse.json({ error: "Catalog temporarily unavailable" }, { status: 503 });
  }
}
