import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import { Product } from "./pages/Product/Product.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import PaymentStatus from "./pages/PaymentStatus/PaymentStatus.jsx";
import { Collection } from "./pages/Collection/Collection.jsx";
import { AllProducts } from "./pages/AllProducts/AllProducts.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Auth from "./pages/Auth/Auth.jsx";
import Profile from "./pages/Profile/Profile.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" index element={<Dashboard />} />
          <Route path="/products/:productId/:uuid" element={<Product/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/payment-status" element={<PaymentStatus/>} />
          <Route path="/collection/:collectionId" element={<Collection />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/contact-us" element={<Contact/>} />
          <Route path="auth" element={<Auth/>} />
          <Route path="/profile" element={<Profile/>} />
          {/* <Route path="/collections" element={<Collections />} /> */}
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
