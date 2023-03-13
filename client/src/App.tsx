import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './page/home/home';
import Sidebar from './component/sidebar/sidebar';
import Header from './component/header/header';
import Product from './page/product/product';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Sidebar />

        <div className="main">
          <Header />
          <Routes>
            <Route path='/' element={<Navigate to='/overview' />} />
            <Route path='/overview' element={<Home />} />
            <Route path='/product' element={<Product />} />
            <Route path='/product?products=any' element={<Product />} />
            {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
          </Routes>
          <div className='footer'></div>
          {/* <Footer /> */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
