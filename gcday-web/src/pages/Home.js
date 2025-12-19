import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/memories/").then((res) => setItems(res.data));
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", padding: "0 16px" }}>
      <h1>GC Day Memories 2026</h1>
      <Link to="/create">Add memory</Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
          marginTop: 16,
        }}
      >
        {items.map((m) => (
          <Link
            key={m.slug}
            to={`/memories/${m.slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              {m.photo_url && (
                <img
                  src={m.photo_url}
                  alt={m.name}
                  style={{
                    width: "100%",
                    height: 160,
                    objectFit: "cover",
                  }}
                />
              )}
              <div style={{ padding: 12 }}>
                <h3 style={{ margin: 0 }}>{m.name}</h3>
                <p style={{ marginTop: 8, color: "#555" }}>
                  {m.story?.slice(0, 80)}
                  {m.story?.length > 80 ? "..." : ""}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
