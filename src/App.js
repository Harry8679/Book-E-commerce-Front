import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Books from './pages/Books';
import UpdateProfile from './pages/UpdateProfile';
import UpdatePassword from './pages/UpdatePassword';
import Dashboard from './pages/Dashboard';
import AdminRoute from './AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/MangeUsers';
import ManageCategories from './pages/admin/ManageCategories';
import ManageProducts from './pages/admin/ManageProducts';
import EditUser from './pages/admin/EditUser';
import ViewUser from './pages/admin/ViewUser';
import CreateCategory from './pages/admin/CreateCategory';
import EditCategory from './pages/admin/EditCategory';
import ViewCategory from './pages/admin/ViewCategory';
import EditProduct from './pages/admin/EditProduct';
import ViewProduct from './pages/admin/ViewProduct';
import CreateProduct from './pages/admin/CreateProduct';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import StripeCheckout from './pages/StripeCheckout';
import OrderDetails from './pages/OrderDetails';
import OrderList from './pages/admin/OrderList';
import UserOrders from './pages/UserOrders';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🛒 Gestion du panier
  const [cartItems, setCartItems] = useState(() => {
    // Charger le panier depuis le local storage au premier rendu
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sauvegarder le panier dans le local storage lorsque le panier change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Vérification de l'authentification
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      const user = JSON.parse(userData);
      setIsAuthenticated(true);
      setUserRole(user.role);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }

    setLoading(false);
  }, []);

  // Fonction pour ajouter un produit au panier
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const isProductInCart = prevItems.find((item) => item._id === product._id);

      if (isProductInCart) {
        // Augmenter la quantité si le produit est déjà dans le panier
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Ajouter un nouveau produit au panier
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Fonction pour supprimer un produit du panier
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
  };

  // Fonction pour augmenter la quantité d'un produit dans le panier
  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Fonction pour diminuer la quantité d'un produit dans le panier
  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // Supprimez l'article si la quantité atteint 0
    );
  };

  // Fonction pour se connecter
  const login = (user, token) => {
    if (user && token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setIsAuthenticated(true);
      setUserRole(user.role);
    } else {
      console.error("Erreur : Données utilisateur ou token manquantes");
    }
  };

  // Fonction pour se déconnecter
  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserRole(null);
    setCartItems([]); // Vide le panier lors de la déconnexion
  };

  if (loading) {
    return <p className="text-center mt-10 text-lg">Chargement...</p>;
  }

  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} logout={logout} cartItems={cartItems} />
      <Routes>
        {/* Routes publiques */}
        <Route path="/signin" element={isAuthenticated ? <Navigate to="/" /> : <Signin login={login} />}/>
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />}/>
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />}/>
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/signin" />}/>
        <Route path="/update-profile" element={isAuthenticated ? <UpdateProfile /> : <Navigate to="/signin" />}/>
        <Route path="/update-password" element={isAuthenticated ? <UpdatePassword /> : <Navigate to="/signin" />}/>
        <Route path="/listes-des-livres" element={<Books addToCart={addToCart} />} />
        <Route path="/" element={<Home />} />
        <Route path="/books/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeFromCart={removeFromCart}/>} />
        <Route path="/stripe-checkout" element={<StripeCheckout />} />
        {/* Autres routes */}
        <Route path="/checkout/card" element={<StripeCheckout setCartItems={setCartItems} />} />
        <Route path="/checkout/paypal" element={<div>Paiement Paypal en cours...</div>} />
        <Route path="/my-orders" element={isAuthenticated ? <UserOrders /> : <Navigate to="/signin" />} />
        <Route path="/order-details/:orderId" element={isAuthenticated ? <OrderDetails /> : <Navigate to="/signin" />} />


        {/* Routes Admin */}
        <Route path="/admin/dashboard" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><AdminDashboard /></AdminRoute>}/>
        <Route path="/admin/users" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><ManageUsers /></AdminRoute>}/>
        <Route path="/admin/users/edit/:userId" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><EditUser /></AdminRoute>}/>
        <Route path="/admin/users/view/:userId" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><ViewUser /></AdminRoute>}/>
        <Route path="/admin/categories" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><ManageCategories /></AdminRoute>}/>
        <Route path="/admin/categories/create" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><CreateCategory /></AdminRoute>}/>
        <Route path="/admin/categories/edit/:categoryId" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><EditCategory /></AdminRoute>}/>
        <Route path="/admin/categories/view/:categoryId" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><ViewCategory /></AdminRoute>}/>
        <Route path="/admin/products" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><ManageProducts /></AdminRoute>}/>
        <Route path="/admin/products/create" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><CreateProduct /></AdminRoute>}/>
        <Route path="/admin/products/edit/:productId" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><EditProduct /></AdminRoute>}/>
        <Route path="/admin/products/view/:productId" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><ViewProduct /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><OrderList /></AdminRoute>}/>
        <Route path="/admin/orders/:orderId" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><OrderDetails /></AdminRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;