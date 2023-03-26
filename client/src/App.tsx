import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './page/home/home';
import Sidebar from './component/sidebar/sidebar';
import Header from './component/header/header';
import Product from './page/product/product';
import CreateItem from './page/create/create-item';
import './App.css';
import DetailItem from './page/detail-item/detailItem';

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
            <Route path='/create' element={<CreateItem />} />
            <Route path='/product?products=treat-diseases' element={<Product />} />
            <Route path='/product/item/:_id' element={<DetailItem />} />
          </Routes>
          <div className='footer'></div>
          {/* <Footer /> */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
