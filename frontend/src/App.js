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
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.jsx";
import OrderDetails from "./pages/OrderDetails/OrderDetails.jsx";
import AdminReviewPage from "./pages/AdminReviewPage/AdminReviewPage.jsx";
import { CreateProduct } from "./pages/CreateProduct/CreateProduct.jsx";
import { CreateCollection } from "./pages/CreateCollection/CreateCollection.jsx";
import {
  PrivateRoute,
  AdminRoute,
} from "./routes/ProtectedRoutes";

export default function App() {
  return (
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Dashboard />} />

    <Route path="/products/:productId/:uuid" element={<Product />} />
    <Route path="/products" element={<AllProducts />} />
    <Route path="/collection/:collectionId" element={<Collection />} />
    <Route path="/contact-us" element={<Contact />} />
    <Route path="/auth" element={<Auth />} />

    {/* USER PROTECTED */}
    <Route
      path="/checkout"
      element={
        <PrivateRoute>
          <Checkout />
        </PrivateRoute>
      }
    />

    <Route
      path="/profile"
      element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      }
    />

    <Route
      path="/orders/:id"
      element={
        <PrivateRoute>
          <OrderDetails />
        </PrivateRoute>
      }
    />

    {/* ADMIN PROTECTED */}
    <Route
      path="/ADMIN"
      element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      }
    />

 <Route path="/review" element={<AdminRoute><AdminReviewPage /></AdminRoute>} />
    <Route
      path="/create-product"
      element={
        <AdminRoute>
          <CreateProduct />
        </AdminRoute>
      }
    />

    <Route
      path="/create-collection"
      element={
        <AdminRoute>
          <CreateCollection />
        </AdminRoute>
      }
    />

    <Route path="/payment-status" element={<PaymentStatus />} />

    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
  );
}
