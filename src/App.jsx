import React, { Suspense, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const Cart = React.lazy(() => import('./components/Cart'));
const NotFound = React.lazy(() => import('./components/NotFound'));
const ProductDetail = React.lazy(() => import('./components/ProductDetail'));
const ProductList = React.lazy(() => import('./components/ProductList'));
const Checkout = React.lazy(() => import('./components/Checkout'));

function App() {

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
