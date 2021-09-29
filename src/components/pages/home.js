import React from 'react';
import Header from '../layout/header';
import Sidebar from '../layout/sidebar';
import Home from './dashboard';
import Footer from '../layout/footer';
import Product from './product';
import { ToastContainer } from 'react-toastify';

function Homepage() {
  return (
    <body class='g-sidenav-show  bg-gray-100'>
      <ToastContainer />
      <Sidebar />
      <main class='main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg '>
        <Header />
        <div class='container-fluid py-4'>
          <Home />

          <Product />
          <Footer />
        </div>
      </main>
    </body>
  );
}

export default Homepage;
