import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Brands from './components/Brands/Brands';
import Products from './components/Products/Products';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import Categoriess from './components/Categoriess/Categoriess';
import Cart from './components/Cart/Cart';
import LogIn from './components/LogIn/LogIn';
import UserContextProvider, { UserContext } from './Contexts/UserContext';
import Guard from './components/Guard/Guard';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartCOntextProvider from './Contexts/CartContext';
import WhishlistContextProvider from './Contexts/WhishlistContext';
import Whishlist from './components/Whishlist/Whishlist';
import PaymentDetails from './components/PaymentDetails/PaymentDetails';
import Allorders from './components/Allorders/Allorders';
import ResetPass from './components/ResetPass/ResetPass';

function App() {
  let routers = createHashRouter([
    {
      path: '/', element: <Layout />, children: [
        { index: true, element: <Guard><Home /></Guard> },
        { path: 'Brands', element: <Guard><Brands /></Guard> },
        { path: 'Categories', element: <Guard><Categoriess /></Guard> },
        { path: 'Cart', element: <Guard><Cart /></Guard> },
        { path: 'Products', element: <Guard><Products /> </Guard> },
        { path: 'Whishlist', element: <Guard><Whishlist /> </Guard> },
        { path: 'Product/:id', element: <Guard><ProductDetails /></Guard> },
        { path: 'PaymentDetails', element: <Guard><PaymentDetails /></Guard> },
        { path: 'LogIn/ResetPass', element: <ResetPass /> },
        { path: 'allorders', element: <Guard><Allorders /></Guard> },
        { path: 'Register', element: <Register /> },
        { path: 'login', element: <LogIn /> },
        { path: '*', element: <NotFound /> },
      ]
    }
  ])

  return <>
    <UserContextProvider>
      <CartCOntextProvider>
        <WhishlistContextProvider>
          <RouterProvider router={routers} />
        </WhishlistContextProvider>
      </CartCOntextProvider>
    </UserContextProvider>

  </>
}

export default App;
