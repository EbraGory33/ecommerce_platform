import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuthTokenManager } from '../store/slice/auth/AuthFunction';
import { useFetchCategory } from '../store/slice/category/CategoryFunction';
import { FetchUserCart } from '../store/slice/cart/CartFunction';
import PrivateRoute from './PrivateRoute';
import HomeScreen from '../screens/home/HomeScreen';
import CartScreen from '../screens/cart/CartScreen';
import ProductScreen from '../screens/home/product/ProductScreen';
import CategoryScreen from '../screens/home/CategoryScreen';
import LoginScreen from '../screens/user/LoginScreen';
import CheckoutScreen from '../screens/order/checkout/CheckoutScreen';
import AccountScreen from '../screens/user/AccountScreen';
import ProductEditScreen from '../screens/user/ProductEditScreen';
import ProductCreateScreen from '../screens/user/ProductCreateScreen';
import AccounttEditScreen from '../screens/user/AccounttEditScreen';
import ShippingScreen from '../screens/order/shipping/ShippingScreen';
import ReviewOrderScreen from "../screens/review/ReviewOrderScreen";
import OrderHistoryScreen from "../screens/home/order/OrderHistoryScreen";
import OrderScreen from "../screens/home/order/OrderScreen";
import Header from '../components/Header';
import Footer from '../components/Footer';




const AppRoutes = () => {
  const location = useLocation();
  const { AuthInfo } = useSelector((state) => state.auth); 

  useAuthTokenManager();
  console.log("Routes.js Line 32" + AuthInfo)
  useFetchCategory();
  FetchUserCart();
  
  // Define routes where Header and Footer should be hidden
  const hideHeaderFooterRoutes = ['/shipping', '/payment'];

  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname) ||
    location.pathname.startsWith('/Review_Order/');

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<HomeScreen />} exact />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/cart" element={<CartScreen />} />

        <Route path="/account" element={
          <PrivateRoute>
            <AccountScreen />
          </PrivateRoute>}
        />
        <Route path="/product/create" element={
          <PrivateRoute>
            <ProductCreateScreen />
          </PrivateRoute>} 
        />
        <Route path="/product/edit/:id" element={
          <PrivateRoute>
            <ProductEditScreen />
          </PrivateRoute>} 
        /> 
        <Route path="/account/update" element={
          <PrivateRoute>
            <AccounttEditScreen />
          </PrivateRoute>}
        />
        <Route path="/shop/category/:name/:id" element={<CategoryScreen />} />
        <Route path="/product/details/:id" element={<ProductScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<CheckoutScreen />} /> 
        <Route path="/Review_Order/:id" element={<ReviewOrderScreen />} />
        <Route path="/order_history" element={<OrderHistoryScreen />} />
        <Route path="/Order/:id" element={<OrderScreen />} />
      </Routes>
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
};

export default AppRoutes;

