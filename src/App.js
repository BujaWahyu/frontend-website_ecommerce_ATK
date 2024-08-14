import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Beranda from './component/Beranda';
import CreateProduk from './component/CreateProduk';
import UpdateProduk from './component/UpdateProduk';
import ListProduk from './component/ListProduk';
import Produk from './component/Produk';
import DetailProduk from './component/DetailProduk';
import Cart from './component/Cart';
import Checkout from './component/Checkout';
// import Admin from './component/Admin';
import Login from './component/Login';
import Registrasi from './component/Registrasi';
import Profil from './component/Profil';
// import SearchResults from './component/SearchResults';
import AllProduk from './component/AllProduk';

import './App.css';
// import { Row, Col } from 'react-bootstrap';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status

  // Function to handle successful login
  const handleLogin = (adminStatus) => {
    setIsLoggedIn(true); // Set isLoggedIn to true
    setIsAdmin(adminStatus); // Set isAdmin based on adminStatus
  };

  // Function to handle logout
  // const handleLogout = () => {
  //   setIsLoggedIn(false); // Set isLoggedIn to false
  //   setIsAdmin(false); // Reset isAdmin to false
  // };

  return (
    <Router>
    <div className="induk">
      {!isLoggedIn && (
        <div className='login d-flex justify-content-center align-items-center' style={{ height: "100vh", backgroundColor: "skyblue" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/registrasi" element={<Registrasi />} />
          </Routes>
        </div>
      )}
  
      {isLoggedIn && isAdmin && (
        <div className='Management-Produk' style={{ height: "105vh" }}>
              <Routes>
                <Route path="/" element={<Navigate to="/admin" />} />
                <Route path="/admin" element={<ListProduk />} />
                <Route path="/create-produk" element={<CreateProduk />} />
                <Route path="/update-produk/:id" element={<UpdateProduk />} />
              </Routes>
        </div>
      )}
  
      {isLoggedIn && !isAdmin && (
        <div className='beranda' style={{ height: "100vh" }}>
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/produk/:kategoriId" element={<Produk />} />
            <Route path="/detail-produk/:id" element={<DetailProduk />} />
            <Route path="/keranjang" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/search" element={<AllProduk />} />
          </Routes>
        </div>
      )}
    </div>
  </Router>
  
  );
}

export default App;
