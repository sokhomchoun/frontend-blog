import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/homePage/HomePage";
import ProductView from "./pages/productView/ProductView";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Product from "./pages/admin/product/Product";
import ProductType from "./pages/admin/type/ProductType";
import ViewProduct from "./pages/admin/product/ViewProduct";
import Stock from "./pages/admin/stock/Stock";
import AddStock from "./pages/admin/stock/AddStock";
import Brand from "./pages/admin/brand/Brand";
import ListBrand from './pages/listBrand/ListBrand';
import ListCategory from './pages/listCategory/ListCategory';
import NotFound from "./pages/notFound/NotFound";
import { AuthProvider } from "./contexts/AuthProvider";
import { TokenProvider } from "./contexts/TokenProvider";
import PrivateRoute from "./contexts/PrivateRoute";

export default function App()  {
    return (
        <Router>
                <TokenProvider> {/* Wrap your app with TokenProvider */}
                    <AuthProvider>
                        <Routes>
                            {/* Public routes */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/" element={<HomePage />} />
                            <Route path="/productview" element={<ProductView />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/listbrand" element={<ListBrand />}></Route>
                            <Route path="/listcategory" element={<ListCategory />}></Route>

                            {/* Protected routes */}
                            <Route element={<PrivateRoute />}>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/product" element={<Product />} />
                                <Route path="/viewproduct" element={<ViewProduct />}/>
                                <Route path="/stock" element={<Stock />}/>
                                <Route path="/addstock" element={<AddStock />}/>
                                <Route path="/producttype" element={<ProductType />} />
                                <Route path="/brand" element={<Brand />} />
                            </Route>

                            {/* Fallback route */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </AuthProvider>
                </TokenProvider>
        </Router>
    )
}