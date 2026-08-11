import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";
import { socialProductContent } from "@/app/lib/social-assets";

export const alt = "SoleSheet product preview showing a faster mobile stockroom update";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const content = socialProductContent;
  const logo = `data:image/png;base64,${readFileSync(path.join(process.cwd(), "public/png/solesheet-horizontal-on-light@2x.png")).toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#f7faf5",
          color: "#14213d",
          padding: "64px 76px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: "650px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "24px", fontWeight: 700 }}>
            <img src={logo} alt="SoleSheet" width={260} height={70} style={{ objectFit: "contain" }} />
            <div style={{ display: "flex", marginLeft: "10px", border: "1px solid #cbd5c7", borderRadius: "999px", padding: "7px 12px", color: "#047857", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1.5px" }}>Product preview</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: "48px", fontSize: "72px", lineHeight: 0.95, letterSpacing: "-4px", fontWeight: 700 }}>
            Save once.
            <span style={{ color: "#047857", fontStyle: "italic", fontWeight: 500 }}> See your stockroom update.</span>
          </div>
          <div style={{ display: "flex", marginTop: "30px", fontSize: "24px", lineHeight: 1.4, color: "#656159" }}>
            {content.audience}. Mobile inventory, profit, and installment clarity.
          </div>
        </div>
        <div style={{ display: "flex", width: "300px", height: "520px", borderRadius: "48px", padding: "14px", background: "#14213d", transform: "rotate(4deg)", boxShadow: "0 30px 70px rgba(20,33,61,.25)" }}>
          <div style={{ display: "flex", flexDirection: "column", width: "100%", borderRadius: "36px", padding: "38px 20px 22px", background: "#f7f6f2" }}>
            <div style={{ fontSize: "13px", color: "#8d877d", textTransform: "uppercase", letterSpacing: "2px" }}>Your stockroom</div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: "22px", padding: "20px", borderRadius: "24px", background: "#047857", color: "white" }}>
              <span style={{ fontSize: "13px", color: "#b7ead7" }}>ACTIVE INVENTORY</span>
              <span style={{ marginTop: "8px", fontSize: "52px", fontWeight: 700 }}>{content.dashboard.activePairs}</span>
              <span style={{ fontSize: "14px", color: "#d2f4e8" }}>pairs ready to manage</span>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
              <div style={{ display: "flex", flexDirection: "column", width: "50%", padding: "15px", borderRadius: "18px", background: "white" }}><span style={{ fontSize: "11px", color: "#8d877d" }}>Inventory cost</span><span style={{ marginTop: "6px", fontSize: "17px", fontWeight: 700 }}>{content.formatted.inventoryBefore}</span></div>
              <div style={{ display: "flex", flexDirection: "column", width: "50%", padding: "15px", borderRadius: "18px", background: "#e8ff9f" }}><span style={{ fontSize: "11px", color: "#656159" }}>Monthly profit</span><span style={{ marginTop: "6px", fontSize: "17px", fontWeight: 700 }}>₱8,950</span></div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: "12px", padding: "16px", borderRadius: "18px", background: "#fff5d9" }}><span style={{ fontSize: "11px", color: "#b26a00" }}>Unpaid installments</span><span style={{ marginTop: "5px", fontSize: "20px", fontWeight: 700 }}>{content.formatted.balanceBefore}</span></div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px", marginTop: "auto" }}><span style={{ display: "flex", borderRadius: "999px", padding: "7px 10px", background: "white", fontSize: "10px", fontWeight: 700 }}>Quick log</span><span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "999px", background: "#047857", color: "white", fontSize: "28px" }}>+</span></div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
