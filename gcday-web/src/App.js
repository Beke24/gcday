import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MemoryDetail from "./pages/MemoryDetail";
import CreateMemory from "./pages/CreateMemory";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memories/:slug" element={<MemoryDetail />} />
        <Route path="/create" element={<CreateMemory />} />
      </Routes>
    </BrowserRouter>
  );
}

