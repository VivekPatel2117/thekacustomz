import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
// import Products from "./pages/Products";
// import Collections from "./pages/Collections";
// import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" index element={<Dashboard />} />
          {/* <Route path="/products" element={<Products />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
