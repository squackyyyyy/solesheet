import { ImageResponse } from "next/og";

export const alt = "ShoeTrack mobile inventory dashboard concept";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#f8f5ed",
          color: "#171717",
          padding: "64px 76px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: "650px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "24px", fontWeight: 700 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "54px", height: "54px", borderRadius: "16px", background: "#171717", color: "white", fontSize: "16px" }}>ST</div>
            ShoeTrack
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: "48px", fontSize: "72px", lineHeight: 0.95, letterSpacing: "-4px", fontWeight: 700 }}>
            Your shoe business,
            <span style={{ color: "#2457ff", fontStyle: "italic", fontWeight: 500 }}> out of the spreadsheet.</span>
          </div>
          <div style={{ marginTop: "30px", fontSize: "24px", lineHeight: 1.4, color: "#656159" }}>
            Inventory, profit, and installment tracking for Filipino shoe resellers.
          </div>
        </div>
        <div style={{ display: "flex", width: "300px", height: "520px", borderRadius: "48px", padding: "14px", background: "#171717", transform: "rotate(4deg)", boxShadow: "0 30px 70px rgba(17,17,17,.25)" }}>
          <div style={{ display: "flex", flexDirection: "column", width: "100%", borderRadius: "36px", padding: "38px 20px 22px", background: "#f7f6f2" }}>
            <div style={{ fontSize: "13px", color: "#8d877d", textTransform: "uppercase", letterSpacing: "2px" }}>Your stockroom</div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: "22px", padding: "20px", borderRadius: "24px", background: "#047857", color: "white" }}>
              <span style={{ fontSize: "13px", color: "#b7ead7" }}>ACTIVE INVENTORY</span>
              <span style={{ marginTop: "8px", fontSize: "52px", fontWeight: 700 }}>84</span>
              <span style={{ fontSize: "14px", color: "#d2f4e8" }}>pairs ready to manage</span>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
              <div style={{ display: "flex", flexDirection: "column", width: "50%", padding: "15px", borderRadius: "18px", background: "white" }}><span style={{ fontSize: "11px", color: "#8d877d" }}>Inventory cost</span><span style={{ marginTop: "6px", fontSize: "17px", fontWeight: 700 }}>₱318,400</span></div>
              <div style={{ display: "flex", flexDirection: "column", width: "50%", padding: "15px", borderRadius: "18px", background: "#e8ff9f" }}><span style={{ fontSize: "11px", color: "#656159" }}>Profit</span><span style={{ marginTop: "6px", fontSize: "17px", fontWeight: 700 }}>₱31,240</span></div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: "12px", padding: "16px", borderRadius: "18px", background: "#fff5d9" }}><span style={{ fontSize: "11px", color: "#b26a00" }}>Unpaid installments</span><span style={{ marginTop: "5px", fontSize: "20px", fontWeight: 700 }}>₱42,600</span></div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
