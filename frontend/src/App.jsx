import {Routes, Route} from "react-router-dom";
import LandingPublic from "./assets/pages/user/LandingPublic";
import LoginPage from "./assets/pages/user/LoginPage";
import RegisterPage from "./assets/pages/user/RegisterPage";
import ProductDetailPage from "./assets/pages/user/ProductDetailPage";
import LandingLogged from "./assets/pages/user/LandingLogged";
import ProfilePage from "./assets/pages/user/ProfilePage";
import ProductsPage from "./assets/pages/user/ProductsPage";
import CartPage from "./assets/pages/user/CartPage";
import ProtectedRoute from "./assets/routes/ProtectedRoute";
import AdminRoute from "./assets/routes/AdminRoute";
import AdminDashboard from "./assets/pages/admin/AdminDashboard";
import AdminCartsPage from "./assets/pages/admin/AdminCartsPage";
import AdminNewProductPage from "./assets/pages/admin/AdminNewProductPage";
import AdminProductsPage from "./assets/pages/admin/AdminProductsPage";
import AdminUsersPage from "./assets/pages/admin/AdminUsersPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPublic />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/productos" element={<ProductsPage />} />
      <Route path="/productos/:id" element={<ProductDetailPage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <LandingLogged />
          </ProtectedRoute>
        }
      />
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/carrito"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
      {/* RUTA ADMIN  */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/productos"
        element={
          <AdminRoute>
            <AdminProductsPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/productos/nuevo"
        element={
          <AdminRoute>
            <AdminNewProductPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/usuarios"
        element={
          <AdminRoute>
            <AdminUsersPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/carritos"
        element={
          <AdminRoute>
            <AdminCartsPage />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default App;
