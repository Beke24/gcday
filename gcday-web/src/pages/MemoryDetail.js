import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api";
import { QRCodeSVG } from "qrcode.react";   // ✅ Correct import

export default function MemoryDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    api.get(`/memories/${slug}/`).then((res) => setItem(res.data));
  }, [slug]);

  if (!item) return <div>Loading...</div>;

  const publicUrl = `${window.location.origin}/memories/${item.slug}`;
  const qrPngUrl = `http://localhost:8000/api/qr/${item.slug}/`; // backend PNG option

  return (
    <div style={{ maxWidth: 800, margin: "20px auto", padding: "0 16px" }}>
      <Link to="/">← Back</Link>
      <h1>{item.name}</h1>

      {item.photo_url && (
        <img
          src={item.photo_url}
          alt={item.name}
          style={{
            width: "100%",
            maxHeight: 420,
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
      )}

      <p style={{ marginTop: 16, fontSize: 18, lineHeight: 1.6 }}>{item.story}</p>

      <div style={{ display: "flex", gap: 24, alignItems: "center", marginTop: 24 }}>
        <div>
          <h3 style={{ margin: 0 }}>QR (frontend)</h3>
          <QRCodeSVG value={publicUrl} size={160} />   {/* ✅ Works */}
        </div>
        <div>
          <h3 style={{ margin: 0 }}>QR (backend PNG)</h3>
          <img src={qrPngUrl} alt="QR code" style={{ width: 160, height: 160 }} />
        </div>
      </div>

      <p style={{ color: "#888", marginTop: 12 }}>URL: {publicUrl}</p>
    </div>
  );
}
