import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './page/home/home';
import Sidebar from './component/sidebar/sidebar';
import Header from './component/header/header';
import CreateItem from './page/create/create-item';
import DetailItem from './page/detail-item/detailItem';
import Purchase from './page/purchase/purchase';
import ProductPage from './page/product/productPage';
import './App.css';
import Profile from 'page/profile/profile';

function App() {

  useEffect(() => {
    window.ethereum.on('accountsChanged', function(){
      window.location.reload();
    })
  },[])

  return (
    <BrowserRouter>
      <div className="container">
        <Sidebar />
        <div className="main">
          <Header />
          <Routes>
            <Route path='/' element={<Navigate to='/overview' />} />
            <Route path='/overview' element={<Home />} />
            <Route path='/product' element={<ProductPage />} />
            <Route path='/create' element={<CreateItem />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/purchase' element={<Purchase />} />
            <Route path='/product?products=treat-diseases' element={<ProductPage />} />
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
