import React, { Suspense, useState } from 'react'
import './App.css'
// import Cart from './components/Cart'
// import CartItem from './components/CartItem'
// import Header from './components/Header'
// import NotFound from './components/NotFound'
// import ProductDetail from './components/ProductDetail'
// import ProductList from './components/ProductList'
// import ProductItem from './components/ProductItem'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Checkout from './components/Checkout'

const Cart = React.lazy(() => import('./components/Cart'));
// const Header = React.lazy(() => import('./components/Header'));
const NotFound = React.lazy(() => import('./components/NotFound'));
const ProductDetail = React.lazy(() => import('./components/ProductDetail'));
const ProductList = React.lazy(() => import('./components/ProductList'));
const Checkout = React.lazy(() => import('./components/Checkout'));

function App() {
  // const [count, setCount] = useState(0)


  return (

    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/ProductDetail/:id" element={<ProductDetail />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>

  )
}

export default App
