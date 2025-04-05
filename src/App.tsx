import { Route, Routes } from "react-router-dom";
import {
  LoginPage,
  AboutPage,
  HomePage,
  TrackPage,
  VoucherPage,
  StoreLayout,
  AdminLayout,
  ProductPage,
  TransactionPage,
  EditProductPage,
} from "./pages";
import Dashboard from "./pages/dashboard/DashboardPage";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />

      {/* STORE Layout */}
      <Route element={<StoreLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/tracking" element={<TrackPage />} />
        <Route path="/voucher/:gameName" element={<VoucherPage />} />
      </Route>

      {/* ADMIN Layout */}
      <Route path="/dashboard" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="product/edit/:gameName" element={<EditProductPage />} />
        <Route path="transactions" element={<TransactionPage />} />
      </Route>
    </Routes>
  );
};

export default App;
