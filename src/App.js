import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';

export default function App() {
  return (
    <Router>
      <nav style={{
        backgroundColor: '#D02102',
        padding: '1rem 2rem',
        display: 'flex',
        gap: '1rem',
        fontWeight: 'bold',
        color: '#F3B92B'
      }}>
        <Link to="/" style={{ color: '#F3B92B', textDecoration: 'none' }}>Home</Link>
        <Link to="/products" style={{ color: '#F3B92B', textDecoration: 'none' }}>Produtos</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}
