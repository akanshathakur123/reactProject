import React from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import MyAppBar from './components/MyAppBar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Products from './components/Products';
import Addproducts from './components/Addproducts';
import ProductInfo from './components/ProductInfo';
import Cart from './components/Cart';
export default function App() {
  return (
    <>
      <Router>
        <MyAppBar/>
        <section>
          <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/products" element={<Products/>}/>
              <Route path='/addproducts' element={<Addproducts/>}/>
              <Route path="/productsinfo:id" element={<ProductInfo/>}/>
              <Route path='/cart' element={<Cart/>}/>
          </Routes>
        </section>
      </Router>
    </>
  )
}
