import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function CreateMemory() {
  const [name, setName] = useState("");
  const [story, setStory] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("story", story);
    if (photo) formData.append("photo", photo);
    try {
      const res = await api.post("/memories/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(`/memories/${res.data.slug}`);
    } catch (err) {
      setError("Failed to create memory.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", padding: "0 16px" }}>
      <h1>Add memory</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={submit}>
        <div style={{ marginBottom: 12 }}>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Story</label>
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            rows={5}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>
        <button disabled={loading} type="submit">
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
