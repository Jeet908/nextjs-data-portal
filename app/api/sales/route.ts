// app/api/sales/route.ts — Next.js API Route (App Router)
// Handles GET /api/sales — returns JSON sales summary
// Author: Sourojit Kar | github.com/Jeet908

import { NextResponse } from "next/server";

const salesData = [
  { product: "Smart Monitor 27\"",         revenue: 798.00,  profit: 238.00, margin: 29.82 },
  { product: "Ergonomic Task Chair",       revenue: 260.00,  profit: 120.00, margin: 46.15 },
  { product: "Fitness Smartwatch V2",      revenue: 402.30,  profit: 207.30, margin: 51.52 },
  { product: "Noise-Cancelling Headphones",revenue: 338.30,  profit: 118.30, margin: 34.97 },
  { product: "USB-C Thunderbolt Hub",      revenue: 300.00,  profit: 125.00, margin: 41.67 },
  { product: "Laser Toner Cartridge",      revenue: 260.00,  profit: 160.00, margin: 61.54 },
];

export async function GET() {
  const totalRevenue = salesData.reduce((s, d) => s + d.revenue, 0);
  const totalProfit  = salesData.reduce((s, d) => s + d.profit,  0);

  return NextResponse.json({
    summary: {
      totalRevenue:  +totalRevenue.toFixed(2),
      totalProfit:   +totalProfit.toFixed(2),
      blendedMargin: +((totalProfit / totalRevenue) * 100).toFixed(2),
      totalOrders:   salesData.length,
    },
    products: salesData,
  });
}
