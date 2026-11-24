// app/page.tsx — Server Component (Next.js 14 App Router)
// Fetches sales summary server-side and renders the executive dashboard.
// Author: Sourojit Kar | github.com/Jeet908

// In-memory data (replace with PostgreSQL via pg in production)
const salesData = [
  { product: "Smart Monitor 27\"",         category: "Technology",           region: "US-East",       revenue: 798.00,  profit: 238.00, margin: 29.82 },
  { product: "Ergonomic Task Chair",       category: "Office Supplies",      region: "US-West",       revenue: 260.00,  profit: 120.00, margin: 46.15 },
  { product: "Fitness Smartwatch V2",      category: "Consumer Electronics", region: "South Asia",    revenue: 402.30,  profit: 207.30, margin: 51.52 },
  { product: "Noise-Cancelling Headphones",category: "Technology",           region: "Central Europe",revenue: 338.30,  profit: 118.30, margin: 34.97 },
  { product: "USB-C Thunderbolt Hub",      category: "Technology",           region: "East Asia",     revenue: 300.00,  profit: 125.00, margin: 41.67 },
  { product: "Laser Toner Cartridge",      category: "Office Supplies",      region: "UK & Ireland",  revenue: 260.00,  profit: 160.00, margin: 61.54 },
];

// Server-side data computation (runs at request time — no client JS needed)
function computeSummary() {
  const totalRevenue = salesData.reduce((s, d) => s + d.revenue, 0);
  const totalProfit  = salesData.reduce((s, d) => s + d.profit,  0);
  return {
    totalRevenue:   totalRevenue.toFixed(2),
    totalProfit:    totalProfit.toFixed(2),
    blendedMargin:  ((totalProfit / totalRevenue) * 100).toFixed(1),
    totalOrders:    salesData.length,
    aov:            (totalRevenue / salesData.length).toFixed(2),
  };
}

export default function DashboardPage() {
  const summary = computeSummary();

  return (
    <main style={{ background: "#0F172A", minHeight: "100vh", padding: "32px", fontFamily: "'Segoe UI', sans-serif", color: "#F8FAFC" }}>
      <h1 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "4px" }}>
        📊 Next.js Sales Analytics Portal
      </h1>
      <p style={{ color: "#64748B", fontSize: "13px", marginBottom: "28px" }}>
        Server-Side Rendered with Next.js 14 App Router | Author: Sourojit Kar
      </p>

      {/* KPI Summary Cards — rendered server-side, zero client JS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "14px", marginBottom: "28px" }}>
        {[
          { label: "Total Revenue",   value: `$${summary.totalRevenue}`,  color: "#3B82F6" },
          { label: "Total Profit",    value: `$${summary.totalProfit}`,   color: "#10B981" },
          { label: "Blended Margin",  value: `${summary.blendedMargin}%`, color: "#F59E0B" },
          { label: "Avg Order Value", value: `$${summary.aov}`,           color: "#F8FAFC" },
          { label: "Total Orders",    value: summary.totalOrders,         color: "#F8FAFC" },
        ].map(card => (
          <div key={card.label} style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: "10px", padding: "18px", textAlign: "center" }}>
            <div style={{ fontSize: "26px", fontWeight: 800, color: card.color, marginBottom: "6px" }}>{card.value}</div>
            <div style={{ fontSize: "11px", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.5px" }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Product Table */}
      <div style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: "10px", overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", fontWeight: 700, fontSize: "14px", borderBottom: "1px solid #334155" }}>
          Product Performance Table ({salesData.length} records)
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#0F172A" }}>
              {["Product", "Category", "Region", "Revenue", "Profit", "Margin %", "Status"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: "11px", color: "#64748B", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {salesData.map((row, i) => {
              const status = row.margin >= 40 ? { label: "HEALTHY", color: "#6EE7B7", bg: "rgba(16,185,129,.15)" }
                           : row.margin >= 20 ? { label: "WARNING", color: "#FCD34D", bg: "rgba(245,158,11,.15)" }
                           :                   { label: "CRITICAL", color: "#FCA5A5", bg: "rgba(239,68,68,.15)"  };
              return (
                <tr key={i} style={{ borderTop: "1px solid #1E293B" }}>
                  <td style={{ padding: "10px 14px", fontSize: "13px" }}>{row.product}</td>
                  <td style={{ padding: "10px 14px", fontSize: "13px", color: "#94A3B8" }}>{row.category}</td>
                  <td style={{ padding: "10px 14px", fontSize: "13px", color: "#94A3B8" }}>{row.region}</td>
                  <td style={{ padding: "10px 14px", fontSize: "13px", color: "#3B82F6" }}>${row.revenue.toFixed(2)}</td>
                  <td style={{ padding: "10px 14px", fontSize: "13px", color: "#10B981" }}>${row.profit.toFixed(2)}</td>
                  <td style={{ padding: "10px 14px", fontSize: "13px" }}>{row.margin}%</td>
                  <td style={{ padding: "10px 14px" }}>
                    <span style={{ padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 700, color: status.color, background: status.bg }}>{status.label}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
