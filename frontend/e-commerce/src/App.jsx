  import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './common/Navbar'
import Home from './components/Home'
import Checkout from './components/Checkout'
import ProductDetail from './components/ProductDetail'
import ProductListing from './components/ProductListing'
import ShoppingCart from './components/ShoppingCart'
import OrderHistory from './components/OrderHistory'
import UserAuthentication from './components/UserAuthentication'
import Footer from './common/Footer'
import { CartProvider } from './CartContext'
function App() {
  

  return (
  <BrowserRouter>
  <CartProvider>
     <Navbar/>
  <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/productdetail' element={<ProductDetail/>}></Route>
    <Route path='/productlisting' element={<ProductListing/>}></Route>
    <Route path='/shoppingcart' element={<ShoppingCart/>}></Route>
      <Route path='/checkout' element={<Checkout/>}></Route>
      <Route path='/orderhistory' element={<OrderHistory/>}/>
    <Route path='/userauthentication' element={<UserAuthentication/>}></Route>
  </Routes>
  <Footer/>
  </CartProvider>
  </BrowserRouter>
  )
}

export default App
